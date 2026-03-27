let confirmBtn = null;
let lastCopied = "";

let isEnabled = true;

chrome.storage.local.get({ enabled: true }, (data) => {
  isEnabled = data.enabled;
});


// ===== マウス選択検知 =====
document.addEventListener('mouseup', (e) => {
  if (!isEnabled) return;
  if (confirmBtn && confirmBtn.contains(e.target)) return;

  setTimeout(() => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText.length > 0) {
      showConfirmButton(e.clientX, e.clientY);
    } else {
      cleanup();
    }
  }, 50);
});

// ===== ボタン表示 =====
function showConfirmButton(x, y) {
  // 選択範囲を変えるとボタン位置も変更
  if (confirmBtn) {
  confirmBtn.style.top = (y + 15) + "px";
  confirmBtn.style.left = (x + 15) + "px";
  return;
}

  confirmBtn = document.createElement('button');
  confirmBtn.innerHTML = "履歴に保存";

  confirmBtn.style.cssText = `
    position: fixed;
    top: ${y + 15}px;
    left: ${x + 15}px;
    z-index: 2147483647;
    padding: 6px 12px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    font-size: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  `;

  confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    saveAndNotify();
  });

  document.body.appendChild(confirmBtn);
}

// ===== 保存処理 =====
function saveAndNotify() {
  const text = window.getSelection().toString().trim();
  if (!text) return;

  lastCopied = text;

  cleanup();

  chrome.runtime.sendMessage({ type: "SAVE_COPY", text: text }, (res) => {

    // コピーは必ず実行
    navigator.clipboard.writeText(text).catch(() => {});

    if (res?.status === "too_large") {
      showToast("分量が多すぎて拡張機能には保存されませんでした");
    } else if (res?.status === "error") {
      showToast("保存に失敗しました");
    } else {
      showToast("保存しました");
    }
  });
}

// ===== copyイベント（最重要）=====
document.addEventListener('copy', () => {
  if (!isEnabled) return;
  const text = window.getSelection().toString().trim();

  if (!text || text === lastCopied) return;

  lastCopied = text;

  chrome.runtime.sendMessage({ type: "SAVE_COPY", text: text }, (res) => {
    if (res?.status === "too_large") {
      showToast("長すぎるため拡張機能には保存されませんでした");
    } else if (res?.status === "success") {
      showToast("履歴に保存しました");
    }
  });

  cleanup();
});

// ===== クリーンアップ =====
function cleanup() {
  if (confirmBtn) {
    confirmBtn.remove();
    confirmBtn = null;
  }
}

// ===== トースト =====
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;

  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.85);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    z-index: 2147483647;
    font-size: 13px;
    pointer-events: none;
  `;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1000);
}


chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.enabled) {
    isEnabled = changes.enabled.newValue;
    cleanup(); // OFF時にボタン消す
  }
});
const historyList = document.getElementById('history-list');
const copyAllBtn = document.getElementById('copy-all');
const clearAllBtn = document.getElementById('clear-all');
const formatSelect = document.getElementById('format-select');
const toggle = document.getElementById('toggle-enabled');
const count = document.getElementById('count');

// ===== 初期設定 =====
chrome.storage.local.get({ enabled: true }, (data) => {
  toggle.checked = data.enabled;
});

toggle.onchange = () => {
  chrome.storage.local.set({ enabled: toggle.checked });

  showSideToast(
    toggle.checked ? "有効化しました" : "無効化しました"
  );
};

// ===== フォーマット復元 =====
chrome.storage.local.get({ copyFormat: "double" }, (data) => {
  formatSelect.value = data.copyFormat;
});

formatSelect.onchange = () => {
  chrome.storage.local.set({ copyFormat: formatSelect.value });
};

// ===== 履歴表示 =====
function displayHistory() {
  chrome.storage.local.get({ copyHistory: [] }, (data) => {
    historyList.innerHTML = '';
    count.textContent = `(${data.copyHistory.length})`;

    if (data.copyHistory.length === 0) {
      historyList.innerHTML = `
        <div style="color:#999;text-align:center;margin-top:20px;font-size:12px;">
          履歴はありません
        </div>`;
      return;
    }

    data.copyHistory.forEach((text, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'history-item-wrapper';

      const div = document.createElement('div');
      div.className = 'history-item';

      const shortText = text.length > 120 ? text.slice(0, 120) + "..." : text;
      div.textContent = shortText;
      div.title = text;

      div.onclick = () => {
        navigator.clipboard.writeText(text).then(() => {
          showSideToast("コピーしました");
        });
      };

      const delBtn = document.createElement('button');
      delBtn.className = 'del-btn';
      delBtn.textContent = "×";

      delBtn.onclick = (e) => {
        e.stopPropagation();

        chrome.storage.local.get({ copyHistory: [] }, (latest) => {
          const newHistory = [...latest.copyHistory];
          newHistory.splice(index, 1);
          chrome.storage.local.set({ copyHistory: newHistory });
        });
      };

      wrapper.appendChild(div);
      wrapper.appendChild(delBtn);
      historyList.appendChild(wrapper);
    });
  });
}

// ===== コピー形式 =====
function formatText(history, mode) {
  if (mode === "double") return history.join("\n\n");
  if (mode === "inline") {
    return history.map(t => t.replace(/\s+/g, ' ').trim()).join(" ");
  }
  return history.join("\n\n");
}

// ===== トースト =====
function showSideToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;

  toast.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #28a745;
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  `;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}

// ===== すべてコピー =====
copyAllBtn.onclick = () => {
  chrome.storage.local.get({ copyHistory: [] }, (data) => {
    if (data.copyHistory.length === 0) {
      showSideToast("コピーする履歴がありません");
      return;
    }

    const text = formatText(data.copyHistory, formatSelect.value);

    navigator.clipboard.writeText(text)
    .then(() => {
      showSideToast("すべてコピーしました");
    })
    .catch(() => {
      showSideToast("コピーに失敗しました");
    });
  });
};

// ===== すべて削除 =====
clearAllBtn.onclick = () => {
  if (!confirm("履歴をすべて削除しますか？")) return;

  chrome.storage.local.set({ copyHistory: [] }, () => {
    showSideToast("履歴を削除しました");
  });
};

// ===== 初期表示 =====
displayHistory();

// ===== リアクティブ更新 =====
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.copyHistory) {
    displayHistory();
  }
});
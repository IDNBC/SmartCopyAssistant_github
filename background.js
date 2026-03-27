const MAX_ITEM_LENGTH = 50000; // 約5万文字（調整可）

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SAVE_COPY" && message.text && message.text.trim()) {

    const text = message.text.trim();

    // ===== 長すぎる場合は保存しない =====
    if (text.length > MAX_ITEM_LENGTH) {
      sendResponse({ status: "too_large" });
      return true;
    }

    chrome.storage.local.get({ copyHistory: [] }, (data) => {

      let newHistory = data.copyHistory.filter(item => item !== text);
      newHistory.unshift(text);
      newHistory = newHistory.slice(0, 100);

      chrome.storage.local.set({ copyHistory: newHistory }, () => {
        if (chrome.runtime.lastError) {
          sendResponse({ status: "error" });
        } else {
          sendResponse({ status: "success" });
        }
      });

    });

    return true;
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true });
});

// アイコンクリックでサイドパネル起動
chrome.action.onClicked.addListener((tab) => {
  if (chrome.sidePanel && chrome.sidePanel.open) {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});
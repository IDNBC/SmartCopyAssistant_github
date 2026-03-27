# Smart Copy Assistant

## 🇺🇸 English

Lightweight clipboard history extension for Chrome / Edge.

### Features

* Save selected text with one click
* Automatically record **Ctrl+C / Cmd+C / right-click copy**
* Floating "Save to history" button on text selection
* Import current clipboard content (even from external apps like VSCode)
* Re-copy from history with a single click
* Bulk copy with formatting options:

  * Multi-line (default)
  * Single-line (remove line breaks and extra spaces)
* Enable / Disable toggle
* Stores up to 100 entries
* Prevents duplicate entries (moves latest to top)

---

### Usage

1. Select text on any webpage
2. Click **"Save to history"** OR copy normally (Ctrl+C / right-click)
3. (Optional) Click **"Import Clipboard"** in the side panel to add external copied text
4. Open the side panel
5. Click any item to copy again

---

### Behavior

* Works automatically on all pages
* Copy events are detected in real time
* UI button disappears instantly after action (optimized UX)
* Toast notifications provide feedback

---

### Limitations

* Only **plain text** is supported  
  (images, rich text, formatting, HTML are NOT saved)
* Very large text may not be saved (length limit applied for stability)
* Bulk formatting applies **only to "Copy All"**, not individual items
* Clipboard import may not work in some environments due to browser security restrictions

---

### Privacy & Security

* All data is stored locally (`chrome.storage.local`)
* No external servers or data transmission
* No tracking or analytics

---

### Permissions Explanation

* Access to all pages is required to detect text selection and copy actions
* Clipboard access is used only when the user performs a copy action or explicitly imports clipboard content

---

### Installation

Install from Chrome Web Store (link will be added)

---

## 🇯🇵 日本語

軽量なコピー履歴管理Chrome / Edge拡張です。

---

## 機能

* 選択テキストをワンクリックで保存
* Ctrl+C / 右クリックコピーも自動記録
* テキスト選択時に「履歴に保存」ボタンを表示
* **クリップボードの内容を履歴に取り込み可能（VSCodeなど他アプリ対応）**
* 履歴からワンクリックで再コピー
* まとめコピー機能

  * 改行あり（通常）
  * 1行に変換（改行・余白を削除）
* ON / OFF 切り替え機能
* 最大100件まで保存
* 重複データは自動で整理（最新を先頭へ）

---

## 使い方

1. テキストを選択
2. 「履歴に保存」をクリック、または通常コピー（Ctrl+C / 右クリック）
3. （任意）サイドパネルの「クリップボードを履歴に追加」を押すと外部コピーも保存可能
4. サイドパネルを開く
5. 履歴をクリックで再コピー

---

## 動作仕様

* すべてのWebページで動作
* コピー操作をリアルタイム検知
* ボタンは操作後すぐ消える（高速UI）
* トースト通知で状態を表示

---

## 制限事項

* **テキストのみ対応**

  * 画像、リッチテキスト、HTML形式は保存されません
* 非常に長いテキストは保存されない場合があります（安定性のため）
* コピー形式の設定は「すべてコピー」にのみ適用されます
* クリップボード取り込みはブラウザの制限により動作しない場合があります

---

## プライバシー・安全性

* データはすべてローカルに保存されます
* 外部サーバーへの送信は一切ありません
* トラッキングなし

---

## 権限について

* テキスト選択・コピー検知のため、すべてのページへのアクセスが必要です
* クリップボードはユーザー操作時のみ使用されます（コピー時・手動取り込み時）

---

## インストール

Chrome Web Storeからインストールしてください（公開後リンク追加）
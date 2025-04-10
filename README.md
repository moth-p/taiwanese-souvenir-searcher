# Taiwanese Souvenir Search & Favorite Website

台灣農村優良伴手禮查詢與收藏網站

A souvenir search and bookmarking site powered by **React 19**, allowing users to browse, search, and favorite rural quality gift items in Taiwan. Bookmarks are stored via `localStorage`, preserving favorites across sessions.

> 資料來源：[政府開放資料平臺](https://data.gov.tw/dataset/13387) — 推薦農村優良伴手禮 JSON

---

## 網頁畫面預覽

<div align="center">
  <img src="./public/display_img.png" alt="首頁畫面" width="45%" style="margin-right: 10px;" />
  <img src="./public/display_img2.png" alt="收藏畫面" width="45%" />
</div>

---

## Features 功能特色

- 關鍵字搜尋
- 瀏覽伴手禮詳細資訊（圖片、描述、出品單位等）
- 收藏／取消收藏商品（收藏記錄存在 localStorage）
- 分頁切換與共用元件架構（React Router 管理）
- 響應式設計支援手機與桌機瀏覽

---

## Tech Stack 使用技術

| 類別     | 技術名稱                              |
| -------- | ------------------------------------- |
| 前端框架 | React 19                              |
| 路由管理 | React Router v7（使用 HashRouter）    |
| 狀態管理 | React Hooks（useState, useEffect...） |
| API 串接 | Axios                                 |
| 樣式工具 | Tailwind CSS                          |
| 打包工具 | Vite                                  |
| 程式檢查 | ESLint                                |

---

## 專案結構 Project Structure

```bash
src/
├── components/        # 共用元件（NavBar、分頁、卡片、載入動畫）
│   ├── Loading.jsx
│   ├── NavBar.jsx
│   ├── Pagination.jsx
│   └── ProductCard.jsx
│
├── layouts/           # 頁面排版
│   └── MainLayout.jsx
│
├── pages/             # 主頁面
│   ├── Favorite.jsx   # 收藏清單
│   └── Home.jsx       # 查詢與展示
│
├── services/          # 資料與 API 管理
│   └── api.js         # 封裝 axios
│
├── index.css          # Tailwind 樣式入口
├── main.jsx           # React 專案進入點
```

---

## 快速開始 How to Run

### 本地開發

```bash
# 1. Clone 專案
git clone https://github.com/moth-p/gifts-searcher-frontend.git
cd gifts-searcher-frontend

# 2. 安裝依賴套件
npm install

# 3. 啟動本地伺服器
npm run dev
```

### 建立與預覽

```bash
# 4. 打包生產環境檔案
npm run build

# 5. 預覽打包後內容
npm run preview
```

---

## 線上預覽 Demo

GitHub Pages:  
https://moth-p.github.io/taiwanese-souvenir-searcher/

> 使用 HashRouter 部署以避免 GitHub Pages 的靜態路由限制

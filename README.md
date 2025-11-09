# Init Project

Init Project 是一個以 Node.js 與 Express 打造的 MVC 範例專案，整合 EJS 模板、Bootstrap 5、SASS/SCSS、Sequelize（MySQL），並預先配置 JWT 與 bcryptjs 以處理身分驗證。專案同時提供 Docker、Docker Compose 及 Google App Engine 部署設定，協助團隊快速落地零售分析平台的基礎架構。

## 功能特色

- 🚀 採用 MVC 分層的 Express.js 應用程式骨架
- 🎨 內建 Bootstrap 5、SASS/SCSS 編譯流程與 FontAwesome 圖示
- 🗄️ 透過 Sequelize ORM 連接 MySQL 資料庫
- 🔐 使用 JWT 與 bcryptjs 實作安全的登入與密碼雜湊
- 🐳 提供 Docker/Docker Compose 及 GAE `app.yaml` 部署設定

## 系統需求

- Node.js 18 以上版本
- Docker 與 Docker Compose（非必須，但建議）

## 快速開始

```bash
# 安裝相依套件
npm install

# （選用）編譯 SASS
npm run build:css

# 啟動開發伺服器
npm run dev
```

瀏覽器開啟 `http://localhost:3000` 即可查看初始頁面。

## 環境變數設定

複製範本檔案並依需求調整：

```bash
cp .env.example .env
```

請更新資料庫連線資訊、JWT 密鑰與 bcrypt 雜湊迭代數等設定。預設會建立應用程式用戶 `store_radar_app`、密碼 `store_radar_pass`，以及資料庫 root 密碼 `root_super_secret`。如需調整應用程式啟動時的資料庫重試次數與間隔，可修改 `DB_CONNECT_RETRIES` 與 `DB_CONNECT_RETRY_DELAY`。若要部署至 GAE，可同步調整 `env_variables.yaml`。

## 資料庫管理

專案已整合 Sequelize CLI，可使用以下指令操作遷移與種子資料（在本機執行時請先建立 `.env`，使用 `DB_HOST=127.0.0.1` 與 `DB_PORT=3307` 連線至 Docker 中的 MySQL）：

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

若資料庫與應用程式皆以 Docker Compose 執行，可改用提供的指令在容器內執行：

```bash
npm run db:migrate:docker
npm run db:seed:docker
```

## Docker 操作

使用 Docker Compose 建置並啟動整套服務（若未提供 `.env`，將使用預設值）：

```bash
docker-compose up --build
```

預設將公開 `http://localhost:3000` 作為應用程式入口，並將 MySQL 連接埠映射至 `3307`（容器內為 `3306`）。如需調整環境參數，可在執行指令前於 shell 中匯出對應變數，或在專案根目錄建立 `.env` 覆寫預設值。

## NPM 指令

- `npm run dev`：使用 nodemon 啟動開發伺服器
- `npm run test`：執行 Node.js Test Runner
- `npm run build:css`：一次性編譯 SCSS 為壓縮 CSS
- `npm run watch:css`：監聽 SCSS 變化並即時重新編譯
- `npm run db:migrate`：執行尚未套用的資料庫遷移
- `npm run db:seed`：執行所有資料種子腳本
- `npm run db:reset`：回滾所有遷移後再次套用並播種

## 資料夾結構

```
store-radar/
├── app.js
├── server.js
├── app.yaml
├── env_variables.yaml
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── videos/
│   ├── uploads/
│   └── sitemap.xml
├── views/
│   ├── layouts/
│   ├── partials/
│   ├── admin/
│   ├── auth/
│   └── error/
├── routes/
├── controllers/
├── models/
├── middleware/
├── config/
├── services/
├── migrations/
├── seeders/
├── scripts/
├── tests/
└── docs/
```

## 授權

MIT License


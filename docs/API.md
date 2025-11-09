# Init Project API 概覽

## 使用者身分驗證

- `POST /auth/register` — 建立新使用者帳號。
- `POST /auth/login` — 驗證使用者並簽發 JWT（儲存在 HttpOnly Cookie）。
- `POST /auth/logout` — 清除身分驗證 Cookie。
- `GET /auth/profile` — 取得已驗證使用者的個人資料。

## 後台管理

- `GET /admin` — 後台儀表板（需通過身分驗證）。
- `GET /admin/users` — 查看所有使用者清單。
- `GET /admin/users/:id` — 查詢特定使用者詳細資料。

## 公開頁面

- `GET /` — 以 EJS 渲染的首頁。

> 專案後續若新增 API，可在此持續補充說明。


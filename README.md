# NOMISUGI

禁酒・節酒モチベーション管理Webアプリ

「飲まない日が、夢に変わる」

## 開発環境

```bash
docker compose up -d
docker compose exec app npx prisma migrate dev
```

http://localhost:3000 でアクセス

## 技術スタック

- Next.js 14 (App Router)
- Tailwind CSS
- NextAuth.js v5
- PostgreSQL (Supabase)
- Prisma ORM

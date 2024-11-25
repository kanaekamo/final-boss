これは[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)で作成された [Next.js](https://nextjs.org)プロジェクトです。

## はじめに
以下のコマンドで開発サーバーを実行します。

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)を開き、結果を確認します。

## ページ編集について

ページの編集をする場合は `app/page.tsx`を編集してください。
編集するとページは自動で更新されます。

## データの取得・処理について

都道府県一覧の取得RestAPIは`app\api\v1\prefectures\route.ts`で行っています。

チェックされた都道府県データの処理は`app\api\checked\route.ts`で行っています。
都道府県別の人口構成RestAPIは`app\api\v1\population\composition\perYear\route.ts`で行っています。

## Next.jsの詳細について

Next.jsの詳細については、次のリソースをご覧ください。

- [Next.js Documentation](https://nextjs.org/docs) - Next.js の機能とAPIについての学習
- [Learn Next.js](https://nextjs.org/learn) - 対話型のNext.jsチュートリアル

## Vercelにデプロイ

Next.js アプリをデプロイする最も簡単な方法は、Next.js の作成者が提供する[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使用することです。

詳細については、[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)をご覧ください。

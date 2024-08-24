# zkppay

- [デモページ](https://zkpaypay.vercel.app/)

デプロイは以下の fork されたリポジトリの更新を行い、Vercel にデプロイされます。

- [GitHub - sey323/zkppay-webapp: Vercel deploy 用のリポジトリ](https://github.com/sey323/zkppay-webapp)

## 概要

- web3auth を利用してログインし、Sepolia Scroll のテストネットに接続します。

## Quick Start

`.env.local`を作成し、以下の環境変数を設定する。

```bash
# https://app.cabinet-node.com/ で発行したSeporia Scroll の RPC JSONのAPIキー
NEXT_PUBLIC_CABINET_SCROLL_SEPORIA_RPC_JSON_API_KEY=${JSON API Key}
# https://dashboard.web3auth.io/ で登録したアプリケーションの Client Secret
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=${Client ID}

# Supabase の設定
NEXT_PUBLIC_SUPABASE_URL=${Supabase URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${Supabase Anon Key}
```

以下のコマンドで開発環境を起動する。

```bash
npm run dev
```

## 利用技術

- web3auth
- rainbowkit
- scroll (Sepolia)
- cabinet

## 開発者向け

### supabase からスキーマの取得

以下のコマンドを実行し、`database.types.ts`を生成する。

```bash
supabase gen types --lang=typescript --project-id xttxgubekhgwkbvseoxw --schema public > database.types.ts
```

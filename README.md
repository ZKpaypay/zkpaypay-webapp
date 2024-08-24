# ZKpaypay

- [Demo Page](https://zkpaypay.vercel.app/)

Deployment is done by updating the forked repository below and deploying to Vercel.

- [GitHub - sey323/zkpaypay-webapp: Repository for Vercel deployment](https://github.com/sey323/zkpaypay-webapp)

## Overview

### System Architecture

The overall architecture is as follows. This repository corresponds to the Frontend in the diagram.

![System Architecture](./docs/arch.png)

For information about contracts, please refer to the following repository.

- [zkpaypay/zkpaypay-contracts · GitHub](https://github.com/zkpaypay/zkpaypay-contracts)

### Technologies Used

| Technology     | Use                                     | URL                                           |
| -------------- | --------------------------------------- | --------------------------------------------- |
| Scroll Seporia | Execution base of Plasma Next Contracts | [scroll.io](https://scroll.io/)               |
| Cabinet        | RPC Node for Scroll Seporia             | [cabinet-node.com](https://cabinet-node.com/) |
| ENS            | Name resolution of wallet addresses     | [ens.domains](https://ens.domains/)           |
| rainbowkit     | Wallet                                  | [rainbowkit.io](https://rainbowkit.io/)       |
| web3auth       | Wallet provider                         | [web3auth.io](https://web3auth.io/)           |

## Quick Start

Create `.env.local` and set the following environment variables.

```bash
# Seporia Scroll's RPC JSON API key issued at https://app.cabinet-node.com/
NEXT_PUBLIC_CABINET_SCROLL_SEPORIA_RPC_JSON_API_KEY=${JSON API Key}
# The Client Secret of the application registered at https://dashboard.web3auth.io/
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=${Client ID}

# Supabase settings
NEXT_PUBLIC_SUPABASE_URL=${Supabase URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${Supabase Anon Key}
```

Launch the development environment with the following command.

```bash
npm run dev
```

## Technologies Used

- web3auth
- rainbowkit
- scroll (Sepolia)
- cabinet

## For Developers

### Fetching the schema from supabase

Run the following command and generate `database.types.ts`.

```bash
supabase gen types --lang=typescript --project-id xttxgubekhgwkbvseoxw --schema public > database.types.ts
```

# Pie Slicer dApp  | Eth Istanbul 2023

## Description

dApp to join our profit-sharing network and follow the update on our treasury and reward distributions.

The profit-sharing network is automated and founded on a square root function, facilitating a fair distribution of profits among its members

Check the main project description [here](https://github.com/PieSlicer/smart-contracts) along with the smart contracts.

You can also check the [live demo](https://pieslicer.xyz/).

## Features

This marketplace is designed to easily join our network by buying NFTs even without a wallet (social login).

The treasury and reward distributions are updated in real-time on the treasury page and each holder can follow their own share of the pie.

## Upcoming features
- We want to make the markeplace even more accessible by allowing users to top up their wallet with a credit card using Safe OnRamp kit
- We will add a personal dashboard for the users to follow their NFTs and their treasury shares
- We will add a DAO voting page to allow the community to vote on the new projects to fund and apply for funding

## Tech Stack
- The marketplace is built on top of the [Next.js](https://nextjs.org/) framework with Typescript.
- It uses [Tailwind CSS](https://tailwindcss.com/) for global styling and levrage [@ensdomains/thorin](https://github.com/ensdomains/thorin) UI components.
- For wallet connection, we use [Web3Auth](https://web3auth.io/), and [wagmi](https://wagmi.sh/) and [alchemy-sdk](https://docs.alchemy.com/reference/alchemy-sdk-quickstart) to interact with the blockchain.
- We use ENS name when available to display the user's address and our own smart contracts.
- We use [Nouns API](https://docs.cloudnouns.com/) to retrieve amazing profile pictures for our users.
- The project is deployed on [Vercel](https://vercel.com/) and is designed to interact with Gnosis blockchain (currently on Sepolia testnet).

## Getting Started

### Prerequisites
Node.js (> 18.0.0)

### Installation
- Clone the repo
- Install dependencies
```bash
npm install
# or
yarn install
```
- Create a `.env.local` file at the root of the project and add the following variables:
```bash
cp .env.example .env.local
```
- Run the project
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

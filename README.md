🪙 Crypto Dashboard
A real-time cryptocurrency tracking dashboard built with Next.js and powered by the CoinGecko API. Browse live prices, market data, trending coins, trending NFTs, and detailed coin statistics — all in one place.

🔗 Live Demo
https://crypto-three-silk.vercel.app


✨ Features

Dashboard — Top 10 cryptocurrencies with live prices, 24h change, and market cap
Market — Full market overview with search functionality
Coin Details — Deep dive into any coin: ATH, ATL, circulating supply, algorithm, genesis date, about section, and statistics
Trending Coins — Top 15 trending cryptocurrencies ranked by CoinGecko
Trending NFTs — Live NFT floor prices and collections
Market Categories — Browse coins by category (PoS, Binance Launchpad, etc.)
Favorites — Save and track your favorite coins
Real-time Data — All data fetched live from the CoinGecko API


🛠️ Tech Stack
TechnologyPurposeNext.js 14React framework with App RouterCoinGecko APILive cryptocurrency & NFT dataTailwind CSSStyling and responsive designVercelDeployment and hosting

📁 Project Structure
├── app/
│   ├── Dashboard/          # Main dashboard page (Top 10 coins)
│   ├── Market/             # Full market listing with search
│   ├── Favorite/           # User's saved favorite coins
│   ├── TrendingCoins/      # Trending coins, NFTs & categories
│   └── CoinDetails/[id]/   # Dynamic coin detail page
├── components/             # Reusable UI components
├── public/                 # Static assets
└── ...

🚀 Getting Started
Prerequisites

Node.js 18+
npm or yarn

Installation
bash# Clone the repository
git clone https://github.com/your-username/crypto-dashboard.git

# Navigate to the project directory
cd crypto-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev
Open http://localhost:3000 in your browser.

🌐 API Reference
This project uses the CoinGecko API (free tier):
EndpointUsage/coins/marketsMarket prices & stats/search/trendingTrending coins & NFTs/coins/{id}Individual coin details/coins/categoriesMarket categories

📦 Deployment
The app is deployed on Vercel. To deploy your own instance:
bashnpm run build
Or connect your GitHub repo to Vercel for automatic deployments on every push.

👤 Author
Kerolos

Portfolio: https://portfolioo-theta-taupe.vercel.app
GitHub: https://github.com/KerolosAdly59/Crypto



📄 License
This project is open source and available under the MIT License.
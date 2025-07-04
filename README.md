# Dummy Token UI

A React-based frontend application for managing [Dummy Token](https://github.com/decentraland/dummy-token). This application allows users to connect their wallet, view their token balance, and transfer tokens to other addresses.

## 🚀 Features

- **Wallet Connection**: Connect to MetaMask or other Web3 wallets
- **Balance Display**: View your Dummy Token balance
- **Token Transfer**: Transfer tokens to any Ethereum address
- **Responsive Design**: Built with Decentraland UI components

## 🛠️ Tech Stack

- **Frontend**: React 17 + TypeScript
- **State Management**: Redux + Redux Saga
- **UI Components**: [Decentraland UI](https://ui.decentraland.org/)
- **Web3**: Ethers.js
- **Build Tool**: Vite
- **Testing**: Jest + Testing Library

## 📋 Prerequisites

Before running this application, you need:

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **MetaMask** browser extension
4. **Dummy Token Contract** deployed locally (see [Dummy Token Setup](#dummy-token-setup))

## 🔧 Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd dummy-token-ui

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy the example file (if it exists)
cp .env.example .env

# Or create it manually
touch .env
```

Add the following environment variables to your `.env` file:

```env
# Dummy Token Contract Address (you'll get this from the deployment)
VITE_TOKEN_ADDRESS=0x... # Replace with your deployed contract address
```

### 3. Dummy Token Setup

This application requires a running Dummy Token contract. Follow these steps to set up the token:

#### Option A: Use the Official Dummy Token Repository

1. **Clone the Dummy Token repository**:
   ```bash
   git clone https://github.com/decentraland/dummy-token.git
   cd dummy-token
   npm install
   ```

2. **Start a local Ethereum node**:
   ```bash
   npx hardhat node --hostname 0.0.0.0
   ```
   Keep this terminal running.

3. **Deploy the Dummy Token contract** (in a new terminal):
   ```bash
   npx hardhat --network localhost run scripts/deploy.js
   ```
   **Important**: Copy the `Token Address` from the output - you'll need it for the `VITE_TOKEN_ADDRESS` environment variable.

4. **Fund your account** (optional):
   ```bash
   npx hardhat --network localhost faucet <token-address> <your-address>
   ```

#### Option B: Use Your Own Token Contract

If you have your own ERC-20 token contract, make sure it's deployed and accessible on your local network.

### 4. MetaMask Configuration

1. **Add the local network to MetaMask**:
   - Network Name: `Localhost`
   - New RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`

2. **Import an account** using the private key from the Hardhat node output.

3. **Add the Dummy Token to MetaMask**:
   - Click "Add Token" → "Custom Token"
   - Paste the token contract address
   - You should see your token balance

### 5. Run the Application

```bash
# Start the development server
npm start
```

The application will be available at `http://localhost:5173`

## 🎯 Usage

1. **Connect Wallet**: Click the "Connect" button to connect your MetaMask wallet
2. **View Balance**: Once connected, you'll see your wallet address and token balance
3. **Transfer Tokens**: Click "Transfer Tokens" to open the transfer modal
4. **Enter Details**: Provide the amount and destination address
5. **Confirm Transfer**: Review and confirm the transaction in MetaMask

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── App/             # Main application component
│   ├── ConnectWallet/   # Wallet connection component
│   ├── WalletDashboard/ # Wallet information display
│   └── TransferModal/   # Token transfer modal
├── modules/             # Redux modules
│   ├── wallet/          # Wallet state management
│   └── transfer/        # Transfer state management
├── utils/               # Utility functions
│   └── validations.ts   # Form validation logic
└── index.tsx           # Application entry point
```

## 🔍 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage

## 🐛 Troubleshooting

### Common Issues

1. **"Missing env variable VITE_TOKEN_ADDRESS"**
   - Make sure your `.env` file contains the correct token address
   - Verify the token contract is deployed and accessible

2. **"Failed to connect to wallet"**
   - Ensure MetaMask is installed and unlocked
   - Check that you're connected to the correct network (localhost:1337)
   - Verify the account has some ETH for gas fees

3. **"Transaction failed"**
   - Check your account has sufficient ETH for gas
   - Verify you have enough tokens to transfer
   - Ensure the destination address is valid

4. **"Cannot connect to localhost:8545"**
   - Make sure the Hardhat node is running
   - Check the network configuration in MetaMask

## 🔗 Related Links

- [Dummy Token Repository](https://github.com/decentraland/dummy-token)
- [Decentraland UI Documentation](https://ui.decentraland.org/)
- [Ethers.js Documentation](https://docs.ethers.io/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

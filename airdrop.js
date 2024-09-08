const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');

// Function to create and save wallet to wallet.json
function createAndSaveWallet() {
  // Create a new wallet (Keypair)
  const wallet = solanaWeb3.Keypair.generate();

  // Get the public and secret key
  const publicKey = wallet.publicKey.toString();
  const secretKey = Array.from(wallet.secretKey); // Converting to an array to save in JSON

  // Save the secret key to wallet.json
  fs.writeFileSync('wallet.json', JSON.stringify(secretKey));
  console.log('Wallet created and saved to wallet.json');
  console.log("Public Key:", publicKey);

  return wallet;
}

// Function to load wallet from wallet.json
function loadWalletFromFile() {
  // Load the secret key from wallet.json
  const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json')));
  const loadedWallet = solanaWeb3.Keypair.fromSecretKey(secretKey);

  console.log('Wallet loaded from wallet.json');
  console.log("Loaded Public Key:", loadedWallet.publicKey.toString());

  return loadedWallet;
}

// Function to airdrop SOL to the wallet on Devnet
async function airdropSol(wallet) {
  const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

  try {
    // Request 1 SOL (1 SOL = 1,000,000,000 Lamports)
    const airdropSignature = await connection.requestAirdrop(wallet.publicKey, solanaWeb3.LAMPORTS_PER_SOL);

    // Confirm the transaction
    await connection.confirmTransaction(airdropSignature);

    console.log("Airdrop successful! 1 SOL transferred to wallet.");
  } catch (error) {
    console.error("Airdrop failed:", error);
  }
}

// Run the process
(async () => {
  let wallet;

  // If wallet.json exists, load the wallet; otherwise, create a new one
  if (fs.existsSync('wallet.json')) {
    wallet = loadWalletFromFile();
  } else {
    wallet = createAndSaveWallet();
  }

  // Airdrop 1 SOL to the loaded or newly created wallet
  await airdropSol(wallet);
})();
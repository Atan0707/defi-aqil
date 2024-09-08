const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');
// Create a new wallet (Keypair)
const wallet = solanaWeb3.Keypair.generate();

// Get the public and private key
const publicKey = wallet.publicKey.toString();
const secretKey = wallet.secretKey.toString();
// Save secret key to a file
fs.writeFileSync('wallet.json', JSON.stringify(Array.from(wallet.secretKey)));
// Display the wallet details
console.log("Public Key:", publicKey);
console.log("Secret Key:", secretKey);
const { Connection, PublicKey } = require('@solana/web3.js');

async function checkBalance(address) {
    // Connect to Solana devnet
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    try {
        // Create a PublicKey instance from the address
        const pubKey = new PublicKey(address);

        // Fetch balance (in lamports)
        const balance = await connection.getBalance(pubKey);

        // Convert balance from lamports to SOL (1 SOL = 1,000,000,000 lamports)
        const solBalance = balance / 1000000000;

        console.log(`The balance of ${address}: ${solBalance} SOL`);
        return solBalance;  // Return the balance
    } catch (err) {
        console.error('Error checking balance:', err);
        return null;
    }
}

// Example usage
const address = 'HbAnWM7RiT6aCicCzejnYikCq3tYkj8JARk3jsGWJfk6';  // Replace with the earlier public key
checkBalance(address);
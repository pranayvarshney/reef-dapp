const hre = require("hardhat");

//  deployed at 0x0a479aDfe8041f0e7747F52B8dCB4E7483466c07
async function main() {

    const testnetAccount = await hre.reef.getSignerByName("testnet_account");
    // await testnetAccount.claimDefaultAccount();

    const NFT = await hre.reef.getContractFactory("MembershipNFT", testnetAccount);
    const token = await NFT.deploy("ipfs://bafybeicb5uqhyd6lh4j7loolhgto6bemi4m6lo7wehrbkz6onjdiffh2ia/{id}.json");

    console.log("Deploy done");
    console.log({
        token: token.address,
    });
   
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
const hre = require("hardhat");
// 0x941136804656D65b77cefc6E1E8fdbdC2232F59D

async function main() {
    
    const testnetAccount = await hre.reef.getSignerByName("testnet_account");
    // await testnetAccount.claimDefaultAccount();

    const Token = await hre.reef.getContractFactory("GovernanceToken", testnetAccount);
    const token = await Token.deploy();

    console.log("Deploy done");
    console.log({
        token: token.address,
    });
    console.log({
        name: await token.name(),
        initialBalance: (await token.totalSupply()).toString(),
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
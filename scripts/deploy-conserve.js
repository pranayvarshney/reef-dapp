const hre = require("hardhat");
//0xa46A3ca07ea2051dd5f6973FBa470DC0A7de5325

async function main() {

    const testnetAccount = await hre.reef.getSignerByName("testnet_account");
    // await testnetAccount.claimDefaultAccount();
    const args = ["0x941136804656D65b77cefc6E1E8fdbdC2232F59D","0x9703cB4Cf5cC707266a58283b3d8b50337D4E241"];
    const conserve = await hre.reef.getContractFactory("Conserve", testnetAccount);
    const token = await conserve.deploy(...args);

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
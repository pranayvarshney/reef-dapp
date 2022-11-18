const hre = require("hardhat");
//0x23Bee2303345B0Cd28008AdC327Ba11C337d6245

async function main() {

    const testnetAccount = await hre.reef.getSignerByName("testnet_account");
    // await testnetAccount.claimDefaultAccount();
    const args = ["0x941136804656D65b77cefc6E1E8fdbdC2232F59D","0xEe6c1e6c545aAAfec2243769927285052c560080"];
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
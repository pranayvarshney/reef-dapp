const hre = require("hardhat");
//deployed at 0x6Cb768b4e3437a9e8FE3530879A62B3810c2fc7c

async function main() {

    const testnetAccount = await hre.reef.getSignerByName("testnet_account");
    // await testnetAccount.claimDefaultAccount();
    const args = [3600, [], []]
    const Timelock = await hre.reef.getContractFactory("TimeLock", testnetAccount);
    const timelock = await Timelock.deploy(...args);

    console.log("Deploy done");
    console.log({
        timelock: timelock.address,
    });
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
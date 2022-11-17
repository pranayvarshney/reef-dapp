const hre = require("hardhat");

async function main() {
    const testnetAccount = await hre.reef.getSignerByName("testnet_account");

    // const TimeLock = await hre.reef.getContractFactory("TimeLock", testnetAccount)
    const timeLock = await hre.reef.getContractAt("TimeLock", "0x6Cb768b4e3437a9e8FE3530879A62B3810c2fc7c", testnetAccount);


    // const Token = await hre.reef.getContractFactory("GovernanceToken", testnetAccount)
    const token = await hre.reef.getContractAt("GovernanceToken", "0x941136804656D65b77cefc6E1E8fdbdC2232F59D", testnetAccount)

    const proposerRole = await timeLock.PROPOSER_ROLE()
    const executorRole = await timeLock.EXECUTOR_ROLE()
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

    const proposerTx = await timeLock.grantRole(proposerRole, "0x9703cB4Cf5cC707266a58283b3d8b50337D4E241")
    await proposerTx.wait(1)
    const executorTx = await timeLock.grantRole(executorRole, "0x0000000000000000000000000000000000000000")
    await executorTx.wait(1)
    // const revokeTx = await timeLock.revokeRole(adminRole, deployer)
    // await revokeTx.wait(1)

    const printRole = await token.MINTER_ROLE()
    const printTx = await token.grantRole(printRole, "0x9703cB4Cf5cC707266a58283b3d8b50337D4E241")
    await printTx.wait(1)

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
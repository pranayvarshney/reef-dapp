const hre = require("hardhat");
// 0x9703cB4Cf5cC707266a58283b3d8b50337D4E241

async function main() {

    const testnetAccount = await hre.reef.getSignerByName("testnet_account");
    // await testnetAccount.claimDefaultAccount();
    const args = [
        "0x941136804656D65b77cefc6E1E8fdbdC2232F59D",
        "0x6Cb768b4e3437a9e8FE3530879A62B3810c2fc7c",
        4, // quorum percentage
        50400,// VOTING_PERIOD,
        1 // VOTING_DELAY,
    ]
    const Governance = await hre.reef.getContractFactory("GovernorContract", testnetAccount);
    const token = await Governance.deploy(...args);

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
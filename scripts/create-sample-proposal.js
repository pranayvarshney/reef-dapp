const hre = require("hardhat");

async function main() {
    const testnetAccount = await hre.reef.getSignerByName("testnet_account");

    // const TimeLock = await hre.reef.getContractFactory("TimeLock", testnetAccount)
    const vote = await hre.reef.getContractAt("GovernanceContract", "0x9703cB4Cf5cC707266a58283b3d8b50337D4E241", testnetAccount);    // const Token = await hre.reef.getContractFactory("GovernanceToken", testnetAccount)
    const token = await hre.reef.getContractAt("GovernanceToken", "0x941136804656D65b77cefc6E1E8fdbdC2232F59D", testnetAccount)

    const amount = 420_000;
    const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";
    const executions = [
        {
            // Our token contract that actually executes the mint.
            toAddress: "0x941136804656D65b77cefc6E1E8fdbdC2232F59D",
            // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
            // to send in this proposal. In this case, we're sending 0 ETH.
            // We're just minting new tokens to the treasury. So, set to 0.
            nativeTokenValue: 0,
            // We're doing a mint! And, we're minting to the vote, which is
            // acting as our treasury.
            // in this case, we need to use ethers.js to convert the amount
            // to the correct format. This is because the amount it requires is in wei.
            transactionData: token.encoder.encode(
                "mintTo", [
                "0x9703cB4Cf5cC707266a58283b3d8b50337D4E241",
                ethers.utils.parseUnits(amount.toString(), 18),
            ]
            ),
        }
    ];
    try {
        
        await vote.propose(description, executions);
    } catch (error) {
        console.log(error);
    }

    const Amount = 6_900;
    const Description = "Should the DAO transfer " + amount + " tokens from the treasury to " +
        "0xA5AC239eeB7d8859c3c5E59997B1BC0536641813" + " for being awesome?";
    const Executions = [
        {
            // Again, we're sending ourselves 0 ETH. Just sending our own token.
            nativeTokenValue: 0,
            transactionData: token.encoder.encode(
                // We're doing a transfer from the treasury to our wallet.
                "transfer",
                [
                    "0xA5AC239eeB7d8859c3c5E59997B1BC0536641813",
                    ethers.utils.parseUnits(Amount.toString(), 18),
                ]
            ),
            toAddress: "0x941136804656D65b77cefc6E1E8fdbdC2232F59D",
        },
    ];
    try{

        await vote.propose(Description, Executions);
    }
    catch(error){
        console.log(error);
    }





}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
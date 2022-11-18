const hre = require("hardhat");

async function main() {
    const testnetAccount = await hre.reef.getSignerByName("testnet_account");
    // should the dao mint 200 more tokens for the proposal?
    // const TimeLock = await hre.reef.getContractFactory("TimeLock", testnetAccount)
    // const vote = await hre.reef.getContractAt("GovernorContract", "0xEe6c1e6c545aAAfec2243769927285052c560080", testnetAccount);    // const Token = await hre.reef.getContractFactory("GovernanceToken", testnetAccount)
    const token = await hre.reef.getContractAt("GovernanceToken", "0x941136804656D65b77cefc6E1E8fdbdC2232F59D", testnetAccount)
    const governor = await hre.reef.getContractAt("GovernorContract", "0xEe6c1e6c545aAAfec2243769927285052c560080", testnetAccount)

    const encodeFunctionCall = token.interface.encodeFunctionData("mint", ["0xEe6c1e6c545aAAfec2243769927285052c560080",
        200])
    const tx = await governor.propose(
        ["0x941136804656D65b77cefc6E1E8fdbdC2232F59D"],
        [0],
        [encodeFunctionCall],
        "Mint 1000 tokens to 0xEe6c1e6c545aAAfec2243769927285052c560080",
    )

    const proposeReceipt = await tx.wait(1)
    const proposalId = proposeReceipt.events[0].args.proposalId
    console.log(`Proposed with proposal ID:\n  ${proposalId}`)

   




}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
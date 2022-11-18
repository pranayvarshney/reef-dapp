import React, { useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import { Contract } from "ethers";
import Uik from "@reef-defi/ui-kit";
import FactoryAbi from "./MembershipNFT.json"
import factoryAbi from "./GovernorContract.json"

const factoryContractAddress = "0xfC9345A2B81f18430ae41C815Ba0521e8F7c2cbc";
const voteContractAddress = "0xEe6c1e6c545aAAfec2243769927285052c560080";

const URL = "wss://rpc-testnet.reefscan.com/ws";

function App() {
	const [proposals, setProposals] = useState([]);
	const [isVoting, setIsVoting] = useState(false);
	const [hasVoted, setHasVoted] = useState(false);


	// useEffect(() => {
	// 	// A simple call to vote.getAll() to grab the proposals.
	// 	const getAllProposals = async () => {
	// 		try {
	// 			const proposals = await vote.getAll();
	// 			setProposals(proposals);
	// 			console.log("🌈 Proposals:", proposals);
	// 		} catch (error) {
	// 			console.log("failed to get proposals", error);
	// 		}
	// 	};
	// 	getAllProposals();
	// }, [vote]);




	const [nftmetadata, setNFTdata] = useState("");
	const [count, setCount] = useState("");
	const [signer, setSigner] = useState();
	const [isWalletConnected, setWalletConnected] = useState(false);
	const [account, setAccount] = useState('')
	const checkExtension = async () => {
		let allInjected = await web3Enable("Reef");

		if (allInjected.length === 0) {
			return false;
		}

		let injected;
		if (allInjected[0] && allInjected[0].signer) {
			injected = allInjected[0].signer;
		}

		const evmProvider = new Provider({
			provider: new WsProvider(URL),
		});

		evmProvider.api.on("ready", async () => {
			const allAccounts = await web3Accounts();

			allAccounts[0] &&
				allAccounts[0].address &&
				setWalletConnected(true);

			console.log(allAccounts);
			const wallet = new Signer(
				evmProvider,
				allAccounts[0].address,
				injected
			);
			const evmAddress = await wallet.queryEvmAddress()
			console.log(evmAddress)
			setAccount(evmAddress)
			// Claim default account
			if (!(await wallet.isClaimed())) {
				console.log(
					"No claimed EVM account found -> claimed default EVM account: ",
					await wallet.getAddress()
				);
				await wallet.claimDefaultAccount();
			}

			setSigner(wallet);
			// await getNFT();
		});
	};

	const checkSigner = async () => {
		if (!signer) {
			await checkExtension();
		}
		return true;
	};

	const getNFT = async () => {
		// const allAccounts = await web3Accounts();
		await checkSigner();
		const factoryContract = new Contract(
			factoryContractAddress,
			FactoryAbi.abi,
			signer
		);
		console.log(account);
		const result = await factoryContract.balanceOf(account, "0");
		console.log(result)
		setCount(result.toString());
		await getDetails();
	};
	const getDetails = async () => {
		await checkSigner();
		const factoryContract = new Contract(
			factoryContractAddress,
			FactoryAbi.abi,
			signer
		);
		const result = await factoryContract.uri(0);
		// setNFTdata(result);
		const res = await fetch("https://bafybeicb5uqhyd6lh4j7loolhgto6bemi4m6lo7wehrbkz6onjdiffh2ia.ipfs.nftstorage.link/0.json");
		setNFTdata(await res.json());
		console.log(nftmetadata);
	}
	const claimNFT = async () => {
		// const allAccounts = await web3Accounts();
		await checkSigner();
		const factoryContract = new Contract(
			factoryContractAddress,
			FactoryAbi.abi,
			signer
		);
		console.log(account);
		const result = await factoryContract.Mint(account);
		// result.wait(2);
		await getNFT();
		console.log(result)

	};

	const fetchall = async () => {
		await checkSigner();
		const factoryContract = new Contract(
			voteContractAddress,
			factoryAbi.abi,
			signer
		);
		console.log(account);
		const getAllProposal = async () => {
			try {
				const proposals = await factoryContract.getAllProposals();
				setProposals(proposals);
				console.log(" Proposals:", proposals);
			} catch (error) {
				console.log("failed to get proposals", error);
			}
		};
		getAllProposal();
	}

	return (
		<Uik.Container className="main">
			<Uik.Container vertical>
				<Uik.Container>
					<Uik.ReefLogo /> <Uik.Text text="Dapp" type="headline" />
				</Uik.Container>
				{isWalletConnected ? (
					<Uik.Container vertical className="container">
						{/* <Uik.Card condensed> */}
						<Uik.Container vertical flow="spaceBetween">
							<Uik.Button
								className="container-button"
								onClick={getNFT}
								text="Check if you have the ConserveNFT"
							/>
							{count > '0' ?
								<Uik.Container className="container">
									{/* <Uik.Tag color="cyan"> */}
									<Uik.Container vertical className="uik-tag--cyan" flow="spaceBetween">
										<Uik.Text>
											{nftmetadata.name}</Uik.Text>
										<Uik.Text>	{nftmetadata && nftmetadata.description}</Uik.Text>
										<Uik.Text>

											<img height={'200px'} width={'200px'} src="https://bafybeigvax753w4jfhyh5ygofbnwh2xhvkoviodvoybuee6b2zfhmsvdg4.ipfs.nftstorage.link/" ></img>
											{/* {nftmetadata && nftmetadata.image} */}

										</Uik.Text>

										<Uik.Text>	Congratulations you have the NFT</Uik.Text>
									</Uik.Container>
									{/* </Uik.Tag> */}
									<Uik.Container vertical>
										<Uik.Button
											className="container-button"
											onClick={fetchall}
											text="Get proposals"
										/>
										{proposals && proposals.map((proposal) => (

											<div key={proposal.proposalId} className="card">
												<h5>{proposal.description}</h5>
												<div>

												</div>
											</div>
										))}
									</Uik.Container>

								</Uik.Container>
								:
								<Uik.Container flow="spaceBetween">
									<Uik.Text>
										Go claim the free entry nft
									</Uik.Text >
									<Uik.Button
										className="container-button"
										onClick={claimNFT}
										text="Claim NFT"
									/>
								</Uik.Container>
							}
						</Uik.Container>
						{/* </Uik.Card> */}
					</Uik.Container>
				) : (
					<>
						<Uik.Container vertical className="container">
							<Uik.Text
								text={
									<>
										Click the{" "}
										<Uik.Tag>Connect Wallet</Uik.Tag> button
										to get started 🚀
									</>
								}
								type="light"
							/>
						</Uik.Container>
						<br />
						<Uik.Button
							text="Connect Wallet"
							onClick={checkExtension}
						/>
					</>
				)}
			</Uik.Container>
		</Uik.Container>
	);
}

export default App;

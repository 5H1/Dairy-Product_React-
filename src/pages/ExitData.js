import web3 from "./web3";

const address = "0xE9B2b53CF82f9D9317c304400470d857c5b76b4C";
const abi = [
  {
    inputs: [],
    name: "checkQuality",
    outputs: [{ internalType: "uint256[2]", name: "", type: "uint256[2]" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xf6aa1054",
  },
  {
    inputs: [],
    name: "export",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x07a43efd",
  },
  {
    inputs: [],
    name: "getTotalQuantity",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x7474e331",
  },
];

const contract = new web3.eth.Contract(abi, address);

export default contract;

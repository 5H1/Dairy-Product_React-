import web3 from "./web3";

const address = "0x5803406eA52C3bC98810523a015EE69d8B2B125A";
const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "centerID", type: "uint256" },
      { internalType: "uint256", name: "_quantity", type: "uint256" },
    ],
    name: "addMilk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xc5c1b3b5",
  },
  {
    inputs: [],
    name: "checkQuality",
    outputs: [{ internalType: "uint256[2]", name: "", type: "uint256[2]" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xf6aa1054",
  },
  {
    inputs: [{ internalType: "uint256", name: "centerID", type: "uint256" }],
    name: "getDataByCenterID",
    outputs: [{ internalType: "uint256[2][]", name: "", type: "uint256[2][]" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x37f6b0fc",
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
  {
    inputs: [],
    name: "outOfProcessing",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x5ba89e3e",
  },
  {
    inputs: [],
    name: "sendInto",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xc2418f8f",
  },
];

const contract = new web3.eth.Contract(abi, address);

export default contract;

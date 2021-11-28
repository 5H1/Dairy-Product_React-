import web3 from "./web3";
// import JSON from "JSON";

const address = "0x88eF8f6FeAaD3b3c5c2a3Ae7A1E655f798368049";
const abi = [
  {
    inputs: [{ internalType: "uint256", name: "quantity", type: "uint256" }],
    name: "addMilk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x56da207d",
  },
  {
    inputs: [
      { internalType: "uint256", name: "agentID", type: "uint256" },
      { internalType: "uint256", name: "packets", type: "uint256" },
    ],
    name: "delivaryTo",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xf1e687d7",
  },
  {
    inputs: [{ internalType: "uint256", name: "agentID", type: "uint256" }],
    name: "getDataById",
    outputs: [{ internalType: "uint256[2][]", name: "", type: "uint256[2][]" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xf2722a9f",
  },
  {
    inputs: [],
    name: "noOfPackets",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x0d1a4ff0",
  },
  {
    inputs: [],
    name: "pack",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xef082838",
  },
  {
    inputs: [],
    name: "totalQuantity",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xc616f412",
  },
];

const contract = new web3.eth.Contract(abi, address);

export default contract;

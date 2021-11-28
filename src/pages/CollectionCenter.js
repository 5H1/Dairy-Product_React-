import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import web3 from "./web3";
import data from "./CollectionCenterData";

function CollectionCenter(props) {
  // async componentDidMount() {
  //   const centerId = await data.methods.centerId().call();
  // }

  var [centerId, setCenterId] = useState();
  var [milk, setMilk] = useState();
  var [farmerId, setFarmerId] = useState();
  var [quantity, setQuantity] = useState();
  var [message, setMessage] = useState();
  var [id, setId] = useState();
  var [history, setHistory] = useState("");
  var val;

  useEffect(async () => {
    var id = await data.methods.centerId().call();
    var TM = await data.methods.getTotalQuantity().call();
    // console.log(TM);
    setCenterId(id);
    setMilk(TM);
  }, []);

  const onEnter = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts[0]);
    setMessage("Please Wait...");
    await data.methods.addMilk(farmerId, quantity).send({ from: accounts[0] });
    setMessage("Milk Added Successfully ✓✓");
  };

  const getHistory = async (event) => {
    event.preventDefault();
    // console.log(id);
    const accounts = await web3.eth.getAccounts();
    const res = await data.methods.getDataByID(id).call({ from: accounts[0] });
    setHistory([]);
    if (res.length == 0) {
      setHistory("No Data Found");
    } else {
      var temp = "";
      res.forEach((element) => {
        temp +=
          timeConverter(element[0]) + " : " + element[1] + " litres" + " | ";
      });
      // console.log(temp);
      setHistory(temp);
    }
  };

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  // async function genrateQR() {
  //   const accounts = await web3.eth.getAccounts();
  //   const totalData = await data.methods
  //     .exportMilk()
  //     .call({ from: accounts[0] });
  //   const uTime = timeConverter(totalData.split(" ").pop());
  //   // console.log(uTime);
  //   val = totalData.split(" ").slice(0, -1).concat(uTime).join(" ");
  //   ReactDOM.render(<QRCode value={val} />, document.getElementById("qrcode"));
  //   await data.methods.setMilkZero().send({ from: accounts[0] });
  // }

  return (
    <body>
      <div>
        <p>
          center ID : {centerId} <br />
          Total Milk : {milk}
        </p>
        <hr />
        <form onSubmit={onEnter}>
          <div>
            <label>Enter ID of the farmer </label>
            <input
              value={farmerId}
              onChange={(e) => setFarmerId(e.target.value)}
            />
            <br />
            <label class="special">Enter milk quantity </label>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <br />
            <button>ENTER</button>
          </div>
        </form>
        <p style={{ color: "green" }}>{message}</p>
        <form onSubmit={getHistory}>
          <h4>Get history of a farmer</h4>
          <label>Enter ID of the farmer </label>
          <input value={id} onChange={(e) => setId(e.target.value)} />
          <br />
          <button>SUBMIT</button>
        </form>
        <div id="found">{history}</div>
        <hr />
        <button onClick={props.temp}>EXPORT</button>
        <br />
        <div id="qrcode"></div>
      </div>
    </body>
  );
}
export default CollectionCenter;

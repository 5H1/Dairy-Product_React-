import React, { useState, useEffect } from "react";
import web3 from "./web3";
import data from "./EntryData";

function Entry(props) {
  var [quantity, setQuantity] = useState();
  var [milk, setMilk] = useState();
  var [centerId, setCenterId] = useState();
  var [message, setMessage] = useState();
  var [history, setHistory] = useState("");
  var [id, setId] = useState();


  
  useEffect(async () => {
    var Tm = await data.methods.getTotalQuantity().call();
    setMilk(Tm);
  });

  const onEnter = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts[0]);
    setMessage("Please Wait...");
    await data.methods.addMilk(centerId, quantity).send({ from: accounts[0] });
    setMessage("Milk Entered Successfully ✓✓");
  };

  const getHistory = async (event) => {
    event.preventDefault();
    // console.log(id);
    const accounts = await web3.eth.getAccounts();
    const res = await data.methods
      .getDataByCenterID(id)
      .call({ from: accounts[0] });
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
  //   // const accounts = await web3.eth.getAccounts();
  //   // const totalData = await data.methods.send().call({ from: accounts[0] });
  //   // const uTime = timeConverter(totalData.split(" ").pop());
  //   // // console.log(uTime);
  //   // const val = totalData.split(" ").slice(0, -1).concat(uTime).join(" ");
  //   // // console.log(val);
  //   // ReactDOM.render(<QRCode value={val} />, document.getElementById("qrcode"));
  //   // await data.methods.setMilkZero().send({ from: accounts[0] });

  //   console.log(props.temp);
  // }

  return (
    <body>
      <div>
          <p>{props.data}</p>
        <p>Total Milk: {milk}</p>
        <hr />

        <form onSubmit={onEnter}>
          <div>
            <label>Enter ID of the Collection Center </label>
            <input
              value={centerId}
              onChange={(e) => setCenterId(e.target.value)}
            />
            <br />
            <label class="special">Enter Milk Quantity </label>
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
          <h4>Get history of a Collection Center</h4>
          <label>Enter ID of the Collection Center </label>
          <input value={id} onChange={(e) => setId(e.target.value)} />
          <br />
          <button>SUBMIT</button>
        </form>
        <div id="found">{history}</div>
        <hr />
        <button onClick={props.temp}>Send Into</button>
        <button onClick={props.temp2}>Send Out</button>
        <br />
        <div id="qrcode"></div>
      </div>
    </body>
  );
}

export default Entry;

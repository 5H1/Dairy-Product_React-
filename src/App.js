import "./App.css";
// import React from "react";
import CollectionCenter from "./pages/CollectionCenter";
import Entry from "./pages/Entry";
import Packing from "./pages/Packing";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import web3 from "./pages/web3";
import data from "./pages/CollectionCenterData";
import EnData from "./pages/EntryData";
import ExData from "./pages/ExitData";
import PcData from "./pages/PackingData";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

function Home() {
  return <h2>Home</h2>;
}

const App = () => {
  var val = "Nothing";
  

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

  async function generateQR() {
    const accounts = await web3.eth.getAccounts();
    const totalData = await data.methods
      .exportMilk()
      .call({ from: accounts[0] });
    const uTime = timeConverter(totalData.split(" ").pop());
    // console.log(uTime);
    val = totalData.split(" ").slice(0, -1).concat(uTime).join(" ");
    ReactDOM.render(<QRCode value={val} />, document.getElementById("qrcode"));
    await data.methods.setMilkZero().send({ from: accounts[0] });
  }

  async function generateQREntry() {
    // console.log(val);
    // console.log(typeof val);
    const accounts = await web3.eth.getAccounts();
    const totalData = await EnData.methods
      .sendInto()
      .call({ from: accounts[0] });
    // console.log(totalData);
    const uTime = timeConverter(totalData.split(" ").pop());
    const Enval = totalData.split(" ").slice(0, -1).concat(uTime).join(" ");
    val += Enval;
    ReactDOM.render(<QRCode value={val} />, document.getElementById("qrcode"));
    // await data.methods.setMilkZero().send({ from: accounts[0] });
  }

  async function generateQRExit() {
    const accounts = await web3.eth.getAccounts();
    const totalData = await ExData.methods
      .export()
      .call({ from: accounts[0] });
    const uTime = timeConverter(totalData.split(" ").pop());
    const ExVal = totalData.split(" ").slice(0, -1).concat(uTime).join(" ");
    val += ExVal;
    ReactDOM.render(<QRCode value={val} />, document.getElementById("qrcode"));
  }

  async function generateQRDelivery(res) {
    // console.log(res);
    const uTime = timeConverter(res.split(" ").pop());
    const DeVal = res.split(" ").slice(0, -1).concat(uTime).join(" ");
    val += DeVal;
    ReactDOM.render(<QRCode value={val} />, document.getElementById("qrcodee"));
  }

  return (
    <Router>
      <div>
        <Link style={{color:"red"}}to="/">Home</Link>
        <Link to="/CollectionCenter">CollectionCenter</Link>
        <Link to="/Entry">Entry</Link>
        <Link to="/Packing">Packing</Link>
      </div>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route
          path="/CollectionCenter"
          element={<CollectionCenter temp={() => generateQR()} />}
        />
        <Route
          path="/Entry"
          element={
            <Entry
              temp={() => generateQREntry()}
              temp2={() => generateQRExit()}
            />
          }
        />
        <Route
          path="/Packing"
          element={<Packing temp={(res) => generateQRDelivery(res)} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

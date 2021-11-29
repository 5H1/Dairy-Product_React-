import React, { useState, useEffect } from "react";
import web3 from "./web3";
import data from "./PackingData";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

function Packing(props) {
  var [id, setId] = useState();
  var [idD, setIdD] = useState();
  var [milk, setMilk] = useState();
  var [quantity, setQuantity] = useState();
  var [noOfPackets, setNoOfPackets] = useState();
  var [message, setMessage] = useState();
  var [pMessage, setPMessage] = useState();
  var [dMessage, setDMessage] = useState();
  var [history, setHistory] = useState("");
  var [packets, setPackets] = useState();

  useEffect(async () => {
    var Tm = await data.methods.totalQuantity().call();
    var Np = await data.methods.noOfPackets().call();
    setMilk(Tm);
    setNoOfPackets(Np);
  });

  const onEnter = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts[0]);
    setMessage("Please Wait...");
    await data.methods.addMilk(quantity).send({ from: accounts[0] });
    setMessage("Milk Added Successfully ✓✓");
  };

  const pack = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setPMessage("Please Wait...");
    await data.methods.pack().send({ from: accounts[0] });
    setPMessage("Packed Successfully ✓✓");
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

  const deliverMilk = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setDMessage("Please Wait...");
    const res = await data.methods
      .delivaryTo(id, packets)
      .call({ from: accounts[0] });
    setDMessage("Delivered Successfully ✓✓");
    // console.log(res);
    props.temp(res);
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

  return (
    <body>
      <p>Total Quantity : {milk}</p>
      <p>No of Packets : {noOfPackets}</p>
      <hr />

      <Form style={{ width: 700, padding: 30 }} onSubmit={onEnter}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Milk Quantity</InputGroup.Text>
          <FormControl
            placeholder="Enter Milk Quantity"
            aria-label="Farmer ID"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </InputGroup>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {/* <form onSubmit={onEnter}>
        <div>
          <label>Enter milk quantity </label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <br />
          <button>ENTER</button>
        </div>
      </form> */}
      <p style={{ color: "green" }}>{message}</p>
      <Button onClick={pack} style={{ marginLeft: "30px" }}>
        Pack
      </Button>
      <p style={{ color: "green" }}>{pMessage}</p>
      <hr />

      <Form
        style={{
          width: 700,
          padding: 30,
        }}
        onSubmit={onEnter}
      >
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Agent ID</InputGroup.Text>
          <FormControl
            placeholder="Enter ID of Agent"
            aria-label="Agent ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Packets</InputGroup.Text>
          <FormControl
            placeholder="No. of Packets"
            aria-label="Packets"
            value={packets}
            onChange={(e) => setPackets(e.target.value)}
          />
        </InputGroup>

        <Button variant="primary" type="submit" >
          Deliver
        </Button>
      </Form>

      {/* <form onSubmit={deliverMilk}>
        <label>Enter ID of the Agent</label>
        <input value={id} onChange={(e) => setId(e.target.value)} />
        <br />
        <label>Enter no. of Packets</label>
        <input value={packets} onChange={(e) => setPackets(e.target.value)} />
        <br />
        <button>DELIVER</button>
      </form>
      <p style={{ color: "green" }}>{dMessage}</p> */}

      <hr />

      <Form style={{ width: 700, padding: 30 }} onSubmit={getHistory}>
        <h4>Get History Of a Agent</h4>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Agent ID</InputGroup.Text>
          <FormControl
            placeholder="Enter Agent ID"
            aria-label="Agent ID"
            value={idD} onChange={(e) => setIdD(e.target.value)}
          />
        </InputGroup>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {/* <form onSubmit={getHistory}>
        <h4>Get history of a Agent</h4>
        <label>Enter ID of the Agent </label>
        <input value={idD} onChange={(e) => setIdD(e.target.value)} />
        <br />
        <button>SUBMIT</button>
      </form> */}
      <div id="found">{history}</div>
      <hr />
      <div id="qrcode"></div>
    </body>
  );
}

export default Packing;

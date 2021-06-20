import React, { useState } from "react";

const ThermalPrinter = () => {
  const [printerIPAddress, setPrinterIPAddress] = useState("");
  const [printerPort, setPrinterPort] = useState("");
  const [textToPrint, setTextToPrint] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("");

  const connect = () => {
    setConnectionStatus("Connecting ...");

    if (!printerIPAddress) {
      setConnectionStatus("Type the printer IP address");
      return;
    }
    if (!printerPort) {
      setConnectionStatus("Type the printer port");
      return;
    }

    setConnectionStatus("Connected");
  };

  return (
    <div id="thermalPrinter">
      <input
        id="printerIPAddress"
        placeholder="Printer IP Address"
        value={printerIPAddress}
        onChange={(e) => setPrinterIPAddress(e.currentTarget.value)}
      />
      <input
        id="printerPort"
        placeholder="Printer Port"
        value={printerPort}
        onChange={(e) => setPrinterPort(e.currentTarget.value)}
      />
      <button onClick={() => connect()}>Connect</button>
      <span className="status-label">{connectionStatus}</span>
      <hr />
      <input
        id="textToPrint"
        placeholder="Text to print"
        value={textToPrint}
        onChange={(e) => setTextToPrint(e.currentTarget.value)}
      />
      <button disabled={connectionStatus !== "Connected"}>Print</button>
    </div>
  );
};

export default ThermalPrinter;

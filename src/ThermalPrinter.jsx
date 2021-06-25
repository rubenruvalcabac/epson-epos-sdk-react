import React, { useRef, useState } from "react";

const ThermalPrinter = () => {
  const [printerIPAddress, setPrinterIPAddress] = useState("192.168.0.121");
  const [printerPort, setPrinterPort] = useState("8008");
  const [textToPrint, setTextToPrint] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("");

  const ePosDevice = useRef();
  const printer = useRef();

  const STATUS_CONNECTED = "Connected";

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

    setConnectionStatus("Connecting ...");

    let ePosDev = new window.epson.ePOSDevice();
    ePosDevice.current = ePosDev;

    ePosDev.connect(printerIPAddress, printerPort, (data) => {
      if (data === "OK") {
        ePosDev.createDevice(
          "local_printer",
          ePosDev.DEVICE_TYPE_PRINTER,
          { crypto: true, buffer: false },
          (devobj, retcode) => {
            if (retcode === "OK") {
              printer.current = devobj;
              setConnectionStatus(STATUS_CONNECTED);
            } else {
              throw retcode;
            }
          }
        );
      } else {
        throw data;
      }
    });
  };

  const print = (text) => {
    let prn = printer.current;
    if (!prn) {
      alert("Not connected to printer");
      return;
    }

    prn.addText(text);
    prn.addFeedLine(5);
    prn.addCut(prn.CUT_FEED);

    prn.send();
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
      <button
        disabled={connectionStatus === STATUS_CONNECTED}
        onClick={() => connect()}
      >
        Connect
      </button>
      <span className="status-label">{connectionStatus}</span>
      <hr />
      <textarea
        id="textToPrint"
        rows="3"
        placeholder="Text to print"
        value={textToPrint}
        onChange={(e) => setTextToPrint(e.currentTarget.value)}
      />
      <button
        disabled={connectionStatus !== STATUS_CONNECTED}
        onClick={() => print(textToPrint)}
      >
        Print
      </button>
    </div>
  );
};

export default ThermalPrinter;

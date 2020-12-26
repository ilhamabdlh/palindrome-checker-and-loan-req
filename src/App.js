/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Tabs, Tab, Modal, Toast } from "react-bootstrap";
import logo from "./assets/img/unj-display.png";
import unj from "./assets/img/unj-logos.png";
import "./App.css";

const App = () => {
  const [phrase, setPhrase] = useState("");
  const [modal1, setModal1] = useState(false);
  const [result1, setResult1] = useState(false);

  const [money, setMoney] = useState("");
  const [modal2, setModal2] = useState(false);
  const [showB, setShowB] = useState(false);
  const [showC, setShowC] = useState(false);
  const [fixMoney, setFixMoney] = useState(false);

  const [data, setData] = useState([]);
  const [sisaM, setSisaM] = useState(0);

  const _actionSubmitSoal1 = (evt) => {
    evt.preventDefault();

    
    let lower = phrase.toLowerCase();
    let upper = phrase.toUpperCase();

    let res = "";
    let fixRes = "";

    for (let i = 0; i < lower.length; i++) {
      if (lower[i] !== upper[i] || lower[i].trim() === "") {
        res += phrase[i];
      }
    }
    fixRes = res.split(" ").join("").toLowerCase();
    
    if (fixRes === "") {
      alert("Wrong Input");
    } else {
      setModal1(true);
      let reverseFixString = "";
      for (let k in fixRes) {
        reverseFixString += fixRes[fixRes.length - k - 1];
      }
      
      if (fixRes === reverseFixString) {
        setResult1(true);
        return true;
      } else {
        setResult1(false);
        return false;
      }
    }
  };
  const _actionSubmitSoal2 = (evt) => {
    evt.preventDefault();
    let reg = /^[0-9.,]+$/;
    
    if (money.match(reg)) {                                                                                                                                 
      const moneyOption = [
        100000,
        50000,
        20000,
        10000,
        5000,
        2000,
        1000,
        500,
        200,
        100,
      ];

      const arrayS = money.split(".");
      const arrayS2 = money.split(",");
      var c = "";
      for (var i = 0; i < arrayS.length || i < arrayS2.length; i++) {
        if (arrayS[i] === "00" || arrayS2[i] === "00") {
          c = "Error";
        }
      }

      if (c !== "Error") {
        let removeDot = money.split(".").join("");
        let removeAfterComma = removeDot.split(",")[0];
        let result = [];
        let userMoney = parseInt(removeAfterComma);
        if (userMoney <= 99 || userMoney >= 1000000000) {
          setShowC(true);
        } else {
          setFixMoney(userMoney);
          const lastOption = moneyOption[moneyOption.length - 1];
          while (userMoney >= lastOption) {
           
            moneyOption.some((opt) => {
              if (userMoney >= opt) {
                const modulus = userMoney % opt;
                const divide = Math.floor(userMoney / opt);

                result.push({
                  option: opt,
                  divide: divide,
                });
                userMoney = modulus;
              }
            });
          }
          setData(result);
          setModal2(true);
          if (userMoney > 0) {
            setSisaM(userMoney);
          } else {
            setSisaM(0);
          }
        }
      } else {
        setShowB(true);
      }
    } else {
      setShowB(true);
    }
  };

  const ToastError = () => {
    return (
      <div>
        <Toast
          onClose={() => setShowB(false)}
          show={showB}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#050404",
          }}
        >
          <Toast.Body>Invalid Input</Toast.Body>
        </Toast>
      </div>
    );
  };

  const ToastOver = () => {
    return (
      <div>
        <Toast
          onClose={() => setShowC(false)}
          show={showC}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#050404",
          }}
        >
          <Toast.Body>Error! Please input with range 99 - 1 x 10^9</Toast.Body>
        </Toast>
      </div>
    );
  };
  return (
    <div className="App">
      <div className="App-header">
        <ToastError />
        <ToastOver />
        <img src={logo} className="img-fluid mb-3" alt="logo" />
        <div className="container">
          <Tabs variant="pills" className="col-md-6 col-12 offset-md-3">
            <Tab eventKey="soal1" title="Input Phrase">
              <div className="container text-dark mt-3">
                <div className="row place-center">
                  <div className="col-md-6 col-12 card card-soal">
                    <div className="px-5 pt-3 pb-3">
                      <div className="col-md-12 text-center">
                        <h2 className="font-bold">Check Palindrome</h2>
                      </div>
                      <form onSubmit={_actionSubmitSoal1}>
                        <div className="form-group">
                          <label>Input your Phrase</label>
                          <input
                            id="input1"
                            type="text"
                            onChange={(e) => setPhrase(e.target.value)}
                            value={phrase}
                            className="form-control"
                            placeholder=""
                            required
                          />
                        </div>
                        <div className="form-group">
                          <button
                            className="btn btn-block btn-warning"
                            type="submit"
                          >
                            <i className="fa fa-sign-in" /> SUBMIT
                          </button>
                        </div>
                      </form>
                      <div className="text-right">
                        <button
                          className="btn btn-danger"
                          onClick={() => setPhrase("")}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                  <Modal show={modal1} centered onHide={() => setModal1(false)}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <div className="col-md-12 text-center">
                        <img
                          src={unj}
                          className="img-fluid mb-3"
                          alt="unj"
                          width="250"
                        />
                        {result1 ? (
                          <h2 className="font-medium text-success">
                            This word is a Palindrome
                          </h2>
                        ) : (
                          <h2 className="font-medium text-danger">
                            This word is not a Palindrome
                          </h2>
                        )}
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </Tab>
            <Tab eventKey="soal2" title="Input Loan">
              <div className="container text-dark mt-3">
                <div className="row place-center">
                  <div className="col-md-6 col-12 card card-soal">
                    <div className="px-5 pt-3 pb-3">
                      <div className="col-md-12 text-center">
                        <h2 className="font-bold">
                          Count the Fractions of Money
                        </h2>
                      </div>
                      <form onSubmit={_actionSubmitSoal2}>
                        <div className="form-group">
                          <label>Input your money loan</label>
                          <input
                            id="email"
                            type="text"
                            onChange={(e) => setMoney(e.target.value)}
                            value={money}
                            className="form-control"
                            placeholder=""
                            required
                          />
                        </div>
                        <div className="form-group">
                          <button
                            className="btn btn-block btn-warning"
                            type="submit"
                          >
                            <i className="fa fa-sign-in" /> SUBMIT
                          </button>
                        </div>
                      </form>
                      <div className="text-right">
                        <button
                          className="btn btn-danger"
                          onClick={() => setMoney("")}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                  <Modal show={modal2} centered onHide={() => setModal2(false)}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <div className="col-md-12 text-center">
                        <img
                          src={unj}
                          className="img-fluid mb-3"
                          alt="unj"
                          width="250"
                        />
                        <div className="text-right font-medium">
                          Your Money: {fixMoney}
                        </div>
                        <div className="table-responsive">
                          <table className="table table-striped font-medium">
                            <thead>
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nominal Pinjaman</th>
                                <th scope="col">Lama Pinjaman</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.option}</td>
                                    <td>{item.divide}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div className="text-right font-medium">
                          The rest of the money: {sisaM}
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default App;

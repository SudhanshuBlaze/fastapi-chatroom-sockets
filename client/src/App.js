import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [clientId, setClienId] = useState(
    Math.floor(new Date().getTime() / 1000)
  );

  const [chatHistory, setChatHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [websckt, setWebsckt] = useState();

  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const url = "ws://0.0.0.0:8000/ws/" + clientId;
    const ws = new WebSocket(url);

    ws.onopen = event => {
      ws.send("Connect");
    };

    // recieve message every start page
    ws.onmessage = e => {
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    };

    setWebsckt(ws);
    //clean up function when we close page
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    websckt.send(message);
    // recieve message every send message
    websckt.onmessage = e => {
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);
    };
    setMessage([]);
  };

  return (
    <div className="container">
      <h1>Chat</h1>
      <h2>Your client id: {clientId} </h2>
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => {
            if (value.clientId === clientId) {
              return (
                <div key={index} className="my-message-container">
                  <div className="my-message">
                    <p className="client">client id : {clientId}</p>
                    <p className="message">{value.message}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="client">client id : {clientId}</p>
                    <p className="message">{value.message}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="input-chat-container">
          <input
            className="input-chat"
            type="text"
            placeholder="Chat message ..."
            onChange={e => setMessage(e.target.value)}
            value={message}
          ></input>
          <button className="submit-chat" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

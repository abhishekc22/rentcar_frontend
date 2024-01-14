import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from "../Api/Axiosinstance";
import { Link } from 'react-router-dom'; 

function Chating() {
  const { buyername, user } = useSelector((state) => state.useReducer);
  const buyer_id = user;
  console.log(buyername, user, "------*2525-----");
  const location = useLocation();
  const { state } = location;
  const { partnerId, partnername } = state || {};
  console.log(partnerId, partnername, "------------");

  const [clientstate, setClientState] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = useRef();

  const WsUrl = "ws://localhost:8000";

  const setUpChat = () => {
    if (clientstate) {
      clientstate.close();
    }
    if (buyer_id !== null && partnerId !== null) {
      axios
        .get(`/chat/user-previous-chats/${buyer_id}/${partnerId}`)
        .then((response) => {
          if (response.status == 200) {
            console.log(response.data, "meeeeeeeeeeeeeeeeeeeeeeessssss");
            setMessages(response.data);
          }
        });

      const client = new W3CWebSocket(
        `${WsUrl}/ws/chat/${buyer_id}/?${partnerId}`
      );
      console.log("jfdkjkdj");
      setClientState(client);
      client.onopen = () => {
        console.log("WebSocket Client Connected");
      };

      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        const currentDate = new Date();
        const isoString = currentDate.toISOString();
        if (dataFromServer) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              message: dataFromServer.message,
              sender_username: dataFromServer.senderUsername,
              send_at: isoString,
            },
          ]);
        }
      };

      client.onclose = () => {
        console.log("Websocket disconnected");
      };

      return () => {
        client.close();
      };
    }
  };

  useEffect(() => {
    setUpChat();
  }, []);

  const onButtonClicked = () => {
    if (messageRef.current.value.trim() == "") {
      return;
    }
    clientstate.send(
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: buyername,
        receiverUsername: partnername,
      })
    );
    messageRef.current.value = "";
  };

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex flex-row items-center justify-between h-12 w-full">
                <Link to="/buyer/buyerchat">
                  <img
                    src="/src/assets/images/back.jpg"
                    alt="Back"
                    className="w-26 h-20"
                  />
                </Link>

                <div className="font-bold text-2xl">CAR WAY</div>
              </div>
            </div>
            {/* ... (rest of the code) */}
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl border-black bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`col-span-12 ${
                          message.sender_username === buyername
                            ? "col-start-6 col-end-13 text-right"
                            : "col-start-1 col-end-8 text-left"
                        }`}
                      >
                        <div className="inline-block p-2 bg-gray-300 rounded-xl">
                          {message.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-black w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-800 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* ... (path data) */}
                    </svg>
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-black pl-4 h-10"
                      ref={messageRef}
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* ... (path data) */}
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    onClick={() => {
                      onButtonClicked();
                    }}
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* ... (path data) */}
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chating;

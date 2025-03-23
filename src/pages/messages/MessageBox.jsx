import React, { useEffect, useState, useRef } from "react";
import { Avatar, Input, Spin } from "antd";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TopberMessage from "./TopberMessage";
import SendSound from "../../assets/files/notify.mp3";
import socket from "../../socket";
import { API } from "../../api/api";
const { Search } = Input;

function MessageBox({ vendorID }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const senderId = params.get("sender");
  const vendorId = "v" + vendorID;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [profilePic, setProfilePic] = useState("");
  const [vehicles, setVehicles] = useState([]);

  const messagesEndRef = useRef(null);

  // Connect user to socket server
  useEffect(() => {
    socket.emit("userConnected", vendorId); // Notify server of user connection
  }, [vendorId]);

  useEffect(() => {
    axios
      .get(
        `https://api.garirhat.com/api/v1/message/?sender_id=${vendorId}&receiver_id=${senderId}`
      )
      .then((response) => setMessages(response.data.data));

    socket.on("receiveMessage", async (message) => {
      if (message.sender_id === senderId || message.receiver_id === senderId) {
        setMessages((prev) => [...prev, message]);
        scrollToBottom();

        try {
          const sendReadData = {
            sender_id: senderId,
            receiver_id: vendorId,
          };

          await API.put("/message/read-message", sendReadData);
        } catch (error) {
          console.error(error);
        }
      }

      if (message.sender_id !== vendorId) {
        const audio = new Audio(SendSound);
        audio
          .play()
          .catch((error) => console.error("Audio play failed:", error));
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [vendorId, senderId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
  };

  const onSend = (value) => {
    if (value.trim()) {
      const messageData = {
        sender_id: vendorId,
        receiver_id: senderId,
        message: value,
        vehicle_id: vehicles[0]?.id,
      };

      socket.emit("sendMessage", messageData);
      setNewMessage("");
      scrollToBottom();
    }
  };

  return (
    <div className="h-[75vh] flex flex-col">
      {senderId === null ? (
        <div className="flex justify-center items-center h-full text-gray-500">
          Please select a user
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <TopberMessage
            senderId={senderId}
            vendorId={vendorId}
            setProfilePic={setProfilePic}
            setVehicles={setVehicles}
          />
          <div
            className="flex-1 overflow-y-auto p-4 bg-gray-100"
            style={{ maxHeight: "63vh" }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end mb-3 ${
                  msg.sender_id === vendorId ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender_id !== vendorId && (
                  <Avatar src={profilePic} className="mr-2" />
                )}
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    msg.sender_id === vendorId
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none shadow"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t py-2 bg-white">
            <Search
              placeholder="Say something..."
              allowClear
              enterButton="Send"
              size="large"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onSearch={onSend}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageBox;

import { useState } from "react";
import { Input, Button } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { text: "Hey Bob, how's it going?", sender: "Alice" },
    {
      text: "Hi Alice! I'm good, just finished a great book. How about you?",
      sender: "Bob",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "Bob" }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col w-full mx-auto bg-gray-100 shadow-lg">
      <header className="bg-blue-700 p-[18px] text-white border-b">
        <h1 className="text-xl font-semibold">Alice</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "Bob" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "Alice" && (
              <div className="w-9 h-9 rounded-full bg-pink-400 text-white flex items-center justify-center mr-2">
                <UserOutlined />
              </div>
            )}
            <div
              className={`max-w-80 p-3 rounded-lg text-white ${
                msg.sender === "Bob"
                  ? "bg-indigo-500"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
            </div>
            {msg.sender === "Bob" && (
              <div className="w-9 h-9 rounded-full bg-blue-400 text-white flex items-center justify-center ml-2">
                <UserOutlined />
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="bg-white border-t p-4 flex items-center">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mr-2"
          onPressEnter={sendMessage}
        />
        <Button type="primary" icon={<SendOutlined />} onClick={sendMessage} />
      </footer>
    </div>
  );
};

export default ChatWindow;

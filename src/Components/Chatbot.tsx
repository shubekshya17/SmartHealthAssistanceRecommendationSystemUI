import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

export default function ChatBot() {
  const [userChat, setUserChat] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [userInput, setUserInput] = useState<string>("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  // initial message from bot
  useEffect(() => {
    setUserChat([
      { sender: "bot", text: "Hello! How can I assist you today?" },
    ]);
  }, []);

  // scroll to bottom when new message arrives
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [userChat]);

  const handleSend = () => {
    if (!userInput.trim()) return;
    const newMessage = { sender: "user", text: userInput };
    setUserChat((prev) => [...prev, newMessage]);
    callHealthAPI(userInput);
    setUserInput("");
  };

  const callHealthAPI = async (input: string) => {
    const healthAPIURL = "http://127.0.0.1:5000/chat";
    try {
      const response = await axios.post(healthAPIURL, {
        message: input,
        user_id: "user1",
      });
      const apiResponse = response.data.response;
      setUserChat((prev) => [...prev, { sender: "bot", text: apiResponse }]);
    } catch (error) {
      console.error("API error:", error);
      setUserChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I am having trouble connecting to the server. Please try again later.",
        },
      ]);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-3 max-h-[70vh] w-80 flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-2">
        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white mr-2">
          🤖
        </div>
        <span className="font-semibold text-gray-800">ChatBot</span>
      </div>

      {/* Chat bubble (scrollable) */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto mb-2 flex flex-col space-y-2"
      >
        {userChat.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-2xl max-w-[75%] ${
              msg.sender === "user"
                ? "bg-blue-400 text-white self-end"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex">
        <input
          type="text"
          placeholder="Type..."
          style={{ border: "2px solid #D0EBFF" }}
          className="flex-1 rounded-l-xl p-1 text-sm outline-none"
          onChange={onInputChange}
          value={userInput}
        />
        <button
          className="bg-blue-400 text-white px-3 rounded-r-xl text-sm"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

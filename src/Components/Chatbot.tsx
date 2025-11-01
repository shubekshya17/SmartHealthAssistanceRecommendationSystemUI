import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";




export default function ChatBot(){
  const [userChat, setUserChat] = useState<string[]>([]);

  const [userInput, setUserInput] = useState<string>("");

  //initial message from bot
  useEffect(()=>{
    setUserChat(["Hello! How can I assist you today? ",]);
  }, [])


  //handle send button clicks
  const handleSend = () => {
    callHealthAPI(userInput);

    if (userInput !== " ") {
      console.log("User input:", userInput);
      return
    }
    // Logic to handle sending message
    userChat.push(userInput);
    setUserChat([...userChat]);
    

  }

  //request the api for the new request
  const callHealthAPI = async (input: string) => {
    const healthAPIURL = "http://127.0.0.1:5000/chat"
    let apiResponse = "";
    try {
      const response = await axios.post(healthAPIURL, { 
        "message": input,
        "user_id": "user1"
       });
      console.log("API response:", response.data);
      console.log("Response received:", response.data.response);
      apiResponse = response.data.response;

      //empty the input box
      const emptyInput = "";
      setUserInput(emptyInput);
    }catch(error){
      console.error("API error:", error);
      apiResponse = "Sorry, I am having trouble connecting to the server. Please try again later.";
    }

    userChat.push(apiResponse);
    setUserChat([...userChat]);
  }

  //handle input change for the input box
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e);
    if (!e.target.value) return;
    setUserInput(e.target.value);
  }



  //use state



    return (
      <>
       {/* Chatbot */}
        <div className="fixed bottom-4 right-4 w-70 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-3">
          {/* Header */}
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white mr-2">
              🤖
            </div>
            <span className="font-semibold text-gray-800">ChatBot</span>
          </div>

          {/* Chat bubble */}
          <div className="mb-2 flex flex-col">

          {userChat.map((msg)=>{
            return <div className="bg-blue-100 p-5 rounded-3xl mb-2 text-black-200">{msg}</div>

          })}
          </div>

          {/* Input */}
          <div className="flex">
            <input
              type="text"
              placeholder="Type..."
               style={{border: "2px solid #D0EBFF"}}
              className="flex-1 border rounded-l-xl p-1 text-sm"
              onChange={onInputChange}
              value={userInput}
            />
            <button className=" bg-blue-400 text-white px-3 rounded-r-xl text-sm" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </>  
    )
}
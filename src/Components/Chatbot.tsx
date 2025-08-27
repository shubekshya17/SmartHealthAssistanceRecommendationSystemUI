export default function ChatBot(){
    return (
      <>
       {/* Chatbot */}
        <div className="fixed bottom-4 right-4 w-70 h-50 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-3">
          {/* Header */}
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white mr-2">
              🤖
            </div>
            <span className="font-semibold text-gray-800">ChatBot</span>
          </div>

          {/* Chat bubble */}
          <div className="bg-blue-100 p-5 rounded-3xl mb-2 text-black-200">Hello! Query Here 👇</div>

          {/* Input */}
          <div className="flex">
            <input
              type="text"
              placeholder="Type..."
               style={{border: "2px solid #D0EBFF"}}
              className="flex-1 border rounded-l-xl p-1 text-sm"
            />
            <button className=" bg-blue-400 text-white px-3 rounded-r-xl text-sm">
              Send
            </button>
          </div>
        </div>
      </>  
    )
}
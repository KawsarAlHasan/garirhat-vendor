
const ChatsSidebar = () => {
    const contacts = [
        { name: "Alice", message: "Hoorayy!!", color: "ffa8e4" },
        { name: "Martin", message: "That pizza place was amazing!", color: "ad922e" },
        { name: "Charlie", message: "Hey, any movie recommendations?", color: "2e83ad" },
        { name: "David", message: "I just finished reading a great book!", color: "c2ebff" },
        { name: "Ella", message: "What's the plan for this weekend?", color: "e7c2ff" },
      ];
    
      return (
        <div className="w-1/4 bg-white border-r border-gray-300">
          <header className="p-4 border-b border-gray-300 bg-indigo-600 text-white flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Chat Web</h1>
          </header>
          <div className="overflow-y-auto h-screen p-3 pb-20">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                  <img
                    src={`https://placehold.co/200x/${contact.color}/ffffff.svg?text=\u0295•\u032Cᴥ•\u032C\u0294&font=Lato`}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{contact.name}</h2>
                  <p className="text-gray-600">{contact.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

export default ChatsSidebar;

  
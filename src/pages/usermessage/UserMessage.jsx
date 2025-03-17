import ChatsSidebar from "./ChatsSidebar";
import ChatWindrow from "./ChatWindrow";

const UserMessage = () => {
    return (
        <div className="flex h-screen overflow-hidden">
        <ChatsSidebar />
        <ChatWindrow />
      </div>
    );
};

export default UserMessage;
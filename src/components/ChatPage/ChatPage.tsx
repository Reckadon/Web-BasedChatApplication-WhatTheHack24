import "./ChatPage.css";
import { AppUser } from "../../types/AppUser";

const ChatPage = ({ user }: { user: AppUser }) => {
	return <div className="chat-container">Authenticated! Welcome {user.username}</div>;
};

export default ChatPage;

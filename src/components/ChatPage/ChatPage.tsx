import "./ChatPage.css";
import { AppUser } from "../../types/AppUser";
import SideBar from "../SideBar/SideBar";

const ChatPage = ({ user }: { user: AppUser }) => {
	return (
		<div className="chat-container">
			<SideBar user={user} />
			<main></main>
		</div>
	);
};

export default ChatPage;

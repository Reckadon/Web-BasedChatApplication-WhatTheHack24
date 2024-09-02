import "./ChatPage.css";
import { AppUser } from "../../types/AppUser";
import SideBar from "../SideBar/SideBar";
import { Chat } from "../../types/ChatList";
import { useState } from "react";
import { getChatData } from "../../utils/firestoreUtils";

const ChatPage = ({ user }: { user: AppUser }) => {
	const [currentChat, setCurrentChat] = useState<Chat | null>(null);

	const handleChatUserUpdate = async (chat: Chat) => {
		// Update chat user here
		chat = { ...chat, messages: (await getChatData(chat.doc_id)).messages };
		setCurrentChat(chat);
	};

	const getChatParticipant = () => {
		const withOutSelf = currentChat!.users.filter(u => u !== user.username); // exclude the current user
		const nameSlices = withOutSelf.join(" ").split(" ");
		return (
			<>
				<h3>{nameSlices.slice(0, -1).join(" ")}</h3> <span>{nameSlices.at(-1)}</span>
			</>
		);
	};

	return (
		<div className="chat-container">
			<SideBar user={user} onChangeChat={handleChatUserUpdate} />
			<main>
				{currentChat ? (
					<nav>{getChatParticipant()}</nav>
				) : (
					<div className="no-chat">select a chat..</div>
				)}
			</main>
		</div>
	);
};

export default ChatPage;

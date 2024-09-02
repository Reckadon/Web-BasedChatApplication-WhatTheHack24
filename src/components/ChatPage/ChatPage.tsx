import "./ChatPage.css";
import { AppUser } from "../../types/AppUser";
import SideBar from "../SideBar/SideBar";
import { Chat } from "../../types/Chat";
import { useRef, useState, useEffect } from "react";
import ChatInput from "../ChatInput";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "../../main";

const ChatPage = ({ user }: { user: AppUser }) => {
	const [currentChat, setCurrentChat] = useState<Chat | null>(null);
	const [unsub, setUnsub] = useState<Unsubscribe | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChatUserUpdate = async (chat: Chat) => {
		// Update chat user here
		if (unsub) unsub(); //first unsubscribe the previous listener if it exists
		setUnsub(() =>
			onSnapshot(doc(db, "chats", chat.doc_id), doc => {
				const chatMsgsData = doc.data()!.messages;
				chat = { ...chat, messages: chatMsgsData };
				setCurrentChat(chat);
			})
		);
	};

	useEffect(() => {
		if (currentChat) inputRef.current?.focus(); // for autofocusing on the input field of chat section
	}, [currentChat]);

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
					<>
						<nav>{getChatParticipant()}</nav>
						<section className="messages">
							{currentChat.messages.map((msg, i) => (
								<span key={i} className={msg.sender === user.username ? "own" : "their"}>
									{msg.content}
								</span>
							))}
						</section>
						<div className="typing">
							<ChatInput
								chatID={currentChat.doc_id}
								senderName={user.username}
								inputRef={inputRef}
							/>
						</div>
					</>
				) : (
					<div className="no-chat">select a chat..</div>
				)}
			</main>
		</div>
	);
};

export default ChatPage;

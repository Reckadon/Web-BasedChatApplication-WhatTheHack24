import { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../main";
import { ChatMessage } from "../types/ChatMessage";

const ChatInput = ({
	chatID,
	senderName,
	inputRef,
}: {
	chatID: string;
	senderName: string;
	inputRef: React.MutableRefObject<HTMLInputElement | null>;
}) => {
	const [message, setMessage] = useState("");

	const handleSendMessage = async () => {
		// send the message object to firestore
		const msgObject: ChatMessage = { sender: senderName, content: message, time: Date.now() };

		const chatRef = doc(db, "chats", chatID);
		await updateDoc(chatRef, {
			messages: arrayUnion(msgObject),
		});
		setMessage("");
	};

	return (
		<input
			ref={inputRef}
			placeholder="send a message"
			value={message}
			onChange={e => setMessage(e.target.value)}
			onKeyDown={e => {
				if (e.key === "Enter") handleSendMessage();
			}}
		></input>
	);
};

export default ChatInput;

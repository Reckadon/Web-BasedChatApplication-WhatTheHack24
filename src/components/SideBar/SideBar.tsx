import { useEffect, useState } from "react";
import { AppUser } from "../../types/AppUser";
import "./SideBar.css";
import { findByUsername, getChatsList, startChatWith } from "../../utils/firestoreUtils";
import { Chat } from "../../types/Chat";

const SideBar = ({ user, onChangeChat }: { user: AppUser; onChangeChat: (chat: Chat) => void }) => {
	const [search, setSearch] = useState<string>("");
	const [searchPlaceholder, setSearchPlaceholder] = useState("search for a user");
	const [chats, setChats] = useState<Chat[]>();

	useEffect(() => {
		getChatsList(user.doc_id).then(data => {
			setChats(data);
		});
	}, []);

	const handleUserSearch = async () => {
		if (search == "") {
			alert("empty search field!");
			return;
		}
		setSearch("");
		setSearchPlaceholder("checking user");
		const foundUser = await findByUsername(search);
		if (foundUser) {
			setSearchPlaceholder("making chat room");
			await startChatWith(user, foundUser);
			setSearchPlaceholder("chat created");
			setTimeout(() => setSearchPlaceholder("search for a user"), 2000);
		} else {
			setSearchPlaceholder("user not found");
			setTimeout(() => setSearchPlaceholder("search for a user"), 2000);
		}
	};

	return (
		<div className="sidebar">
			<div className="search-or-make">
				<em>DevChat</em>
				<input
					value={search}
					placeholder={searchPlaceholder}
					onChange={e => setSearch(e.target.value)}
					onKeyDown={e => {
						if (e.key === "Enter") handleUserSearch();
					}}
				></input>
			</div>
			<div className="chats-list">
				{chats?.map((chat, i) => {
					const withOutSelf = chat.users.filter(u => u !== user.username); // exclude the current user
					// const isDM = withOutSelf.length === 1; for checking if DM or group chat
					return (
						<div key={i} className="chat-item" onClick={() => onChangeChat(chat)}>
							{withOutSelf.map((user, index) => (
								<span key={index}>{user.split(" ").slice(0, 2).join(" ")} </span> // show first 2 words of username string
							))}
						</div>
					);
				})}
			</div>
			<div className="profile">
				<span onClick={() => navigator.clipboard.writeText(user.username)}>{user.username}</span>
			</div>
		</div>
	);
};

export default SideBar;

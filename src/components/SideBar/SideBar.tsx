import { AppUser } from "../../types/AppUser";
import "./SideBar.css";

const SideBar = ({ user }: { user: AppUser }) => {
	return (
		<div className="sidebar">
			<div className="search-or-make">
				<em>DevChat</em>
				<input placeholder="search for a user"></input>
			</div>
			<div className="chats-list"></div>
			<div className="profile">
				<span onClick={() => navigator.clipboard.writeText(user.username)}>{user.username}</span>
			</div>
		</div>
	);
};

export default SideBar;

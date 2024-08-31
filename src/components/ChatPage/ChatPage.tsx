import { User } from "firebase/auth";

const ChatPage = ({ user }: { user: User }) => {
	return <>Authenticated! Welcome {user.displayName}</>;
};

export default ChatPage;

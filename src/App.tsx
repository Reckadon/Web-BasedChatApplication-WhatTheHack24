import { useState } from "react";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage/ChatPage";
import "./App.css";
import { User } from "firebase/auth";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);

	const handleLogin = (user: User) => {
		setIsLoggedIn(true);
		setUser(user);
	};

	return <>{isLoggedIn ? <ChatPage user={user} /> : <Login onLogin={handleLogin} />}</>;
}

export default App;

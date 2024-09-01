import { useEffect, useState } from "react";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage/ChatPage";
import "./App.css";
import { User } from "firebase/auth";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (user) setIsLoggedIn(true);
		else setIsLoggedIn(false);
	}, [user]);

	const handleLogin = (user: User) => {
		setUser(user);
	};

	return <>{isLoggedIn ? <ChatPage user={user as User} /> : <Login onLogin={handleLogin} />}</>;
}

export default App;

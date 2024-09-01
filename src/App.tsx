import { useEffect, useState } from "react";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage/ChatPage";
import "./App.css";
import { AppUser } from "./types/AppUser";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [user, setUser] = useState<AppUser | null>(null);

	useEffect(() => {
		if (user) setIsLoggedIn(true);
		else setIsLoggedIn(false);
	}, [user]);

	const handleLogin = (user: AppUser) => {
		setUser(user);
	};

	return <>{isLoggedIn ? <ChatPage user={user as AppUser} /> : <Login onLogin={handleLogin} />}</>;
}

export default App;

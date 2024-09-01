import { useEffect, useState } from "react";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage/ChatPage";
import "./App.css";
import { AppUser } from "./types/AppUser";
import { getAuth } from "firebase/auth";
import { findByEmail } from "./utils/firestoreUtils";
import Loading from "./components/Loading";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
	const [user, setUser] = useState<AppUser | null>(null);

	useEffect(() => {
		const auth = getAuth();
		auth.onAuthStateChanged(async u => {
			if (u) {
				setUser((await findByEmail(u)) as AppUser);
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
				setUser(null);
			}
		});
	}, []);

	useEffect(() => {
		if (user) setIsLoggedIn(true);
		else setIsLoggedIn(false);
	}, [user]);

	const handleLogin = (user: AppUser) => {
		setUser(user);
	};

	return (
		<>
			{isLoggedIn == undefined ? (
				<Loading />
			) : isLoggedIn ? (
				<ChatPage user={user as AppUser} />
			) : (
				<Login onLogin={handleLogin} />
			)}
		</>
	);
}

export default App;

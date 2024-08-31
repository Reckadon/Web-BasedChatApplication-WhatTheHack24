import { useState } from "react";
import { socket } from "./socket";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage/ChatPage";
import "./App.css";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	console.log(isLoggedIn);
	socket.on("connect", () => {
		console.log(socket.id);
	});
	return <>{isLoggedIn ? <ChatPage /> : <Login />}</>;
}

export default App;

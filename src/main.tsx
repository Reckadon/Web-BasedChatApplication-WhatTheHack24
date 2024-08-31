import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCwPizC1XAL5QjKWSiIM-BbLd2Cgrf58vw",
	authDomain: "webchatapp-devchat.firebaseapp.com",
	projectId: "webchatapp-devchat",
	storageBucket: "webchatapp-devchat.appspot.com",
	messagingSenderId: "120263248466",
	appId: "1:120263248466:web:f5c653d5ae155da20a6d8b",
};

// Initialize Firebase
initializeApp(firebaseConfig);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);

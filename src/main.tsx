import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { config } from "./utils/secretConfig.json";

// Your web app's Firebase configuration
const firebaseConfig = config;

// Initialize Firebase
initializeApp(firebaseConfig);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);

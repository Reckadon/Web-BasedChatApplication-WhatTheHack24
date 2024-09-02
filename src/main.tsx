import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { config } from "./utils/secretConfig.json"; //secret file, not public - ask author for the same

// Initialize Firebase
const app = initializeApp(config);
export const db = getFirestore(app);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);

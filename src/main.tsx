import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
import { config } from "./utils/secretConfig.json";

// Initialize Firebase
const app = initializeApp(config);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);

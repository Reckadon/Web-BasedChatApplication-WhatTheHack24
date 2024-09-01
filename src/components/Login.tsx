import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../main";
import { findByEmail } from "../utils/firestoreUtils";
import { nanoid } from "nanoid";
import { AppUser } from "../types/AppUser";

const provider = new GoogleAuthProvider();

const Login = ({ onLogin }: { onLogin: (user: AppUser) => void }) => {
	const handleLogin = () => {
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then(async result => {
				const user = result.user;
				const existingUser = await findByEmail(user);

				if (existingUser) {
					onLogin(existingUser);
				} else {
					const uid = nanoid(3);
					const username = user.displayName + " #" + uid;
					const userDoc = await addDoc(collection(db, "users"), {
						email: user.email,
						username: username,
						chats: [],
					});
					onLogin({ ...user, username: username, doc_id: userDoc.id });
				}
			})
			.catch(error => {
				console.error(error);
				// Handle Errors here.
				// const errorCode = error.code;
				// const errorMessage = error.message;
				// // The email of the user's account used.
				// const email = error.customData.email;
				// // The AuthCredential type that was used.
				// const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};
	return (
		<div className="login-container">
			<div className="login-card">
				<h2>
					welcome to <em>DevChat</em>
				</h2>
				<h3>
					<button onClick={handleLogin}>login</button> using google.
				</h3>
			</div>
		</div>
	);
};

export default Login;

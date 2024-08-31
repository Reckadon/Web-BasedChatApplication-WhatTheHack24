import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
const provider = new GoogleAuthProvider();

const Login = ({ onLogin }: { onLogin: (user: User) => void }) => {
	const handleLogin = () => {
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then(result => {
				const user = result.user;
				onLogin(user);
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

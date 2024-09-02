import { User } from "firebase/auth";
import {
	addDoc,
	collection,
	getDocs,
	doc,
	updateDoc,
	arrayUnion,
	getDoc,
	getDocFromServer,
} from "firebase/firestore";
import { db } from "../main";
import { AppUser } from "../types/AppUser";
import { Chat } from "../types/Chat";

export const findByEmail = async (user: User): Promise<AppUser | false> => {
	const querySnapshot = await getDocs(collection(db, "users"));
	for (const doc of querySnapshot.docs) {
		if (doc.data().email === user.email) {
			return { ...user, username: doc.data().username, doc_id: doc.id };
		}
	}
	return false;
};

export const findByUsername = async (username: string): Promise<AppUser | false> => {
	const querySnapshot = await getDocs(collection(db, "users"));
	for (const doc of querySnapshot.docs) {
		if (doc.data().username === username) {
			return { ...doc.data(), doc_id: doc.id } as AppUser;
		}
	}
	return false;
};

export const getChatsList = async (userDocID: string): Promise<Chat[]> => {
	const userDoc = await getDocFromServer(doc(db, "users", userDocID));
	const chats = userDoc.data()?.chats;
	const chatsList = await Promise.all(
		chats.map(async (chatID: string) => {
			const chatDoc = await getDoc(doc(db, "chats", chatID));
			const chatUsers = chatDoc.data()!.users;
			const chatUsernames = await Promise.all(
				chatUsers.map(
					async (userDocID: string) => (await getDoc(doc(db, "users", userDocID))).data()!.username
				)
			);
			return { users: chatUsernames, doc_id: chatID };
		})
	);
	return chatsList;
};

export const startChatWith = async (user1: AppUser, user2: AppUser) => {
	// rn for only 2 users, i.e. a DM
	const chatRef = collection(db, "chats");
	console.log(user1.doc_id, user2.doc_id);
	const chatDoc = await addDoc(chatRef, {
		users: [user1.doc_id, user2.doc_id],
		messages: [],
	});
	const querySnapshot = await getDocs(collection(db, "users"));
	for (const user of querySnapshot.docs) {
		if (user.id === user1.doc_id || user.id === user2.doc_id) {
			const userRef = doc(db, "users", user.id);
			await updateDoc(userRef, {
				chats: arrayUnion(chatDoc.id),
			});
		}
	}
	return chatDoc.id;
};

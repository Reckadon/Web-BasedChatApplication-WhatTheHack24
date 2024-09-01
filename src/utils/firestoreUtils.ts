import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";
import { AppUser } from "../types/AppUser";

export const isExistingUser = async (user: User): Promise<AppUser | false> => {
	const querySnapshot = await getDocs(collection(db, "users"));
	for (const doc of querySnapshot.docs) {
		if (doc.data().email === user.email) {
			return { ...user, username: doc.data().username };
		}
	}
	return false;
};

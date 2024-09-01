import { User } from "firebase/auth";

export interface AppUser extends User {
	username: string;
	doc_id: string;
}

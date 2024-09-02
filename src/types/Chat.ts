import { ChatMessage } from "./ChatMessage";

export interface Chat {
	messages: ChatMessage[];
	users: string[];
	doc_id: string;
}

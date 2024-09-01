import { useEffect, useState } from "react";

const Loading = () => {
	const [displayText, setDisplayText] = useState("");
	const text = "loading..";
	const speed = 300;

	useEffect(() => {
		let timer: NodeJS.Timeout | null = null;
		let index = 0;

		const typeText = () => {
			if (index < text.length) {
				setDisplayText(text.substring(0, index + 1));
				index++;
				timer = setTimeout(typeText, speed);
			}
		};
		typeText();

		return () => {
			clearTimeout(timer as NodeJS.Timeout);
		};
	}, [text, speed]);

	return (
		<div className="loading-container">
			<div className="loading-text">{displayText}</div>
		</div>
	);
};

export default Loading;

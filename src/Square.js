import React from "react";

export default function Square({ value, onclick }) {
	return (
		<button className="sqaure" onClick={onclick}>
			{value}
		</button>
	);
}

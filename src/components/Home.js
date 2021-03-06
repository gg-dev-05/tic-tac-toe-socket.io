import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeid } from "../helper";

export const Home = () => {
	const [code, setCode] = useState("");
	const historyRouter = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (trim(code) === "") return;
		historyRouter.push(`/game/${code}`);
	};

	const joinRandom = () => {
		historyRouter.push(`/game/${makeid(6)}`);
	};

	const playBot = () => {
		historyRouter.push("/bot");
	};
	return (
		<div style={{ textAlign: "center" }}>
			<h1>Tic - Tac - Toe</h1>
			<h4 style={{ marginBottom: "1em" }}>Enter room code</h4>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					value={code}
					placeholder="Enter room code"
					onChange={(e) => setCode(e.target.value)}
				/>
			</form>
			<h2>OR</h2>
			<button onClick={() => joinRandom()}>Join Random</button>
			<h2>OR</h2>
			<button onClick={() => playBot()}>Play Bot</button>
			{/* <h4>{amIX ? "X" : "O"}</h4>
			<h4>{userID}</h4>
			<Board squares={state.matrix} onClick={handleClick} />
			<h3>{winner ? "Winner:" + winner : "Next Player: " + xo}</h3> */}
		</div>
	);
};

function trim(s) {
	return (s || "").replace(/^\s+|\s+$/g, "");
}

import React, { useEffect, useState } from "react";
import { Board } from "./Board";
import { calculateWinner } from "../helper";
import { io } from "socket.io-client";
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

export const Game = () => {
	const [socket, setSocket] = useState(null);
	const historyRoute = useHistory();
	// const [amIX, setAmIX] = useState(true);
	const [state, setState] = useState({
		matrix: Array(9).fill(null),
		xIsNext: true,
	});
	const winner = calculateWinner(state.matrix);
	const { id: gameID } = useParams();

	const xo = state.xIsNext ? "X" : "O";

	// useEffect(() => {
	// 	console.log("Use Effect without any parameters");
	// 	const s = io("http://localhost:5000");
	// 	setSocket(s);

	// 	return () => {
	// 		s.disconnect();
	// 	};
	// }, []);

	// useEffect(() => {
	// 	console.log("Use Effect for get-game");
	// 	if (socket === null) return;
	// 	socket.emit("get-game", gameID);

	// 	socket.on("init", ({ pos }) => {
	// 		// redirect to new game
	// 		if (pos === -1) historyRoute.push(`/game/${uuidV4()}`);
	// 		if (pos === 0) setAmIX(false);
	// 	});
	// }, [socket, gameID, historyRoute]);

	// useEffect(() => {
	// 	if (socket === null) return;
	// 	socket.emit("send-updates", state);
	// }, [socket, state]);

	// useEffect(() => {
	// 	if (socket === null) return;
	// 	const handler = (updates) => {
	// 		console.log(updates);
	// 	};
	// 	socket.on("receive-updates", handler);

	// 	return () => {
	// 		socket.off("receive-updates", handler);
	// 	};
	// }, [socket, state]);

	// useEffect(() => {
	// 	console.log(state);
	// 	if (socket === null) return;
	// 	socket.emit("send-updates", state);
	// }, [socket, state]);

	const handleClick = (i) => {
		// if ((amIX && xo === "X") || (!amIX && xo === "O")) {
		const squares = [...state.matrix];

		if (winner || squares[i]) return;

		squares[i] = xo;
		setState({
			matrix: squares,
			xIsNext: !state.xIsNext,
		});
		// } else {
		// 	return;
		// }
	};

	return (
		<>
			<h1>Tic - Tac - Toe</h1>
			{/* <h4>{amIX ? "X" : "O"}</h4> */}
			<Board squares={state.matrix} onClick={handleClick} />
			<h3>{winner ? "Winner:" + winner : "Next Player: " + xo}</h3>
		</>
	);
};

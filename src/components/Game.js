import React, { useEffect, useState } from "react";
import { Board } from "./Board";
import { calculateWinner } from "../helper";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

export const Game = () => {
	const [socket, setSocket] = useState(null);

	const [state, setState] = useState({
		history: [Array(9).fill(null)],
		stepNumber: 0,
		xIsNext: true,
	});
	const winner = calculateWinner(state.history[state.stepNumber]);
	const { id: gameID } = useParams();

	const xo = state.xIsNext ? "X" : "O";

	useEffect(() => {
		console.log("Use Effect without any parameters");
		const s = io("http://localhost:5000");
		setSocket(s);

		return () => {
			s.disconnect();
		};
	}, []);

	useEffect(() => {
		console.log("Use Effect for get-game");
		if (socket === null) return;
		socket.emit("get-game", gameID);
	}, [socket, gameID]);

	const handleClick = (i) => {
		const historyPoint = state.history.slice(0, state.stepNumber + 1);
		const current = historyPoint[state.stepNumber];
		const squares = [...current];

		if (winner || squares[i]) return;

		squares[i] = xo;
		setState({
			history: [...state.history, squares],
			stepNumber: historyPoint.length,
			xIsNext: !state.xIsNext,
		});
	};

	return (
		<>
			<h1>Tic - Tac - Toe</h1>
			<Board
				squares={state.history[state.stepNumber]}
				onClick={handleClick}
			/>
			<h3>{winner ? "Winner:" + winner : "Next Player: " + xo}</h3>
		</>
	);
};

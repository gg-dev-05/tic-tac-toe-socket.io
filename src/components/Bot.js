import React, { useEffect, useState } from "react";
import { Board } from "./Board";
import { calculateWinner } from "../helper";
import { useParams, useHistory } from "react-router-dom";

export const Bot = () => {
	const [state, setState] = useState({
		matrix: Array(9).fill(null),
		xIsNext: true,
	});
	const [winner, setWinner] = useState(calculateWinner(state.matrix));

	const xo = state.xIsNext ? "X" : "O";

	const handleClick = (i) => {
		const squares = [...state.matrix];

		if (winner || squares[i]) return;

		squares[i] = xo;
		const newObj = {
			matrix: squares,
			xIsNext: !state.xIsNext,
		};
		setState(newObj);
	};

	return (
		<>
			<h1>Tic - Tac - Toe</h1>
			<Board squares={state.matrix} onClick={handleClick} />
			<h3>{winner ? "Winner:" + winner : "Next Player: " + xo}</h3>
		</>
	);
};

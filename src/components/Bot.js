import React, { useEffect, useState } from "react";
import { Board } from "./Board";
import { calculateWinner, randomSquare } from "../helper";

export const Bot = () => {
	const [state, setState] = useState({
		matrix: Array(9).fill(null),
		xIsNext: true,
	});
	const [winner, setWinner] = useState(calculateWinner(state.matrix));

	const xo = state.xIsNext ? "X" : "O";

	useEffect(() => {
		setWinner(calculateWinner(state.matrix));
	}, [state.matrix]);

	const handleClick = (i) => {
		console.log("Press");
		if (state.xIsNext === true) {
			const squares = [...state.matrix];

			if (winner || squares[i]) return;

			squares[i] = xo;
			const newObj = {
				matrix: squares,
				xIsNext: false,
			};
			setState(newObj);
			botsMove(newObj);
			return;
		}
		console.log("Not your turn");
		return;
	};

	const botsMove = (newObj) => {
		console.log("Bot moves");
		const timeout = setTimeout(() => {
			const squares = [...newObj.matrix];

			if (calculateWinner(newObj.matrix)) {
				clearInterval(timeout);
				console.log("Clear");
				return;
			}

			const temp = randomSquare(squares);
			console.log(`Entering at ${temp}`);
			squares[temp] = "O";

			const newObj1 = {
				matrix: squares,
				xIsNext: true,
			};
			setState(newObj1);
		}, [1000]);
	};
	return (
		<>
			<h1>Tic - Tac - Toe</h1>
			<Board squares={state.matrix} onClick={handleClick} />
			<h3>
				{winner === null
					? state.xIsNext
						? "Your Turn"
						: "Wait for Mr. Bot"
					: winner === "X"
					? "You Won"
					: "You Lost"}
			</h3>
		</>
	);
};

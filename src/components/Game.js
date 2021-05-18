import React, { useEffect, useState } from "react";
import { Board } from "./Board";
import { calculateWinner, makeid } from "../helper";
import { io } from "socket.io-client";
import { useParams, useHistory } from "react-router-dom";

export const Game = () => {
	const [socket, setSocket] = useState(null);
	const [userID, setUserID] = useState(null);
	const historyRoute = useHistory();
	const [amIX, setAmIX] = useState(true);
	const [state, setState] = useState({
		matrix: Array(9).fill(null),
		xIsNext: true,
	});
	const [hasOpponentJoined, setHasOpponentJoined] = useState(false);
	const [winner, setWinner] = useState(calculateWinner(state.matrix));
	const { id: gameID } = useParams();

	const xo = state.xIsNext ? "X" : "O";

	useEffect(() => {
		setWinner(calculateWinner(state.matrix));
	}, [state.matrix]);

	/**
	 * This use Effect sets the socket initially
	 */
	useEffect(() => {
		console.log("Use Effect without any parameters");
		const s = io("http://localhost:5000");
		setSocket(s);

		return () => {
			s.disconnect();
		};
	}, []);

	/**
	 * Set the game
	 */
	useEffect(() => {
		console.log("Use Effect for get-game");
		if (socket === null) return;
		socket.emit("get-game", gameID);

		socket.on("opponent-joined", (data) => {
			console.log(data);
			setHasOpponentJoined(true);
		});
		socket.on("init", ({ pos, userID }) => {
			// redirect to new game
			if (pos === -1) {
				historyRoute.push(`/game/${makeid(6)}`);
			}
			if (pos === 1) {
				setAmIX(false);
				setHasOpponentJoined(true);
			}
			setUserID(userID);
		});
	}, [socket, gameID, historyRoute]);

	/**
	 * use effect for receiving updates
	 */
	useEffect(() => {
		if (socket === null) return;
		const handler = (updates) => {
			if (updates.disconnect) {
				alert("Enemy said bye bye");
				amIX ? setWinner("X") : setWinner("O");
				return;
			}
			if (updates.userID !== userID) setState(updates.state);
		};
		socket.on("receive-updates", handler);

		return () => {
			socket.off("receive-updates", handler);
		};
	}, [socket, state, userID, amIX]);

	const handleClick = (i) => {
		if (!hasOpponentJoined) return;
		if ((amIX && xo === "X") || (!amIX && xo === "O")) {
			const squares = [...state.matrix];

			if (winner || squares[i]) return;

			squares[i] = xo;
			const newObj = {
				matrix: squares,
				xIsNext: !state.xIsNext,
			};
			setState(newObj);
			if (socket === null || userID === null) return;
			const obj = {
				state: newObj,
				userID: userID,
			};
			socket.emit("send-updates", obj);
		} else {
			return;
		}
	};

	return (
		<>
			<h1>Tic - Tac - Toe</h1>
			<h4>{amIX ? "X" : "O"}</h4>
			<h4>{userID}</h4>
			<h4>{hasOpponentJoined || "Waiting For Opponent"}</h4>
			<Board squares={state.matrix} onClick={handleClick} />
			<h3>{winner ? "Winner:" + winner : "Next Player: " + xo}</h3>
		</>
	);
};

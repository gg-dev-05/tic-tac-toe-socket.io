const io = require("socket.io")(process.env.PORT || 5000, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	socket.on("get-game", (gameID) => {
		console.log(`New Player on ${gameID}`);
		socket.join(gameID);
		const count = io.sockets.adapter.rooms.get(gameID).size;
		console.log(`Total clients of ${gameID}: ${count}`);
		// socket.emit("load-game", {
		// 	history: [Array(9).fill(null)],
		// 	stepNumber: 0,
		// 	xIsNext: false,
		// });

		// socket.on("send-changes", (data) => {
		// 	socket.broadcast.emit("update-changes", data);
		// });
	});
});

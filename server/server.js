const io = require("socket.io")(process.env.PORT || 5000, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

let games = new Map();
// {'uuid-uuid' : {'X': 'player ID', 'O': 'player ID', matrix: [], xIsNext: []}}

io.on("connection", (socket) => {
	socket.on("get-game", (gameID) => {
		socket.join(gameID);
		const count = io.sockets.adapter.rooms.get(gameID).size;
		console.log(`Total player count in ${gameID}: ${count}`);

		// send pos = -1 i.e room is already full
		if (count > 2) {
			io.to(socket.id).emit("init", { pos: -1, userID: socket.id });
		}
		// send pos = 1 for 'X' and 0 for 'O'
		else {
			io.to(socket.id).emit("init", {
				pos: count % 2,
				userID: socket.id,
			});
			if (count === 0) {
				games.set(gameID, { X: socket.id });
			}
		}

		socket.on("send-updates", (data) => {
			console.log(data);
			socket.broadcast.to(gameID).emit("receive-updates", data);
		});

		socket.on("disconnect", () => {
			console.log(`Bye Bye ${socket.id}`);
		});
	});
});

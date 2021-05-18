require("dotenv").config();
const mongoose = require("mongoose");
const Game = require("./game_model");

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

const io = require("socket.io")(process.env.PORT || 5000, {
	cors: {
		origin: "https://tick-tick-tae-tae-toe-toe.netlify.app",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	socket.on("get-game", async (gameID) => {
		const pos = await addToRoom(socket.id, gameID);
		socket.join(gameID);
		io.to(socket.id).emit("init", {
			pos: pos,
			userID: socket.id,
		});

		if (pos === 1)
			socket.broadcast.to(gameID).emit("opponent-joined", "Joined");
		socket.on("send-updates", (data) => {
			socket.broadcast.to(gameID).emit("receive-updates", data);
		});

		socket.on("disconnect", () => {
			socket.broadcast
				.to(gameID)
				.emit("receive-updates", { disconnect: true });
			RemoveRoom(gameID);
			socket.leave(gameID);
			console.log(`Bye Bye ${socket.id}`);
		});
	});
});

async function RemoveRoom(room) {
	console.log(`Remove ${room} from database`);
	await Game.findOneAndRemove({ gameID: room });
}
async function addToRoom(user, room) {
	const exists = await Game.countDocuments({ gameID: room });

	// If not rooms does not exist => create room
	if (!exists) {
		const newGame = new Game({
			gameID: room,
			players: [user],
		});
		await newGame.save();
		return 0;
	} else {
		const game = await Game.findOne({ gameID: room });
		const total_players = game["players"].length;
		switch (total_players) {
			case 1:
				await Game.findOneAndUpdate(
					{ gameID: room },
					{ $addToSet: { players: user } }
				);
				return 1;
			default:
				return -1;
		}
	}
}

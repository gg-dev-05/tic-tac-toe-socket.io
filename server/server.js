const io = require("socket.io")(process.env.PORT || 5000, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("New Connection");
});

const { createServer } = require("node:http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3002;

const app = require("./src/app");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]

  },
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
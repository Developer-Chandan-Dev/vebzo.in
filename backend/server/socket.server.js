// socket.server.js
const { Server } = require("socket.io");

const { ordersHandler } = require('../socketHandlers/order');

let io;
const userSockets = {}; // Map userId to socket.id

const initSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: [process.env.CLIENT_URL, "http://localhost:5173"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("register", (userId) => {
            userSockets[userId] = socket.id;
            console.log(`User ${userId} registered with socket ${socket.id}`);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            // Optionally: clean userSockets
        });
    });
};

const emitOrderUpdate = (userId, orderData) => {
    if (io && userSockets[userId]) {
        io.to(userSockets[userId]).emit("orderUpdate", orderData);
    }
};

module.exports = initSocketServer;
module.exports.emitOrderUpdate = emitOrderUpdate;

const connectedUsers = new Map();

const ordersHandler = (socket, io) => {
    socket.on("registerOrderTracking", (userId) => {
        connectedUsers.set(userId, socket.id);
        console.log(`📦 Order tracking enabled for: ${userId}`);
    });

    socket.on("disconnect", () => {
        for (const [userId, socketId] of connectedUsers.entries()) {
            if (socketId === socket.id) {
                connectedUsers.delete(userId);
                break;
            }
        }
    });
}

const emitOrderUpdate = (userId, updatedOrder) => {
    console.log(userId, updatedOrder, '20');
    const socketId = connectedUsers.get(userId);
    console.log(socketId, '22');
    // 6778cd664d810f1cb7048668
    if (socketId) {
        getIO().to(socketId).emit("orderUpdate", updatedOrder);
    }
};

module.exports = { ordersHandler, emitOrderUpdate }
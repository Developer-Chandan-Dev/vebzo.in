/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import socket from "../utils/socket";

const SocketContext = createContext();

export const SocketProvider = ({ userId, children }) => {
  useEffect(() => {
    if (userId) {
      socket.emit("register", userId);
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

// utils/socket.js
import { io } from "socket.io-client";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const socket = io(VITE_API_URL); // Replace in production
export default socket;

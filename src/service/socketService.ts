import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:8000"; // Update with your backend URL
let socket: Socket | null = null;

// Define TouchlineData Type (Adjust based on your backend structure)
export interface TouchlineData {
  data: {
    scrip: {
      mkt_seg_id: number;
      scrip_token: string;
    };
    last_traded_price: string;
  };
}

// Function to initialize and connect WebSocket
export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket");
    });

    socket.on("reconnect_attempt", () => {
      console.log("♻️ Attempting to reconnect...");
    });
  }
  return socket;
};

// Function to get socket instance
export const getSocket = (): Socket | null => socket;

// Function to disconnect WebSocket
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
  }
};

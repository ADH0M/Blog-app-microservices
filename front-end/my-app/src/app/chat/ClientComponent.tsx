"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";

interface UserInfo {
  username:string|undefined;
  email:string|undefined;
  userId:string|undefined;
}

export default function ClientComponent({ username, email, userId }:UserInfo) {
  const [isConnected, setIsConnected] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      socket.emit("newUser", userId);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [userId]);

  useEffect(() => {
    
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      className="p-2 min-w-full mx-auto transition-colors duration-300
        bg-main-bg dark:bg-main-dark rounded-b-sm shadow-lg
        text-text-main dark:text-text-dark"
    >
      {/* Header */}
      <h2 className="text-xl font-semibold mb-4 text-center">
        Connection Status
      </h2>

      {/* Socket.IO Status */}
      <div className="flex justify-around gap-2">
        <div
          className="flex items-center gap-3 p-3 rounded-lg 
          bg-primary-bg dark:bg-primary-dark w-full flex-1"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-green-500" : "bg-yellow-500"
            }`}
          ></div>

          <span className="text-sm">
            Socket:{" "}
            <strong>{isConnected ? "Connected" : "Disconnected"}</strong>
          </span>
        </div>

        {/* Network Status */}
        <div
          className="flex items-center gap-3 p-3 rounded-lg w-full flex-1
          bg-secondry-bg dark:bg-secondry-dark"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              isOnline === null
                ? "bg-gray-400"
                : isOnline
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          ></div>
          <span className="text-sm">
            Network:{" "}
            <strong>
              {isOnline === null
                ? "Checking..."
                : isOnline
                ? "Online"
                : "Offline"}
            </strong>
          </span>
        </div>
      </div>

      {/* Visual Indicator Bar */}
      <div className="mt-6 h-1.5 w-full bg-sky-blue dark:bg-last-dark rounded-full overflow-hidden ">
        <div
          className={`h-full transition-all duration-500 ease-in-out ${
            isOnline && isConnected
              ? "bg-green-500"
              : isOnline
              ? "bg-yellow-500"
              : "bg-red-400"
          }`}
          style={{
            width:
              isOnline === null
                ? "30%"
                : isOnline && isConnected
                ? "100%"
                : isOnline
                ? "60%"
                : "20%",
          }}
        ></div>
      </div>
    </div>
  );
}

"use client";
import { SocketClient } from "@/lib/socket-io";
import { useAppDispatch } from "@/redux/store";
import React, { FC, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface SocketIoProviderProps {
  children: React.ReactNode;
}
export type SocketIO = Socket;
const socketClientObj = new SocketClient();
export const socketContext = React.createContext<{
  socket: Socket | undefined;
}>({ socket: undefined });
export const useSocketIoContext = () => React.useContext(socketContext);

const SocketIoProvider: FC<SocketIoProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  useEffect(() => {
    (async () => {
      try {
        const { socket: connectedSocket } = await socketClientObj.connect();
        setSocket(connectedSocket);
      } catch (error) {}
    })();
  }, []);
  return (
    <>
      <socketContext.Provider value={{ socket }}>
        {children}
      </socketContext.Provider>
    </>
  );
};

export default SocketIoProvider;

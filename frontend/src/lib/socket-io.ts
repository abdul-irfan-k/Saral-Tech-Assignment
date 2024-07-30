import { Socket, io } from "socket.io-client";

const serverPort = process.env.SERVER_PORT || 8000;
// const serverUrl = process.env.NODE_ENV === 'production'? process.env.SERVER_URL : `http://localhost:${serverPort}`
const serverUrl = `http://localhost:${serverPort}`;

export class SocketClient {
  socket?: Socket;
  connect(): Promise<{
    socket: Socket;
  }> {
    return new Promise((resolve, reject) => {
      this.socket = io(serverUrl);
      //@ts-ignore
      this.socket?.on("connect", () => resolve({ socket: this.socket }));
      this.socket?.on("connect_error", () => reject());
    });
  }

  emit(event: string, data: any) {
    return new Promise((resolve, reject) => {
      this.socket?.emit(event, data);
      //@ts-ignore
      return resolve();
    });
  }

  on(event: any, callback: () => any) {
    return new Promise((resolve, reject) => {
      this.socket?.on(event, callback);
    });
  }
}

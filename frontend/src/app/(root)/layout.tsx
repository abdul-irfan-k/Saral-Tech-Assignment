import SocketIoProvider from "@/components/provider/socket-io-provider/socket-io-provider";
import UserAuthProvider from "@/components/provider/user-auth-provider";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <SocketIoProvider>
        <UserAuthProvider>{children}</UserAuthProvider>
      </SocketIoProvider>
    </>
  );
}

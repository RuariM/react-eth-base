import type { NextPage } from "next";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;

  return <div>Connected Wallet: {address}</div>;
};

export default Home;

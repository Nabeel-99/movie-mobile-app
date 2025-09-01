import { useEffect, useState } from "react";
import * as Network from "expo-network";

export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const checkConnection = async () => {
      const state = await Network.getNetworkStateAsync();
      setIsConnected(state.isConnected ?? false);
    };
    checkConnection();

    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, []);

  return { isConnected, setIsConnected };
};

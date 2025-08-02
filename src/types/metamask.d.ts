interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: { method: string }) => Promise<string[]>;
    on: (event: string, callback: (accounts: string[]) => void) => void;
    removeListener: (
      event: string,
      callback: (accounts: string[]) => void
    ) => void;
  };
}

interface WalletState {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
}
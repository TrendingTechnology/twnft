import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiClipboardCopy } from "react-icons/hi";
import truncateWalletAddress from "../../utils/truncateWalletAddress";
import { MetamaskLogo, WalletConnectLogo } from "../Icons";
import { EthereumLogo } from "../Icons";

const ThirdWebAuth = (): JSX.Element => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const { address, chainId, connectWallet, balance } = useWeb3();
  const { switchNetwork } = useSwitchNetwork();

  const copyAddressToClipboard = (): void => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard", {
      style: { backgroundColor: "#333333", color: "#ffffff" },
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleOpen}>
      {address ? (
        chainId === 4 ? (
          <button className="relative z-10 px-4 py-2 text-white rounded-lg bg-gradient-to-tr from-pink-700 to-blue-700 before:absolute before:inset-0 before:bg-gradient-to-bl before:from-pink before:opacity-0 before:-z-10 before:transition before:duration-500 before:hover:opacity-100 before:rounded-lg">
            Mint NFT
          </button>
        ) : (
          <button
            onClick={() => switchNetwork(4)}
            className="relative z-10 px-4 py-2 text-white rounded-lg bg-gradient-to-tr from-pink-700 to-blue-700 before:absolute before:inset-0 before:bg-gradient-to-bl before:from-pink before:opacity-0 before:-z-10 before:transition before:duration-500 before:hover:opacity-100 before:rounded-lg"
          >
            Switch to Rinkeby Test Network
          </button>
        )
      ) : (
        <Dialog.Trigger className="relative z-10 px-4 py-2 text-white rounded-lg bg-gradient-to-tr from-pink-700 to-blue-700 before:absolute before:inset-0 before:bg-gradient-to-bl before:from-pink before:opacity-0 before:-z-10 before:transition before:duration-500 before:hover:opacity-100 before:rounded-lg">
          Connect Wallet
        </Dialog.Trigger>
      )}
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay
              className="fixed bg-primary/50 backdrop-blue-lg"
              forceMount
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="fixed -mt-48 -ml-48 top-1/2 left-1/2 w-96 h-96"
              ></motion.div>
            </Dialog.Overlay>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed -mt-48 -ml-48 top-1/2 left-1/2 w-96 h-96"
            >
              <Dialog.Content
                className="p-4 transition duration-200 border-2 border-gray-600 shadow-lg bg-secondary/10 transiton backdrop-filter backdrop-blur-md hover:border-opacity-60 rounded-2xl"
                forceMount
              >
                <div className="flex flex-col mx-4 mt-8 space-y-4">
                  {!address && (
                    <>
                      <button
                        className="flex items-center px-4 py-2 text-lg text-white rounded-lg bg-secondary hover:opacity-60"
                        onClick={() => {
                          connectWallet("injected");
                          console.log("metamask");
                        }}
                      >
                        <MetamaskLogo className="w-8 h-8 mr-2" />
                        Login with Metamask
                      </button>
                      <button
                        className="flex items-center px-4 py-2 text-lg text-white rounded-lg bg-secondary hover:opacity-60"
                        onClick={() => connectWallet("walletconnect")}
                      >
                        <WalletConnectLogo className="w-8 h-8 mr-2" />
                        Login with WalletConnect
                      </button>
                    </>
                  )}

                  {address && chainId === 4 ? (
                    <p className="flex items-center px-4 py-2 text-white rounded-lg bg-secondary">
                      <EthereumLogo className="w-8 h-8 mr-8" />
                      <span className="flex justify-between w-full">
                        <span>{truncateWalletAddress(address)}</span>{" "}
                        <span>{balance?.formatted} ETH</span>
                      </span>
                    </p>
                  ) : (
                    <button
                      className="flex items-center px-4 py-2 text-white rounded-lg bg-secondary hover:opacity-60"
                      onClick={() => switchNetwork(4)}
                    >
                      <EthereumLogo className="w-8 h-8 mr-2" />
                      Switch to Rinkeby Test Network
                    </button>
                  )}

                  {address && (
                    <button
                      className="flex items-center px-3 py-2 space-x-2 text-white rounded-lg bg-secondary w-fit hover:opacity-60"
                      onClick={copyAddressToClipboard}
                    >
                      <p>{truncateWalletAddress(address)}</p>{" "}
                      <span>
                        <HiClipboardCopy />
                      </span>
                    </button>
                  )}
                </div>
              </Dialog.Content>
            </motion.div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default ThirdWebAuth;

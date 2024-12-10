import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
// import { create as ipfsHttpClient } from "ipfs-http-client";

// import { createHelia } from "helia";
// import { unixfs } from "@helia/unixfs";

import { MarketAddress, MarketAddressABI } from "./constants";

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NftContext = React.createContext();

export const NftProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const nftCurrency = "ETH";

  const ckeckIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
    // console.log({ accounts });
  };

  useEffect(() => {
    ckeckIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  const uploadToIPFS = async (file, setFileUrl) => {
    try {
      console.log("file: ->", file);

      // const added = await client.add({ content: file });
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      // const helia = await createHelia();
      // const fs = unixfs(helia);

      // TODO : Upload file to IPFS
      // Add file to IPFS
      //const { cid } = await fs.add(file);
      //const url = `https://ipfs.io/ipfs/${cid}`;

      console.log(url);

      return url;
    } catch (error) {
      console.log("Error uploading file to IPFS");
    }
  };

  const createNfts = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) {
      return alert("Please fill in all fields");
    }

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    try {
      // TODO: Upload data to IPFS

      // TODO: Create NFT
      // await createSale(url, price);

      router.push("/");
    } catch (error) {
      console.log("Error uploading file to IPFS");
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, "ether");
    const contract = fetchContract(signer);
    // console.log(contract);
    const listingPrice = await contract.getListingPrice();

    const transaction = await contract.createToken(url, price, {
      value: listingPrice.toString(),
    });

    await transaction.wait();
  };

  return (
    <NftContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        uploadToIPFS,
        createNfts,
        createSale,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

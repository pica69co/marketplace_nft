import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { MarketAddress, MarketAddressABI } from "./constants";

export const NftContext = React.createContext();

export const NftProvider = ({ children }) => {
  const nftCurrency = "ETH";

  return (
    <NftContext.Provider value={{ nftCurrency }}>
      {children}
    </NftContext.Provider>
  );
};

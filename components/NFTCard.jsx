import React from "react";

import images from "../assets";
import Link from "next/link";

const NFTCard = ({ nft }) => <div className="flex-1">{nft.name}</div>;

export default NFTCard;

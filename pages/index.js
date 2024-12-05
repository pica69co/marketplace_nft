import { useEffect, useRef, useState } from "react";
import { Banner, CreatorCard, NFTCard } from "../components";
import images from "../assets";
import { makeId } from "../utils/makeId";

const Home = () => {
  const parentRef = useRef();
  const scrollRef = useRef();
  // console.log(makeId(3));

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          banner="Discover, collect, and sell extraordinary NFTs"
          parentStyles={
            "justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          }
          childStyles={"md:text-4xl sm:text-2xl xs:text-xl text-left"}
        />
        <div>
          <h1 className="before:first:font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Best Creators
          </h1>
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {[6, 7, 8, 9, 10].map((item, index) => (
                <CreatorCard
                  key={`creator-${index}`}
                  item={item}
                  rank={index}
                  creatorImage={images[`creator${index}`]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - index * 0.5}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className=" flex-1 before:first:font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
              Hot Bids
            </h1>
            <div>Searchbar</div>
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  description: "Cool NFT",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

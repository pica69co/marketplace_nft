import { useEffect, useRef, useState } from "react";
import { Banner, CreatorCard, NFTCard } from "../components";
import images from "../assets";
import { makeId } from "../utils/makeId";
import Image from "next/image";
import { useTheme } from "next-themes";

const Home = () => {
  const [hiddenButtons, setHiddenButtons] = useState(false);
  const parentRef = useRef();
  const scrollRef = useRef();
  const { theme } = useTheme();
  // console.log(makeId(3));

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window > innerWidth ? 270 : 210;
    if (direction === "left") {
      scrollRef.current.scrollLeft -= scrollAmount;
    } else {
      scrollRef.current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHiddenButtons(false);
    } else {
      setHiddenButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);
    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  });

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
                  creatorImage={images[`creator${item}`]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - index * 0.5}
                />
              ))}
              {!hiddenButtons && (
                <>
                  <div
                    onClick={() => handleScroll("left")}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                  >
                    <Image
                      src={images.left}
                      layout="fill"
                      objectFit="contain"
                      alt="Left Arrow"
                      className={theme === "light" && "filter invert"}
                    />
                  </div>
                  <div
                    onClick={() => handleScroll("right")}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                  >
                    <Image
                      src={images.right}
                      layout="fill"
                      objectFit="contain"
                      alt="Right Arrow"
                      className={theme === "light" && "filter invert"}
                    />
                  </div>
                </>
              )}
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

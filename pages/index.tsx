import Head from "next/head";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../service/connector";
import { useState, useEffect } from "react";
import { getNfts } from "../service/nfts";
import InfiniteScroll from "react-infinite-scroll-component";
import NFTCard from "../component/NFTCard";
import DetailModal from "../component/DetailModal";

export default function Home() {
  
  const { activate, deactivate, account } = useWeb3React()
  const [nfts, setNfts] = useState([])
  const [pageKey, setPageKey] = useState('')
  const [total, setTotal] = useState(0)
  const [detail, setDetail] = useState();
  const [show, setShow] = useState(false);

  const _getNfts = (account: string | null | undefined) => {
    if (account) {
      getNfts(account, pageKey)
        .then((response) => response.json())
        .then((result) => {
          setNfts(pageKey ? [...nfts, ...result.ownedNfts] : result.ownedNfts)
          setPageKey(result.pageKey)
          setTotal(result.totalCount)
        })
        .catch((error) => {
          console.log("error", error)
        })
    }
  }

  useEffect(() => {
    _getNfts(account);
  }, [account])

  const handleClickCard = (data: any) => {
    setDetail(data);
    setShow(true);
  }

  return (
    <div>
      <Head>
        <title>Test for Web3 + NFT</title>
      </Head>

      <header>
        <span>Hologram Test Challenge</span>
        <button
          onClick={account ? () => deactivate() : () => activate(injected)}
        >
          {account
            ? account.substring(0, 4) +
              "..." +
              account.substring(account.length - 4, account.length)
            : "Connect Wallet"}
        </button>
      </header>

      <main className="container">
        <InfiniteScroll
          dataLength={nfts.length}
          next={() => _getNfts(account)}
          hasMore={
            account !== undefined && (nfts.length < total || total ===0)
          }
        >
          <div className="nft-list">
            {nfts.map((nft: any, index: number) => (
              <NFTCard
                onClick={() => handleClickCard(nft)}
                key={index}
                data={{
                  image: nft.media[0].gateway,
                  collection: nft.contractMetadata.openSea.collectionName,
                  name: nft.contractMetadata.name,
                }}
              />
            ))}
          </div>
        </InfiniteScroll>
      </main>
      <DetailModal show={show} setShow={setShow} detail={detail}/>
      <footer>
        @2022-11-11
      </footer>
    </div>
  );
}

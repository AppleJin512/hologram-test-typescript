import { useEffect, useState} from 'react'
import { getSalesData } from '../service/nfts'
import { ethers } from 'ethers'

interface DetailModalProps  {
  show: any,
  setShow: any,
  detail: any,
}

const DetailModal:React.FC<DetailModalProps> = ({show, setShow, detail}) => {

  const [latest, setLatest] = useState();
  const getSaleData = async (contractAddress: string, tokenId: number) => {
    const data = await getSalesData(contractAddress, tokenId);
    const latest:any = data.nftSales.sort(
      (a: any, b: any) => b.blockNumber - a.blockNumber
    )[0];
    setLatest(latest)
  };
  useEffect(() => {    
    if (detail) {
      getSaleData(detail.contract.address, Number(detail.id.tokenId));
    }
  }, [detail]);
  return (
    show &&
    detail !== null && (
      <div className="modal-container" onClick={() => setShow(false)}>
        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
          <p className="modal-header">{detail.contractMetadata.name}</p>
          <div className="modal-content">
            <img className="modal-image" src={detail.media[0].gateway} alt="" />
            <div>
              <p>
                {detail.description
                  ? detail.description
                  : detail.contractMetadata.openSea.description}
              </p>
              {latest ? (
                <div className="sale-panel">
                  <p>Latest Sale data</p>
                  <p>
                    Royalty Fee:{" "}
                    {ethers.utils.formatUnits(
                      latest.royaltyFee.amount,
                      latest.royaltyFee.decimals
                    )}
                    {latest.royaltyFee.symbol}
                  </p>
                  <p>
                    Seller Fee:{" "}
                    {ethers.utils.formatUnits(
                      latest.sellerFee.amount,
                      latest.sellerFee.decimals
                    )}
                    {latest.sellerFee.symbol}
                  </p>
                  <a href={`https://etherscan.io/tx/${latest.transactionHash}`} target="_blank" rel="noreferrer">View Transaction</a>
                </div>
              ) : <p className="sale-panel"></p>}
            </div>
          </div>
        </div>
      </div>
    )
  );
} 

export default DetailModal;
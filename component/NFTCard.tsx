type NFTCardProps = {
  data: any,
  onClick: any
}

const NFTCard: React.FC<NFTCardProps> = ({data, onClick}) => {
  return (
    <div className="nft-card" onClick={() => onClick(data)}>
      <img className="nft-card-image" src={data.image} alt=""></img>
      <div className="nft-card-content">
        <p className="nft-card-collection">{data.collection}</p>
        <p className="nft-card-name">{data.name}</p>
      </div>
    </div>
  )
};

export default NFTCard;
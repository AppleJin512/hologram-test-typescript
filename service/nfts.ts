const API_KEY = "Xt6Gvun3fJqzhDmo43htrCtN_Ano1QZT"
const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${API_KEY}/`

export const getNfts = async (account: string, pageKey?: string): Promise<any> => {
  const ownerAddr = "0xdc898f74059a5FAC9873E3BA58B5dcf1Fae6b6e5"
  const fetchURL = `${baseURL}getNFTs/?pageSize=5${pageKey ? '&pageKey=' + pageKey : ''}?&owner=${ownerAddr}`
  return fetch(fetchURL)
}

export const getSalesData = async (contractAddr: string, tokenId: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}getNFTSales/?fromBlock=0&toBlock=latest&order=asc&contractAddress=${contractAddr}&tokenId=${tokenId}`)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}

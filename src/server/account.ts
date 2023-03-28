import { FilaDogeContract } from "@/constant";

// login
const loginMarck = () => { 
if (!window?.ethereum) {
      //dowm wallet 
      window.open(`https://metamask.io/`);
    } else {
      // wallet 
    return new Promise((resove, reject) => {
        window?.ethereum
        .request({ method: "eth_requestAccounts" })
          .then((res: any) => {  
           resove(res)   
        });
     })
      
    }
}

const addNetwork = async () => { 
  if (window.ethereum) {
     try {
      const res= await window.ethereum.request({
         method: 'wallet_switchEthereumChain',
         params: [{ chainId: '0x13a' }],
      });
    } catch (e: any) {
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13a',
                chainName: 'Filecoin - Mainnet',
                nativeCurrency: {
                  name: 'Mainnet',
                  symbol: 'FIL', // 2-6 characters long
                  decimals: 18
                },
                rpcUrls: ['https://api.node.glif.io/'],
                blockExplorerUrls: ['https://filfox.info/en'],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
    }     
    } else {
      // if no window.ethereum then MetaMask is not installed
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    } 

}

const getTokenList = async () => { 
  const tokenAddress = FilaDogeContract;
    const tokenSymbol = 'FID';
  const tokenDecimals = 18;
  try {
    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
            symbol: tokenSymbol,
          decimals: tokenDecimals,
        },
      },
    });
  } catch (error) { 
  }

}


  const addToken = async () => {
  const tokenAddress = FilaDogeContract;
  const tokenSymbol = 'FLD';
  const tokenDecimals = 18;
  // const tokenImage = 'http://placekitten.com/200/300';

  try {
    // wasAdded方法会返回一个boolean值，
    // 并且和其它RPC方法一样，该方法可能会抛出错误，例如用户点击取消按钮时
    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
         // image: tokenImage,
        },
      },
    });
    if (wasAdded) {
     // localStorage.setItem("showToken", JSON.stringify(true));
      console.log('Token added Successfully!');
      return true;
    } else {
      return false
      console.log('Failed to add the token');
    }
  } catch (error) {
    console.log(error);
  }
};



export {loginMarck,addNetwork,addToken,getTokenList}
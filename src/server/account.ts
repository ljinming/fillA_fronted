
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

export {loginMarck}
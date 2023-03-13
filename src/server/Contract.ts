import FilaDoge from "./jsons/FilaDoge_metadata.json";
import { ethers } from 'ethers';
import { FilaDogeContract } from '@/constant'
import fa from "@glif/filecoin-address";
import { getValueDivide } from '@/utils'
import { message } from 'antd';
import { access, fstat } from 'fs';


let network = 'Filecoin Hyperspace'

 const provider = new ethers.providers.Web3Provider(window.ethereum);
//const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());
 const signer = provider?.getSigner()
class contract {
     contractAbi: any;
    contractAddress: string;
    myContract: any;
    account:string
 constructor() {
     this.contractAbi = JSON.parse(JSON.stringify(FilaDoge.output.abi));
     this.contractAddress = FilaDogeContract;
    

     this.myContract = new ethers.Contract(this.contractAddress, this.contractAbi,signer);
     this.account = '';
 }
    
    async getBalance(account: string):Promise<number|string> {
        this.account = account;
        const result = await this.myContract.balanceOf(account);
        const res = getValueDivide(Number(result), 18, 0);
        return res
    }

  
    async PreM(account:string) { 
        const result = await this.myContract.callStatic.hasBeenInvited(account).then((res:any) => { }).catch();
        return result
    }

  

    async mint(account: string) { 
        
        const result = await this.myContract.mint(account); 
        return 1
    }

    async PreFun(type:string,account:string) { 
        return new Promise((resolve,reject) => { 
             this.myContract.callStatic[type].then((res:any) => { 
             return resolve(true)
             }).catch((err: any) => {
             return resolve(false)
            // const messageData = err?.error?.data?.message;
            // let messages = err?.error?.message || ''
            // if (messageData) {
            //     const [a, text] = messageData.split('(')
            //     const b = text.split(')');
            //     messages = b[0]
            // }
            //       message.warning(messages)
      
         })
        })
       
    }

    //0xC6f8767BC61515CEEe4DC2FB430EF411656d6C6F
    //t410fy34hm66gcuk453snyl5ugdxucfsw23dppyo6jzi
    async acceptInvitation(address: string) { 
        console.log('===23',address)
        const addr = window.Buffer.from(fa.newFromString(address).bytes).toString("hex");
     //   const result = this.myContract.acceptInvitation(address);
        console.log('===3', addr)
        
    }



}

const Contract = new contract();
export default Contract;
/** @format */

import FilaDoge from "./jsons/FilaDoge_metadata.json";
import { FilaDogeContract } from "@/constant";
import fa from "@glif/filecoin-address";
import { getValueDivide ,getValueMultiplied} from "@/utils";
import Web3 from "web3";
import { notification } from "antd";
import { successIcon,warningIcon } from '@/svgIcons'
import store from './modules'
//import { ethers } from 'ethers';

const web3 = new Web3(window.ethereum);
//const request= util.promisify(requests);
// const provider = new ethers.providers.Web3Provider(window.ethereum)


 enum CoinType {
    MAIN = "f",
    TEST = "t",
 }
  
class contract {
  contractAbi: any;
  contractAddress: string;
  myContract: any;
  account: string = "";
  accountBalance: string | undefined;
  rate: number | string | undefined;
  myBorrowList: Array<any> = [];
  minerList: Record<string, any> = {};
  constructor() {
    //   const signer = provider.getSigner()
    // this.contractAbi = JSON.parse(JSON.stringify(Fill.abi));
    // this.contractAddress = '0x75AfF4881B535a5a363157ba7dBDA68f31EB9e25';

    this.contractAbi = JSON.parse(JSON.stringify(FilaDoge.output.abi));
    this.contractAddress = FilaDogeContract;
    this.myContract = new web3.eth.Contract(
      this.contractAbi,
      this.contractAddress
    );
    this.getNetWork()
  }

  async getNetWork() { 
    const chainId = await web3.eth.getChainId();
    return chainId === 314

  }

  setAccount(account: string) {
    this.account = account;
  }

  isLotteryStarted() { 
    return new Promise<boolean>((resolve, reject) => {
      this.myContract.methods.isLotteryStarted().call({ from: this.account }, (err: any, res: any) => { 
        resolve(res)
       })
     })
   
  }

  async getBalance(account: string): Promise<number | string> {
    this.account = account;
    return new Promise<number | string>((resolve, reject) => {
      this.myContract.methods
        .balanceOf(account)
        .call({ form: this.account }, (err: any, res: any) => {
          const number = getValueDivide(Number(res), 18, 2);
           store.dispatch({
                  type: 'banlance/change',
                  payload: {banlance:number}
                  })                          
          resolve(number);
        });
    });
  }

   async MintBanlance(account: string): Promise<number | string> {
    this.account = account;
    return new Promise<number | string>((resolve, reject) => {
      this.myContract.methods
        .inviteeRewardReceived(account)
        .call({ form: this.account }, (err: any, res: any) => {
          const number = getValueDivide(Number(res), 18, 2);
          resolve(number);
        });
    });
   }
  
    async LotteryBanlance(account: string): Promise<number | string> {
    this.account = account;
    return new Promise<number | string>((resolve, reject) => {
      this.myContract.methods
        .gamblerRewardReceived(account)
        .call({ form: this.account }, (err: any, res: any) => {
          const number = getValueDivide(Number(res), 18, 2);
          resolve(number);
        });
    });
    }
  
    async ReferBanlance(account: string): Promise<number | string> {
    this.account = account;
    return new Promise<number | string>((resolve, reject) => {
      this.myContract.methods
        .inviterRewardReceived(account)
        .call({ form: this.account }, (err: any, res: any) => {
          const number = getValueDivide(Number(res), 18, 2);
          resolve(number);
        });
    });
  }


  transfer(address: string, amount: number) { 
    const value = getValueMultiplied(Number(amount));
    return new Promise((resolve,reject) => { 
         web3.eth.sendTransaction({
      from: this.account,
      to: address,
       value,
         }, (err, any) => { 
           if (err) { 
             resolve(true)
           }
    }).then(function(receipt){
      //console.log('=receipt===5', receipt)
      resolve(true)
       notification.success({
            message: "",
            description: `Transaction Successfully `,
            duration: 10,
            className: "app-notic",
             icon: <span className="notification-icon" >{ successIcon}</span>
          });
      });
    })
   
  }

  hasBeenInvited(account:string) {
    return new Promise<boolean>((resolve, reject) => {
      this.myContract.methods
        .hasBeenInvited(account)
        .call({ form: this.account }, (err: any, res: any) => {
          resolve(res);
        });
    });
  }

  hasGambled(account:string) {
    return new Promise<boolean>((resolve, reject) => {
      this.myContract.methods
        .hasGambled(account)
        .call({ form: this.account }, (err: any, res: any) => {
          resolve(res);
        });
    });
  }

  mint(account: string, accountValue: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.myContract.methods
        .mint(account,accountValue)
        .send({ from: this.account }, (err: any, data: any) => {
          console.log("--3", err, data);
        })
        .on("receipt", (data: any) => {
          resolve(true);
          const returnValue =  Array.isArray(data?.events?.Transfer)? data?.events?.Transfer[1]?.returnValues || {} :data?.events?.Transfer?.returnValues;
          let num = returnValue.value
            ? getValueDivide(Number(returnValue.value), 18, 0)
            : "";
          num= Number(num).toLocaleString()
          notification.success({
            message: "Mint",
            description: `Congratulations, you claimed ${num} FLD!`,
            duration: 10,
            className: "app-notic",
            icon: <span className="notification-icon" >{ successIcon}</span>
          });
        })
        .on("error", (err: any) => {
          resolve(false);
          const messageData = err?.error?.data?.message ;
          let messages = 'Fox has rejected doggy’s transaction!'
          
          if (messageData) {
            const [a, text] = messageData.split("(");
            const b = text.split(")");
            messages = b[0];
          }
          notification.warning({
            message: "",
            description: messages,
            duration: 10,
            className: "app-notic",
             icon: <span className="notification-icon" >{ warningIcon}</span>
          });
        });
    });
  }

  lottery(account: string, accountValue: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.myContract.methods
        .lottery(account,accountValue)
        .send({ from: this.account }, (err: any, data: any) => {
          console.log("--3", err, data);
        })
        .on("receipt", (data: any) => {
          resolve(true);
          const returnValue =  Array.isArray(data?.events?.Transfer)? data?.events?.Transfer[1]?.returnValues || {} :data?.events?.Transfer?.returnValues;
          let num = returnValue.value
            ? getValueDivide(Number(returnValue.value), 18, 0)
            : "";
          num= Number(num).toLocaleString()
          notification.success({
            message: "lottery",
            description: `Congratulations, you won ${num} FLD!`,
            duration: 10,
            className: "app-notic",
             icon: <span className="notification-icon" >{ successIcon}</span>
          });
        })
        .on("error", (err: any) => {
          resolve(false);
          console.log("error", err);
          const messageData = err?.error?.data?.message;
         let messages = 'Fox has rejected doggy’s transaction!'
          if (messageData) {
            const [a, text] = messageData.split("(");
            const b = text.split(")");
            messages = b[0];
          }
          notification.warning({
            message: "",
            description: messages,
            duration: 10,
            className: "app-notic",
            icon: <span className="notification-icon" >{ warningIcon}</span>

          });
        });
    });
  }

  rank_mint(type: string) {
    const menthod =
      type === "claimed"
        ? "hasRewardedInviteeAmount"
        : type === "participants"
        ? "hasRewardedInvitees"
        : "nextInviteeReward";
    return new Promise<string | number>((resolve, reject) => {
      this.myContract.methods[menthod]().call(
        { form: this.account },
        (err: any, res: any) => {
          const number =
            type === "participants" ? res : getValueDivide(Number(res), 18, 0);
          resolve(number);
        }
      );
    });
  }

  rank_Table(type: string) {
    const menthod =
      type === "lottery" ? "hasRewardedGamblerList" : "hasRewardedInviterList";
    return new Promise<Array<any>>((resolve, reject) => {
      this.myContract.methods[menthod]().call(
        { form: this.account },
        (err: any, res: any) => {
          const data: any = [];
          res?.forEach((v: any) => {
            const { account, amount } = v;
            if (account !== '0x0000000000000000000000000000000000000000') { 
            data.push({
              account,
              f4Address: fa.delegatedFromEthAddress(account,CoinType.MAIN).toString(),
              amount: getValueDivide(Number(amount), 18, 0),
            });
            }
         
          });
          data.sort((a: any, b: any) => {
            return  Number(b.amount)-Number(a.amount);
          });
          const showData = data.length > 50 ? data.slice(0, 50) : data;
          const newData = [...showData].map((t:any,index:number) => { 
            return {...t,sortIndex:index}
          })
          resolve(newData);
        }
      );
    });
  }
}
const FilaContract = new contract();
export default FilaContract;

/** @format */

import FilaDoge from "./jsons/FilaDoge_metadata.json";
import { FilaDogeContract } from "@/constant";
import fa from "@glif/filecoin-address";
import { getValueDivide } from "@/utils";
import Web3 from "web3";
import { notification } from "antd";

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
  }

  setAccount(account: string) {
    this.account = account;
  }

  async getBalance(account: string): Promise<number | string> {
    this.account = account;
    return new Promise<number | string>((resolve, reject) => {
      this.myContract.methods
        .balanceOf(account)
        .call({ form: this.account }, (err: any, res: any) => {
          const number = getValueDivide(Number(res), 18, 0);
          resolve(number);
        });
    });
  }

  transfer(address:string,amount:number) { 
    this.myContract.methods.transfer(address, amount).send({
      from: this.account,
      value: amount,
      to:address
    }, () => { }).on("receipt", (data: any) => {
          console.log('-transfer---44',data)
          const returnValue = data?.events?.Transfer?.returnValues || {};
          const num = returnValue.value
            ? getValueDivide(Number(returnValue.value), 18, 0)
            : "";
          console.log("receipt", data);
          notification.success({
            message: "Mint",
            description: `Congratulate, You got ${num} FLD`,
            duration: 10,
            className: "app-notic",
          });
        })
  }

  hasBeenInvited() {
    return new Promise<boolean>((resolve, reject) => {
      this.myContract.methods
        .hasBeenInvited(this.account)
        .call({ form: this.account }, (err: any, res: any) => {
          resolve(res);
        });
    });
  }

  hasGambled() {
    return new Promise<boolean>((resolve, reject) => {
      this.myContract.methods
        .hasGambled(this.account)
        .call({ form: this.account }, (err: any, res: any) => {
          resolve(res);
        });
    });
  }

  mint(account: string, accountValue: string) {
    console.log('mint---',account,accountValue)
    return new Promise<boolean>((resolve, reject) => {
      this.myContract.methods
        .mint(account,accountValue)
        .send({ from: this.account }, (err: any, data: any) => {
          console.log("--3", err, data);
        })
        .on("receipt", (data: any) => {
          resolve(true);
          const returnValue = data?.events?.Transfer?.returnValues || {};
          const num = returnValue.value
            ? getValueDivide(Number(returnValue.value), 18, 0)
            : "";
          console.log("receipt", data);
          notification.success({
            message: "Mint",
            description: `Congratulate, You got ${num} FLD`,
            duration: 10,
            className: "app-notic",
          });
        })
        .on("error", (err: any) => {
          console.log("error", err);
          resolve(false);
          const messageData = err?.error?.data?.message ;
          let messages = err?.message || "";
          if (messageData) {
            const [a, text] = messageData.split("(");
            const b = text.split(")");
            messages = b[0];
          }
          notification.error({
            message: "",
            description: messages,
            duration: 10,
            className: "app-notic",
          });
        });
    });
  }

  lottery(account: string, accountValue: string) {
        console.log('lottery---',account,accountValue)

    return new Promise<boolean>((resolve, reject) => {
      this.myContract.methods
        .lottery(account,accountValue)
        .send({ from: this.account }, (err: any, data: any) => {
          console.log("--3", err, data);
        })
        .on("receipt", (data: any) => {
          resolve(true);
          const returnValue = data?.events?.Transfer?.returnValues || {};
          const num = returnValue.value
            ? getValueDivide(Number(returnValue.value), 18, 0)
            : "";
          console.log("receipt", data);
          notification.success({
            message: "lottery",
            description: `Congratulate, You got ${num} FLD`,
            duration: 10,
            className: "app-notic",
          });
        })
        .on("error", (err: any) => {
          resolve(false);
          console.log("error", err);
          const messageData = err?.error?.data?.message;
          let messages = err?.error?.message || "";
          if (messageData) {
            const [a, text] = messageData.split("(");
            const b = text.split(")");
            messages = b[0];
          }
          notification.open({
            message: "",
            description: messages,
            duration: 10,
            className: "app-notic",
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
          console.log("=rank_mint==3", type, menthod, res, number);
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
            data.push({
              account,
              f4Address: fa.delegatedFromEthAddress(account,CoinType.MAIN).toString(),
              amount: getValueDivide(Number(amount), 18, 0),
            });
          });
          data.sort((a: any, b: any) => {
            return Number(a.aamount) - Number(b.aamount);
          });
          resolve(data);
        }
      );
    });
  }
}
const FilaContract = new contract();
export default FilaContract;

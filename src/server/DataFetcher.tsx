/** @format */

import FilaDetch from "./jsons/DataFetcher_metadata.json";
import { DataFetcherContract } from "@/constant";
import fa from "@glif/filecoin-address";
import { getValueDivide } from "@/utils";
import Web3 from "web3";
import store from './modules'


const web3 = new Web3(window.ethereum);

  
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
        this.contractAbi = JSON.parse(JSON.stringify(FilaDetch.output.abi));
        this.contractAddress = DataFetcherContract;
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



    async fetchBalance(account?: string): Promise<number | string> {
        this.account = account || this.account;
        console.log('==fetchPersonalData==46547',this.account)
        return new Promise<number | string|any>((resolve, reject) => {
            this.myContract.methods
                .fetchPersonalData(account)
                .call({ form: this.account }, (err: any, res: any) => {
                    
                    const filaBalance = getValueDivide(Number(res.filaBalance), 18, 2);
                    const gamblerRewardReceived = getValueDivide(Number(res.gamblerRewardReceived), 18, 2);
                     const inviteeRewardReceived = getValueDivide(Number(res.inviteeRewardReceived), 18, 2);
                    const inviterRewardReceived = getValueDivide(Number(res.inviterRewardReceived), 18, 2);
                    const obj = {
                                    banlance: filaBalance,
                                    gamblerRewardReceived,
                                    inviteeRewardReceived,
                                    inviterRewardReceived
                    }
                    console.log('====5765',res,obj)
                    store.dispatch({
                            type: 'banlance/change',
                                payload:obj
                            })                          
                    resolve(obj);
                });
        })
  }
}

 







const FethContract = new contract();

export default FethContract;

import { FilaDogeContract, market_columns } from "@/constant";
import { Pagination, Table } from "antd";
import axios from "axios"
import { useEffect, useState } from "react";

const defaultUrl = 'https://api-v2.filscan.io';



function Market() { 
    const [current,setCurrent]=useState(1)
    const [transTotal, setTransTotal] = useState(0);
    const [ownerTotal,setOwnerTotal] = useState(0)
    const [data, setData] = useState({
        items: [],
        total:0,
    });
    const [loading,setLoading] = useState(false)
    const [active,setActive]= useState('30d')

 useEffect(() => {
     axios.post(defaultUrl + '/api/v1/ERC20Transfer', {contract_id:FilaDogeContract.toLocaleLowerCase(),page:1,limit:5}).then(res => { 
         setTransTotal(res?.data?.result?.total || 0)
    }).catch(() => { 
      
    })
    axios.post(defaultUrl + '/api/v1/ERC20Owner', {contract_id:FilaDogeContract.toLocaleLowerCase(),page:1,limit:5}).then(res => { 
         setOwnerTotal(res?.data?.result?.total || 0)
    }).catch(() => { 
      
    })
    load()
     
 }, [])
    
    const load = (act?: string,cur?:number) => { 
        setLoading(true)
        const index = cur || current;
        const duration = act|| active
           axios.post(defaultUrl + '/api/v1/ERC20RecentTransfer', { contract_id: FilaDogeContract.toLocaleLowerCase(), duration ,limit:10,page:index-1}).then(res => { 
               setData(res.data.result)
               setLoading(false)
                }).catch(() => { 
                
                })
    }
    
    
    return <div className="market_content">
        <div className="market_content_header">
            <div className="market_content_header_item">
            <h3>Total transactions:</h3>
            <div className="market_content_header_value">{ Number(transTotal).toLocaleString()}</div>
            </div>
             <div className="market_content_header_item">
            <h3>Total owners:</h3>
            <div className="market_content_header_value">{ Number(ownerTotal).toLocaleString()}</div>
        </div>
        </div>
        <div className="market_content_content">
            <h3 className="market_content_content_title">30-day transaction details</h3>
            <Table
            className="custom_table"
                pagination={
                 false
    
                }
                loading={ loading}
                 columns={market_columns ||[]}
                dataSource={data?.items || []}>
            </Table>
        </div>
        <div className="market_content_content_des">
            <div>
                 Full transaction data is monitored and maintained by
            <a target="_blank" className='link' href="https://filscan.io/token/0x7b90337f65faa2b2b8ed583ba1ba6eb0c9d7ea44/">Filscan.io</a>
            </div>
            <Pagination defaultCurrent={current} total={data.total} onChange={ (value) => { 
                        setCurrent(value)
                        load(active,value)
                    } } />
        </div>
    </div>
}
export default Market

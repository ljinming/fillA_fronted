import { FilaDogeContract, market_columns } from "@/constant";
import { Radio, Table, Tabs } from "antd";
import axios from "axios"
import { useEffect, useState } from "react";

const defaultUrl = 'https://api-v2.filscan.io';



function Market() { 

    const [transTotal, setTransTotal] = useState(0);
    const [ownerTotal,setOwnerTotal] = useState(0)
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false)
    const [active,setActive]= useState('1h')

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
    
    const load = (act?: string) => { 
        setLoading(true)
        const duration = act|| active
           axios.post(defaultUrl + '/api/v1/ERC20RecentTransfer', { contract_id: FilaDogeContract.toLocaleLowerCase(), duration }).then(res => { 
         console.log('----4',res.data.result.items)
               setData(res.data.result.items)
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
            <h3>Transaction details</h3>
            <Radio.Group value={active} onChange={(e) => { 
                setActive(e.target.value)
                load(e.target.value)
            }} style={{ marginBottom: 16 }}>
                <Radio.Button value="1h">1h</Radio.Button>
                <Radio.Button value="1d">1D</Radio.Button>
                <Radio.Button value="7d">7D</Radio.Button>
            </Radio.Group>
            <Table
            pagination={
                {
              position: ["bottomRight"],
              showQuickJumper: false,
              pageSize: 5,
              showSizeChanger: false,
            
            }  
      }
                loading={ loading}
                 columns={market_columns ||[]}
                dataSource={data}>
            </Table>
            <div className="market_content_content_des"> Transaction data is monitored and maintained by <a target="_blank" className='link' href="https://filscan.io/token/0x7b90337f65faa2b2b8ed583ba1ba6eb0c9d7ea44/">Filscan.io</a></div>
        </div>
         
    </div>
}
export default Market


//--registry https://registry.npmmirror.com/

Non view funcs：
airDrop1：给Filecoin上前601名地址空投。可以多次调用，但传入地址数组的累积长度不得超过601
airDrop2：给ETH上前401名地址空投。可以多次调用，但传入地址数组的累积长度不得超过401
approve：ERC-20
burnByOwner：待议，由owner烧掉token
decreaseAllowance：ERC-20
increaseAllowance：ERC-20
lottery：抽奖，输入邀请人地址，输出邀请人奖励数额，抽奖人奖励数额
mint：mint，输入邀请人地址，输出邀请人奖励数额，被邀请人奖励数额
mintByOwner：待议，由owner mint token
transfer：ERC-20
transferFrom：ERC-20

view & pure funcs：
allowance：ERC-20
balanceOf：ERC-20，余额
decimals：ERC-20，token精度，18
gamblerList：输出抽奖人列表
gamblers：输出抽奖人数量
hasBeenInvited：输入被邀请人地址，输出是否已被邀请
hasGambled：输出抽奖人是否已参加抽奖
hasRewardedGamblerList：输出抽奖人和对应获取的抽奖token数量
hasRewardedInviteeAmount：被邀请人已mint token总量
hasRewardedInviteeList：被邀请人列表
hasRewardedInvitees：目前被邀请人数量
hasRewardedInviterAmount：已经发放给邀请人的token数量（不包含主页，也不会给主页真的发token）
hasRewardedInviterList：输出邀请人和对应获取的奖励token数量（包含主页和它“本应”获得的token数量，用于榜单界面）
hasRewardedInviters：输出已经发放的邀请人奖励的次数（不包含主页）
lotteryReleasedAmount：目前通过抽奖已经释放的token数量
maxSupply：最大发行量
name：ERC-20
nextInviteeReward：下一个被邀请人的奖励数额
owner：输出管理员地址
symbol：ERC-20
totalSupply：ERC-20，输出总发行量

所有关于token数量的返回结果，均返回带精度结果（* 10^18）


{
    "transactionHash": "0x1f51dc330af5c8067c80d2e53805920972603cad70971542d9fed94c90849dfe",
    "transactionIndex": 0,
    "blockHash": "0x86b7ffa8210a172f93c072a57982215a57e1e7d42c58f2527f7b4147163ceb14",
    "blockNumber": 155422,
    "from": "0x581119100cc7644940040763d9656f707f79575a",
    "to": "0x20aa4fb4eb7e58e630ae1115059cda54ae8918c5",
    "root": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "status": true,
    "contractAddress": null,
    "cumulativeGasUsed": 0,
    "gasUsed": 22392121,
    "effectiveGasPrice": 4685881531,
    "logsBloom": "0xfefeb1dffe3c7afecfff5fde5ee4bdbf8fe2abbd7ffeeef053a3aedcae3bf52b37f7af7fe3baebf7faf7a6daedaf16ed5bfd7b1af7fdf5ebbe761f373e7d8bc757dc7f5d6faf65d9c5eaf5fbb73f7d7f7edbae7cdcf78e1ddc4c97b499fee559ffb6ff786f1ecbefed37c795afb6cf7de65feddde331a6cf5ff08693cfcf6bf89ffc7e0f7df57f1f339f56c5c5decc5ffb85bfb3fd7fddfcba6bfbfd2ffa3ab1ffb51f92f9dfed7ee7ee8be2ff5fb971ce5a67ffcffd9ce3ecbf7a5c97afcd7ff57e9b33cf3bf3b3f781f8d3f8bffdff2e64b9fff75be619f7271faff9fd6dfefe9f5afeacfb25ba8f2bf6966feeefb69bba7a69fadedddfc3ddf7a082f9bdd3",
    "type": "0x2",
    "events": {
        "Transfer": {
            "address": "0x20aa4fb4eB7e58e630ae1115059cDa54Ae8918C5",
            "removed": false,
            "logIndex": 0,
            "transactionIndex": 0,
            "transactionHash": "0x1f51dc330af5c8067c80d2e53805920972603cad70971542d9fed94c90849dfe",
            "blockHash": "0x86b7ffa8210a172f93c072a57982215a57e1e7d42c58f2527f7b4147163ceb14",
            "blockNumber": 155422,
            "id": "log_740ce3fa",
            "returnValues": {
                "0": "0x0000000000000000000000000000000000000000",
                "1": "0x581119100CC7644940040763D9656F707f79575a",
                "2": "925323000000000000000000",
                "from": "0x0000000000000000000000000000000000000000",
                "to": "0x581119100CC7644940040763D9656F707f79575a",
                "value": "925323000000000000000000"
            },
            "event": "Transfer",
            "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "raw": {
                "data": "0x00000000000000000000000000000000000000000000c3f1dc3f68a19b4c0000",
                "topics": [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x0000000000000000000000000000000000000000000000000000000000000000",
                    "0x000000000000000000000000581119100cc7644940040763d9656f707f79575a"
                ]
            }
        }
    }
}
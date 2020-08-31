import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { Group } from 'antd/lib/avatar';
export const NeoDemo = () => {
    const [state, setState] = useState(0);
    const [neoline, setNeoLine] = useState();
    const [account, setAccount] = useState('')
    useEffect(() => {
        if (window['NEOLine']) {
            setNeoLine(new window.NEOLine.Init(),initAccount);
            setState(1);
        }
    }, []);

    const initAccount = async () => {
        try {
            const { address, label } = await neoline.getAccount();
            setAccount(address);

        } catch (error) {
            console.log(error);
            notification.error({ message: 'NeoLine', description: error.type })
        }
    }

    const initNeoline = async () => {
        initEvent();
    }
    const getNetwork = async () => {
        const ret = await neoline.getNetworks();
        console.log(ret);
    }

    const getBalance = async () => {
        const params = {
            address: account
        }
        const data = {
            network: "TestNet",
            params
        }
        const ret = await neoline.getBalance(data)
        console.log(ret)
    }

    const invokeRead = async () => {
        const contract_data1 = {
            "scriptHash": "0x2b652312db6282b5731cd0c888b7c08b20737550",
            "operation": "name",
            "args": [
                {
                    "type": "Integer",
                    "value": "0"
                }
            ],
        }
        const contract_data2 = {
            scriptHash: '0x2b652312db6282b5731cd0c888b7c08b20737550',
            operation: 'balanceOf',
            args: [
                {
                    type: 'Address',
                    value: 'Ad1JnAcC2GQ7bpwhMsRRgF4PQo9zhAUMo4'
                }
            ]
        }
        try {
            const ret1 = await neoline.invokeRead(contract_data1)
            console.log(ret1);
        } catch (err) {
            console.log(err);
        }

        try {
            const ret2 = await neoline.invokeRead(contract_data2)
            console.log(ret2);
        } catch (err) {
            console.log(err);
        }

    }

    const invoke = async () => {
        const contract_data3 = {
            scriptHash: '0x2b652312db6282b5731cd0c888b7c08b20737550',
            operation: 'transfer',
            args: [
                { type: "Address", value: "ANsfnGncJN6tjQJeUgyfb7242zgt2NRG2V" },
                { type: "Address", value: "Ad1JnAcC2GQ7bpwhMsRRgF4PQo9zhAUMo4" },
                { type: "Integer", value: "500000" }
            ],
            fee: '0.001',
        }
        try {
            const ret3 = await neoline.invoke(contract_data3)
            console.log(ret3);
        } catch (err) {
            console.log(err);
        }
    }

    // 初始化 Neoline 的事件监听
    const initEvent = () => {
        console.log("Init Event");
        neoline.addEventListener(neoline.EVENT.READY, data => {
            console.log(data);
            notification.success({ message: 'NeoLine', description: 'ACCOUNT_READY' })
        });
        // 这些都是监听方法
        // 监听账户变更
        neoline.addEventListener(neoline.EVENT.ACCOUNT_CHANGED, data => {
            setAccount(data.detail.address);
            console.log(`Connected Account: ${data.detail.address}`);
            notification.success({ message: 'NeoLine', description: 'ACCOUNT_CHANGED' })
        });
        // 监听钱包连接
        neoline.addEventListener(neoline.EVENT.CONNECTED, data => {
            // setAccount(data.detail.address);
            // console.log(`Connected Account: ${data.detail.address}`);
            console.log(data);
            notification.success({ message: 'NeoLine', description: 'CONNECTED' })
        });
        // 监听断开连接
        neoline.addEventListener(neoline.EVENT.DISCONNECTED, data => {
            console.log(`Connected Account: ${data.detail}`);
            notification.success({ message: 'NeoLine', description: 'DISCONNECTED' })
        });
        // 监听网络变更
        neoline.addEventListener(neoline.EVENT.NETWORK_CHANGED, data => {
            console.log(`Connected Account: ${data.detail}`);
            notification.success({ message: 'NeoLine', description: 'NETWORK_CHANGED' })
        });
        // 监听高度变化
        neoline.addEventListener(neoline.EVENT.BLOCK_HEIGHT_CHANGED, data => {
            // console.log(`Connected Account: ${data.detail}`);
            console.log(data);
            notification.success({ message: 'NeoLine', description: 'BLOCK_HEIGHT_CHANGED' })
        });
        // 监听交易状态
        neoline.addEventListener(neoline.EVENT.TRANSACTION_CONFIRMED, data => {
            // console.log(`Connected Account: ${data.detail}`);
            console.log(data);
            notification.success({ message: 'NeoLine', description: 'TRANSACTION_CONFIRMED' })
        });
    }

    return (
        <div className="web3demo" >
            {state === 0 && <div className="message">当前无钱包链接, 请安装</div>}
            {state === 1 &&
                <div className="message">
                    <div className="account">Current Account: {account}</div>
                    <div className="account">Current Label: {account}</div>
                    <Group>
                        {/* <Button onClick={() => {
                            window.ethereum.enable().then(accounts => { console.log(accounts); setAccount(accounts[0]) })
                        }}>Content</Button> */}
                        <div>
                            <Button onClick={initNeoline}>Init Neoline</Button>
                        </div>
                        <Button onClick={initAccount}>Get Account</Button>
                    </Group>
                    <div>
                        <Button onClick={getNetwork}>Check network</Button>
                    </div>
                    <div>
                        <Button onClick={getBalance}>Get Balance</Button>
                    </div>
                    <div>
                        <Button onClick={invokeRead}>invokeRead</Button>
                    </div>
                    <div>
                        <Button onClick={invoke}>invoke</Button>
                    </div>
                </div>
            }
        </div>
    );
}
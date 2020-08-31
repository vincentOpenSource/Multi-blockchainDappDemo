import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { Group } from 'antd/lib/avatar';
import Form from 'antd/lib/form/Form';
export const NeoDemo = () => {
    const [state, setState] = useState(0);
    const [neoline, setNeoLine] = useState();
    const [account, setAccount] = useState('')
    useEffect(() => {
        if (window['NEOLine']) {
            setNeoLine(new window.NEOLine.Init(), () => {
                initEvent();
            });
            setState(1);
        }
    }, []);

    const initAccount = async () => {
        try {
            const { address, label } = await neoline.getAccount();
            setAccount(address);
        } catch (error) {
            notification.error({ message: 'NeoLine', description: error.type })
        }
    }

    // 初始化 metamask的事件监听
    const initEvent = () => {
        // 这些都是监听方法
        // 监听账户变更
        neoline.addEventListener(this.neoline.EVENT.ACCOUNT_CHANGED, data => {
            setAccount(data.detail.address);
            console.log(`Connected Account: ${data.detail.address}`);
            notification.success({ message: 'NeoLine', description: 'ACCOUNT_CHANGED' })
        });
        // 监听钱包连接
        neoline.addEventListener(this.neoline.EVENT.CONNECTED, data => {
            setAccount(data.detail.address);
            console.log(`Connected Account: ${data.detail.address}`);
            notification.success({ message: 'NeoLine', description: 'CONNECTED' })
        });
        // 监听断开连接
        neoline.addEventListener(this.neoline.EVENT.DISCONNECTED, data => {
            console.log(`Connected Account: ${data.detail}`);
            notification.success({ message: 'NeoLine', description: 'DISCONNECTED' })
        });
        // 监听网络变更
        neoline.addEventListener(this.neoline.EVENT.NETWORK_CHANGED, data => {
            console.log(`Connected Account: ${data.detail}`);
            notification.success({ message: 'NeoLine', description: 'NETWORK_CHANGED' })
        });
        // 监听高度变化
        neoline.addEventListener(this.neoline.EVENT.BLOCK_HEIGHT_CHANGED, data => {
            console.log(`Connected Account: ${data.detail}`);
            notification.success({ message: 'NeoLine', description: 'BLOCK_HEIGHT_CHANGED' })
        });
        // 监听交易状态
        neoline.addEventListener(this.neoline.EVENT.TRANSACTION_CONFIRMED, data => {
            console.log(`Connected Account: ${data.detail}`);
            notification.success({ message: 'NeoLine', description: 'TRANSACTION_CONFIRMED' })
        });
    }

    return (
        <div className="web3demo" >
            {state === 0 && <div className="message">当前无钱包链接</div>}
            {state === 1 &&
                <div className="message">
                    <div className="account">Current Account: {account}</div>
                    <div className="account">Current Label: {account}</div>
                    <Group>
                        <Button onClick={() => {
                            window.ethereum.enable().then(accounts => { console.log(accounts); setAccount(accounts[0]) })
                        }}>Content</Button>
                        <Button onClick={initAccount}>Get Account</Button>
                    </Group>
                    <Form>

                    </Form>
                </div>
            }
        </div>
    );
}
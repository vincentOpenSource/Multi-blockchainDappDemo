import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Button, notification } from 'antd';
import { Group } from 'antd/lib/avatar';
import Form from 'antd/lib/form/Form';
export const Web3Demo = () => {
    const [state, setState] = useState(0);
    const [web3, setWeb3] = useState(new Web3());
    const [account, setAccount] = useState('')
    useEffect(() => {
        if (window['ethereum']) {
            setWeb3(new Web3(window.ethereum));
            setState(1);
            initEvent();
        }
        else if (window['web3']) {
            setWeb3(new Web3(window.web3.currentProvider));
            setState(1);
            initEvent();
        }
        else {
            setWeb3();
        }
    }, []);

    const initAccount = () => {
        web3.eth.getAccounts((err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                setAccount(res[0]);
            }
        });
    }

    // 初始化 metamask的事件监听
    const initEvent = () => {
        window.ethereum.on("accountsChanged", accounts => {
            setAccount(accounts[0]);
            notification.success({ message: 'Metamask', description: 'accountsChanged' })
        });
        window.ethereum.on("networkChanged", result => {
            console.log('networkChanged', result);
            notification.success({ message: 'Metamask', description: 'networkChanged' });
        });
        window.ethereum.on("connect", result => {
            console.log('connect', result);
            notification.success({ message: 'Metamask', description: 'connect' });
        });
        window.ethereum.on("disconnect", result => {
            console.log('disconnect', result);
            notification.success({ message: 'Metamask', description: 'disconnect' });
        });
        window.ethereum.on("message", result => {
            console.log('message', result);
            notification.success({ message: 'Metamask', description: 'message' });
        });
    }

    return (
        <div className="web3demo" >
            {state === 0 && <div className="message">当前无钱包链接</div>}
            {state === 1 &&
                <div className="message">
                    <div className="account">Current Account: {account}</div>
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
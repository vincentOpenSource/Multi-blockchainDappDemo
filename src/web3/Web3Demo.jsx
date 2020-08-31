import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Button, notification } from 'antd';
import { Group } from 'antd/lib/avatar';
import Form from 'antd/lib/form/Form';
import { PromiseEvent } from '../util/PromiseEvent';
let web3 = new Web3();
let contract;
export const Web3Demo = () => {
    const [state, setState] = useState(0);
    const [account, setAccount] = useState('');
    const [hasContract, setContract] = useState(false);
    const [showContent, setContent] = useState('');
    useEffect(() => {
        if (window['ethereum']) {
            web3 = new Web3(window.ethereum);
            initEvent();
            setState(1);
        }
        else if (window['web3']) {
            web3 = new Web3(window.web3.currentProvider);
            initEvent();
            setState(1);
        }
        else {
            web3 = undefined;
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

    // 初始化合约
    const initContract = () => {
        try {
            const address = '0xc1609fdcfede5a095b5f7db6e87b0e6e84e046aa';
            contract = new web3.eth.Contract(abi, address);
            console.log(contract);
            setContract(true);
        } catch (error) {

        }
    }
    // 调用合约查询数据
    const callContract = async () => {
        try {
            const res = await contract.methods.symbol().call(); // 根据abi中的方法来, 如果input无参数则不用传入参
            setContent(res);
            const res2 = await contract.methods.balanceOf(account).call();
            setContent(res += '<br>' + res2)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const sendContract = async () => {
        try {
            const result = contract.methods.approve(account, 1000).send({ from: account });
            const resevent = new PromiseEvent(result);
            const res = await resevent.onTransactionHash();
            setContent(res);
            const confrim = await resevent.onConfrim();
            notification.success({ message: 'Metamask', description: 'Transaction Confirm' })
            setContent(JSON.stringify(confrim));
        } catch (error) {
            console.log(error);
            notification.error({ message: 'Metamask', description: "Transaction Error " })
        }
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
                    <br />
                    <pre>{showContent}</pre>
                    <Group>
                        <Button onClick={initContract}> Init Contract</Button>
                        {hasContract &&
                            <Button onClick={callContract}> call </Button>
                        }
                        {
                            hasContract && <Button onClick={sendContract}>Send</Button>
                        }
                    </Group>
                    <Form>

                    </Form>
                </div>
            }
        </div>
    );
}

// contract abi
var abi = [
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "burnSelfToken",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "_decimals",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
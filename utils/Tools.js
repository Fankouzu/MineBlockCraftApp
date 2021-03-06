import { aesDecrypt } from './Aes'
import 'ethers/dist/shims.js'
import { ethers } from 'ethers'
import bip39 from 'react-native-bip39'
import { networks } from './networks'
const HDWallet = require('ethereum-hdwallet')
//const isBuffer = require('is-buffer')
ethers.errors.setLogLevel('error')

const etherscanApi = 'MIQDQDRUD5XENBPYQ8HAB3GJP2Z6T8ZZ1J'
export function mnemonicToAddress(mnemonic, n) {
    const seed = bip39.mnemonicToSeed(mnemonic.trim())
    const hdwallet = HDWallet.fromSeed(seed)
    return `0x${hdwallet.derive('m/44\'/60\'/0\'/0/' + n).getAddress().toString('hex')}`
}
export function mnemonicToPrivate(mnemonic, n) {
    const seed = bip39.mnemonicToSeed(mnemonic.trim())
    const hdwallet = HDWallet.fromSeed(seed)
    return hdwallet.derive('m/44\'/60\'/0\'/0/' + n).getPrivateKey().toString('hex')
}
export function jsNumberForAddress(address) {
    const addr = address.slice(2, 10)
    const seed = parseInt(addr, 16)
    return seed
}

export function lngDetector(word) {
    var regex = new RegExp('^([a-z]{0,200})$')
    return regex.test(word.replace(/ /g, ''))
}

var chinese_simplified = require('../assets/chinese_simplified.json')
export function validateMnemonic(mnemonic) {
    if (mnemonic !== '') {
        if (lngDetector(mnemonic)) {
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.EN)
        } else {
            return bip39.validateMnemonic(mnemonic.replace(/ /g, '').split('').join(' '), chinese_simplified)
        }
    } else {
        return false
    }
}
export function mnemonicToEntropy(mnemonic) {
    if (mnemonic !== '') {
        if (lngDetector(mnemonic)) {
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.EN)
        } else {
            return bip39.mnemonicToEntropy(mnemonic.replace(/ /g, '').split('').join(' '), chinese_simplified)
        }
    } else {
        return false
    }
}

export function randMnemonic(mnemonic) {
    let randMnemonic = mnemonic.split(' ')
    let newArr = []
    let len = randMnemonic.length
    for (var i = 0; i < len; i++) {
        let index = Math.floor(Math.random() * randMnemonic.length)
        newArr.push(randMnemonic[index])
        randMnemonic.splice(index, 1)
    }
    randMnemonic = [...newArr, ...randMnemonic]
    return randMnemonic
}
export function validatePasswordMnemonic(password, encrypt) {
    if (!password || !encrypt) {
        console.log('encrypt || password Error!')
        return false
    } else {
        let mnemonic = aesDecrypt(encrypt, password)
        console.log('mnemonic:' + mnemonic)
        var bool = validateMnemonic(mnemonic)
        if (!bool) {
            console.log('Mnemonic Error!')
            return false
        } else {
            return mnemonic
        }
    }
}

export function getAccounts(mnemonic) {
    const accounts = []
    for (let i = 0; i < 10; i++) {
        accounts[i] = {
            address: mnemonicToAddress(mnemonic, i),
            balance: 0,
        }
    }
    return accounts
}
export async function getTxList(networkName, address) {
    const ethapi = require('etherscan-api-cn').init(etherscanApi, networkName, 10000)
    try {
        let txlist_ = await ethapi.account.txlist(address, 4000000, 'latest')
        let txlist = txlist_.result.reverse()

        if (txlist.length > 0) {
            for (var i = 0; i < txlist.length; i++) {
                if (txlist[i].to === '') {
                    txlist[i].Type = 'Deploy'
                    txlist[i].icon = txlist[i].contractAddress
                } else if (txlist[i].to === address) {
                    txlist[i].Type = 'TxRecive'
                    txlist[i].icon = txlist[i].from
                } else {
                    if (txlist[i].input === '0x') {
                        txlist[i].Type = 'Send'
                        txlist[i].value = txlist[i].value * -1
                        txlist[i].icon = txlist[i].to
                    } else if (txlist[i].input.substr(0, 10) === '0xa9059cbb') {
                        txlist[i].Type = 'SendTokens'
                        txlist[i].contractAddress = txlist[i].to
                        txlist[i].icon = '0x' + txlist[i].input.slice(34, 74)
                    } else {
                        txlist[i].Type = 'ContractCall'
                        txlist[i].value = txlist[i].value > 0 ? txlist[i].value * -1 : txlist[i].value
                        txlist[i].icon = txlist[i].to
                    }
                }
                txlist[i].value = Math.round(txlist[i].value / 100000000000000) / 10000 + 'ETH'
                txlist[i].gasFee = Math.round((txlist[i].gasUsed * txlist[i].gasPrice / 1000000000000000000) * 100000) / 100000
            }
            return { error: 1, result: txlist }
        } else {
            return { error: 0 }
        }
    } catch (e) {
        console.log('TCL: getTxList -> e', e)
        if (e === 'No transactions found') {
            return { error: 0 }
        } else {
            return { error: -1 }
        }
    }
}
function inArray(search, array) {
    for (var i in array) {
        if (array[i] === search) {
            return true;
        }
    }
    return false;
}
export async function getTokens(networkName, address) {
    const ethapi = require('etherscan-api-cn').init(etherscanApi, networkName, 10000)
    try {
        let tokentx_ = await ethapi.account.tokentx(address)
        let tokentx = tokentx_.result.reverse()

        let contractAddress = []
        let result = []

        if (tokentx.length > 0) {
            for (var i = 0; i < tokentx.length; i++) {
                if (!inArray(tokentx[i].contractAddress, contractAddress)) {
                    var balance = await ethapi.account.tokenbalance(address, '', tokentx[i].contractAddress)
                    tokentx[i].balance = balance.result / Math.pow(10, tokentx[i].tokenDecimal)
                    result.push(tokentx[i])
                    contractAddress.push(tokentx[i].contractAddress)
                }
            }
            return { error: 1, result: result }
        } else {
            return { error: 0 }
        }
    } catch (e) {
        console.log('TCL: getTokens -> e', e)
        if (e === 'No transactions found') {
            return { error: 0 }
        } else {
            return { error: -1 }
        }
    }
}

export async function getTokenTx(networkName, address, contractAddress) {
    const ethapi = require('etherscan-api-cn').init(etherscanApi, networkName, 10000)
    try {
        let tokentx_ = await ethapi.account.tokentx(address, contractAddress)
        let tokentx = tokentx_.result.reverse()

        if (tokentx.length > 0) {
            var balance_ = await ethapi.account.tokenbalance(address, '', contractAddress)
            var balance = ethers.utils.formatEther(balance_.result) * 10 / 10
            return { error: 1, result: tokentx, balance: balance }
        } else {
            return { error: 0 }
        }
    } catch (e) {
        console.log('TCL: getTokens -> e', e)
        if (e === 'No transactions found') {
            return { error: 0 }
        } else {
            return { error: -1 }
        }
    }
}
//const gasLimit = 21000
export function gasPrice(networkName) {
    return new Promise((resolve, reject) => {
        fetch('https://ethgasstation.info/json/ethgasAPI.json')
            .then((result) => {
                // 网络请求成功，处理请求到的数据
                resolve(result.json())
            })
            .catch((error) => {
                // 网络请求失败，处理错误信息
                reject(error)
            })
    })

}
export async function ethprice() {
    const ethapi = require('etherscan-api-cn').init(etherscanApi, 'mainnet', 3000)
    return await ethapi.stats.ethprice()
}
export async function sendTransaction(to, networkName, mnemonic, currentAccount, value, gasLimit, myGasprice, note) {
    let infuraProvider = new ethers.providers.InfuraProvider(networkName)
    let privateKey = mnemonicToPrivate(mnemonic, currentAccount)
    let wallet = new ethers.Wallet(privateKey, infuraProvider)
    let code = await infuraProvider.getCode(to)
    let nonce = await wallet.getTransactionCount()
    let data = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(note))
    let _value = value === 0 ? 0 : ethers.utils.parseEther(value)
    if (code !== '0x') { throw new Error('目标地址不能是合约地址') }

    var myGasfee = myGasprice * 1000000000

    let transaction = {
        nonce: nonce,
        gasLimit: gasLimit,
        gasPrice: ethers.utils.bigNumberify(myGasfee),
        to: to,
        value: _value,
        data: data,
        chainId: ethers.utils.getNetwork(networkName).chainId,
    }
    let tx = await wallet.sendTransaction(transaction)
    return tx
}
export async function Deploy(networkName, mnemonic, currentAccount, abi, bytecode, param) {
    let infuraProvider = new ethers.providers.InfuraProvider(networkName)
    let privateKey = mnemonicToPrivate(mnemonic, currentAccount)
    let wallet = new ethers.Wallet(privateKey, infuraProvider)
    let factory = new ethers.ContractFactory(abi, bytecode, wallet)

    try {
        let contract = await factory.deploy(param.initialSupply, param.name, param.symbol, param.decimals)
        //console.log('contract:',contract)
        //let tx = await contract.deployed()
        return {error:0,contract:contract}
    } catch (e) {
        console.log('Deploy:', e)
        if (e.toString().indexOf('insufficient funds') !== -1){
            return {error:-1}
        } else {
            return {error:-2}
        }
    }

}
export async function getBalance(address, networkName) {
    let infuraProvider = new ethers.providers.InfuraProvider(networkName)
    let balanceBN = await infuraProvider.getBalance(address)
    let balance = ethers.utils.formatEther(balanceBN)
    return balance
}


export function checkPasswordLevel(value, level) {
    // 0： 表示第一个级别 1：表示第二个级别 2：表示第三个级别
    // 3： 表示第四个级别 4：表示第五个级别
    var arr = [], array = [1, 2, 3, 4];
    if (value.length < 8 || value.length > 20) {//最初级别
        return 0;
    }
    if (/\d/.test(value)) {//如果用户输入的密码 包含了数字
        arr.push(1);
    }
    if (/[a-z]/.test(value)) {//如果用户输入的密码 包含了小写的a到z
        arr.push(2);
    }
    if (/[A-Z]/.test(value)) {//如果用户输入的密码 包含了大写的A到Z
        arr.push(3);
    }
    if (/\W/.test(value)) {//如果是非数字 字母 下划线
        arr.push(4);
    }
    for (var i = 0; i < level; i++) {
        if (arr.indexOf(array[i]) === -1) {
            return array[i];
        }
    }
    return level;
}

//const {Contract,Wallet,getDefaultProvider} = ethers

export function initContract(networkName, contractAddress, abi) {
    let infuraProvider = new ethers.providers.InfuraProvider(networkName)
    return new ethers.Contract(contractAddress, abi, infuraProvider)
}
export function openContract(networkName, mnemonic, currentAccount, contractAddress, abi) {
    let infuraProvider = new ethers.providers.InfuraProvider(networkName)
    let privateKey = mnemonicToPrivate(mnemonic, currentAccount)
    let wallet = new ethers.Wallet(privateKey, infuraProvider);
    return new ethers.Contract(contractAddress, abi, wallet)
}
const ENS = require('ethjs-ens')
export function getENS(networkId) {
    let infuraProvider = new ethers.providers.InfuraProvider(networks[networkId].name)
    console.log('infuraProvider', infuraProvider)
    try {

        const ens = new ENS({ infuraProvider, network: '3' })
        console.log('ens', ens)
        return ens
    } catch (e) {
        console.log(e)
    }

}
import { aesDecrypt } from './Aes'
import { ethers } from 'ethers'
import bip39 from 'react-native-bip39'
const HDWallet = require('ethereum-hdwallet')
const isBuffer = require('is-buffer');
export function mnemonicToAddress(mnemonic, n) {
    var seed = bip39.mnemonicToSeed(mnemonic.trim())
    const hdwallet = HDWallet.fromSeed(seed)
    return `0x${hdwallet.derive(`m/44'/60'/0'/0/` + n).getAddress().toString('hex')}`
}
export function mnemonicToPrivate(mnemonic, n) {
    const hdwallet = HDWallet.fromMnemonic(mnemonic)
    return hdwallet.derive(`m/44'/60'/0'/0/` + n).getPrivateKey().toString('hex')
}
export function jsNumberForAddress(address) {
    const addr = address.slice(2, 10)
    const seed = parseInt(addr, 16)
    return seed
}

export function lngDetector(word) {
    var regex = new RegExp("^([a-z]{0,200})$")
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
        console.log("encrypt || password Error!")
        return false
    } else {
        let mnemonic = aesDecrypt(encrypt, password)
        console.log('mnemonic:' + mnemonic)
        var bool = validateMnemonic(mnemonic)
        if (!bool) {
            console.log("Mnemonic Error!")
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
            balance: 0
        }
    }
    return accounts
}
export async function getTxList(networkName, address) {
    const ethapi = require('etherscan-api-cn').init('MIQDQDRUD5XENBPYQ8HAB3GJP2Z6T8ZZ1J', networkName, 10000)
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
                        txlist[i].icon = '0x'+txlist[i].input.slice(34,74)
                    } else {
                        txlist[i].Type = 'ContractCall'
                        txlist[i].value = txlist[i].value > 0 ? txlist[i].value * -1 : txlist[i].value
                        txlist[i].icon = txlist[i].to
                    }
                }
                txlist[i].value = Math.round(txlist[i].value / 100000000000000) / 10000 + `ETH`
                txlist[i].gasFee = Math.round((txlist[i].gasUsed * txlist[i].gasPrice / 1000000000000000000) * 100000) / 100000
            }
            return {error:1,result:txlist}
        } else {
            return {error:0}
        }
    } catch (e) {
        console.log("TCL: getTxList -> e", e)
        if(e === 'No transactions found'){
            return {error:0}
        }else{
            return {error:-1}
        }
    }
}
const gasLimit = 21000
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
    const ethapi = require('etherscan-api-cn').init('MIQDQDRUD5XENBPYQ8HAB3GJP2Z6T8ZZ1J', 'mainnet', 3000)
    let ethprice = await ethapi.stats.ethprice()
    return ethprice
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
        chainId: ethers.utils.getNetwork(networkName).chainId
    }
    let tx = await wallet.sendTransaction(transaction)
    return tx
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

export function initContract(networkName,contractAddress,abi){
    let infuraProvider = new ethers.providers.InfuraProvider(networkName)
    return new ethers.Contract(contractAddress,abi,infuraProvider)
}
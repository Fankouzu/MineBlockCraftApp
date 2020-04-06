const DappJson = [
    {
        name: 'mainnet',
        dapps: [{
            name: 'EthereumDapp',
            icon: require('../assets/ethereum.png'),
            color: '#690',
        }],
    },
    {
        name: 'ropsten',
        dapps: [{
            name: 'EthereumDapp',
            icon: require('../assets/ethereum.png'),
            color: '#aaa',
        }],
    },
    {
        name: 'rinkeby',
        dapps: [{
            name: 'EthereumDapp',
            icon: require('../assets/ethereum.png'),
            color: '#aaa',
        }],
    },
    {
        name: 'kovan',
        dapps: [{
            name: 'EthereumDapp',
            icon: require('../assets/ethereum.png'),
            color: '#aaa',
        }],
    },
]


import React from 'react'
//import EthereumDapp from './EthereumDapp'

function Dapps(props) {
    const DappName = props.navigation.getParam('DappName')

    // switch (DappName) {
    //     case 'EthereumDapp':
    //         return (
    //             <EthereumDapp
    //                 navigation={props.navigation}
    //             />
    //         )
    // }
}


export { Dapps, DappJson }

import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import Topbar from '../Components/Topbar'
import { I18n } from '../../i18n'
import Jazzicon from '@novaviva/react-native-jazzicon'
import Ripple from 'react-native-material-ripple'
import { ScrollView } from 'react-native-gesture-handler'
import { getTokens } from '../../utils/Tools'
import { networks } from '../../utils/networks'

class Erc20 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            toAddress: '',
            address: '',
            messages: [],
            ViewHeight: global.screenHeight,
            typeMsg: '',
            tokenTx: { error: -2 },
        }
    }

    componentDidMount = async () => {

        const { accounts, currentAccount, networkId } = this.props.WalletReducer
        getTokens(networks[networkId].name, accounts[currentAccount].address).then((tokenTx) => {
            this.setState({ tokenTx: tokenTx })
        })
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ backgroundColor: '#ededed', height: '100%' }}>
                <Topbar
                    onPress={() => { navigate('MainScreen') }}
                    titleTxt={I18n.t('MyToken')}
                />
                <View style={styles.Middle}>
                    {this.state.tokenTx.error === -2 ? (
                        <Text style={styles.tokenEmpty}>
                            {I18n.t('TxLoading')}
                        </Text>
                    ) : this.state.tokenTx.error === -1 ? (
                        <Text style={styles.tokenEmpty}>{I18n.t('netError')}</Text>
                    ) : this.state.tokenTx.error === 0 ? (
                        <Text style={styles.tokenEmpty}>{I18n.t('TokenEmpty')}</Text>
                    ) : (
                                    <ScrollView
                                        contentContainerStyle={styles.ScrollView}
                                        ref={(ref) => this.ScrollView = ref}
                                    >
                                        <View style={[styles.listItem, { height: 30 }]}>
                                            <View style={styles.listLeft}>
                                                <View style={styles.jazzIcon} />
                                                <Text style={[styles.tokenName, { fontSize: 12 }]}>
                                                    {I18n.t('TokenName')}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.balance, { fontSize: 12, lineHeight: 30 }]}>{I18n.t('Balance')}</Text>
                                            </View>
                                        </View>
                                        {this.state.tokenTx.result.map((item, index) => {
                                            return (
                                                <Ripple
                                                    style={styles.listItem}
                                                    onPress={() => { navigate('Token', { contractAddress: item.contractAddress }) }}
                                                >
                                                    <View style={styles.listLeft}>
                                                        <View style={styles.jazzIcon}>
                                                            <Jazzicon size={20} address={item.contractAddress} />
                                                        </View>
                                                        <Text style={styles.tokenName}>
                                                            {item.tokenName}
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.balance}>{item.balance} {item.tokenSymbol}</Text>
                                                    </View>
                                                </Ripple>
                                            )
                                        })}
                                    </ScrollView>
                                )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Middle: {
        backgroundColor: '#ededed',
        marginTop: 45,
    },
    tokenEmpty: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        lineHeight: 45,
    },
    ScrollView: {
        justifyContent: 'flex-start',
    },
    listItem: {
        height: 55,
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#999',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    listLeft: {
        flexDirection: 'row',
    },
    jazzIcon: {
        width: 20,
        justifyContent: 'center',
        marginRight: 10,
    },
    tokenName: {
        color: '#333',
        fontSize: 14,
        textAlignVertical: 'center',
    },
    balance: {
        fontSize: 14,
        textAlignVertical: 'center',
        lineHeight: 55,
    },
})

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Erc20)

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Title from '../../Components/Title'
import LoadingDot from '../../Ethereum/Components/LoadingDot'
import Jazzicon from '@novaviva/react-native-jazzicon'
import MyCard from '../../Components/MyCard'
import { I18n } from '../../../i18n'

class Sending extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount = () => {
        this.setState({ sendTx: I18n.t('Sending') })
        setTimeout(() => {
        }, 2000)
    }
    componentDidUpdate(nextProps, nextState) {
        if (nextState.sendTx !== this.state.sendTx) {
            return true
        } else if (nextState.receipt !== this.state.receipt) {
            return true
        } else {
            return false
        }
    }
    render() {
        return (
            <View>
                <MyCard
                    screenWidth={global.screenWidth}
                    margin={0.05}
                    top={10}
                    style={{ padding: 10, alignItems: 'center' }}>
                    <Title titleText={I18n.t('SendTitle')} style={styles.Title} />
                    <View style={styles.divide} />

                    <View style={styles.TxView}>
                        <View style={styles.jazzIcon}><Jazzicon size={30} address={this.props.TokenReducer.fromAddress} /></View>
                        <LoadingDot />
                        <View style={styles.jazzIcon}><Jazzicon size={30} address={this.props.TokenReducer.toAddress} /></View>
                    </View>
                    <View style={styles.msgView}>
                        <View style={styles.msg}>
                            <Text style={styles.msgTxt}>{I18n.t('SendTransaction')}:</Text>
                            <Text style={styles.msgTxt}>{this.props.sendTx}</Text>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.msgTxt}>{I18n.t('WaitConfirm')}:</Text>
                            <Text style={styles.msgTxt}>{this.props.receipt}</Text>
                        </View>
                    </View>
                </MyCard>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        height: 36,
        textAlignVertical: 'center',
        color: '#333',
    },
    divide: {
        borderWidth: 0.35,
        borderColor: '#000',
        borderRadius: 1,
        borderStyle: 'dashed',
        marginBottom: 10,
        width: '100%',
    },
    jazzIcon: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TxView: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 100,
    },
    msgView: {
        width: 200,
    },
    msg: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    msgTxt: {
        color: '#333',
    },
})
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Sending)

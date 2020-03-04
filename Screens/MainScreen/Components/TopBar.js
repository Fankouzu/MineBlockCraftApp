import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import AwesomeButton from 'react-native-really-awesome-button'
import MyButton from '../../Components/MyButton'
import Jazzicon from '@novaviva/react-native-jazzicon'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { I18n } from '../../../i18n'
import { networks } from '../../../utils/networks'
import * as actions from '../../../actions'

function TopBar(props) {
    return (
        <View style={styles.topView}>
            <View style={{ height: 30, width: global.screenWidth * 0.15, paddingLeft: 15 }}>
                <AwesomeButton
                    size='small'
                    backgroundActive='#666'
                    backgroundColor='#fff'
                    backgroundDarker='#666'
                    backgroundShadow='transparent'
                    backgroundPlaceholder='#666'
                    borderColor='#666'
                    borderWidth={0.5}
                    activeOpacity={0.5}
                    borderRadius={16}
                    raiseLevel={2}
                    height={32}
                    width={30}
                    onPress={() => { props.OpenProfile() }}
                >
                <Icon name="account-network" size={20}/>
                </AwesomeButton>
            </View>
            <View style={{ height: 30, width: global.screenWidth * 0.7, paddingLeft: 15, alignItems: 'center' }}>
                <MyButton
                    screenWidth={150}
                    height={32}
                    raiseLevel={2}
                    borderRadius={16}
                    text={'🔗' + I18n.t(networks[props.WalletReducer.networkId].name)}
                    backgroundColor='#fc0'
                    backgroundDarker='#960'
                    backgroundActive='#ff0'
                    textColor='#333'
                    borderColor='#960'
                    borderWidth={1}
                    textSize={12}
                    letterSpacing={0}
                    onPress={() => { props.setNetworkModalVisiable(true) }}
                />
            </View>
            <TouchableOpacity onPress={props.openControlPanel}>
                <View
                    style={{
                        height: 30,
                        width: global.screenWidth * 0.15,
                        paddingRight: 15,
                        alignItems: 'flex-end'
                    }}
                >
                    <View style={styles.JazziconView}>
                        <Jazzicon size={28} address={props.WalletReducer.accounts[props.WalletReducer.currentAccount].address} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    topView: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 15,
        height: 50,
        flex: 0
    },
    JazziconView: {
        borderWidth: 0.5,
        borderColor: '#333',
        borderRadius: 16,
        width: 32,
        height: 32,
        padding: 1.5,
        backgroundColor: '#fff'
    }
})

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setNetworkModalVisiable: (value) => dispatch(actions.setNetworkModalVisiable(value)),
})
export default connect(mapStateToProps,mapDispatchToProps)(TopBar)


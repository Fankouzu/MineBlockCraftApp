import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import AwesomeButton from 'react-native-really-awesome-button'
import { DappJson } from '../../../Dapps'
import { I18n } from '../../../i18n'

function Appview(props) {
    const { networkId } = props.WalletReducer

    const { navigate } = props.navigation
    return (
        <View style={styles.AppView}>
            <Text style={styles.AppViewTitle}>{I18n.t('AppViewTitle')}</Text>
            <View style={{ flexDirection: 'row' }}>
                <AwesomeButton
                    backgroundActive='#fff'
                    backgroundColor='#fff'
                    backgroundDarker='#390'
                    backgroundShadow='transparent'
                    borderColor='#390'
                    borderWidth={1}
                    activeOpacity={0.5}
                    borderRadius={10}
                    raiseLevel={3}
                    height={90}
                    width={60}
                    style={styles.AppCard}
                    onPress={() => { navigate('Ethereum') }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{ width: 40, height: 60 }}
                            source={require('../../../assets/ethereum.png')}
                        />
                        <Text style={styles.AppName}>{I18n.t('EthereumDapp')}</Text>
                    </View>
                </AwesomeButton>
                <AwesomeButton
                    backgroundActive='#fff'
                    backgroundColor='#fff'
                    backgroundDarker='#390'
                    backgroundShadow='transparent'
                    borderColor='#390'
                    borderWidth={1}
                    activeOpacity={0.5}
                    borderRadius={10}
                    raiseLevel={3}
                    height={90}
                    width={60}
                    style={styles.AppCard}
                    onPress={() => { navigate('Ethereum') }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{ width: 40, height: 60 }}
                            source={require('../../../assets/eth_logo.png')}
                        />
                        <Text style={styles.AppName}>{I18n.t('EthereumDapp')}</Text>
                    </View>
                </AwesomeButton>
                {/* {DappJson[networkId].dapps.map((item, key) => {
                    return (
                        <AwesomeButton
                            backgroundActive='#fff'
                            backgroundColor='#fff'
                            backgroundDarker={item.color}
                            backgroundShadow='transparent'
                            borderColor={item.color}
                            borderWidth={1}
                            activeOpacity={0.5}
                            borderRadius={10}
                            raiseLevel={3}
                            height={90}
                            width={60}
                            style={styles.AppCard}
                            onPress={() => {navigate('Dapps',{'DappName':item.name}) }}
                        >
                            <View style={{alignItems:'center'}}>
                                <Image
                                    style={{ width: 40, height: 60 }}
                                    source={item.icon}
                                />
                                <Text style={styles.AppName}>{I18n.t(item.name)}</Text>
                            </View>
                        </AwesomeButton>
                    )
                })} */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    AppViewTitle: {
        color: '#666',
        marginBottom: 10,
        paddingLeft: 5
    },
    AppView: {
        marginVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        width: '100%',
    },
    AppCard: {
        marginRight:10
    },
    AppName: {
        fontSize: 10,
        marginTop: 2,
        color: '#666'
    }
})
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Appview)
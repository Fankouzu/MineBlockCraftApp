import React from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import MyCard from '../components/MyCard'
import MyTabView from '../components/MyTabView'
import MyButton from '../components/MyButton'
import MyBackButton from '../components/MyBackButton'
import { randMnemonic } from '../utils/Tools'
import { I18n,countryCode } from '../i18n/'

const styles = StyleSheet.create({
    alert: {
        marginBottom: 10
    },
    alertText: {
        color: '#f00',
        textAlign: 'center',
        fontSize: countryCode==='CN' ? 14:12,
    }
})
function Mnemonic(props) {
    const { navigate } = props.navigation

    changeLang = (index) => {
        if(countryCode==='CN'){
            if (index === 0) {
                props.setLang('cn')
                props.setRandomMnemonic(randMnemonic(props.LoginReducer.mnemonicCn))
            } else {
                props.setLang('en')
                props.setRandomMnemonic(randMnemonic(props.LoginReducer.mnemonicEn))
            }
        }else{
            if (index === 0) {
                props.setLang('en')
                props.setRandomMnemonic(randMnemonic(props.LoginReducer.mnemonicEn))
            } else {
                props.setLang('cn')
                props.setRandomMnemonic(randMnemonic(props.LoginReducer.mnemonicCn))
            }
        }
    }
    return (
        <View style={{ flexDirection: 'column' }}>
            <MyBackButton
                onPress={() => navigate('WelcomeNav')}
            />
            <MyCard
                screenWidth={global.screenWidth}
                margin={0.05}
                top={0}
                padding={0}
            >
                <MyTabView
                    changeLang={changeLang}
                />
                <View style={styles.alert}>
                    <Text style={styles.alertText}>
                        {I18n.t('MnemonicAlertTxt')}
                            </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <MyButton
                        screenWidth={global.screenWidth * 0.9 - 30}
                        text={I18n.t('NextStep')}
                        height={50}
                        backgroundColor='#6f0'
                        backgroundDarker='#390'
                        textColor='#000'
                        borderColor='#390'
                        borderWidth={1}
                        onPress={() => props.turnPage(1)}
                    />
                </View>
            </MyCard>
        </View>
    )
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setLang: (value) => dispatch(actions.setLang(value)),
    setRandomMnemonic: (value) => dispatch(actions.setRandomMnemonic(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Mnemonic)

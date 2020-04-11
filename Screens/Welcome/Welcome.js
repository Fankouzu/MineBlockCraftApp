import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Title from '../Components/Title'
import MyButton from '../Components/MyButton'
import MyCard from '../Components/MyCard'
import {I18n,countryCode} from '../../i18n'

function Welcome(props) {
    const { navigate } = props.navigation
    return (
        <MyCard
            screenWidth={global.screenWidth}
            margin={0.05}
            top={60}
            height={160}
        >
            <Title titleText={I18n.t('AppName')} subText={I18n.t('SubTitle')} fontSize={countryCode === 'CN' ? 30 : 26} />
            {props.WalletReducer.encrypt ? (
                <MyButton
                    screenWidth={global.screenWidth * 0.9 - 30}
                    height={50}
                    borderRadius={15}
                    text={'😃' + I18n.t('NextStep')}
                    backgroundColor="#6f0"
                    backgroundDarker="#390"
                    textColor="#000"
                    borderColor="#390"
                    borderWidth={1}
                    textSize={I18n.t('WelcomeButtonFontSize')}
                    onPress={() => props.turnPage(1)}
                />
            ) : (
                    <View style={{ flexDirection: 'row' }}>
                        <MyButton
                            screenWidth={global.screenWidth * 0.45 - 20}
                            height={50}
                            borderRadius={15}
                            text={I18n.t('ImportAccount')}
                            backgroundColor="#fc0"
                            backgroundDarker="#960"
                            backgroundActive="#ff0"
                            textColor="#000"
                            borderColor="#960"
                            borderWidth={1}
                            textSize={I18n.t('WelcomeButtonFontSize')}
                            onPress={() => navigate('ImportNav')}
                            textFont={countryCode === 'CN' ? 'BigYoungMediumGB2.0' : 'nomal'}
                            style={{ marginRight: 5 }}
                        />
                        <MyButton
                            screenWidth={global.screenWidth * 0.45 - 20}
                            height={50}
                            borderRadius={15}
                            text={I18n.t('CreateAccount')}
                            backgroundColor="#6f0"
                            backgroundDarker="#390"
                            textColor="#000"
                            borderColor="#390"
                            borderWidth={1}
                            textSize={I18n.t('WelcomeButtonFontSize')}
                            textFont={countryCode === 'CN' ? 'BigYoungMediumGB2.0' : 'nomal'}
                            onPress={() => navigate('CreateNav')}
                            style={{ marginLeft: 5 }}
                        />
                    </View>
                )
            }
        </MyCard>
    )
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)

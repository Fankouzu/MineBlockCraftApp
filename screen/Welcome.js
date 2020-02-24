import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Title from '../components/Title'
import MyButton from '../components/MyButton'
import MyCard from '../components/MyCard'

function Welcome(props) {
    const { navigate } = props.navigation
    return (
        <MyCard
            screenWidth={global.screenWidth}
            margin={0.05}
            top={60}
            height={160}
        >
            <Title titleText='币神钱包' subText='帅到没朋友' />
            {props.WalletReducer.encrypt !== '' && props.WalletReducer.encrypt !== undefined ? (
                <MyButton
                    screenWidth={global.screenWidth * 0.9 - 30}
                    height={50}
                    borderRadius={15}
                    text='😃下一步'
                    backgroundColor='#6f0'
                    backgroundDarker='#390'
                    textColor='#000'
                    borderColor='#390'
                    borderWidth={1}
                    textSize={20}
                    onPress={() => props.turnPage(1)}
                />
            ) : (
                    <View style={{ flexDirection: 'row' }}>
                        <MyButton
                            screenWidth={global.screenWidth * 0.45 - 20}
                            height={50}
                            borderRadius={15}
                            text='📲导入钱包'
                            backgroundColor='#fc0'
                            backgroundDarker='#960'
                            backgroundActive='#ff0'
                            textColor='#000'
                            borderColor='#960'
                            borderWidth={1}
                            textSize={20}
                            onPress={() => navigate('ImportNav')}
                            style={{ marginRight: 5 }}
                        />
                        <MyButton
                            screenWidth={global.screenWidth * 0.45 - 20}
                            height={50}
                            borderRadius={15}
                            text='💰创建钱包'
                            backgroundColor='#6f0'
                            backgroundDarker='#390'
                            textColor='#000'
                            borderColor='#390'
                            borderWidth={1}
                            textSize={20}
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
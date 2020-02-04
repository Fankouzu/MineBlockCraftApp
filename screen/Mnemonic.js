import React from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import MyCard from '../components/MyCard'
import MyTabView from '../components/MyTabView'
import MyButton from '../components/MyButton'
import MyBackButton from '../components/MyBackButton'

const styles = StyleSheet.create({
    alert: {
        marginBottom: 10
    },
    alertText: {
        color: '#f00',
        textAlign: 'center'
    }
})

export default class Mnemonic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
    }
    render() {
        const { navigate } = this.props.navigation
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
                        mnemonic_zh={this.props.mnemonic_zh}
                        mnemonic_en={this.props.mnemonic_en}
                        changeLang={this.props.changeLang}
                    />
                    <View style={styles.alert}>
                        <Text style={styles.alertText}>
                            ⚠️抄写或保存助记词，然后进行下一步⚠️
                            </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <MyButton
                            screenWidth={global.screenWidth * 0.9 - 30}
                            text='下一步'
                            height={50}
                            backgroundColor='#6f0'
                            backgroundDarker='#390'
                            textColor='#000'
                            borderColor='#390'
                            borderWidth={1}
                            onPress={() => this.props.turnPage(1)}
                        />
                    </View>
                </MyCard>
            </View>
        )
    }
}
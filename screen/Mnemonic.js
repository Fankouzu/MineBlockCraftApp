import React from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Text
} from 'react-native'
import Logo from '../components/Logo'
import Title from '../components/Title'
import Copyright from '../components/Copyright'
import MyTabView from '../components/MyTabView'
import MyButton from '../components/MyButton'
//import bip39 from 'react-native-bip39'


const screenWidth = Dimensions.get('window').width

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        width: 0.8 * width,
        marginLeft: 0.1 * width,
        marginRight: 0.1 * width,
        flex: 1
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 5,
    },
    bottomLink: {
        color: '#4c91d4'
    }
})

export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //mnemonic_zh: bip39.generateMnemonic(128, null, bip39.wordlists.chinese_simplified),
            //mnemonic_en: bip39.generateMnemonic(128, null, bip39.wordlists.english)
        }
    }
    componentDidMount() {

    }//
    handleSubmit = () => {
        console.log('ok')
    }
    render() {
        const walletLogo = require(`../assets/bishen-wallet2x.png`)

        return (
            <ScrollView>
                <View style={styles.container} >
                    <Logo />
                    <Title titleText='助记词' />
                    <MyTabView
                        mnemonic_zh={this.state.mnemonic_zh}
                        mnemonic_en={this.state.mnemonic_en}
                    />

                    <MyButton
                        screenWidth={screenWidth}
                        handleSubmit={this.handleSubmit}
                    />
                    <View style={styles.bottom}>
                        <Text style={styles.bottomLink}>导入钱包</Text>
                        <Text style={styles.bottomLink}>创建钱包</Text>
                    </View>
                    <Copyright />
                </View>
            </ScrollView>
        )
    }
}
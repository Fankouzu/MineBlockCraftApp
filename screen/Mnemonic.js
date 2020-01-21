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
import bip39 from 'react-native-bip39'
var chinese_simplified = require('../assets/chinese_simplified.json')


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
            mnemonic_zh: '',
            mnemonic_en: ''
        }
    }
    componentDidMount() {
        bip39.generateMnemonic(128, null, bip39.wordlists.EN).then((res)=>{
            this.setState({mnemonic_en:res})
        })
        bip39.generateMnemonic(128, null, chinese_simplified).then((res)=>{
            this.setState({mnemonic_zh:res})
        })
    }//
    handleSubmit = () => {
        console.log('ok')
    }
    render() {
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
                        text='下一步'
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
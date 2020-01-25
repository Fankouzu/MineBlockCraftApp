import React from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    ImageBackground,
    Text
} from 'react-native'
import MyCard from '../components/MyCard'
import Copyright from '../components/Copyright'
import MyTabView from '../components/MyTabView'
import MyButton from '../components/MyButton'
import bip39 from 'react-native-bip39'
var chinese_simplified = require('../assets/chinese_simplified.json')


const screenWidth = Dimensions.get('window').width

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        width: 0.9 * width,
        marginLeft: 0.05 * width,
        marginRight: 0.05 * width,
        marginTop: 100,
        flex: 1
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
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
        bip39.generateMnemonic(128, null, bip39.wordlists.EN).then((res) => {
            this.setState({ mnemonic_en: res })
        })
        bip39.generateMnemonic(128, null, chinese_simplified).then((res) => {
            this.setState({ mnemonic_zh: res })
        })
    }//
    handleSubmit = () => {
        console.log('ok')
    }
    render() {
        return (
            <ImageBackground source={require('../assets/welcome3x.png')} style={{ width: '100%', height: '100%' }}>
                <ScrollView>
                    <MyCard
                        screenWidth={screenWidth}
                        margin={0.05}
                        top={100}
                    >
                        <MyTabView
                            mnemonic_zh={this.state.mnemonic_zh}
                            mnemonic_en={this.state.mnemonic_en}
                        />
                        <MyButton
                            screenWidth={screenWidth * 0.9 - 30}
                            handleSubmit={this.handleSubmit}
                            text='下一步'
                            height={50}
                            backgroundColor='#6f0'
                            backgroundDarker='#390'
                            textColor='#000'
                            borderColor='#390'
                            borderWidth={1}
                        />
                        <View style={styles.bottom}>
                            <Text style={styles.bottomLink}>导入钱包</Text>
                            <Text style={styles.bottomLink}>创建钱包</Text>
                        </View>
                        <Copyright />
                    </MyCard>
                    <Copyright />
                </ScrollView>
            </ImageBackground>
        )
    }
}
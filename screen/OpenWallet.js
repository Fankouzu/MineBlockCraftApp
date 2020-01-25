import React from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    ImageBackground,
    Animated
} from 'react-native'
import Copyright from '../components/Copyright'
import MyTextInput from '../components/MyTextInput'
import MyCheckBox from '../components/MyCheckBox'
import MyButton from '../components/MyButton'
import MyCard from '../components/MyCard'

const screenWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
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
            password: '',
            checked: false,
            top: new Animated.Value(100)
        }
    }
    componentDidMount() {

    }
    handleTypePassword = (password) => {
        this.setState({ password: password })
    }
    handleCheck = (checked) => {
        this.setState({ checked: checked })
    }
    handleSubmit = () => {
        console.log('ok')
    }
    handleKeybordMargin = (action) => {
        Animated.timing(this.state.top, {
            toValue: action === 'up' ? 50 : 100,
            duration: 200
        }).start()
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <ImageBackground source={require('../assets/welcome3x.png')} style={{ width: '100%', height: '100%' }}>
                <Animated.View
                    style={{ marginTop: this.state.top }}
                >
                    <MyCard
                        screenWidth={screenWidth}
                        margin={0.05}
                    >
                        <MyTextInput
                            handleTypePassword={this.handleTypePassword}
                            handleKeybordMargin={this.handleKeybordMargin}
                            borderColor='#390'
                        />
                        <MyCheckBox
                            handleCheck={this.handleCheck}
                            checkedCheckBoxColor='#390'
                        />
                        <MyButton
                            screenWidth={screenWidth * 0.9 - 30}
                            handleSubmit={this.handleSubmit}
                            text='打开钱包'
                            height={50}
                            backgroundColor='#6f0'
                            backgroundDarker='#390'
                            textColor='#000'
                            borderColor='#390'
                            borderWidth={1}
                        />
                        <View style={styles.bottom}>
                            <Text style={styles.bottomLink}>导入钱包</Text>
                            <TouchableOpacity onPress={() => navigate('Mnemonic')}>
                                <Text style={styles.bottomLink}>创建钱包</Text>
                            </TouchableOpacity>
                        </View>
                    </MyCard>
                </Animated.View>
                <Copyright />
            </ImageBackground>
        )
    }
}
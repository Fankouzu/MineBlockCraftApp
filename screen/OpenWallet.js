import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated
} from 'react-native'
import MyTextInput from '../components/MyTextInput'
import MyCheckBox from '../components/MyCheckBox'
import MyButton from '../components/MyButton'
import MyCard from '../components/MyCard'
import Title from '../components/Title'

const styles = StyleSheet.create({
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    bottomLink: {
        color: '#390'
    }
})
export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            checked: false,
            top: new Animated.Value(50)
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
    handleKeybordMargin = (action) => {
        Animated.timing(this.state.top, {
            toValue: action === 'up' ? 50 : 50,
            duration: 200
        }).start()
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ flexDirection: 'column'}}>
                <MyButton
                    text='<'
                    screenWidth={25}
                    height={26}
                    backgroundColor='#fff'
                    backgroundDarker='#666'
                    textColor='#000'
                    borderColor='#666'
                    borderWidth={1}
                    raiseLevel={2}
                    borderRadius={25}
                    style={{ margin: global.screenWidth * 0.05 }}
                    textSize={10}
                    onPress={() => this.props.turnPage(-1)}
                />
                <Animated.View
                >
                    <MyCard
                        screenWidth={global.screenWidth}
                        margin={0.05}
                    >
                        <Title titleText='币神钱包' />
                        <MyTextInput
                            handleTypePassword={this.handleTypePassword}
                            handleKeybordMargin={this.handleKeybordMargin}
                            placeholder='输入密码'
                            borderColor='#999'
                            borderColorActive='#390'
                        />
                        <MyCheckBox
                            handleCheck={this.handleCheck}
                            checkedCheckBoxColor='#390'
                        />
                        <MyButton
                            screenWidth={global.screenWidth * 0.9 - 30}
                            onPress={()=>{this.props.handleSubmit(this.state.password,this.state.checked)}}
                            text='打开钱包'
                            height={50}
                            backgroundColor='#6f0'
                            backgroundDarker='#390'
                            textColor='#000'
                            borderColor='#390'
                            borderWidth={1}
                            textSize={20}
                        />
                        <View style={styles.bottom}>
                            <TouchableOpacity onPress={() => navigate('ImportNav')}>
                            <Text style={styles.bottomLink}>导入钱包</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigate('CreateNav')}>
                                <Text style={styles.bottomLink}>创建钱包</Text>
                            </TouchableOpacity>
                        </View>
                    </MyCard>
                </Animated.View>
            </View>
        )
    }
}
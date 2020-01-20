import React from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native'
import Copyright from '../components/Copyright'
import Logo from '../components/Logo'
import Title from '../components/Title'
import MyTextInput from '../components/MyTextInput'
import MyCheckBox from '../components/MyCheckBox'
import MyButton from '../components/MyButton'

const screenWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        width: 0.8 * screenWidth,
        marginLeft: 0.1 * screenWidth,
        marginRight: 0.1 * screenWidth,
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
            password: '',
            checked:false
        }
    }
    componentDidMount() {
        
    }
    handleTypePassword = (password) => {
        this.setState({password:password})
    }
    handleCheck = (checked) => {
        this.setState({checked:checked})
    }
    handleSubmit = () => {
        console.log('ok')
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container} >
                <Logo/>
                <Title titleText='币神钱包'/>
                <MyTextInput 
                    handleTypePassword={this.handleTypePassword}
                />
                <MyCheckBox 
                    handleCheck={this.handleCheck}
                />
                <MyButton 
                    screenWidth={screenWidth}
                    handleSubmit={this.handleSubmit}
                />
                <View style={styles.bottom}>
                    <Text style={styles.bottomLink}>导入钱包</Text>
                    <TouchableOpacity onPress={() => navigate('Mnemonic')}>
                        <Text style={styles.bottomLink}>创建钱包</Text>
                    </TouchableOpacity>
                </View>
                <Copyright />
            </View>
        )
    }
}
import React from 'react'
import {
    Dimensions,
    ImageBackground
} from 'react-native'
import Copyright from '../components/Copyright'
import Title from '../components/Title'
import MyButton from '../components/MyButton'
import MyCard from '../components/MyCard'

const screenWidth = Dimensions.get('window').width

export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            checked: false
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
    render() {
        const { navigate } = this.props.navigation
        return (
            <ImageBackground source={require('../assets/welcome3x.png')} style={{ width: '100%', height: '100%' }}>
                <MyCard 
                    screenWidth={screenWidth}
                    margin={0.05}
                    top={100}
                >
                    <Title titleText='币神钱包' subText='帅到没朋友' />
                    <MyButton
                        screenWidth={screenWidth * 0.9 - 30}
                        height={50}
                        borderRadius={15}
                        handleSubmit={this.handleSubmit}
                        text='😃下一步'
                        backgroundColor='#6f0'
                        backgroundDarker='#390'
                        textColor='#000'
                        borderColor='#390'
                        borderWidth={1}
                        onPress={() => navigate('Open')}
                    />
                </MyCard>
                        <Copyright />
            </ImageBackground>
        )
    }
}
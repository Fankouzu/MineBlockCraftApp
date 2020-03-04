import React from 'react'
import { Animated } from 'react-native'
import ImportMnemonic from './ImportMnemonic'
import Password from '../Password'
import MyBackground from '../Components/MyBackground'

export default class ImportNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leftAnim: new Animated.Value(0),
            page:0,
        }
    }
    componentDidMount() {
        this.turnPage(0)
    }
    turnPage = (index) => {
        Animated.timing(this.state.leftAnim, {
            toValue: global.screenWidth * (this.state.page + index) * -1,
            duration: 200
        }).start(()=>{
            this.setState({ page:this.state.page + index })
        })
    }
    render() {
        return (
            <MyBackground>
                <Animated.View style={{
                    marginLeft:this.state.leftAnim,
                    flexDirection: 'row',
                }}>
                    <ImportMnemonic
                        navigation={this.props.navigation}
                        turnPage={this.turnPage}
                    />
                    <Password
                        navigation={this.props.navigation}
                        turnPage={this.turnPage}
                    />
                </Animated.View>
            </MyBackground>
        )
    }
}
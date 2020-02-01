import React from 'react'
import Title from '../components/Title'
import MyButton from '../components/MyButton'
import MyCard from '../components/MyCard'

export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {

    }
    render() {
        return (
            <MyCard
                screenWidth={global.screenWidth}
                margin={0.05}
                top={60}
                height={160}
            >
                <Title titleText='币神钱包' subText='帅到没朋友' />
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
                    onPress={() => this.props.turnPage(1)}
                />
            </MyCard>
        )
    }
}
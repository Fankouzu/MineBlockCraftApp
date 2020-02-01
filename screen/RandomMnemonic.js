import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Animated
} from 'react-native'
import MyCard from '../components/MyCard'
import Copyright from '../components/Copyright'
import MyButton from '../components/MyButton'
import { randMnemonic } from '../utils/Tools'

const styles = StyleSheet.create({
    alert: {
        marginBottom: 10
    },
    alertText: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 10
    },
    wordButtonView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10
    },
    wordButton: {
        margin: 10
    },
    wordSelectView: {
        height: 140,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingTop: 10
    },
    wordSelect: {
        margin: 10,
        textAlign: 'center'
    }
})

const alertText = '⚠️请按照正确的顺序选择助记词⚠️'
const alertColor = '#999'
export default class RandomMnemonic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            useMnemonic: this.props.useMnemonic,
            wordDisplay: [],
            mnemonic: [],
            shakeLeft: new Animated.Value(global.screenWidth * 0.05),
            alertText: alertText,
            alertColor: alertColor,
            randMnemonic: []
        }
    }
    componentDidMount() {
        this.setState({
            randMnemonic: randMnemonic(this.state.useMnemonic)
        })
    }
    componentDidUpdate(nextProps, nextState) {
        if (nextProps.useMnemonic !== this.state.useMnemonic) {
            this.setState({
                useMnemonic: nextProps.useMnemonic,
                randMnemonic: randMnemonic(nextProps.useMnemonic)
            })
            return true
        } else if (this.props.useMnemonic !== this.state.useMnemonic) {
            this.setState({
                useMnemonic: this.props.useMnemonic,
                randMnemonic: randMnemonic(this.props.useMnemonic)
            })
            return true
        }
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    addWord = (index) => {
        var randMnemonic = this.state.randMnemonic
        var mnemonic = this.state.mnemonic
        var wordDisplay = this.state.wordDisplay
        wordDisplay[index] = 'none'
        if (mnemonic.indexOf(randMnemonic[index]) === -1) {
            mnemonic.push(randMnemonic[index])
        }
        this.setState({ wordDisplay: wordDisplay, mnemonic: mnemonic })
    }
    removeWord = (index) => {
        var mnemonic = this.state.mnemonic
        var randMnemonic = this.state.randMnemonic
        var wordDisplay = this.state.wordDisplay
        var newArr = []
        for (var i = 0; i < mnemonic.length; i++) {
            if (i !== index) {
                newArr.push(mnemonic[i])
            }
        }
        if (randMnemonic.indexOf(mnemonic[index]) !== -1) {
            wordDisplay[randMnemonic.indexOf(mnemonic[index])] = 'flex'
        }
        this.setState({ wordDisplay: wordDisplay, mnemonic: newArr })
    }
    shake = () => {
        var duration = 100
        this.setState({
            alertText: '⚠️助记词顺序不正确⚠️',
            alertColor: '#f30'
        })
        Animated.sequence([
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.02,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.08,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.03,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.05,
                duration: duration
            })
        ]).start(() => {
            setTimeout(() => {
                this.setState({
                    alertText: alertText,
                    alertColor: alertColor
                })
            }, 3000);

        })
    }
    handleSubmit = () => {
        if (this.state.mnemonic.length === 12 && this.state.mnemonic.join(' ') === this.state.useMnemonic) {
            this.props.turnPage(1)
        } else {
            this.shake()
        }
    }
    render() {
        return (
            <View style={{ flexDirection: 'column' }}>
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
                <Animated.View style={{
                    marginLeft: this.state.shakeLeft
                }}>
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                        top={0}
                        padding={0}
                    >
                        <View style={styles.wordSelectView}>
                            {this.state.mnemonic.map((item, index) => {
                                return (
                                    <Text
                                        key={index}
                                        style={[styles.wordSelect, {
                                            fontSize: this.props.lang === 'zh' ? 20 : 16,
                                            fontFamily: this.props.lang === 'zh' ? 'BigYoungMediumGB2.0' : 'console',
                                            width: (global.screenWidth * 0.9 / 4) - 24,
                                        }]}
                                        onPress={() => { this.removeWord(index) }}
                                    >
                                        {item}
                                    </Text>)
                            })}
                        </View>
                        <View style={styles.alert}>
                            <Text style={[styles.alertText, { color: this.state.alertColor }]}>
                                {this.state.alertText}
                            </Text>
                        </View>
                    </MyCard>
                </Animated.View>
                <View style={
                    [styles.wordButtonView,
                    {
                        width: global.screenWidth * 0.9,
                        marginLeft: global.screenWidth * 0.05,
                        marginRight: global.screenWidth * 0.05
                    }]
                }>
                    {this.state.randMnemonic.map((item, index) => {
                        return (
                            <MyButton
                                key={index}
                                screenWidth={80}
                                text={item}
                                height={30}
                                backgroundColor='#fff'
                                backgroundDarker='#666'
                                textColor='#000'
                                borderColor='#666'
                                raiseLevel={2}
                                borderWidth={1}
                                textSize={this.props.lang === 'zh' ? 20 : 10}
                                textFont={this.props.lang === 'zh' ? 'BigYoungMediumGB2.0' : 'console'}
                                style={styles.wordButton, { display: this.state.wordDisplay[index] || 'flex', margin: 10 }}
                                onPress={() => { this.addWord(index) }}
                            />
                        )
                    })}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <MyButton
                        screenWidth={global.screenWidth * 0.9}
                        text='下一步'
                        height={50}
                        backgroundColor='#6f0'
                        backgroundDarker='#390'
                        textColor='#000'
                        borderColor='#390'
                        borderWidth={1}
                        onPress={() => { this.handleSubmit() }}
                    />
                </View>
            </View>
        )
    }
}
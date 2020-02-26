import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Animated
} from 'react-native'
import {connect} from 'react-redux'
import MyCard from '../components/MyCard'
import MyButton from '../components/MyButton'
import MyBackButton from '../components/MyBackButton'
import AlertText from '../components/AlertText'

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

const alertText = ['⚠️请按照正确的顺序选择助记词⚠️']
const alertColor = '#999'


class RandomMnemonic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wordDisplay: [],
            mnemonic: [],
            shakeLeft: new Animated.Value(global.screenWidth * 0.05),
            alertText: alertText,
            alertColor: alertColor,
        }
    }
    componentDidMount() {
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    addWord = (index) => {
        var randomMnemonic = this.props.LoginReducer.randomMnemonic
        var mnemonic = this.state.mnemonic
        var wordDisplay = this.state.wordDisplay
        wordDisplay[index] = 'none'
        if (mnemonic.indexOf(randomMnemonic[index]) === -1) {
            mnemonic.push(randomMnemonic[index])
        }
        this.setState({ wordDisplay: wordDisplay, mnemonic: mnemonic })
    }
    removeWord = (index) => {
        var mnemonic = this.state.mnemonic
        var randomMnemonic = this.props.LoginReducer.randomMnemonic
        var wordDisplay = this.state.wordDisplay
        var newArr = []
        for (var i = 0; i < mnemonic.length; i++) {
            if (i !== index) {
                newArr.push(mnemonic[i])
            }
        }
        if (randomMnemonic.indexOf(mnemonic[index]) !== -1) {
            wordDisplay[randomMnemonic.indexOf(mnemonic[index])] = 'flex'
        }
        this.setState({ wordDisplay: wordDisplay, mnemonic: newArr })
    }
    shake = () => {
        var duration = 100
        this.setState({
            alertText: ['⚠️助记词顺序不正确⚠️'],
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
        if (this.state.mnemonic.length === 12 && this.state.mnemonic.join(' ') === this.props.LoginReducer.useMnemonic) {
            this.props.turnPage(1)
        } else {
            this.shake()
        }
    }
    render() {
        return (
            <View style={{ flexDirection: 'column' }}>
                <MyBackButton
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
                                            fontSize: this.props.LoginReducer.lang === 'cn' ? 20 : 12,
                                            fontFamily: this.props.LoginReducer.lang === 'cn' ? 'BigYoungMediumGB2.0' : 'InputMono light',
                                            width: (global.screenWidth * 0.9 / 4) - 24,
                                        }]}
                                        onPress={() => { this.removeWord(index) }}
                                    >
                                        {item}
                                    </Text>)
                            })}
                        </View>
                        <AlertText
                            alertText={this.state.alertText}
                            alertColor={this.state.alertColor}
                        />
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
                    {this.props.LoginReducer.randomMnemonic.map((item, index) => {
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
                                textSize={this.props.LoginReducer.lang === 'cn' ? 20 : 12}
                                textFont={this.props.LoginReducer.lang === 'cn' ? 'BigYoungMediumGB2.0' : 'InputMono light'}
                                style={[styles.wordButton, { display: this.state.wordDisplay[index] || 'flex', margin: 10 }]}
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
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps,mapDispatchToProps)(RandomMnemonic)
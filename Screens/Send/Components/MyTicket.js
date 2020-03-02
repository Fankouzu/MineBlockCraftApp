import React from 'react'
import { View, StyleSheet, Animated, Easing, PanResponder,Keyboard } from 'react-native'
import PropTypes from 'prop-types'

export default class MyTicket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bounciness: -50,
            viewHeight: this.props.height,
            scrollTop: new Animated.Value(this.props.height * -1),
            begin: false,
            children: null,
            step: 0,
            rollTo:0
        }
    }
    rollUp = (rollTo) => {
        Animated.timing(this.state.scrollTop, {
            toValue: rollTo,
            duration: 400,
        }).start(() => {
            this.setState({rollTo:rollTo})
        })
    }
    pageIn = (delay) => {
        Animated.timing(this.state.scrollTop, {
            toValue: 0,
            duration: 800,
            easing: Easing.bounce,
            delay: delay
        }).start(() => {
        })
    }
    pageOut = () => {
        Animated.timing(this.state.scrollTop, {
            toValue: this.state.viewHeight * -1,
            duration: 300
        }).start(() => {
            this.setState({
                children: this.props.children,
                step: this.props.step
            })
            this.pageIn(300)
        })
    }
    //https://reactnative.cn/docs/0.45/panresponder/
    _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            Keyboard.dismiss()
            if (gestureState.dy * -1 > this.state.bounciness && gestureState.dy * -1 < this.state.viewHeight - 150) {
                return Animated.event(
                    [null, { dy: this.state.scrollTop }]
                )(evt, gestureState)
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            Animated.timing(this.state.scrollTop, {
                toValue: 0,
                duration: 500,
                easing: Easing.elastic(1)
            }).start(() => {
            })
        }
    })
    componentDidUpdate(nextProps, nextState) {
        if (this.props.step !== this.state.step) {
            this.pageOut()
            return true
        }
        if (nextProps.children !== nextState.children || this.props.children !== nextState.children) {
            this.setState({children:this.props.children})
            return true
        }
        if (this.props.rollTo !== this.state.rollTo) {
            this.rollUp(this.props.rollTo)
            return true
        }
    }
    componentDidMount() {
        this.setState({
            children: this.props.children,
            step: this.props.step
        })
        this.pageIn(1000)
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <View>
                <View
                    style={{
                        width: this.props.screenWidth * (1 - this.props.margin * 2),
                        borderWidth: 0.5,
                        borderColor: '#666',
                        backgroundColor: '#fff',
                        borderRadius: 6.5,
                        paddingVertical: 6.5,
                        paddingHorizontal: 8,
                        marginTop: this.props.top,
                        flex: 0,
                    }}
                >
                    <View
                        style={{
                            borderTopColor: '#333',
                            borderBottomColor: '#666',
                            borderLeftColor: '#333',
                            borderRightColor: '#333',
                            borderWidth: 3,
                            backgroundColor: '#fff',
                            borderRadius: 3,
                            height: 6,
                            flex: 0,
                        }}
                    >
                    </View>
                </View>
                <View
                    style={{
                        overflow: 'hidden',
                        marginTop: -10,
                        paddingBottom: 10,
                        position: 'relative',
                        height: this.state.viewHeight
                    }}>
                    <Animated.View
                        {...this._panResponder.panHandlers}
                        style={{ position: 'absolute', top: this.state.scrollTop }}>
                        <View
                            style={[styles.MyTicket,
                            {
                                width: this.props.screenWidth * (1 - this.props.margin * 2) - 24,
                                marginLeft: this.props.screenWidth * this.props.margin + 12,
                                marginRight: this.props.screenWidth * this.props.margin + 12,
                                padding: this.props.padding,
                                marginTop: this.state.bounciness,
                            }, this.props.style]}>
                            {this.state.children}
                        </View>
                    </Animated.View>
                </View>
            </View>
        )
    }
}

MyTicket.defaultProps = {
    top: 0,
    margin: 0.1,
    children: null,
    padding: 15
}
MyTicket.propTypes = {
    screenWidth: PropTypes.number.isRequired,
    margin: PropTypes.number,
    top: PropTypes.number,
    padding: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.node
}
const styles = StyleSheet.create({
    MyTicket: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 15,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
            height: 10,
            width: 10
        },
        flex: 0,
        paddingTop: 60
    }
})
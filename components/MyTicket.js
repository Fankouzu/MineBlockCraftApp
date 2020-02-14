import React from 'react'
import { View, StyleSheet, Animated, Easing, PanResponder } from 'react-native'
import PropTypes from 'prop-types'

export default function MyTicket(props) {
    const bounciness = -50
    const viewHeight = props.height
    const scrollTop = new Animated.Value(viewHeight * -1)
    const animateRef = React.useRef()
    const [begin, setBegin] = React.useState(false)
    const [viewTop, setViewTop] = React.useState(bounciness)
    const [children, setChildren] = React.useState(props.children)

    const pageIn = () => {
        Animated.timing(scrollTop, {
            toValue: bounciness,
            duration: 500,
            easing: Easing.bounce
        }).start(() => {
            scrollTop.setValue(bounciness)
        })
    }
    const pageOut = () => {
        scrollTop.setValue(viewTop)
        Animated.timing(scrollTop, {
            toValue: viewHeight * -1,
            duration: 300
        }).start(() => {
            setViewTop(viewHeight * -1)
            setChildren(props.children)
            pageIn()
        })
    }

    // const turnPage = () => {
    //     scrollTop.setValue(viewTop)
    //     Animated.sequence([
    //         Animated.timing(scrollTop, {
    //             toValue: viewHeight * -1,
    //             duration: 300
    //         }).start(() => {
    //             setChildren(props.children)
    //             console.log('out', bounciness)
    //         }),
    //         Animated.spring(scrollTop, {
    //             toValue: bounciness,
    //             bounciness: 10,
    //             speed: 20
    //         }).start(() => {
    //             console.log('in', bounciness)
    //         })
    //     ]).start(() => {
    //         console.log('finish', bounciness)
    //     })
    // }

    React.useEffect(() => {
        if (begin) {
            console.log('===============================begin===============================')
            pageIn()
        }
    }, [begin])

    React.useEffect(() => {
        setTimeout(() => {
            console.log('==============================setBegin================================')
            setBegin(true)
        }, 1000)
    }, [])

    React.useEffect(() => {
        console.log(props.step)
        if (props.step > 0) {
            console.log('===============================Out===============================')
            pageOut()
        }
    }, [props.step])


    //https://reactnative.cn/docs/0.45/panresponder/
    const _panResponder = PanResponder.create({
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            // viewTop = bounciness ~ 0 ~ -490
            // scrollTop = (-520 ~ -30±8) ~ (bounciness ~ 0 ~ -490) 
            // up+ down-
            if (viewTop + gestureState.dy > 0) {
                setViewTop(0)
            } else if (viewTop + gestureState.dy < viewHeight * -1 + 60) {
                setViewTop(viewHeight * -1 + 60)
            } else {
                setViewTop(viewTop + gestureState.dy)
            }
            scrollTop.setValue(viewTop)
        },
        onPanResponderRelease: (evt, gestureState) => {
            scrollTop.setValue(viewTop)
            if (viewTop < bounciness) {
                Animated.timing(scrollTop, {
                    toValue: bounciness,
                    duration: 500,
                    easing: Easing.elastic(1)
                }).start(() => {
                    setViewTop(bounciness)
                })
            } else {
                Animated.timing(scrollTop, {
                    toValue: bounciness,
                    duration: 500,
                    easing: Easing.elastic(3)
                }).start(() => {
                    setViewTop(bounciness)
                })
            }
        }
    })
    return (
        <View>
            <View
                style={{
                    width: props.screenWidth * (1 - props.margin * 2),
                    borderWidth: 0.5,
                    borderColor: '#666',
                    backgroundColor: '#fff',
                    borderRadius: 6.5,
                    paddingVertical: 6.5,
                    paddingHorizontal: 8,
                    marginTop: props.top,
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
                    height: viewHeight
                }}>
                <View
                    {..._panResponder.panHandlers}
                    style={{ position: 'absolute', }}>
                    <Animated.View
                        ref={animateRef}
                        style={[styles.MyTicket,
                        {
                            width: props.screenWidth * (1 - props.margin * 2) - 24,
                            marginLeft: props.screenWidth * props.margin + 12,
                            marginRight: props.screenWidth * props.margin + 12,
                            padding: props.padding,
                            marginTop: scrollTop,
                        }, props.style]}>
                        {children}
                    </Animated.View>
                </View>
            </View>
        </View>
    )
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
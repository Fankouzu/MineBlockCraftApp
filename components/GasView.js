import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { networks } from '../utils/networks'
import { gasPrice } from '../utils/Tools'
import { Switch } from '@rn-components-kit/switch'
import Slider from "react-native-slider"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function GasView(props) {
    const [myGasprice, setMyGassprice] = React.useState(props.myGasprice)
    const [myGasfeeJson, setMyGasfeeJson] = React.useState({
        average: 0,
        safeLow: 0,
        fastest: 0,
    })
    const [gasusd, setGasusd] = React.useState(0)

    React.useEffect(() => {
        gasPrice(networks[global.wallet.networkId].nameEN).then(function (res) {
            setMyGasfeeJson(res)
            if (myGasprice === 0) {
                setMyGassprice(res.average)
                props.handleSetGasprice(res.average)
            }
        })
    }, [])
    const [advance, setAdvance] = React.useState(false)
    const [sliderHeight, setSliderHeight] = React.useState(0)
    const setAdvanceSwitch = (value) => {
        setAdvance(value)
        if (value) {
            setSliderHeight(40)
        } else {
            setSliderHeight(0)
        }
    }
    React.useEffect(() => {
        var gasusd = Math.round(Math.round(myGasprice * 21) / 1000000 * props.ethprice * 1000) / 1000
        setGasusd(gasusd)
    }, [myGasprice, props.ethprice])
    const handleSetGasprice = (myGasprice) => {
        myGasprice = Math.round(myGasprice * 100) / 100
        setMyGassprice(myGasprice)
        props.handleSetGasprice(myGasprice)
    }

    const GetLength = (str) => {
        var realLength = 0, len = str.length, charCode = -1
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i)
            if (charCode >= 0 && charCode <= 128) realLength += 1
            else realLength += 2
        }
        return realLength
    }
    const [gasLimit, setGasLimit] = React.useState(props.initGasLimit)
    React.useEffect(() => {
        let note = props.note
        let strlen = GetLength(note)
        setGasLimit(parseInt(props.initGasLimit) + strlen * 24)
        props.handleSetGasLimit(parseInt(props.initGasLimit) + strlen * 24)
    }, [props.note])
    return (
        <View>
            <View style={styles.top}>
                <View style={styles.actBtnView}>
                    <View style={styles.actBtn}>
                        <Icon
                            name='gas-station'
                            size={18}
                            color='#060'
                            style={{ marginRight: 5, marginVertical: 5 }}
                        />
                        <Text style={styles.actTxt}>燃料费上限</Text>
                    </View>
                </View>
                <View style={styles.option}>
                    <Switch
                        width={30}
                        height={10}
                        thumbRadius={8}
                        trackOnColor={'#390'}
                        type={'material'}
                        onValueChange={(value) => { setAdvanceSwitch(value) }}
                        value={advance}
                        style={{ marginVertical: 6.5, marginRight: 5 }}
                    />
                    <Text style={styles.titleText}>高级</Text>
                </View>
            </View>
            <View style={{ height: sliderHeight }}>
                <View style={styles.sliderView}>
                    <Icon
                        name='tortoise'
                        size={18}
                        color='#999'
                        style={{ marginRight: 5 }}
                    />
                    <Slider
                        minimumValue={myGasfeeJson.safeLow}
                        maximumValue={myGasfeeJson.fast}
                        value={myGasfeeJson.average}
                        step={1}
                        minimumTrackTintColor='#390'
                        trackStyle={{ backgroundColor: '#ddd' }}
                        thumbStyle={styles.sliderThumbStyle}
                        style={styles.slider}
                        onValueChange={handleSetGasprice}
                    />
                    <Icon
                        name='rabbit'
                        size={18}
                        color='#999'
                        style={{ marginLeft: 5 }}
                    />
                </View>
            </View>
            <View style={styles.middle} >
                <View style={styles.gasRowView}>
                    <View style={styles.gasPriceView}>
                        <Text style={styles.gasLimit}>Gas Price  {myGasprice} Gwei</Text>
                        <Text style={styles.gasLimit}>Gas Limit  {gasLimit}</Text>
                    </View>
                    <View style={styles.gasPriceView}>
                        <View style={styles.myGasPrice}>
                            <Text style={styles.unit}>Ether:</Text>
                            <Text style={styles.myGasfee}>{Math.round(myGasprice * 21) / 1000000}</Text>
                        </View>
                        <Text style={styles.ethprice}>≈ $ {gasusd}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    middle: {
    },
    actBtnView: {
        flexDirection: 'row',
    },
    actBtn: {
        flexDirection: 'row',
    },
    actTxt: {
        color: '#333',
        fontSize: 14,
        textAlignVertical: 'center',
    },
    gasRowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    gasPriceView: {
        borderColor: '#999',
        borderRadius: 5,
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 15,
        width: '45%',
        height: 50
    },
    myGasPrice: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    myGasfee: {
        fontSize: 20,
        color: '#333',
        lineHeight: 26
    },
    ethprice: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
        lineHeight: 14
    },
    unit: {
        fontSize: 12,
        color: '#454545',
        textAlignVertical: 'bottom',
        marginRight: 3,
        lineHeight: 22,
    },
    gasLimit: {
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
    },
    sliderView: {
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#eee',
        marginBottom: 10,
        padding: 5,
        height: 30
    },

    option: {
        flexDirection: 'row',
    },
    titleText: {
        fontSize: 12,
        color: '#333',
        textAlign: 'right',
        textAlignVertical: 'center',
        marginRight: 5
    },
    slider: {
        flex: 1,
        height: 22,
        overflow: 'hidden'

    },
    sliderThumbStyle: {
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2
    }
})

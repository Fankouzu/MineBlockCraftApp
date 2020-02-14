import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { networks } from '../utils/networks'
import { gasPrice } from '../utils/Tools'
import { Switch } from '@rn-components-kit/switch'
import Slider from "react-native-slider"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function GasView(props) {
    const [myGasprice, setMyGassprice] = React.useState(0)
    const [myGasfeeJson, setMyGasfeeJson] = React.useState({
        average: 0,
        safeLow: 0,
        fastest: 0,
    })
    const [gasusd, setGasusd] = React.useState(0)

    React.useEffect(() => {
        gasPrice(networks[global.wallet.networkId].nameEN).then(function (res) {
            console.log(res)
            setMyGasfeeJson(res)
            setMyGassprice(res.average)
            props.handleSetGasprice(res.average)
        })
    }, [])
    const [advance, setAdvance] = React.useState(false)
    const [nomalView, setNomalView] = React.useState(1)
    const [advanceView, setAdvanceView] = React.useState(0)
    const setAdvanceSwitch = (value) => {
        setAdvance(value)
        if (value) {
            setNomalView(0)
            setAdvanceView(1)
        } else {
            setNomalView(1)
            setAdvanceView(0)
        }
    }
    React.useEffect(() => {
        var gasusd = Math.round(Math.round(myGasprice * 21) / 1000000 * props.ethprice * 1000) / 1000
        setGasusd(gasusd)
    }, [myGasprice,props.ethprice])
    const handleSetGasprice = (myGasprice) => {
        myGasprice = Math.round(myGasprice * 100) / 100
        setMyGassprice(myGasprice)
        props.handleSetGasprice(myGasprice)
    }

    return (
        <View style={styles.gasView}>
            <View style={styles.top}>
                <View>
                    <Text style={styles.title}>矿工费上限：</Text>
                </View>
                <View style={styles.option}>
                    <Text style={styles.titleText}>高级</Text>
                    <Switch
                        width={30}
                        height={10}
                        thumbRadius={8}
                        trackOnColor={'#390'}
                        type={'material'}
                        onValueChange={(value) => { setAdvanceSwitch(value) }}
                        value={advance}
                    />
                </View>
            </View>
            <View style={styles.middle} >
                <View style={[styles.advanceNomal, { zIndex: nomalView }]}>
                    <View>
                        <Text style={styles.mul}>x</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.gasLimit}>Gas Price  {myGasprice} Gwei</Text>
                        <Text style={styles.gasLimit}>Gas Limit  21000</Text>
                    </View>
                </View>
                <View style={[styles.advanceNomalGas, { zIndex: advanceView }]}>
                    <Text style={styles.advanceNomalGasTxt}>Gas Price {Math.round(myGasprice * 100) / 100} Gwei</Text>
                </View>
                <View style={[styles.advanceNomal, { zIndex: advanceView }]}>
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
            <View style={styles.gasLine}>
                <Text style={styles.unit}>Ether</Text>
                <Text style={styles.myGasfee}>{Math.round(myGasprice * 21) / 1000000}</Text>
            </View>
            <View>
                <Text style={styles.ethprice}>≈ $ {gasusd}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    gasView: {
        borderColor: '#999',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 5,
        backgroundColor: '#eee',
        padding: 10,
        marginBottom: 15,
        flex: 0
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 12,
        color: '#666',
        lineHeight: 25,
        textAlign: 'right',
        marginRight: 5
    },
    mul: {
        marginTop: 20,
        fontSize: 20,
        color: '#666',
        lineHeight: 28
    },
    gasLine: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        paddingTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#999'
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    advanceNomal: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        backgroundColor: '#eee',
        flex: 0
    },
    advanceNomalGas: {
        flexDirection: 'row',
        flex: 1,
        top: 10,
    },
    advanceNomalGasTxt: {
        lineHeight: 40,
        flex: 1,
        color: '#666',
        textAlign: 'center',
        backgroundColor: '#eee',
        fontSize:12
    },
    middle: {
        height: 40,
        position: 'relative',
        flex: 0
    },
    title: {
        fontSize: 16,
        color: '#666',
        lineHeight: 30
    },
    myGasfee: {
        fontSize: 20,
        color: '#333',
    },
    unit: {
        fontSize: 12,
        color: '#454545',
        textAlignVertical: 'center',
        marginRight: 3,
        lineHeight: 30,
    },
    gasLimit: {
        fontSize: 12,
        color: '#666',
        lineHeight: 25,
        textAlign: 'right'
    },
    ethprice: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right'
    },
    slider: {
        flex: 1,
        height: 22,
        overflow:'hidden'

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

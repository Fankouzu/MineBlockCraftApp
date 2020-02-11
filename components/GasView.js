import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { networks } from '../utils/networks'
import { gasPrice } from '../utils/Tools'
import { Switch } from '@rn-components-kit/switch'
import Slider from "react-native-slider"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function MySlider(props){
    console.log(props)
    return(
        <Slider
                    minimumValue={0}
                    maximumValue={4}
                    value={props.myGasfee}
                    step={0.01}
                    minimumTrackTintColor='#390'
                    trackStyle={{ backgroundColor: '#ddd' }}
                    thumbStyle={{backgroundColor:'#fff'}}
                    style={styles.slider}
                    onValueChange={props.setGaspriceSlider}
                />
    )
}
export default function GasView(props) {
    const [myGasfee, setMyGasfee] = React.useState(0)
    const [gasusd, setGasusd] = React.useState(props.ethprice)

    
    React.useEffect(() => {
        gasPrice(networks[global.wallet.networkId].nameEN).then(function (res) {
            //setMyGasfee(calculateGas(res.result))
            setMyGas(res * 1000000000)
        })
    }, [])
    const [advance, setAdvance] = React.useState(false)
    const [nomalView, setNomalView] = React.useState('flex')
    const [advanceView, setAdvanceView] = React.useState('none')
    const setAdvanceSwitch = (value) => { 
        setAdvance(value)
        if (value) {
            setNomalView('none')
            setAdvanceView('flex')
        } else {
            setNomalView('flex')
            setAdvanceView('none')
        }
    }
    const setGaspriceSlider = (value) => {
        setMyGas(value)
    }

    const setMyGas = (myGasfee) => {
        setMyGasfee(myGasfee)
        var gasusd = Math.round(Math.round(myGasfee * 21) / 1000000 * props.ethprice * 1000) / 1000
        setGasusd(gasusd)
    }
    //Math.round(parseFloat(gasfee) * level[i] * precision)
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
            <View style={[styles.top, { display: nomalView }]}>
                <View>
                    <Text style={styles.mul}>x</Text>
                </View>
                <View>
                    <Text style={styles.gasLimit}>Gas Price  {myGasfee} Gwei</Text>
                    <Text style={styles.gasLimit}>Gas Limit  21000</Text>
                </View>
            </View>
            <View style={[styles.top, { display: advanceView }]}>
                <Icon
                    name='tortoise'
                    size={18}
                    color='#999'
                    style={{ marginRight: 5 }}
                />
                <MySlider
                setGaspriceSlider={setGaspriceSlider}
                myGasfee={myGasfee}
                />
                <Icon
                    name='rabbit'
                    size={18}
                    color='#999'
                    style={{ marginLeft: 5 }}
                />
            </View>
            <View style={styles.gasLine}>
                <Text style={styles.unit}>Ether</Text>
                <Text style={styles.myGasfee}>{Math.round(myGasfee * 21) / 1000000}</Text>
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
        marginBottom: 20
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
        height:20
    }
})

import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Modal from "react-native-modal"
import ListButton from '../components/ListButton'
import { networks } from '../utils/networks'


export default class NetworkModal extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Modal  isVisible={this.props.isModalVisible}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>选择网络</Text>
                    {networks.map((item, index) => {
                        return (
                            <ListButton
                                text={item.nameCN}
                                iconColor={item.color}
                                onPress={() => { this.props.selectNetwork(index)}}
                                key={index}
                            />
                        )
                    })}
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 10
    },
    modalTitle: {
        fontSize: 25,
        color: '#fff',
        marginBottom: 10,
        lineHeight: 40,
        letterSpacing: 2,
        fontFamily: 'BigYoungMediumGB2.0'
    }
})

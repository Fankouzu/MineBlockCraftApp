import React from 'react'
import { connect } from 'react-redux'
import { Text, StyleSheet, View } from 'react-native'
import Modal from "react-native-modal"
import ListButton from '../components/ListButton'
import { networks } from '../utils/networks'


function NetworkModal(props) {

    return (
        <Modal isVisible={props.WalletMain.isNetworkModalVisible}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>选择网络</Text>
                {networks.map((item, index) => {
                    return (
                        <ListButton
                            text={item.nameCN}
                            iconColor={item.color}
                            onPress={() => { props.selectNetwork(index) }}
                            key={index}
                            iconName='flash-circle'
                            width={global.screenWidth * 0.9}
                        />
                    )
                })}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 10,
        overflow: 'hidden'
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
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(NetworkModal)


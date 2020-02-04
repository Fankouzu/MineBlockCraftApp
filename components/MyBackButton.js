import React from 'react'
import MyButton from './MyButton'
import PropTypes from 'prop-types'

export default function MyBackButton(props) {
    return (
        <MyButton
            text='<'
            screenWidth={25}
            height={26}
            backgroundColor='#fff'
            backgroundDarker='#666'
            textColor='#000'
            borderColor='#666'
            backgroundActive='#fff'
            borderWidth={1}
            raiseLevel={2}
            borderRadius={25}
            style={{ margin: global.screenWidth * 0.05 }}
            textSize={10}
            onPress={props.onPress}
        />
    )
}
MyBackButton.propTypes = {
    onPress: PropTypes.func.isRequired
}
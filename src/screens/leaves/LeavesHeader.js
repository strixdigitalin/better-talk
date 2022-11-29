import { View, Text } from 'react-native'
import React from 'react'
import { commonStyles } from '../../utils/styles'
import { Image } from 'react-native'

export default function LeavesHeader() {
    return (
        <View style={{ width: "100%", height: 62, backgroundColor: "#1C67F6", ...commonStyles.rowBetween, paddingHorizontal: 15 }}>
            <Image
                source={require("../../assets/img/menu.png")}
                style={{ width: 28, height: 28, tintColor: "#fff" }}
            />
            <Image
                source={require("../../assets/img/user-pic.png")}
                style={{ width: 35, height: 35 }}
            />
        </View>
    )
}

import { View, Text } from 'react-native'
import React from 'react'
import LeavesHeader from './LeavesHeader'
import { commonStyles } from '../../utils/styles'
import { StyleSheet } from 'react-native'
import { TouchableHighlight } from 'react-native'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'

export default function LeavesScreen({ navigation }) {
    return (
        <View>
            <LeavesHeader />

            <ScrollView style={{ width: "100%", height: "100%" }}>
                <View style={{ alignItems: "center", marginTop: 22 }}>
                    <Text style={{ ...commonStyles.fs14_400, color: "#0073FF" }}>Leaves Available</Text>
                </View>

                <View style={styles.leaveContainer}>
                    <RenderLeaveCount
                        count={0}
                        title={`Sick\nLeave`}
                        bgColor="#E8EBFB"
                        color="#235FDD"
                    />

                    <RenderLeaveCount
                        count={1}
                        title={`Sick\nLeave`}
                        bgColor="#FDF5E3"
                        color="#F3A41D"
                    />

                    <RenderLeaveCount
                        count={0}
                        title={`Casual\nLeave`}
                        bgColor="#FBEEE9"
                        color="#E75E40"
                    />
                </View>

                <TouchableHighlight style={styles.applyBtn} underlayColor="#0073FF"
                    onPress={() => { navigation.navigate("ApplyLeavesScreen") }}
                >
                    <Text style={{ ...commonStyles.fs16_400, color: "#fff" }}>Apply Leave</Text>
                </TouchableHighlight>

                <View style={{ padding: 16 }}>
                    {
                        ["SL", "FL", "PL", "PL", "SL", "FL", "PL", "PL"].map((item, index) => {
                            var bgColor = "";
                            if (item === "SL") {
                                bgColor = "#E8EBFB"
                            } else if (item === "CL") {
                                bgColor = "#F6E9E4"
                            } else if (item === "PL") {
                                bgColor = "#FDF5E3"
                            }
                            return (
                                <View style={[styles.leaveShowContainer, { backgroundColor: bgColor }]} key={index}>
                                    <View style={{ ...commonStyles.rowBetween }}>
                                        <View style={{ ...commonStyles.rowStart }}>
                                            <Text style={{ ...commonStyles.fs16_700, color: "#1C67F6" }}>{item}</Text>
                                            <Image
                                                source={require("../../assets/img/check.png")}
                                                style={{ width: 12, height: 12, marginLeft: 4 }}
                                            />
                                        </View>
                                        <Text style={{ ...commonStyles.fs12_400 }}>09/04/22</Text>
                                    </View>
                                    <Text style={{ ...commonStyles.fs14_500 }}>Fullday</Text>
                                    <Text style={{ ...commonStyles.fs14_500 }}>Reason: I feel sick so i want leave</Text>
                                </View>
                            );
                        })
                    }
                </View>

                <View style={{ height: 70 }} />
            </ScrollView>
        </View>
    )
}

const RenderLeaveCount = ({ count, title, bgColor, color }) => {
    return (
        <View style={{ ...styles.leaveCount, backgroundColor: bgColor }}>
            <Text style={{ ...commonStyles.fs26_700, color: color }}>{count}</Text>
            <Text style={{ ...commonStyles.fs14_500, textAlign: "center", color: color }}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    leaveContainer: {
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 22
    },
    leaveCount: {
        width: "31%",
        padding: 10,
        alignItems: "center",
        paddingVertical: 30,
        borderRadius: 12,
    },
    applyBtn: {
        width: "50%", height: 40,
        backgroundColor: "#1C67F6",
        ...commonStyles.centerStyles,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 10,
        alignSelf: "center"
    },
    leaveShowContainer: {
        borderWidth: 1,
        borderColor: "#1C67F6",
        padding: 10,
        borderRadius: 4,
        backgroundColor: "#E8EBFB",
        marginTop: 14,
    }
})
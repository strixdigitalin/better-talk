import { View, Text } from 'react-native'
import React from 'react'
import LeavesHeader from './LeavesHeader'
import { commonStyles } from '../../utils/styles'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import PersonalLeaveDatePicker from '../../components/CustomDatePicker'
import { TextInput } from 'react-native'
import { TouchableHighlight } from 'react-native'

export default function ApplyLeavesScreen({ navigation }) {
    const [shift, setShift] = React.useState("Full-Day")
    const [startDate, setStartDate] = React.useState("")
    const [reason, setReason] = React.useState("");

    const [labelUp, setLabelUp] = React.useState(false);

    const renderFullNameLabel = () => {
        if (reason || labelUp) {
            return (
                <Text
                    style={[
                        styles.label,
                        labelUp &&
                        { color: '#222222', backgroundColor: '#fff', marginLeft: -7 },
                    ]}>
                    Reason
                </Text>
            );
        }
        return null;
    };

    return (
        <View>
            <LeavesHeader />

            <ScrollView style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
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

                <View style={{ paddingHorizontal: 16 }}>
                    <View style={styles.tabContainer}>
                        {
                            ["Full-Day", "Half-Day", "Above a Day"].map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        style={[styles.applyBtn, {
                                            backgroundColor: item === shift ? "#1C67F6" : "#fff"
                                        }]}
                                        onPress={() => { setShift(item) }}
                                    >
                                        <Text style={{ ...commonStyles.fs14_500, color: item === shift ? "#fff" : "#999" }}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </View>

                <View style={{ padding: 16, marginTop: 12 }}>
                    <PersonalLeaveDatePicker
                        placeholderText="Start Date"
                        minimumDate='24-Dec-1900'
                        maximumDate='24-Dec-2200'
                        initialDate={startDate}
                        isStart="yes"
                        onDateSelected={function (selectedStartDate) {
                            setStartDate(moment(selectedStartDate).format('DD-MMM-YYYY'));
                        }}
                    />

                    <View style={{ marginTop: 16 }}>
                        {renderFullNameLabel()}
                        <View style={{ borderWidth: 1, borderColor: '#999', borderRadius: 10 }}>
                            <TextInput
                                value={reason}
                                onChangeText={text => { setReason(text) }}
                                placeholder={labelUp ? '' : 'Reason'}
                                placeholderTextColor="#222222"
                                textAlignVertical='top'
                                style={{
                                    height: 150, fontSize: 14,
                                    color: '#222222',
                                    paddingHorizontal: 16,
                                }}
                                onPressIn={() => { setLabelUp(true) }}
                            />
                        </View>
                    </View>
                    <Text />

                    <TouchableHighlight style={{ ...styles.applyBtn, width: "50%", borderRadius: 50 }} underlayColor="#0073FF"
                        onPress={() => { navigation.navigate("ApplyLeavesScreen") }}
                    >
                        <Text style={{ ...commonStyles.fs16_400, color: "#fff" }}>Submit Request</Text>
                    </TouchableHighlight>
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
    tabContainer: {
        ...commonStyles.rowBetween,
        elevation: 8,
        shadowColor: "#999",
        backgroundColor: "#fff",
        marginTop: 20,
        borderRadius: 8
    },
    applyBtn: {
        width: "33%", height: 40,
        backgroundColor: "#1C67F6",
        ...commonStyles.centerStyles,
        borderRadius: 8,
        alignSelf: "center"
    },
    leaveShowContainer: {
        borderWidth: 1,
        borderColor: "#1C67F6",
        padding: 10,
        borderRadius: 4,
        backgroundColor: "#E8EBFB",
        marginTop: 14,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'transparent',
        left: 22,
        top: -11,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
})
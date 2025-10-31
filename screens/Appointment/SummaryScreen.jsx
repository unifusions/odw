import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MapPinIcon, CalendarIcon, UserIcon, ListBulletIcon } from "react-native-heroicons/outline";
import getGlobalStyles from "../../theme/globalStyles";
import ButtonWrapper from "./ButtonWrapper";
import Card from "../../components/Card";
import { practiseYearCalculator } from "../../helpers/practiseyears";

const SummaryScreen = (
    {
        theme, handlePress, summaryData
    }
) => {

    const gStyles = getGlobalStyles(theme);
    const styles = StyleSheet.create({
        rowContainer: {
            width: "100%",
            display: "flex", flexDirection: "row",
            paddingVertical: 8,
            marginVertical: 8
        },

        infoContainer: {
            marginStart: 16,

        },

        rowTitle: {
            fontFamily: theme.font700,
            marginBottom: 8
        },

        rowSubtitle: {
            color: theme.gray
        }
    });

    const RowItem = ({ title, subTitle, icon }) => {
        return (
            <>
                <View style={styles.rowContainer}>
                    {icon}
                    <View style={styles.infoContainer}>
                        <Text style={styles.rowTitle}>{title}</Text>
                        <Text style={styles.rowSubtitle}>{subTitle}</Text>
                    </View>
                </View>
            </>
        )
    }
    return (
        <>
            <View style={{ flex: 1, marginTop: 16 }}>

                <Text style={gStyles.stepFormScreenTitle}>Appointment Summary</Text>
                <Card>
                    <RowItem
                        icon={<ListBulletIcon color={theme.blue} />}
                        title={summaryData.selectedItems.name ?? ''}
                        subTitle={`STARTS FROM $ ${summaryData.selectedItems.cost ?? ''}`}
                    />

                    <RowItem
                        icon={<MapPinIcon color={theme.blue} />}
                        title={summaryData.selectedClinic.name ?? ''}
                        subTitle={summaryData.selectedClinic.address_line_1 + ', ' + summaryData.selectedClinic.address_line_2}
                    />

                    <RowItem
                        icon={<UserIcon color={theme.blue} />}
                        title={summaryData.selectedDentist.dentist.name}
                        subTitle={`${practiseYearCalculator(summaryData.selectedDentist.dentist.practise_from)} years of practise`}
                    />

                    <RowItem
                        icon={<CalendarIcon color={theme.blue} />}
                        title={summaryData.selectedSlot}
                        subTitle={summaryData.selectedDate}
                    />
                </Card>


            </View>


            <View style={{ flexDirection: "row", paddingBottom: 16 }}>
                <TouchableOpacity style={{ flex: 1, padding: 10, backgroundColor: theme.primary, width: 100, borderColor: theme.primary, borderStyle: "solid", borderWidth: 1, }} onPress={handlePress} >
                    <Text style={{ color: theme.white, textAlign: "center", fontFamily: theme.font600 }}>
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>

        </>

    )
}

export default SummaryScreen;
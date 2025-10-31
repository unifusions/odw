import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function StatusBadge({ status }) {

    const { theme } = useTheme();
    const styles = StyleSheet.create({

        successPill: {
            backgroundColor: theme.successBgSubtle,
            paddingVertical: 2,
            paddingHorizontal: 2,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.successBorderSubtle,

        },
        successText: {
            color: theme.successTextEmphasis,
            fontFamily: theme.font600,
            fontSize: 12,
            paddingHorizontal: 2,
        },

        dangerPill: {
            backgroundColor: theme.dangerBgSubtle,
            paddingVertical: 2,
            paddingHorizontal: 2,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.dangerBorderSubtle,

        },
        dangerText: {
            color: theme.dangerTextEmphasis,
            fontFamily: theme.font600,
            fontSize: 12,
            paddingHorizontal: 2,
        },

        warningPill: {
            backgroundColor: theme.warningBgSubtle,
            paddingVertical: 2,
            paddingHorizontal: 2,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.warningBorderSubtle,

        },
        warningText: {
            color: theme.warningTextEmphasis,
            fontFamily: theme.font600,
            fontSize: 12,
            paddingHorizontal: 2,
        },

        infoPill: {
            backgroundColor: theme.infoBgSubtle,
            paddingVertical: 2,
            paddingHorizontal: 2,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.infoBorderSubtle,

        },
        infoText: {
            color: theme.infoTextEmphasis,
            fontFamily: theme.font600,
            fontSize: 12,
            paddingHorizontal: 2,
        }

    });

    const Success = ({ text }) =>
        <View style={styles.successPill}>
            <Text style={styles.successText}>{text || 'Completed'}</Text>
        </View>

    const Inprogress = ({ text }) =>
        <View style={styles.warningPill}>
            <Text style={styles.warningText}>{text || 'In progress'}</Text>
        </View>

    const Pending = ({ text }) =>
        <View style={styles.dangerPill}>
            <Text style={styles.dangerText}>{text || 'Inprogress'}</Text>
        </View>

    const Info = ({ text }) =>
        <View style={styles.infoPill}>
            <Text style={styles.infoText}>{text || 'Closed'}</Text>
        </View>

    switch (status) {
        case 'answered':
            return (<Success text="Answered" />)
            break;
        case 'in_review':
            return (<Inprogress text="In Review" />)
            break;

        case 'pending':
            return (<Pending text="Pending" />)
            break;
        default:
            return (<Info />)
            break;
    }
 
}   
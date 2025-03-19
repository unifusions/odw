import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('window');

const getGlobalStyles = (theme) =>
    StyleSheet.create({
        safeAreaContainer :{
            flex:1,
            justifyContent: 'flex-start',
            backgroundColor: theme.background,
        },

        container: {
            // flex: 1,
            
            // marginHorizontal:12,
            // marginTop:12,
          
            padding: 20,

        },

        flexJustifyBetween:{
            flex:1,
            justifyContent:'space-between'
        },

        dFlexRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12

        },

        adContainer: {
            height: 130,
            backgroundColor: "#474747",
            marginBottom: 12
        },

        sectionHeading: {
            color: theme.primary,
            fontSize: 16 * 1.3,
            fontFamily: 'Manrope_600SemiBold'
        },

        sectionLink: {
            color: theme.gray,
            fontSize: 13 * 1.3
        },
        appointmentCard: {
            height: (width / 3),
            width: (width / 2) - 32,
            backgroundColor: '#BEC8F9',
            padding: 12,
            borderRadius: 12,
            marginEnd: 6
        },
        compareCard: {
            height: (width / 3),
            width: (width / 2) - 32,
            backgroundColor: '#C9E0DD',
            padding: 12,
            borderRadius: 12,
            marginStart: 6
        },

        text: {
            color: theme.text,
            fontFamily: theme.font,
            fontSize: 18,
        },
        button: {
            backgroundColor: theme.primary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems: "center",
            marginTop: 10,
        },
        cta:{
            backgroundColor: theme.primary,
            paddingVertical: 15,
            paddingHorizontal: 20,
            alignItems: "center",
            marginTop: 10,
        },
        buttonText: {

            color: "#FFF",
            fontSize: 16,
            fontFamily: "Manrope_600SemiBold"
        },

        screenTitle: {
            fontSize: 20,
            color: theme.primary,
            fontFamily: "Manrope_600SemiBold"
        },

        textCenter: {
            textAlign: 'center'
        },

        profileAvatar: {
            height: 168,
            width: 168,
        },
        profileUserName: {
            fontFamily: "Manrope_600SemiBold",
            fontSize: 20,
            marginBottom: 8
        },

        menuItem: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderBottomColor: "#E5E5E5",
        },
        menuText: {
            flex: 1,
            fontSize: 16,
            marginLeft: 10,
            color: "#4A4A4A",
        },
        logoutItem: {
            marginTop: 10,
        },
        logoutText: {
            color: "#E63946",
        },

        dialogModalContainer: {
            backgroundColor: "white",
            padding: 20,
            paddingBottom: 40,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: "center",
        },
        dialogModal: {
            justifyContent: "flex-end",
            margin: 0,

        },


        dialogModalTitle: {

            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
            fontFamily: "Manrope_700Bold"

        },


        message: {
            fontSize: 14,
            color: "#4A4A4A",
            marginBottom: 20,
            textAlign: "center",
        },
        buttonContainer: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
        },
        cancelButton: {
            flex: 1,
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: "#E5E7EB",
            alignItems: "center",
            marginRight: 5,
        },
        confirmButton: {
            flex: 1,
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: "#1E293B",
            alignItems: "center",
            marginLeft: 5,
        },
        cancelText: {
            color: "#1E293B",
            fontWeight: "bold",
        },
        confirmText: {
            color: "white",
            fontWeight: "bold",
        },

        //UTILITES

        textGrey: {
            color: theme.gray
        },





    })

export default getGlobalStyles;
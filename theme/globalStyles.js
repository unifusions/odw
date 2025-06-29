import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('window');

const getGlobalStyles = (theme) =>
    StyleSheet.create({
        safeAreaContainer: {
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: theme.background,
        },

        container: {
            paddingTop: 20,
            paddingHorizontal: 20,
        },

        font700: {
            fontFamily: "Manrope_700Bold"
        },

        font600: {
            fontFamily: "Manrope_600SemiBold"
        },

        font500: {
            fontFamily: "Manrope_500Medium"
        },

        font400: {
            fontFamily: 'Manrope_400Regular'
        },

        textUpperCase: {
            textTransform: "uppercase"
        },

        flexJustifyBetween: {
            flex: 1,
            justifyContent: 'space-between'
        },

        dFlexRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12

        },
        flexRow: {
            display: 'flex',
            flexDirection: 'row',
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
            width: (width / 2.35),
            backgroundColor: "#BEC8F9", // Light purple background
            borderRadius: 12,
            padding: 12,
            justifyContent: "space-between",
        },
        compareCard: {
            height: (width / 3),
            width: (width / 2.35),
            backgroundColor: '#C9E0DD',
            borderRadius: 12,
            padding: 12,
            justifyContent: "space-between",
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
        cta: {
            backgroundColor: theme.primary,
            paddingVertical: 15,
            paddingHorizontal: 20,
            alignItems: "center",
            marginTop: 10,
            height: 50,
            width: '100%'
        },

        ctaText: {
            color: theme.white,
            fontSize: 16,
            fontFamily: theme.font700,
        },
        inputLabel: {
            fontFamily: theme.font500,
            // fontSize: 12,
            // color: '#bbb', // subtle gray like the image
            marginBottom: 4,
        },
        textInput: {
            width: "100%",
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingHorizontal: 15,
            marginBottom: 20,
            fontFamily: theme.font500
        },

        textInputContainer: {
            marginBottom: 10,
        },
        modernTextInput: {
            height: 44,
            borderWidth: 1,
            borderColor: '#ddd',
            // borderRadius: 8,
            paddingHorizontal: 12,
            fontSize: 16,
            color: '#222',
            backgroundColor: '#fff',
            fontFamily: theme.font500
        },

        input: {
            width: "100%",
            padding: 14,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#E5E5E5",
            marginBottom: 10,
            backgroundColor: "#F7F7F7",
        },
        buttonText: {

            color: "#FFF",
            fontSize: 16,
            fontFamily: "Manrope_600SemiBold"
        },

        iconContainer: {
            paddingRight: 8,
        },
        iconPlaceholder: {
            width: 38, // Same width as the icon to keep spacing even
        },

        screenTitle: {
            fontSize: 24,
            color: theme.primary,
            fontFamily: "Manrope_700Bold"
        },

        textCenter: {
            textAlign: 'center'
        },

        profileAvatar: {
            height: 100,
            width: 100,
        },
        profileAvatorAltImg: {
            borderRadius: 75,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: "center"
        },

        profileAvatarText: {
            color: theme.white,
            fontFamily: "Manrope_400Regular",
            fontSize: 40
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

        title: {
            fontSize: 16,
            fontFamily: "Manrope_700Bold",
            color: "#2d3748",
            marginBottom: 10,
        },
        message: {
            fontSize: 16,
            color: "#4A4A4A",
            marginBottom: 20,
            textAlign: "center",
            fontFamily: "Manrope_400Regular",
            padding: 20
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


        //SERVICES SCREEN

        serviceTitle: {
            fontSize: 11,
            textAlign: "center",
            fontFamily: "Manrope_600SemiBold"
        },

        // LOCATION SCREEN

        locationTitle: {
            fontFamily: "Manrope_700Bold",
            textAlign: "left",
            fontSize: 16
        },

        locationAddress: {
            fontFamily: "Manrope_400Regular",
            color: "$1B1F26",
            fontSize: 12
        },

        // BOOKING SCREEN

        bookingAvatar: {
            alignSelf: "center",
            borderRadius: 50,
            height: 100,
            width: 100,
            marginBottom: 12
        },

        dentistName: {
            textAlign: "center",
            color: theme.primary,
            fontFamily: "Manrope_700Bold",
            fontSize: 16

        },

        calenderContainer: {
            marginTop: 12,
            borderTopWidth: 2,
            borderTopColor: theme.primary,
            flexDirection: "row"
        },

        calenderDayContainer: {
            textAlign: "center",
            minHeight: 65,
            backgroundColor: theme.primary
        },

        fixedBottomContainer: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 15,
            backgroundColor: "#fff", // Ensure it's visible
            borderTopWidth: 1,
            borderColor: "#E5E7EB",
        },
        //UTILITES

        textGrey: {
            color: theme.gray
        },

        textFont: {
            fontFamily: "Manrope_400Regular"
        },


        // APPOINTMENT SCREENS

        stepFormScreenTitle: {
            fontFamily: theme.font700, fontSize: 24,
            color: theme.primary,
        }



    })

export default getGlobalStyles;
import { View } from "react-native"

const ButtonWrapper = ({theme, children}) => {
    return (
        <View style={{
            backgroundColor: theme.white,
            borderTopColor: theme.border,
            borderTopWidth: 1, paddingVertical: 8,
            display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center"
        }}>
            {children}
            </View>
    )
}

export default ButtonWrapper;
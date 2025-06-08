import { View } from "react-native"

const NextPrevButtonWrapper = ({theme, children}) => {
    return (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", borderTopColor: theme.border, borderTopWidth: 1, borderStyle: "solid" }}>
            {children}
        </View>
    )
}

export default NextPrevButtonWrapper;
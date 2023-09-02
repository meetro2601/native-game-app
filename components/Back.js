import { TouchableOpacity } from "react-native";
import { loginStyles } from "../styles/Login"
import { BackSvg } from "../svg/BackSvg";
import { useNavigation } from "@react-navigation/native";

export function Back(props) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={[loginStyles.headerLeft, loginStyles.HeaderLeftButton]}
        accessibilityLabel="Back"
        accessibilityRole="button"
        onPress={() => navigation.goBack()}>
            <BackSvg />
        </TouchableOpacity>
    )
}
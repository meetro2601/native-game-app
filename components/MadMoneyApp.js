import { SafeAreaView, ScrollView } from "react-native";
import { MadMoneyAppStyles } from "../styles/MadMoneyApp";

export function MadMoneyApp(props) {
    return (
        <SafeAreaView style={MadMoneyAppStyles.container}>
            <ScrollView scrollEnabled={true} nestedScrollEnabled={true} style={MadMoneyAppStyles.container}>
            {props.children}
            </ScrollView>
        </SafeAreaView>        
            

    )
}
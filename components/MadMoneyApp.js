import { SafeAreaView, ScrollView } from "react-native";
import { MadMoneyAppStyles } from "../styles/MadMoneyApp";

export function MadMoneyApp(props) {
    return (
        <SafeAreaView style={MadMoneyAppStyles.container}>
            <ScrollView style={MadMoneyAppStyles.container}>
            {props.children}
            </ScrollView>
        </SafeAreaView>        
            

    )
}
import { SafeAreaView, ScrollView } from "react-native";
import { MadMoneyAppStyles } from "../styles/MadMoneyApp";
import { Header } from "./Header";

export function MadMoneyApp(props) {
    return (
        <SafeAreaView style={MadMoneyAppStyles.container}>
            <Header/>
            <ScrollView scrollEnabled={true} nestedScrollEnabled={true} style={MadMoneyAppStyles.container}>
            {props.children}
            </ScrollView>
        </SafeAreaView>        
            

    )
}
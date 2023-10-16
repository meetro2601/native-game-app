import { SafeAreaView, ScrollView } from "react-native";
import { MadMoneyAppStyles } from "../styles/MadMoneyApp";
import { Header } from "./Header";

export function MadMoneyApp(props) {
    return (
        <SafeAreaView style={MadMoneyAppStyles.container}>
            <Header/>
            <ScrollView scrollEnabled={true} nestedScrollEnabled={true} contentContainerStyle={[{paddingBottom:40}]}>
            {props.children}
            </ScrollView>
        </SafeAreaView>        
            

    )
}
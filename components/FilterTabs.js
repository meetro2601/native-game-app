import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { leaderBoardStyles } from '../styles/LeaderBoard'

const FilterTabs = (props) => {

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={leaderBoardStyles.tabs}>
            {props.tabs.map((tab, index) => (
                <View key={tab} style={{ minWidth: 80, flex: 1}}>
                    <Pressable style={[tab === props.selectedTab ? leaderBoardStyles.tabButtonActive : leaderBoardStyles.tabButton,]} onPress={() => props.setSelectedTab(tab)}>
                        <Text style={[leaderBoardStyles.tabButtonText, tab === props.selectedTab && leaderBoardStyles.btnActive]}>{tab}</Text>
                    </Pressable>
                </View>
            ))}
        </ScrollView>
    )
}

export default FilterTabs
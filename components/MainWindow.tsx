import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RenderBrowserView from "./views/RenderBrowserView";
import SettingsView from "./views/SettingsView";
import { theme } from "../themes/themes";

const Tab = createBottomTabNavigator();

export default function MainWindow() {
    return (
        <>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarAllowFontScaling: true
            }}>
                <Tab.Screen component={RenderBrowserView} name="Browser" options={{ tabBarIconStyle: styles.tabBarIcon }} />
                <Tab.Screen component={SettingsView} name="Settings" options={{ tabBarIconStyle: styles.tabBarIcon }} />
            </Tab.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        borderColor: theme.borderColor,
        borderTopWidth: theme.borderThickness
    },
    tabBarLabel: {
        color: theme.color,
        fontWeight: 600
    },
    tabBarIcon: {
        display: "none"
    }
});
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RenderBrowserView from "./views/RenderBrowserView";
import SettingsView from "./views/SettingsView";
import { theme } from "../themes/themes";
import { FontAwesome6 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function MainWindow() {

    const getIcon = (name: string, focused: boolean, color: string, size: number): React.ReactNode => {
        return (<FontAwesome6 name={name} iconStyle="solid" size={size} color={color} />);
    }

    return (
        <>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarActiveTintColor: theme.accentDark,
                tabBarAllowFontScaling: true
            }}>
                <Tab.Screen component={RenderBrowserView}
                    name="Browser"
                    options={{
                        tabBarIcon: ({ focused, color, size }) => getIcon("clapperboard", focused, color, size)
                    }} />
                <Tab.Screen component={SettingsView}
                    name="Settings"
                    options={{
                        tabBarIcon: ({ focused, color, size }) => getIcon("gear", focused, color, size)
                    }} />
            </Tab.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        borderColor: theme.borderColor,
        borderTopWidth: theme.borderThickness,
        height: 90,
    },
    tabBarLabel: {
        color: theme.color,
        fontWeight: 600,
        fontSize: 16
    }
});
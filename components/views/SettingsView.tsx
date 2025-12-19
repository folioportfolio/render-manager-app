import { Text, StyleSheet, ScrollView, View } from "react-native";
import { SettingInput } from "../../types/settings";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../controls/Card";
import { theme } from "../../themes/themes";
import TextInput from "../controls/TextInput";

const settings: SettingInput[] = [
    { key: 'hostname', label: "Server Hostname", type: "text" }
]

export default function SettingsView() {
    return (
        <>
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
                        {
                            settings.map(s => (
                                <Card style={styles.settingsCard}>
                                    <View>
                                        <Text style={styles.settingsLabel}>{s.label}</Text>
                                        <TextInput style={styles.settingsInput} />
                                    </View>
                                </Card>
                            ))
                        }
                    </ScrollView>
                </SafeAreaView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    settingsCard: {
        marginLeft: 10,
        marginRight: 15,
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    settingsLabel: {
        fontSize: 20,
        fontWeight: 600
    },
    settingsInput: {
        height: 40,
        borderWidth: 3,
        borderColor: theme.borderColor,
        marginTop: 5
    }
});
import {
    Text,
    StyleSheet,
    ScrollView,
    View,
    BlurEvent,
    TextInputEndEditingEvent,
} from "react-native";
import { SettingsInput, SettingsKeys } from "../../types/settings";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../controls/Card";
import TextInput from "../controls/TextInput";
import { getUserData, setUserData } from "../../hooks/userSettings";
import { useEffect, useState } from "react";

const settingsInputs : SettingsInput[] = [
    { key: "schema", label: "Schema", type: "text", default: process.env.EXPO_PUBLIC_API_SCHEMA },
    { key: "hostname", label: "Hostname", type: "text", default: process.env.EXPO_PUBLIC_API_HOST },
    { key: "port", label: "Port", type: "text", default: process.env.EXPO_PUBLIC_API_PORT },
];

export default function SettingsView() {
    const [settings, setSettings] = useState<SettingsInput[]>([]);

    const saveSetting = (s: SettingsInput, v: string) => {
        const value = s.process ? s.process(v) : v;

        if (value) {
            console.log(value);
            setUserData(s.key, value);
        }
    };

    const loadSettings = async () => {
        let result: SettingsInput[] = [];

        for (const s of settingsInputs) {
            const defaultValue = await loadSetting(s.key, s.default);
            result.push({...s, default: defaultValue});
        }

        setSettings(result);
    }

    const loadSetting = async (key: SettingsKeys, defaultValue?: string): Promise<string | undefined> => {
        return await getUserData(key) ?? defaultValue;
    }

    useEffect(() => {
        loadSettings();
    }, []);

    return (
        <>
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
                        <Card style={styles.settingsCard}>
                            {settings.map((s) => {
                                return (
                                    <View key={s.key}>
                                        <TextInput
                                            style={styles.textInput}
                                            label={s.label}
                                            defaultValue={s.default}
                                            onCommit={(e) =>
                                                saveSetting(s, e)
                                            }
                                        />
                                    </View>
                                );
                            })}
                        </Card>
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
        paddingHorizontal: 10,
    },
    settingsLabel: {
        fontSize: 20,
        fontWeight: 600,
    },
    textInput: {
        marginVertical: 10,
    },
});

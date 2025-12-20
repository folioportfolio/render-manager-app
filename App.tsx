import { StyleSheet, Text, View } from 'react-native';
import MainWindow from './components/MainWindow';
import { RenderProvider } from './contexts/renderContext';
import { theme } from './themes/themes';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { useServerStore } from './components/store/serverStore';
import { getUserData } from './hooks/userSettings';

export default function App() {
    const setHostname = useServerStore((s) => s.setHostname);

    // Init storage
    useEffect(() => {
        (async () => {
            setHostname((await getUserData("hostname")) ?? "");
        })();
    }, []);

    return (
        <SafeAreaProvider>
            <RenderProvider>
                <NavigationContainer>
                    <View style={styles.container}>
                        <MainWindow />
                    </View>
                </NavigationContainer>
            </RenderProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
});

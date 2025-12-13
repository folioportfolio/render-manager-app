import { StyleSheet, Text, View } from 'react-native';
import MainWindow from './components/MainWindow';
import { RenderProvider } from './contexts/renderContext';
import { theme } from './themes/themes';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
    return (
        <SafeAreaProvider>
            <RenderProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <MainWindow />
                    </View>
                </SafeAreaView>
            </RenderProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
    },
});

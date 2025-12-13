import { Image, StyleSheet, View } from "react-native";
import { format } from "date-fns";
import Card from "./controls/Card";
import Text from "./controls/Text";
import ProgressBar from "./controls/ProgressBar";
import { theme } from "../themes/themes";
import { RenderState } from "../types/types";

export interface RenderInfoProps {
    id: string;
    frameStart: number;
    frameEnd: number;
    currentFrame?: number;
    timeStart: Date;
    timeEnd?: Date;
    lastFrameDuration?: number;
    project: string,
    state: RenderState
    finished: boolean;
    canceled: boolean;
}

export default function RenderInfo({ id, timeStart, frameStart, frameEnd, currentFrame, project, state, finished, canceled }: RenderInfoProps) {

    const getRenderState = (state: RenderState): React.ReactNode => {
        type IconMap = { [K in RenderState]: any }

        const iconMap: IconMap = {
            finished: require("../assets/simple-check.png"),
            canceled: require("../assets/simple-error.png"),
            inProgress: require("../assets/simple-time.png"),
            started: require("../assets/simple-time.png"),
        };

        return (
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Image source={iconMap[state]} style={styles.icon} />
                <Text>{state.charAt(0).toUpperCase() + state.slice(1)}</Text>
            </View>
        );
    }

    return (
        <>
            <Card style={styles.container}>
                <Text style={styles.nameLabel}>Render {project.substring(project.lastIndexOf("\\") + 1)}</Text>
                <Text>Total frames: {frameEnd - frameStart + 1}</Text>
                <Text>Start time: {format(timeStart, "dd.MM.yyyy HH:mm:ss")}</Text>
                <Text>Current frame: {currentFrame ?? '-'}</Text>

                <View style={styles.progressBar}>
                    {getRenderState(state)}
                    <ProgressBar
                        value={currentFrame ?? frameEnd}
                        min={frameStart}
                        max={frameEnd}
                        color={finished ? (canceled ? theme.canceled : theme.done) : theme.accent} />
                </View>

                <Text style={styles.smallText}>{project}</Text>
                <Text style={styles.smallText}>{id}</Text>
            </Card>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignSelf: 'stretch',
        gap: 2,
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: 'auto',
        marginVertical: 10,
        marginLeft: 10,
        marginRight: 15
    },
    smallText: {
        fontSize: 10
    },
    nameLabel: {
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 10
    },
    progressBar: {
        width: '100%',
        marginVertical: 10
    },
    icon: { 
        width: 24, 
        height: 24, 
        marginVertical: 3
    }
});
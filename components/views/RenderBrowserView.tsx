import { Text, StyleSheet, ScrollView, View, RefreshControl, SectionList, SectionListData } from "react-native";
import { useRenderJobs } from "../../contexts/renderContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import RenderInfo from "../RenderInfo";
import Card from "../controls/Card";
import { RenderJob } from "../../types/types";

export default function RenderBrowserView() {
    const renderContext = useRenderJobs();
    const [refreshing, setRefreshing] = useState(false);

    if (!renderContext)
        return null;

    const allJobs = useMemo(() => {
        return Array.from(renderContext.jobs.values()).sort((a, b) =>
            b.timeStart - a.timeStart
        );
    }, [renderContext.jobs]);

    const runningStates = ["inProgress", "started"];
    const doneStates = ["finished", "canceled"]

    const inProgressJobs: RenderJob[] = allJobs.filter(x => runningStates.includes(x.state));
    const finishedJobs: RenderJob[] = allJobs.filter(x => doneStates.includes(x.state));

    const items = [
        {
            title: "In Progress",
            data: inProgressJobs
        },
        {
            title: "Finished",
            data: finishedJobs
        }
    ];

    const getHeader = ({section}: {section: { title: string, data: RenderJob[] }}): React.ReactElement | null => {
        if (section.data.length <= 0)
            return null;

        return (
            <Card style={styles.headerCard}>
                <Text style={styles.header}>{section.title}</Text>
            </Card>
        );
    }

    const getRenderItem = ({ item }: { item: RenderJob }): React.ReactElement | null  => {
        return (
            <RenderInfo id={item.id}
                        finished={doneStates.includes(item.state)}
                        canceled={item.state === "canceled"}
                        state={item.state}
                        currentFrame={item.currentFrame}
                        frameEnd={item.frameEnd}
                        frameStart={item.frameStart}
                        timeStart={item.timeStart}
                        timeEnd={item.timeLastFrame}
                        project={item.project} />
        );
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }} edges={{bottom: "off", top: "maximum"}}>
                    <SectionList sections={items}
                                 keyExtractor={x => x.id}
                                 renderItem={getRenderItem}
                                 renderSectionHeader={getHeader} />
                    <ScrollView refreshControl={
                        <RefreshControl refreshing={refreshing}
                                        onRefresh={async () => {
                                            setRefreshing(true);
                                            await renderContext.refresh();
                                            setRefreshing(false);
                                        }}/>
                        }>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 28,
        fontWeight: 600,
    },
    headerCard: {
        marginLeft: 10,
        marginRight: 15,
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    }
});
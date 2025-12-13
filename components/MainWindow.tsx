import { Text, StyleSheet, ScrollView, View } from "react-native";
import RenderInfo from "./RenderInfo";
import { useRenderJobs } from "../contexts/renderContext";
import { RenderJob } from "../types/types";
import { theme } from "../themes/themes";
import Card from "./controls/Card";

export default function MainWindow() {
    const renderContext = useRenderJobs();

    if (!renderContext)
        return;

    const getJobsByTime = (): RenderJob[] => {
        return Array.from(renderContext.jobs.values()).sort((a, b) => {
            if (a.timeStart < b.timeStart)
                return 1;
            else if (a.timeStart > b.timeStart)
                return -1;
            else
                return 0;
        });
    }

    const allJobs = getJobsByTime();

    const runningStates = ["inProgress", "started"];
    const doneStates = ["finished", "canceled"]

    const inProgressJobs = allJobs.filter(x => runningStates.includes(x.state));
    const finishedJobs = allJobs.filter(x => doneStates.includes(x.state));

    return (
        <>
            <ScrollView style={{ width: '100%' }}>
                {inProgressJobs.length > 0 &&
                    <View>
                        <Card style={styles.headerCard}>
                            <Text style={styles.header}>Renders in progress</Text>
                        </Card>
                        {inProgressJobs.map(job => (
                            <RenderInfo key={job.id}
                                id={job.id}
                                finished={false}
                                canceled={false}
                                state={job.state}
                                currentFrame={job.currentFrame}
                                frameEnd={job.frameEnd}
                                frameStart={job.frameStart}
                                timeStart={job.timeStart}
                                timeEnd={job.timeLastFrame}
                                project={job.project} />
                        ))}
                    </View>
                }

                {finishedJobs.length > 0 &&
                    <View>
                        <Card style={styles.headerCard}>
                            <Text style={styles.header}>Past renders</Text>
                        </Card>
                        {finishedJobs.map(job => (
                            <RenderInfo key={job.id}
                                id={job.id}
                                finished={true}
                                canceled={job.state === "canceled"}
                                state={job.state}
                                currentFrame={job.currentFrame}
                                frameEnd={job.frameEnd}
                                frameStart={job.frameStart}
                                timeStart={job.timeStart}
                                timeEnd={job.timeLastFrame}
                                project={job.project} />
                        ))}
                    </View>
                }
            </ScrollView>
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
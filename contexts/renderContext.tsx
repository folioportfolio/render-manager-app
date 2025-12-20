import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useFetcher } from "../hooks/serverFetcher";
import { RenderJob, RenderState } from "../types/types";
import { Platform } from "react-native";
import { useServerStore } from "../components/store/serverStore";

interface RenderContextValue {
    jobs: Map<string, RenderJob>;
    setJobs: React.Dispatch<React.SetStateAction<Map<string, RenderJob>>>;
    refresh: () => Promise<void>;
}

interface RenderProviderProps {
    children: ReactNode;
}

export const RenderContext = createContext<RenderContextValue | null>(null);

export const RenderProvider = ({ children }: RenderProviderProps) => {
    const [jobs, setJobs] = useState<Map<string, RenderJob>>(new Map());
    const hostname = useServerStore((s) => s.hostname);
    const {getRenderJobs, getSocket} = useFetcher();

    const initJobs = async () => {
        try {
            const map = new Map<string, RenderJob>();
            const jobs = await getRenderJobs();

            if (jobs) {
                jobs.forEach((element) => {
                    map.set(element.id, element);
                });
            }

            setJobs(map);
        } catch (error) {
            console.log(error);
            setJobs(new Map());
        }
    };

    const refresh = async () => {
        await initJobs();
    };

    const onRenderStart = (data: { jobId: string; job: RenderJob }) => {
        console.log(`Render start - ${JSON.stringify(data)}`);
        setJobs((prev) => {
            const next = new Map(prev);
            next.set(data.jobId, data.job);
            return next;
        });
    };

    const onFrameUpdate = (data: { jobId: string; frame: number }) => {
        console.log(`Render frame - ${JSON.stringify(data)}`);
        setJobs((prev) => {
            const next = new Map(prev);
            const job = next.get(data.jobId);

            if (job) {
                next.set(data.jobId, {
                    ...job,
                    currentFrame: data.frame,
                    timeLastFrame: Date.now() / 1000,
                    state: "inProgress",
                });
            }

            return next;
        });
    };

    const onRenderEnd = (data: { jobId: string; state: RenderState }) => {
        console.log(`Render end - ${JSON.stringify(data)}`);
        setJobs((prev) => {
            const next = new Map(prev);
            const job = next.get(data.jobId);

            if (job) {
                next.set(data.jobId, {
                    ...job,
                    state: data.state,
                });
            }

            return next;
        });
    };

    useEffect(() => {
        const socket = getSocket();

        initJobs();

        socket.on("render-start", onRenderStart);
        socket.on("frame-update", onFrameUpdate);
        socket.on("render-end", onRenderEnd);

        return () => {
            socket?.off("render-start");
            socket?.off("frame-update");
            socket?.off("render-end");
        };
    }, [getSocket]);

    useEffect(() => {
        refresh();
    }, [hostname]);

    return (
        <RenderContext.Provider value={{ jobs, setJobs, refresh }}>
            {children}
        </RenderContext.Provider>
    );
};

export function useRenderJobs() {
    return useContext(RenderContext);
}

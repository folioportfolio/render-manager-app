import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { getRenderJobs, getSocket } from "../hooks/serverFetcher";
import { RenderJob, RenderState } from "../types/types";
import { Platform } from "react-native";
import { Socket } from "socket.io-client";

interface RenderContextValue {
    jobs: Map<string, RenderJob>;
    setJobs: React.Dispatch<React.SetStateAction<Map<string, RenderJob>>>;
}

interface RenderProviderProps {
    children: ReactNode;
}

export const RenderContext = createContext<RenderContextValue | null>(null);

export const RenderProvider = ({ children }: RenderProviderProps) => {
    const [jobs, setJobs] = useState<Map<string, RenderJob>>(new Map());

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
            if (Platform.OS == "android")
                alert(error)
        }
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
        let active = true;
        let socket: Socket | null = null;

        initJobs();
        getSocket().then(s => {
            if (!active)
                return;

            socket = s;

            s.on("render-start", onRenderStart);
            s.on("frame-update", onFrameUpdate);
            s.on("render-end", onRenderEnd);
        });

        return () => {
            active = false;

            socket?.off("render-start");
            socket?.off("frame-update");
            socket?.off("render-end");
        };
    }, []);

    return (
        <RenderContext.Provider value={{ jobs, setJobs }}>
            {children}
        </RenderContext.Provider>
    );
};

export function useRenderJobs() {
    return useContext(RenderContext);
}

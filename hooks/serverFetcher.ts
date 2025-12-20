import { io, Socket } from "socket.io-client";
import { RenderJob } from "../types/types";
import { useServerStore } from "../components/store/serverStore";
import { useCallback, useEffect, useRef } from "react";

const API_GET = "api/render";

export const useFetcher = () => {
    const socketRef = useRef<Socket | null>(null);
    
    const hostname = useServerStore((s) => s.hostname);

    useEffect(() => {
        if (!hostname) 
            return;

        const socket = io(hostname, { transports: ["websocket"] });
        socketRef.current = socket;

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [hostname]);

    const getSocket = useCallback(() => {
        if (!socketRef.current) {
            throw new Error("Socket not initialized yet");
        }
        return socketRef.current;
    }, []);

    const getRenderJobs = useCallback(async (): Promise<RenderJob[]> => {
        if (!hostname) 
            throw new Error("No server configured");

        const response = await fetch(`${hostname}/${API_GET}`);
        return await response.json();
    }, [hostname]);

    return {getSocket, getRenderJobs}
};

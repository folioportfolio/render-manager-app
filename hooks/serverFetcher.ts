import { io, Socket } from "socket.io-client";
import { RenderJob } from "../types/types";
import { getUserData } from "./userSettings";

const API_GET = "api/render";

let socket: Socket | null = null;
let socketPromise: Promise<Socket> | null = null;

const getHostname = async () => {
    const schema = await getUserData(
        "schema",
        process.env.EXPO_PUBLIC_API_SCHEMA
    );
    const hostname = await getUserData(
        "hostname",
        process.env.EXPO_PUBLIC_API_HOST
    );
    const port = await getUserData("port", process.env.EXPO_PUBLIC_API_PORT);

    return `${schema}://${hostname}${port && `:${port}`}`;
};

const createSocket = async (): Promise<Socket> => {
    const hostname = await getHostname();

    return io(hostname, {
        transports: ["websocket"],
    });
};

export const getSocket = (): Promise<Socket> => {
    if (socket) 
        return Promise.resolve(socket);

    if (!socketPromise) {
        socketPromise = createSocket().then((s) => {
            socket = s;
            return s;
        });
    }

    return socketPromise;
};

export const getRenderJobs = async (): Promise<RenderJob[]> => {
    const url = `${await getHostname()}/${API_GET}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);

    return json;
};

import { io, Socket } from "socket.io-client";
import { RenderJob } from "../types/types";

const HOSTNAME = process.env.EXPO_PUBLIC_API_HOST;
const SCHEMA = process.env.EXPO_PUBLIC_API_SCHEMA;
const API_GET = "api/render"

let socket: Socket | null = null;

export const getSocket = () => {
    if (!socket) {
        socket = io(`${SCHEMA}://${HOSTNAME}`, {
            transports: ["websocket"],
        });
    }
    return socket;
};

export const getRenderJobs = async (): Promise<RenderJob[]> => {
    const response = await fetch(`${SCHEMA}://${HOSTNAME}/${API_GET}`);
    const json = await response.json();
    console.log(json);

    return json;
}
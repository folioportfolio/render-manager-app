import { io } from "socket.io-client";
import { RenderJob } from "../types/types";

const HOSTNAME = process.env.EXPO_PUBLIC_API_HOST;
const SCHEMA = process.env.EXPO_PUBLIC_API_SCHEMA;
const API_GET = "api/render"

export const socket = io(HOSTNAME);

export const getRenderJobs = async (): Promise<RenderJob[]> => {
    const response = await fetch(`${SCHEMA}://${HOSTNAME}/${API_GET}`);
    const json = await response.json();
    console.log(json);

    return json;
}
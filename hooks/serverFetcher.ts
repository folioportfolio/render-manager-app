import { io } from "socket.io-client";
import { RenderJob } from "../types/types";

const HOSTNAME = "http://192.168.100.152:7777";
//const HOSTNAME = "http://localhost:7777";
const API_GET = "api/render"

export const socket = io(HOSTNAME);

export const getRenderJobs = async (): Promise<RenderJob[]> => {
    const response = await fetch(`${HOSTNAME}/${API_GET}`);

    const json = await response.json();
    console.log(json);

    return json;
}
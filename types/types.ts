export interface RenderJob {
    id: string
    frameStart: number,
    frameStep: number,
    frameEnd: number,
    currentFrame?: number,
    engine: string,
    timeStart: Date,
    timeLastFrame?: Date,
    project: string,
    resolutionX: number,
    resolutionY: number
    state: RenderState
}

export type RenderState = "started" | "inProgress" | "finished" | "canceled";
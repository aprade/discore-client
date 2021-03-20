// Messages sent from the main process to the renderer
export type MainMessage = {}

export enum RendererMessage {
    IS_ALIVE = "IPC_IS_ALIVE",
}

export enum SecureChannels {
    Message = "message",
}
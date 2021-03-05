// Messages sent from the main process to the renderer
export type MainMessage = {}

export enum RendererMessage {
    IS_ALIVE = "IPC_IS_ALIVE",
    WINDOW_CLOSE = "IPC_CLOSE_WINDOW",
    WINDOW_MAXIMIZE = "IPC_MAXIMIZE_WINDOW",
    WINDOW_MINIMIZE = "IPC_MINIMIZE_WINDOW",
}

export enum SecureChannels {
    Message = "message",
    WindowActions = "windows_actions",
}
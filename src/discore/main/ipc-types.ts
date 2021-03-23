// Messages sent from the main process to the renderer
export type MainMessage = {}

export enum RendererMessage {
	IS_ALIVE = "IPC_IS_ALIVE",
}

export enum SecureChannels {
	Message = "message",
}

export interface MainProcess {
	getStore(): Promise<void>;
	writeStore(store: object): Promise<void>;
}

export const mainProcessMethods: Array<keyof MainProcess> = [
	"getStore",
	"writeStore",
];

export const installMainProcessHandler = (ipcMain: unknown, handler: MainProcess) => {
	mainProcessMethods.forEach(method => {
		ipcMain.handle(method, async (_event: unknown, arg: unknown) => handler[method](arg));
	});
}
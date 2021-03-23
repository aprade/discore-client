import type { Renderer } from 'electron';
import type { MainMessage, RendererMessage } from "./ipc-types";

declare global {
	interface Window {
		electron: {
			ipcRenderer: {
				invoke: (cmd: RendererMessage, args?:unknown) => Promise<any>;
				on: (
					event: "message",
					handle: (event: unknown, message: MainMessage) => void
				) => void;
			};
		};
	}
}
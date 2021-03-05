const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
	"electron", 
	{
		ipcRenderer: {
			invoke: ipcRenderer.invoke.bind(ipcRenderer),
			on: ipcRenderer.on.bind(ipcRenderer),
		},
	}
);
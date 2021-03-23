import {
    ipcMain,
    app, 
    BrowserWindow,
} from 'electron';
import path from "path";
import type { MainMessage } from './ipc-types';
import { installMainProcessHandler } from './ipc-types'

const isDev = process.env.NODE_ENV === "development";

class WindowManager {
    public window: BrowserWindow | null;
    private messages: MainMessage[];

    constructor() {
        this.window = null;
        this.messages = [];
    }

    // Send a message on the "message" channel to the renderer window
    sendMessage(message: MainMessage) {
        if (this.window === null || this.window.webContents.isLoading()) {
            this.messages.push(message);
        } else {
            this.window.webContents.send("message", message);
        }
    }

    reload() {
        if (this.window) {
            this.window.reload();
        }
    }

    open(show: boolean) {
        if (this.window) return;

        const window = new BrowserWindow({
            width: 1200,
            height: 680,
            icon: path.join(__dirname, "../../resources/icons/icon.png"),
            show: false,
            autoHideMenuBar: true,
            titleBarStyle: 'hidden',
            backgroundColor: "#151515",
            webPreferences: {
                devTools: true,
                contextIsolation: true,
                // additionalArguments: [`storePath:${app.getPath("userData")}`],
                preload: path.join(__dirname, "../../src/discore/main/preload.js"),
            },
        });

        window.once("ready-to-show", () => {
            if (show) {
                window.show();
                if (isDev) window.webContents.openDevTools();
            }
        });

        window.on("closed", () => {
            this.window = null;
        });

        window.webContents.on("did-finish-load", () => {
            this.messages.forEach(message => {
                window.webContents.send("message", message);
            });
            this.messages = [];
        });

        window.loadURL(`file://${path.join(__dirname, "../../public/index.html")}`);

        this.window = window;
    }
}

function setupWatcher() {
    const chokidar = require("chokidar");
    const watcher = chokidar.watch(path.join(__dirname, "../../out/public/**"), {
        ignoreInitial: true,
    });
  
    watcher.on("change", () => {
        MainWindow.reload();
    });
}

const MainWindow = new WindowManager();

app.on("render-process-gone", (_event, _webContents, details) => {
    if (details.reason !== "clean-exit") {
        console.error(`Electron render process is gone. Reason: ${details}`);
        app.quit();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on("ready", () => {  
    if (isDev) setupWatcher();

    MainWindow.open(true);
});

installMainProcessHandler(ipcMain, {
    async getStore(): Promise<void> {
        console.log('Getting store');
    },
    async writeStore(store: object): Promise<void> {
        console.log('Writing store');
    },
});
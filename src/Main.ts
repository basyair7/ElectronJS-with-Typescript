import { BrowserWindow, App } from "electron";
import url from "url";
import path from "path";

export default class Main {
  private static mainWindow: any = BrowserWindow;
  private static app: App;
  private static BrowserWindow: typeof BrowserWindow;
  private static onWindowAllClosed() {
    if (process.platform !== "darwin") return Main.app.quit();
  }

  private static onClose() {
    // Dereference the window object.
    return (Main.mainWindow = null);
  }

  private static onReady() {
    Main.mainWindow = new Main.BrowserWindow({
      width: 800,
      height: 600,
      title: "My App",
      // frame: false,
      resizable: false,
      transparent: true,
    });
    Main.mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "/Views/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
    Main.mainWindow.on("closed", Main.onClose);
  }

  public static main(app: App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for
    Main.BrowserWindow = browserWindow;
    Main.app = app;
    Main.app.on("window-all-closed", Main.onWindowAllClosed);
    Main.app.on("ready", Main.onReady);
  }
}

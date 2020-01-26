const { app, BrowserWindow, Menu } = require("electron");
const url = require("url");
const path = require("path");
let mainWindow;
const mainMenuTemplate = [
  {
    label: "Options",
    submenu: [
      {
        label: "Home Page",
        label: "Reload",
        accelerator: "CmdOrCtrl+R",
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        }
      },
      {
        role: "togglefullscreen"
      },
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

app.on("ready", function () {
  mainWindow = new BrowserWindow({
    minHeight: 720,
    minWidth: 950,
    width: 1280,
    height: 720,
    icon: `./assets/icons/win/icon.ico`,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.setTitle("Penal Code App");
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  mainWindow.on("closed", function () {
    app.quit();
  });
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});
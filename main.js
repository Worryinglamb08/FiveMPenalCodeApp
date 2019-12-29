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

app.on("ready", function() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.setTitle("Maritime Penal code App");
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  mainWindow.on("closed", function() {
    app.quit();
  });
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

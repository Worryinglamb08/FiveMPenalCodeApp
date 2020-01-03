const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const { autoUpdater } = require('electron-updater');
// const DiscordRPC = require('discord-rpc');
// const config = require('./config.json');
// const ClientId = config.clientID;

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
  autoUpdater.checkForUpdatesAndNotify();
  mainWindow = new BrowserWindow({
    minHeight: 720,
    minWidth: 950,
    width: 1280,
    height: 720,
    icon: `${__dirname}/assets/icons/Maritime.png`,
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
  mainWindow.on("closed", function () {
    app.quit();
  });
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

/* Discord RP stuff ::: Doesn't seem to work
DiscordRPC.register(ClientId);

const rpc = new DiscordRPC.Client({
  transport: 'ipc'
});

async function setActivity() {
  if (!rpc || !mainWindow)
    return;

  var ltext = await config.imageConfig.largeText
  var state = await config.textConfig.state
  // document.getElementById("").textContent
  var details = await config.textConfig.details
  // var details = await mainWindow.webContents.executeJavaScript('document.getElementById("penalCodeHeader").textContent')
  if (!details) return console.log("Sike")
  var lkey = await config.imageConfig.largeKey

  var activity = {
    details: details,
    state: state,
    largeImageKey: lkey,
    largeImageText: ltext,
    instance: false
  }

  if (config.timeConfig.timeType == 'start') {
    activity.startTimestamp = moment(openTimestamp).add(parse('-' + config.timeConfig.whatTime), 'ms').toDate();
  } else if (config.timeConfig.timeType == 'end') {
    activity.endTimestamp = moment(openTimestamp).add(parse(config.timeConfig.whatTime), 'ms').toDate();
  } else if (config.timeConfig.timeType == 'both') {
    activity.startTimestamp = moment(openTimestamp).add(parse('0s'), 'ms').toDate();
    activity.endTimestamp = moment(openTimestamp).add(parse(config.timeConfig.whatTime), 'ms').toDate();
  }
  rpc.setActivity(activity);
}


rpc.on('ready', () => {
  setActivity();

  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId: ClientId }).catch(console.error);
 End discord stuff */

// auto updater
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
const createWindowsInstaller = require("electron-winstaller")
  .createWindowsInstaller;
const path = require("path");
const fs = require("fs-plus");
const spawn = function(command, args, callback) {
  let spawnedProcess = null;
  let error = null;
  let stdout = "";

  try {
    spawnedProcess = child.spawn(command, args);
  } catch (processError) {
    process.nextTick(function() {
      callback(processError, stdout);
    });
    return;
  }
  spawnedProcess.stdout.on("data", function(data) {
    stdout += data;
  });

  spawnedProcess.on("error", function(processError) {
    error = error || processError;
  });

  spawnedProcess.on("close", function(code, signal) {
    if (code !== 0) {
      error = error || new Error("Command failed: " + (signal || code));
    }

    callback(error, stdout);
  });
};

const exeName = path.basename(process.execPath);
const pkg = require("../../package.json");
getInstallerConfig()
  .then(createWindowsInstaller)
  .catch(error => {
    console.error(error.message || error);
    process.exit(1);
  });

function getInstallerConfig() {
  const homeDirectory = fs.getHomeDirectory();
  console.log("creating windows installer");
  const rootPath = path.join("./");
  const outPath = path.join(rootPath, "release-builds");
  return Promise.resolve({
    appDirectory: path.join(outPath, "maritime-penal-codes-app-win32-ia32/"),
    authors: "CasperTheGhost",
    noMsi: true,
    description: "Maritime, An app to find penal codes.",
    outputDirectory: path.join(outPath, "windows-installer"),
    exe: "maritime-penal-codes-app.exe",
    version: "1.1.0",
    setupExe: "MaritimePenalCodeInstaller.exe",
    setupIcon: path.join(rootPath, "assets", "icons", "win", "icon.ico")
  });
}

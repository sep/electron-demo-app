import * as os from "os";

const windowsExecutablePath = './out/electron-demo-app-win32-x64/electron-demo-app.exe'
const linuxExecutablePath = './out/electron-demo-app-linux-x64/electron-demo-app'
const macExecutablePath = 'TBD'

export function getExecutablePath(){
  const platformString = os.platform()
  switch(platformString){
    case 'win32': return windowsExecutablePath;
    case 'linux': return linuxExecutablePath;
    case 'darwin': return macExecutablePath;
    default: throw('Unsupported platform: ' + platformString);
  }
}

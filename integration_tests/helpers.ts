import * as os from "os";

const windowsExecutablePath = './dist/win-unpacked/electron-demo-app.exe'
const linuxExecutablePath = './out/linux-packed/electron-demo-app'
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

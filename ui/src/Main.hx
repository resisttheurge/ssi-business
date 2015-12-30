import js.Lib;

class Main {
    private static function main() {
        var process = Lib.require('process');
        var app = Lib.require('app'); // Module to control application life.
        var fs = Lib.require('fs-jetpack');
        var BrowserWindow = Lib.require('browser-window'); // Module to create native browser window.

//        var dirname = untyped __js__('__dirname');

        var mainWindow = null;

        app.on('window-all-closed', function() {
            if (process.platform != 'darwin') {
                app.quit();
            }
        });

        app.on('ready', function() {
            mainWindow = untyped __js__("new BrowserWindow({
                    width: 1000, height: 600, 'min-width': 850, webPreferences: {zoomFactor: 1.10}
                });");

//            untyped __js__('console').log('file://' + (untyped __js__('__dirname')) + '/index.html');

            mainWindow.loadURL('file://' + untyped __js__('__dirname') + '/index.html');

            //mainWindow.openDevTools();

            mainWindow.on('closed', function() {
                mainWindow = null;
            });
        });
    }
}

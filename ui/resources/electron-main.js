(function (console) { "use strict";
var Main = function() { };
Main.main = function() {
	var process = require("process");
	var app = require("app");
	var fs = require("fs-jetpack");
	var BrowserWindow = require("browser-window");
	var mainWindow = null;
	app.on("window-all-closed",function() {
		if(process.platform != "darwin") app.quit();
	});
	app.on("ready",function() {
		mainWindow = new BrowserWindow({
                    width: 1000, height: 600, 'min-width': 850, webPreferences: {zoomFactor: 1.10}
                });;
		mainWindow.loadURL("file://" + (__dirname + "/index.html"));
		mainWindow.on("closed",function() {
			mainWindow = null;
		});
	});
};
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

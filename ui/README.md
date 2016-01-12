# ssi-business-ui

## Getting Started

### Requirements
Download and install [Haxe](http://haxe.org/) and [Node.js](https://nodejs.org/). Neither should require any additional configuration past installation, but make sure the commands `haxe`, `haxelib`, `node`, and `npm` exist on the machine's `PATH`.

When developing on Windows, use of a console emulator like [cmder](http://cmder.net/) instead of the native command prompt is recommended (but not required). If you've ever used the native command prompt, you know why.

### Project Setup
After cloning the project locally, navigate to the project root and use npm to install the project's javascript dependencies.
```bash
npm install
```

If not already installed, use `npm` to install `gulp` and `browserify` globally.
```bash
npm install -g gulp browserify
```

Then install the React and MSignal Haxe libraries with the `haxelib` command.
```bash
haxelib install React
haxelib install MSignal
```


### Project Workflow
If `resources/js/required.js` has changed, run `browserify`.
```bash
browserify resources/js/required.js -o resources/js/required.browser.js
```

If `resources/style/settings/*` has changed, run `gulp make`.
```bash
gulp make
```

To compile Haxe code, build the project and start electron, run `gulp electron`. This assumes that electron is not already running.
```bash
gulp electron
```

If electron is already running, run `gulp build` in a different terminal window to compile and build the project. Then, press `ctrl-R` in electron to refresh the application.
```bash
gulp build
```

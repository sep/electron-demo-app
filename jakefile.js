/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { exec, execSync } = require( "child_process")
const jake = require("jake")

task('default', ['renderer', 'main'])
task('renderer', ['renderer-react', 'renderer-chat', 'renderer-ng'])
task('main', fromx(".ts", ".js", './main/*.ts'))

task('renderer-react', ['site.js'])
task('renderer-chat', ['chat.js', 'background-chatter.js'])
task('renderer-ng', ['dist.ng'])

jake.rule('.js', '.ts', () => {
    execSync("tsc", {stdio: 'inherit'})
})

jake.file('site.js', from("./renderer/react/**/*.*", "./renderer/common"), () => {
    execSync("npx webpack --config webpack.react.config.js", {stdio: 'inherit'})
})

jake.file('chat.js', from("./renderer/chat/**/*.*", "./renderer/common"), () => {
    execSync("npx webpack --config webpack.chat.config.js", {stdio: 'inherit'})
})

jake.file('background-chatter.js', from("./renderer/background-chatter/**/*.*", "./renderer/common"), () => {
    execSync("npx webpack --config webpack.background-chatter.config.js", {stdio: 'inherit'})
})

jake.file('dist.ng', from("./renderer/ng/**/*.*", "./renderer/common"), () => {
    execSync("npx ng build", {stdio: 'inherit'})
})

function from(...args) {
    const fileList = new jake.FileList();
    args.forEach(arg => {
        if (arg[0] === '!') fileList.exclude(arg.substring(1))
        else fileList.include(arg)
    })
    return fileList.toArray()
}

function fromx(ext, repl, ...args) {
    const files = from(...args);
    return files.map(f => f.replace(ext, repl))
}
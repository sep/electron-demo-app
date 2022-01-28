/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { exec, execSync } = require( "child_process")
const jake = require("jake")

task('default', ['renderer', 'main'])
task('renderer', ['renderer-react', 'renderer-ng'])
task('main', fromx(".ts", ".js", './main/*.ts'))

task('renderer-react', ['site.js'])
task('renderer-ng', ['dist.ng'])

jake.rule('.js', '.ts', () => {
    execSync("tsc")
})

jake.file('site.js', from("./renderer/react/**/*.*"), () => {
    execSync("npx webpack --config webpack.config.js")
})

jake.file('dist.ng', from("./renderer/ng/**/*.*"), () => {
    execSync("npx ng build")
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
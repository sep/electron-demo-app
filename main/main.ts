import calculatorApp from "./calculatorApp";
import chatApp from "./chatApp";
console.log(__dirname)
const appArg = process.argv.find(arg => arg.startsWith("app="));
const app = appArg?.substring("app=".length)

switch (app) {
    case "chat":
        chatApp();
        break;
    case "react-calculator":
        calculatorApp("react")
        break;
    case "ng-calculator":
        calculatorApp("ng")
        break;
    default:
        chatApp();
        break;
}
'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

interface ResourceStep {
    label:           string;
    description:     null;
    terminalCommand: string;
    message?:        string;
}

let terminal : vscode.Terminal = null;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "resources" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('resources.showQuickApiAssist', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        const items : [ResourceStep] = [
            {
                label: 'APIs: DigitalOcean: Install CLI',
                description: null,
                terminalCommand: 'brew install doctl',
            },
            {
                label: 'APIs: DigitalOcean: Authorize CLI',
                description: null,
                terminalCommand: 'doctl auth',
                message: 'This will ask for an API token. To get it, log into digitalocean.com, select the API tab, generate a new token, and copy it to the clipboard.'
            },
            {
                label: 'Servers: DigitalOcean: List Droplets',
                description: null,
                terminalCommand: 'doctl compute droplet list',
            },
            {
                label: 'Servers: DigitalOcean: List Droplets w/ JSON',
                description: null,
                terminalCommand: 'doctl compute droplet list -o json',
            },
        ]
        vscode.window.showQuickPick(items,
            { placeHolder: "type an API, a type of resource, and an action" }).then(item => {
                if (!terminal) {
                    terminal = vscode.window.createTerminal('resources');
                }
                terminal.show();
                if (item.message) {
                    vscode.window.showInformationMessage(item.message);
                }
                terminal.sendText(item.terminalCommand, false);
            })
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
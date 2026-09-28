// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "drawingcanvas" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('drawingcanvas.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from DrawingCanvas!');
	});

	const init = vscode.commands.registerCommand('drawingcanvas.openWindow', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const panel = vscode.window.createWebviewPanel('overlay', 'Overlay',vscode.ViewColumn.One);
		panel.webview.html = `
			<!DOCTYPE html>
			<html lang="en">
  				<head>
    				<meta charset="utf-8">
    				<title>title</title>
    				<link rel="stylesheet" href="style.css">
    				<script src="script.js"></script>
  				</head>
  				<body>
    				<p> Hello from a window </p>
  				</body>
			</html>
		`;
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(init);
}

// This method is called when your extension is deactivated
export function deactivate() {}

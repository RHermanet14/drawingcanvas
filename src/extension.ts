// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const init = vscode.commands.registerCommand('drawingcanvas.openWindow', () => {
		const panel = vscode.window.createWebviewPanel('overlay', 'Overlay',vscode.ViewColumn.One, {enableScripts: true});
		const scriptUri = panel.webview.asWebviewUri(
			vscode.Uri.joinPath(context.extensionUri, 'media', 'main.js')
		);
		panel.webview.html = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
    			<meta charset="UTF-8">
    			<meta name="viewport" content=
            		"width=device-width, initial-scale=1.0">
    			<style>
        			* {
            			overflow: hidden;
						background: url("https://augment-assets.com/augment-hero-sm.png");
        			}
        			body {
            			text-align: center;
						background: rgba(255, 255, 255, 0);
        			}
   				</style>
			</head>

			<body>
				<input type="number" id="psize" name="psize" min="1" max="100" value="5" style="color:white; font-size:160%;">
				px
				<input type="color" id="pcolor" name="pcolor" value="blue">
    			<canvas id="canvas"></canvas>
    			<script src="${scriptUri}"></script>
			</body>

			</html>
		`;
	});
	context.subscriptions.push(init);
}

// This method is called when your extension is deactivated
export function deactivate() {}

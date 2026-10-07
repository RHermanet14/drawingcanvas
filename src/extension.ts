// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function getFile(): string {
	const editor = vscode.window.activeTextEditor;
	if (!editor) { return ""; }
	return editor.document.getText();
}

export function activate(context: vscode.ExtensionContext) {
	const init = vscode.commands.registerCommand('drawingcanvas.openWindow', () => {
		const panel = vscode.window.createWebviewPanel('overlay', 'Overlay',vscode.ViewColumn.One, {enableScripts: true});
		const scriptUri = panel.webview.asWebviewUri(
			vscode.Uri.joinPath(context.extensionUri, 'media', 'main.js')
		);
		const file = getFile();
		panel.webview.html = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
    			<meta charset="UTF-8">
    			<meta name="viewport" content=
            		"width=device-width, initial-scale=1.0">
    			<style>
        			html, body {
            			margin: 0;
           				width: 100%;
            			height: 100%;
            			overflow: hidden;
        			}

        			#background {
    					position: fixed;
    					inset: 0;
    					z-index: 0;
						top: 30px;
    					pointer-events: none;
					}

					#canvas {
    					position: fixed;
    					inset: 0;
    					z-index: 1;
    					pointer-events: auto;
					}

					#psize, #pcolor, #eraser {
						position: fixed;
    					top: 10px;
						z-index: 2;
					}

					#psize {				
    					left: 10px;
						width: 50px;	
					}
						
					#pcolor {
						left: 75px;
					}
						
					#eraser {
						left: 125px;
					}
    			</style>
			</head>

			<body>
				<input type="number" id="psize" name="psize" min="1" max="100" value="5" style="font-size:160%;">
				<input type="color" id="pcolor" name="pcolor" value="blue">
				<input type="checkbox" id="eraser" name="eraser">
				<pre id="background">${file}</pre>
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

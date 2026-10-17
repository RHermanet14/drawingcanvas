// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

function getFile(): string {
	const editor = vscode.window.activeTextEditor;
	if (!editor) { return ""; }
	let file: string = "1\t" + editor.document.getText();
	let line: number = 1;
	file = file.replaceAll("\n", () => {
		line++;
		return `\n${line}\t`;
	});
	return file;
}

function colorFile(text: string): string {
	return Prism.highlight(text, Prism.languages.typescript, 'typescript');
}

export function activate(context: vscode.ExtensionContext) {
	let panel: vscode.WebviewPanel | undefined;
	const init = vscode.commands.registerCommand('drawingcanvas.openWindow', () => {
		if (panel) {
			panel.reveal(vscode.ViewColumn.One);
			return;
		}
		panel = vscode.window.createWebviewPanel(
			'overlay',
			'Overlay',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true
			}
		);
		panel.onDidDispose(() => {panel = undefined;});
		const scriptUri = panel.webview.asWebviewUri(
			vscode.Uri.joinPath(context.extensionUri, 'media', 'main.js')
		);
		const file = getFile();
		const prismCss = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri,'media','prism-vscode-dark.css'));
		const coloredFile = colorFile(file);
		panel.webview.html = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
    			<meta charset="UTF-8">
    			<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" href="${prismCss}">
    			<style>
        			html, body {
            			margin: 0;
            			overflow: hidden;
        			}

					#scroll {
						position: fixed;
  						inset: 0;
  						top: 45px;
  						overflow: auto;
					}

        			#background {
    					position: relative;
  						margin: 0;
					}

					#fileStyle {
    					inset: 0;
    					z-index: 0;
						top: 45px;
						overflow: auto;
    					pointer-events: auto;
						background-color: transparent;
					}

					#canvas {
    					position: absolute;
  						top: 0;
  						left: 0;
  						z-index: 1;
  						pointer-events: none;
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
				<div id="scroll">
					<pre id="background"><code id="fileStyle">${coloredFile}</code></pre>
    				<canvas id="canvas"></canvas>
				</div>
    			<script src="${scriptUri}"></script>
			</body>

			</html>
		`;
	});
	context.subscriptions.push(init);
}

// This method is called when your extension is deactivated
export function deactivate() {}

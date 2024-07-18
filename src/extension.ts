import * as vscode from "vscode";

export const activate = (context: vscode.ExtensionContext) => {
  const methodWithCode = vscode.commands.registerCommand(
    "smart-clipboard.getSmartCode",
    () => generateLink(true)
  );

  const methodWithoutCode = vscode.commands.registerCommand(
    "smart-clipboard.getSmartLink",
    () => generateLink(false)
  );

  context.subscriptions.push(methodWithCode);
  context.subscriptions.push(methodWithoutCode);
};

const generateLink = (includeCode: boolean) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage("No editor is active");
    return;
  }

  const selection = editor.selection;
  const startLine = selection.start.line;
  const endLine = selection.end.line;
  const textRange = new vscode.Range(startLine, 0, endLine, Number.MAX_VALUE);
  let text = editor.document.getText(textRange);

  text = removeCommonIndentation(text);

  const config = vscode.workspace.getConfiguration("smartClipboard");
  const httpsRedirect = config.get<boolean>("redirect") || false;

  const filePath = editor.document.fileName;
  const languageId = editor.document.languageId;
  const clipboardText = createClipboardText(
    filePath,
    startLine+1, // IDE's lines are 1-indexed
    text,
    httpsRedirect,
    includeCode,
    languageId
  );

  vscode.env.clipboard.writeText(clipboardText).then(() => {
    vscode.window.showInformationMessage(
      `File path${includeCode ? " and code" : ""} copied to clipboard!`
    );
  });
};

const removeCommonIndentation = (text: string): string => {
  const lines = text.split("\n");

  const minIndent = lines.reduce((min, line) => {
    if (line.trim() === "") {
      return min;
    }
    const indent = line.match(/^(\s*)/)?.[0]?.length || 0;
    return indent < min ? indent : min;
  }, Infinity);

  return lines.map((line) => line.slice(minIndent)).join("\n");
};

const createClipboardText = (
  filePath: string,
  startLine: number,
  text: string,
  httpsRedirect: boolean,
  includeCode: boolean,
  languageId: string
): string => {
  const baseLink = httpsRedirect
    ? `https://linkng.me/vscode:/file/${filePath}:${startLine}`
    : `vscode://file/${filePath}:${startLine}`;

  if (includeCode) {
    return `[Open code](${baseLink})\n\`\`\`${languageId}\n${text}\n\`\`\``;
  } else {
    return baseLink;
  }
};

export const deactivate = () => {};

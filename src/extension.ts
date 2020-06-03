import * as vscode from "vscode";
import * as sqlFormatter from "poor-mans-t-sql-formatter";
import { PmtsqlFormatterConfiguration } from "./config";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "pmtsql-formatter" is now active!'
  );

  const formatter = vscode.languages.registerDocumentRangeFormattingEditProvider(
    "sql",
    {
      provideDocumentRangeFormattingEdits(
        document: vscode.TextDocument,
        range: vscode.Range
      ): Promise<vscode.TextEdit[]> {
        return TSqlFormatter.format(document, range);
      },
    }
  );
  vscode.languages.registerDocumentRangeFormattingEditProvider;
  context.subscriptions.push(formatter);
}

// this method is called when your extension is deactivated
export function deactivate() {}

class TSqlFormatter {
  public static format(
    document: vscode.TextDocument,
    range?: vscode.Range
  ): Promise<vscode.TextEdit[]> {
    const options = TSqlFormatter.getConfig();
    return new TSqlFormatter(document, options).format(range);
  }

  public constructor(
    private readonly document: vscode.TextDocument,
    private readonly options?: PmtsqlFormatterConfiguration
  ) {}

  public format(range?: vscode.Range): Promise<vscode.TextEdit[]> {
    return new Promise<vscode.TextEdit[]>((resolve, reject) => {
      range =
        range ||
        new vscode.Range(
          // line 0, char 0:
          0,
          0,
          // last line:
          this.document.lineCount,
          // last character:
          this.document.lineAt(this.document.lineCount - 1).range.end.character
        );
      try {
        const {
          text: formattedSql,
          errorFound,
        }: { text: string; errorFound: any } = sqlFormatter.formatSql(
          this.document.getText(),
          this.options
        );
        if (errorFound) {
          throw errorFound;
        }
        resolve([new vscode.TextEdit(range, formattedSql)]);
      } catch (error) {
        TSqlFormatter.showFormattingErrorMessage(error);
        reject();
      }
    });
  }

  private static showFormattingErrorMessage(errorInfo?: any): void {
    if (typeof errorInfo !== "undefined" && errorInfo !== null) {
      if (
        typeof errorInfo.line === "number" &&
        typeof errorInfo.column === "number"
      ) {
        vscode.window.showErrorMessage(
          `T-SQL formatting failed: at line ${errorInfo.line}, column ${
            errorInfo.column
          }: ${errorInfo.message || errorInfo}.`
        );
      } else {
        vscode.window.showErrorMessage(`T-SQL formatting failed: ${errorInfo}`);
      }
    } else {
      vscode.window.showErrorMessage(`T-SQL formatting failed`);
    }

    try {
      console.log(`T-SQL Formatter: Error: `, errorInfo);
    } catch (error) {
      // ignore
    }
  }

  public static getConfig(): PmtsqlFormatterConfiguration {
    const rawConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(
      "pmtsql-formatter"
    );
    const { errorOutputPrefix, formattingType, std, min } = rawConfig;
    const config: PmtsqlFormatterConfiguration = {
      errorOutputPrefix,
      formattingType,
      ...std,
      ...min,
    };
    return config;
  }
}

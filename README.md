# pmtsql-formatter README

This is a Visual Studio Code extension for Poor Man's T-SQL Formatter, a SQL formatting library available in a variety of other editors & IDEs.

This formatter's special focus on T-SQL (the SQL dialect of Microsoft SQL Server... and Sybase/SAP Adaptive Server Enterprise) makes Visual Studio Code a sensible target for support.

This formatter uses the JS library on npm for formatting (https://www.npmjs.com/package/poor-mans-t-sql-formatter), and that is itself a transpilation of the C# library / main project at http://architectshack.com/PoorMansTSqlFormatter.ashx.

**This extension is loosely based on the official extension (https://marketplace.visualstudio.com/items?itemName=TaoKlerks.poor-mans-t-sql-formatter-vscode). The mean purpose of this extension is to be able to use VSCode internal API to format code, permitting the SQL code to be formatted on save, etc. Old command based formmating options are not included.**

## Features

This formatter has the almost the same options as the npm for formatting (https://www.npmjs.com/package/poor-mans-t-sql-formatter).

## Extension Settings

The formatter exposes the same settings as in other IDEs / integrations, these can be located and set/overridden in the VS Code settings UI in the normal way.

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

General options:

| Option            | Description                                                                                     | Type   | Default                                             |
| ----------------- | ----------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------- |
| formattingType    | `standard` or `obfuscation` - what you'd like to do                                             | enum   | standard                                            |
| errorOutputPrefix | Text to be included (in a comment at the top) if parsing failed and result is therefore suspect | string | (something like "--WARNING: errors during parsing") |

Standard formatter options:

| Option                       | Description                                                                                                     | Type   | Default |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ------ | ------- |
| std.indent                   | The unit of indentation - typically a tab (\t) or a number of spaces                                            | string | \t      |
| std.maxLineWidth             | Request that the formatter wrap long lines to avoid exceeding this line length                                  | int    | 999     |
| std.spacesPerTab             | This is used to measure line length, and only applies if you use tabs                                           | int    | 4       |
| std.statementBreaks          | How many linebreaks should be added when starting a new statement?                                              | int    | 2       |
| std.clauseBreaks             | How many linebreaks should be added when starting a new clause within a statement?                              | int    | 1       |
| std.expandCommaLists         | Should comma-delimited lists (columns, group by args, etc) be broken out onto new lines?                        | bool   | true    |
| std.trailingCommas           | When starting a new line because of a comma, should the comma be at the end of line (VS the start of the next)? | bool   | true    |
| std.spaceAfterExpandedComma  | Should a space be added after the comma? (typically not if they are "trailing")                                 | bool   | false   |
| std.expandBooleanExpressions | Should boolean operators (AND, OR) cause a linebreak?                                                           | bool   | true    |
| std.expandCaseStatements     | Should CASE expressions have their WHEN and THEN expressions be broken out on new lines?                        | bool   | true    |
| std.expandBetweenConditions  | Should BETWEEN expressions have the max argument broken out on a new line?                                      | bool   | true    |
| std.expandInLists            | Should IN() lists have each argument on a new line?                                                             | bool   | false   |
| std.breakJoinOnSections      | Should the ON section of a JOIN clause be broken out onto its own line?                                         | bool   | false   |
| std.uppercaseKeywords        | Should T-SQL keywords (like SELECT, FROM) be automatically uppercased?                                          | bool   | true    |
| std.keywordStandardization   | Should less-common T-SQL keywords be replaced with their standard counterparts? (NOTE: only safe for T-SQL!)    | bool   | false   |

Obfuscating formatter options:

| Option                        | Description                                                                       | Type | Default |
| ----------------------------- | --------------------------------------------------------------------------------- | ---- | ------- |
| min.randomizeKeywordCase      | Should the case of keywords be randomized, to minimize legibility?                | bool | false   |
| min.randomizeLineLengths      | Should the SQL be wrapped at arbitrary intervals, to minimize legibility?         | bool | false   |
| min.preserveComments          | Should comments in the code be retained (vs being stripped out)?                  | bool | true    |
| min.enableKeywordSubstitution | Should keywords with synonyms use less common forms? (NOTE: only safe for T-SQL!) | bool | false   |

## Known Issues

This is an Work In Progress project, so may have some problems.

## Release Notes

### 0.0.1

- Change the name of the extension
- Convert to typescript
- Create a class to format the code. (Heavily inspired by FabianLauer XML Formatter https://github.com/FabianLauer/vs-code-xml-format)
- Create some interfaces for configuration options

export enum FormattingType {
  standard,
  obfuscation,
}

export interface PmtsqlFormatterStdConfiguration {
  indent: string;
  spacesPerTab: number;
  maxLineWidth: number;
  statementBreaks: number;
  clauseBreaks: number;
  expandCommaLists: boolean;
  trailingCommas: boolean;
  spaceAfterExpandedComma: boolean;
  expandBooleanExpressions: boolean;
  expandCaseStatements: boolean;
  expandBetweenConditions: boolean;
  expandInLists: boolean;
  breakJoinOnSections: boolean;
  uppercaseKeywords: boolean;
  keywordStandardization: boolean;
}

export interface PmtsqlFormatterMinConfiguration {
  randomizeKeywordCase: boolean;
  randomizeLineLengths: boolean;
  preserveComments: boolean;
  enableKeywordSubstitution: boolean;
}

export interface PmtsqlFormatterConfiguration {
  expectedLanguages: string[];
  errorOutputPrefix: string;
  formattingType: FormattingType;
  std: PmtsqlFormatterStdConfiguration;
  min: PmtsqlFormatterMinConfiguration;
}

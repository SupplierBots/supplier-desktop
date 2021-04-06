export interface Keywords {
  positive: string[];
  negative: string[];
  multi?: string[];
}

export interface UserDefinedKeywords extends Keywords {
  keywordsAmount: number;
}

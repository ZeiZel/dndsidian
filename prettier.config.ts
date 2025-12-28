import { Config } from 'prettier'

const config: Config = {
    useTabs: true,
    tabWidth: 4,
    arrowParens: 'always',
    bracketSameLine: true,
    bracketSpacing: true,
    endOfLine: "lf",
    printWidth: 80,
    singleAttributePerLine: true,
    singleQuote: true,
    jsxSingleQuote: true,
    semi: true,
    trailingComma: 'all',
    quoteProps: "consistent",
}

export default config;
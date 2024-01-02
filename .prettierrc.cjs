/** @type {import('prettier').Config} */
module.exports = {
    tabWidth: 4,
    printWidth: 80,
    endOfLine: "auto",
    arrowParens: "avoid",
    trailingComma: "es5",
    semi: true,
    useTabs: false,
    singleQuote: false,
    bracketSpacing: true,

    importOrder: [
        "^server-only|client-only$",
        "^react$",
        "<THIRD_PARTY_MODULES>",
        "@heroicons/(.*)$",
        "^@/(.*)$",
        "^~/(.*)$",
        "^[./]",
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,

    plugins: [
        "@trivago/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss",
    ],

    overrides: [],
};

// @ts-check

/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
export default {
    tabWidth: 4,
    singleQuote: true,
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: ['^components/(.*)$', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};

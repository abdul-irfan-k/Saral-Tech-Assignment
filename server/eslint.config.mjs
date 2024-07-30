
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    { files: ["**/*.{mjs,cjs,ts}"] },
    pluginJs.configs.recommended,

    ...tseslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
        ignores: ["**/dist/*", "**/test/*", '**/*.js']
    },
    {
        "rules": {
            "no-console": "error",
            "@typescript-eslint/ban-ts-comment": "warn",
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

        }
    }
];
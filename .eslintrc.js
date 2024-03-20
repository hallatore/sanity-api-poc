module.exports = {
    root: true,
    settings: {
        react: {
            version: 'detect',
            linkComponents: [
                {
                    name: 'Link',
                    linkAttribute: 'to',
                },
            ],
        },
    },
    rules: {
        'jsx-a11y/no-autofocus': 'off',
        'jsx-a11y/no-onchange': 'off',
    },
    env: {
        es6: true,
        browser: true,
    },
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            extends: [
                'next/core-web-vitals',
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
                'plugin:react-hooks/recommended',
                'plugin:jsx-a11y/recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                // "plugin:import/typescript",
            ],
            settings: {
                'import/parsers': {
                    '@typescript-eslint/parser': ['.ts', '.tsx'],
                },
                'import/resolver': {
                    typescript: {
                        project: ['./tsconfig.json'],
                        alwaysTryTypes: true,
                    },
                },
            },
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    { argsIgnorePattern: '^_', varsIgnorePattern: '^_T' },
                ],
                'react/prop-types': 'off',
                '@typescript-eslint/restrict-template-expressions': 'off',
                'jsx-a11y/click-events-have-key-events': 'off',
            },
        },
        {
            files: ['./.eslintrc.js', './*.config.js'],
            env: { browser: false, node: true },
        },
    ],
};

/*
 * http://eslint.org/docs/rules/
 * https://github.com/yannickcr/eslint-plugin-react
 */
module.exports = {
    'parser': 'babel-eslint',
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-control-statements/recommended'
    ],
    'plugins': [
        'react',
        'jsx-control-statements'
    ],
    'env': {
        'browser': true,
        'node': true,
        'es6': true,
    },
    "ecmaFeatures": {
        "jsx": true
    },
    "parserOptions": {
        "ecmaFeatures": {
          "jsx": true
        }
    },
    'rules': {
        'indent': ['error', 4, {'VariableDeclarator':4, 'SwitchCase': 1}],
        'no-unused-vars': ['warn'],//未使用过的变量
        'no-console': ['warn', {allow: ['warn', 'error']}],
        'eqeqeq': ['warn', 'always'],
        'max-len': ['warn', 120],
        'no-extra-semi': 'error',//禁止不必要的分号
        'no-multi-spaces': 'error',//不允许重复使用分隔空格
        'no-multiple-empty-lines': 'error',//禁止出现多行空行（最多两行）
        'quotes': [2, 'single'],// js中使用单引号


        // React相关校验规则
        'react/jsx-indent': [2, 4],
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'jsx-quotes': ['error', 'prefer-double'],

        // 'react/sort-comp': 0,
        // 'react/jsx-indent': [2, 4],
        // 'react/display-name': 'warn',
        // 'react/no-children-prop': 0,
        // 'react/prop-types': ['warn', {ignore: ['className', 'children', 'style', 't']}],
        // 'react/jsx-no-undef': ['warn', {allowGlobals: true}],
        // 'react/no-deprecated': 'warn',
        // 'react/no-string-refs': 'warn',
        // 'react/forbid-prop-types': 0,
        // 'react/jsx-filename-extension': 0,
        // 'react/jsx-indent-props': 0,
        // 'react/jsx-closing-bracket-location': 0,
        // 'react/jsx-first-prop-new-line': 0,
        // 'react/jsx-boolean-value': ['warn', 'always'],
        // 'react/no-array-index-key':0,
        // 'react/no-multi-comp': 0,
        // 'react/prefer-stateless-function': 0,
        // 'react/no-find-dom-node': 'warn',
        // 'import/extensions': 0,
        // 'import/no-unresolved': 0,
        // 'import/no-extraneous-dependencies': 0,
        // 'import/no-dynamic-require': 0,

    },
};

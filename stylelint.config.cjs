module.exports = {
    plugins: [
        'stylelint-no-unused-selectors',
        'stylelint-value-no-unknown-custom-properties'
    ],
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-concentric',
    ],
    rules: {
        indentation: 4,
        'plugin/no-unused-selectors': {
            "suffixesToStrip": [".module"],
            "documents": [
                "{cssDir}/{cssName}.tsx",
            ],
        },
        'csstools/value-no-unknown-custom-properties': [
            true, {
                importFrom: [
                    './src/index.css',
                    './node_modules/@the-deep/deep-ui/build/esm/index.css',
                ]
            },
        ],
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],
    },
};

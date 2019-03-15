module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],

        karmaTypescriptConfig: {
            tsconfig: './tsconfig.spec.json',
        },

        files: ['src/**'],
        preprocessors: {
            'src/**': 'karma-typescript', // *.tsx for React Jsx
        },
        autoWatch: true,
        singleRun: false,
        reporters: ['progress', 'karma-typescript'],
        browsers: ['ChromeHeadless'],
    });
};

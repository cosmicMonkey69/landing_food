const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: ['./js/index.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
}
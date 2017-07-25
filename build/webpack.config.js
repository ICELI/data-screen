const path = require('path');
const reslove = dir => path.join(__dirname, dir);
const config = {
    entry: './src/main.js',
    output: {
        filename: 'screen.js',
        path: reslove('../dist'),
        libraryTarget: 'window' // 变量定义于根作用域下
    }
};

module.exports = config;
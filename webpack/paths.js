const path = require('path')

module.exports = {
    // entry
    index: path.resolve(__dirname, '../src/index.tsx'),

    // src
    srcRoot: path.resolve(__dirname, '../src'),
    component: path.resolve(__dirname, '../src/component'),

    public: path.resolve(__dirname, '../public'),
    // dev dist
    distRoot: path.resolve(__dirname, '../dist'),
    distAssetsDir: 'assets',
    distTestImgDir: "assets/_images",

    // temp output
    distOutputDir: path.resolve(__dirname, '../output')
}
module.exports = function(){
    var config = {
        js:['./src/**/*.module.js', './src/**/*.js', './lib/**/**/jasmine.js', './lib/**/**/jasmine-*.js','./lib/**/**/*.js'],
        index: 'src/index.html',
        src: 'src'
    };
    return config;
};
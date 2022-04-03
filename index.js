const {readFile} = require('fs');
const chalk = require('chalk');
const fm = require('./src/Model/FileManager');

const barCodesFile = './src/Model/BarCodes/barcodes.txt';
const encode = 'UTF-8';

readFile(barCodesFile,{encoding:encode},(err,text) =>{
    if(err) console.error(chalk.red(err));
    return fm.catchCodes(text);
})
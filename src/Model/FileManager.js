const fs = require('fs');
const chalk = require('chalk');

class FileManager
{
    static catchCodes(text){
        const codesList = text.split('\r\n');
        codesList.splice(codesList.indexOf(''),1);

        return this.treatCodes(codesList);
    }

    static treatCodes(list){
        let barCodesStatus = []
        const date = new Date();
        list.forEach(barCode => {
            let barCodeInfo = {
                barDate: barCode.substr(32,2),
                reais: barCode.substr(16,13),
                cents: barCode.substr(29,2),
                get price(){
                    return parseFloat(`${this.reais}.${this.cents}`).toFixed(2);
                }
            };
            let calculated = this.calculateValues(barCodeInfo.price);
            
            if(barCodeInfo.barDate < date.getDate()){
                let message = `Código de Barras:${barCode}\r\nValor: R$${barCodeInfo.price.toString().replace('.',',')}\r\nDesconto: R$${calculated.discount.toString().replace('.',',')}\r\n`;

                console.log(message);
                barCodesStatus.push(message);
            }else if(barCodeInfo.barDate == date.getDate()){
                let message = `Código de Barras:${barCode}\r\nValor: R$${barCodeInfo.price.toString().replace('.',',')}\r\n`;

                console.log(message);
                barCodesStatus.push(message);
            }else{
                let message = `Código de Barras:${barCode}\r\nValor: R$${barCodeInfo.price.toString().replace('.',',')}\r\nJuros: R$${calculated.tax.toString().replace('.',',')}\r\n`;
                
                console.log(message);
                barCodesStatus.push(message);
            }
        });

        return this.write(barCodesStatus);
    }

    static calculateValues(price){
        let newValues = {
            tax: parseFloat(price * 0.03).toFixed(2),
            discount: parseFloat(price * 0.05).toFixed(2)
        }
        return newValues;
    }

    static write(barCodesStatus){
        let codes = barCodesStatus.join('==============================================================\r\n');
        const newFile = './src/Model/Files/messages.txt';
        fs.writeFile(newFile,codes,(err) => {
            err ? console.error(chalk.red(err)) :  console.log(`Arquivo ${chalk.rgb(255,201,0)('messages.txt')} gerado com sucesso!`);
        })
    }
}

module.exports = FileManager;
#!/usr/bin/env node
var DappScratch = require("../lib/dapp-scratch")

var commander = require('commander');
var colors = require('colors');
var fs = require('fs')

commander
    .version('0.1.0')
    .option('-c, --contract [value]', 'Contract Name')
    .option('-a, --abi [value]', 'Location of the Contract ABI')

commander
    .command('*')
    .description('Run something')
    .action((command) => {

        contract = commander.contract
        abi = commander.abi
        // directory = param
        // console.log('param', param)
        // console.log('contract', commander.contract)
        // console.log('abi', commander.abi)
        let found = false
        let gaveUp = false
        if (!abi && !contract) {
            commander.help()
            process.exit(1);
        }
        let error = ''
        if (abi) {
            if (!fs.existsSync(abi)) {
                console.log(colors.red('No ABI found at ' + abi));
                abi = './build/contracts/' + abi + '.json'
                if (!fs.existsSync(abi)) {
                    console.log(colors.red('No ABI found at ' + abi));
                    process.exit(1);
                }
            }
        } else {
            abi = './build/contracts/' + contract + '.json'
            if (!fs.existsSync(abi)) {
                console.log(colors.red('No Contract found at ' + abi));
                process.exit(1);
            } 
        }
        console.log(colors.grey('ABI found at ' + abi));
        dappScratch = new DappScratch(abi)
        dappScratch.createDummyContract()
        .then(() => {
          console.log('Contract Created 🎉'.green)
        })
        .then(dappScratch.createWrapper())
        .then(() => {
          console.log('Wrapper Created 🍾'.green)
        })
        .catch((error) => {
          console.log('FAILED'.red)
          console.error(error)
        })
    })
// process.on('unhandledRejection', (reason) => {
//     console.log('Reason: ' + reason);
// });

if (process.argv <= 3) {
    commander.help()
    process.exit(1);
}

commander.parse(process.argv)

// if (typeof directory === 'undefined') {
//   console.log('no command given!'.red);
//   process.exit(1);
// }

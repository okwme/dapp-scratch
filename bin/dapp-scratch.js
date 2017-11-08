#!/usr/bin/env node
var dappScratch = require("../lib/dapp-scratch")

var commander = require('commander');
var colors = require('colors');


commander
    .version('0.1.0')
    .option('-c, --contract [value]', 'Contract Name')
    .option('-a, --abi [value]', 'Location of the Contract ABI')

commander
    .command('*')
    .description('Run something')
    .action((param) => {
        // directory = param
        // console.log('param', param)
        // console.log('contract', commander.contract)
        // console.log('abi', commander.abi)
        dappScratch.createDummyContract()
        .then(() => {
          console.log('Created Contract 🎉'.green)
        })
        .then(dappScratch.createWrapper())
        .then(() => {
          console.log('Created Wrapper 🍾'.green)
        })
        .catch((error) => {
          console.log('FAILED'.red)
          console.error(error)
        })
    })
// process.on('unhandledRejection', (reason) => {
//     console.log('Reason: ' + reason);
// });
commander.parse(process.argv)

// if (commander.rawArgs.length <= 2) {
//     commander.help()
// }

// if (typeof directory === 'undefined') {
//   console.log('no command given!'.red);
//   process.exit(1);
// }

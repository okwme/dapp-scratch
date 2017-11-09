#!/usr/bin/env node
var DappScratch = require("../lib/dapp-scratch")

var commander = require('commander');
var colors = require('colors');
var fs = require('fs')

commander
    .version('0.0.1')
    .option('-c, --contract', 'Contract')
    .option('-a, --abi', 'ABI')


commander
    .command('build')
    .description('Build a dummy solidity contract for testing')
    .action((command) => {
        let skip = true
        dappScratch = new DappScratch({skip})
        dappScratch.createDummyContract()
        .then(() => {
          console.log('Contract Created 🎉'.green)
        })
        .catch((error) => {
          console.log('FAILED'.red)
          console.error(error)
        })
    })

function getContract (path) {
    if (!fs.existsSync(path)) {
        path = './contracts/' + path
        if (!fs.existsSync(path)) {
            path  = path + '.sol'
            if (!fs.existsSync(path)) {
                console.log(colors.red('No Contract found'));
                commander.help()
                process.exit(1);
            }
        }
    }
    return path
}
function getABI (path) {
    if (!fs.existsSync(path)) {
        path = './build/contracts/' + path
        if (!fs.existsSync(path)) {
            path  = path + '.json'
            if (!fs.existsSync(path)) {
                console.log(colors.red('No ABI found'));
                commander.help()
                process.exit(1);
            }
        }
    }
    return path
}
commander
    .command('* <filename>')
    .description('Build Wrapper from Contract')
    .action((filename) => {
        var dappScratch = null
        if (commander.contract) {
            contractPath = getContract(filename)
            console.log(colors.green('Contract found at ' + contractPath));
            dappScratch = new DappScratch({contractPath})
        } else {
            abiPath = getABI(filename)
            console.log(colors.green('ABI found at ' + abiPath));
            dappScratch = new DappScratch({abiPath})
        }
        dappScratch.createWrapper()
        .then(() => {
          console.log('Wrapper Created 🍾'.green)
        })
        .catch((error) => {
            console.error(colors.red(error))
        })
    })
// process.on('unhandledRejection', (reason) => {
//     console.log('Reason: ' + reason);
// });

if (process.argv <= 2) {
    commander.help()
    process.exit(1);
}

commander.parse(process.argv)

// if (typeof directory === 'undefined') {
//   console.log('no command given!'.red);
//   process.exit(1);
// }

#!/usr/bin/env node
var DappScratch = require("../lib/dapp-scratch")

var commander = require('commander')
var colors = require('colors')
var fs = require('fs')
var shell = require('shelljs')
var inquirer = require('inquirer')
const child_process = require('child_process');

commander
    .version('0.0.1')
    .option('-a, --address', 'Address')
    .option('-b, --abi', 'ABI')
    .option('-c, --contract', 'Contract')


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

function installDependencies () {
    return new Promise((resolve, reject) => {
        let dependencies = ['bignumber.js', 'web3', 'web3-provider-engine', '@aeternity/id-manager-provider@0.0.4']
        let depIndex = 0
        let package = shell.exec('ls package.json', {silent: true})
        if (package.stderr) {
            inquirer.prompt({
                type: 'confirm',
                name: 'npminit',
                message: 'package.json not detected. OK to init?'
            }).then((resp) => {
                if (resp.npminit) {
                    child_process.execFileSync('npm', ['init'], {stdio: 'inherit'})
                    promptInstall(0, dependencies).then(resolve).catch(reject)
                } else {
                    console.log(colors.yellow('Dependencies will not be installed'))
                    resolve()
                }
            }).catch(reject)
        } else{
            promptInstall(0, dependencies).then(resolve).catch(reject)
        }
    })
}

function promptInstall (index = 0, dependencies = []) {
    return new Promise((resolve, reject) => {
        if (index >= dependencies.length) resolve()
        let dep = dependencies[index]
        if (shell.exec('npm list |  grep ' + dep, {silent:true}).stdout.length) {
            console.log(colors.green(dep + ' installed'))
            promptInstall(index + 1, dependencies).then(resolve).catch(reject)
        }else {
            inquirer.prompt({
                type: 'confirm',
                name: 'install_' + dep.split('.').join('_'),
                message: 'Ok to install and add ' + dep + ' to your package.json?'
            }).then((resp) => {
                if (resp['install_' + dep.split('.').join('_')]) {
                    child_process.execFileSync('npm', ['install', dep, '--save'], {stdio: 'inherit'})
                    console.log(colors.green(dep + ' installed'))
                } else {
                    console.log(colors.yellow(dep + ' will not be installed'))
                }
                promptInstall(index + 1, dependencies).then(resolve).catch(reject)
            }).catch(reject)
        }
    })
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
        installDependencies().then(() => {
            return dappScratch.createWrapper(commander.address)
        })
        .then(() => {
          console.log(colors.green('Wrapper Created at ' + dappScratch.path))
          console.log(colors.grey(`
/*
 * To use ${dappScratch.projectName} just import it into your project:
 */

import ${dappScratch.projectName} from '${dappScratch.path}'
let ${dappScratch.projectNameSmall} = new ${dappScratch.projectName}()
${dappScratch.projectNameSmall}.helloWorld()

/*
 * Have Fun : )
 */
            `))
          process.exit(1);
        })
        .catch((error) => {
            console.error(colors.red(error))
            commander.help()
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

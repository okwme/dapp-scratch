# Dapp Scratch
A command line interface for generating a Javascript module for interacting with a Solidity contract.

## Tutorial
[Dapp Scratch: a CLI for Building Dapps (and tutorial for building your first one)](https://medium.com/@billyrennekamp/dapp-scratch-a-cli-for-building-dapps-and-tutorial-for-building-your-first-one-5cabdff3771e)

## install
```
npm install okwme/dapp-scratch -g
```
## run
```
$ dapp-scratch build <ContractName>
$ dapp-scratch build <ContractName> --address 0x1234567890123456789012345678901234567890
$ dapp-scratch build <ContractName> --ABI './build/contracts/ContractName.json'
$ dapp-scratch build <ContractName> --contract './contracts/ContractName.sol'
$ dapp-scratch test
$ dapp-scratch -h

  Usage: dapp-scratch build [options]


  Options:

    -V, --version              output the version number
    -c, --contract [contract]  Contract name or location
                                 ie: SampleContract or SampleContract.sol or ./contracts/SampleContract.sol
    -b, --abi [abi]            ABI name or location
                                 ie: SampleContract or SampleContract.json or ./build/contracts/SampleContract.json
    -a, --address [address]    Address of deployed contract
    -h, --help                 output usage information


  Commands:

    build   Build a module from Contract or ABI
    test    Generate a contract for testing


```

## results
```
$ dapp-scratch build SampleContract
Contract found at ./contracts/SampleContract.sol
web3 installed
web3-provider-engine installed
Module created at ./dapp-module/SampleContract/index.js

/*
 * To use SampleContract just import it into your project:
 */

const SampleContract = require('./dapp-module/SampleContract/index.js')
let sampleContract = new SampleContract()
sampleContract.helloWorld()

/*
 * Have Fun : )
 */
```

## develop
```
git clone git@github.com/okwme/dapp-scratch
cd dapp-scratch
npm install
npm run dev
```

## test
```
npm run test
```

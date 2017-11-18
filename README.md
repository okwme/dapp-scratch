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
$ dapp-scratch <ContractName>
$ dapp-scratch <ContractName> --address 0x1234567890123456789012345678901234567890
$ dapp-scratch <ContractName> --ABI './build/contracts/ContractName.json'
$ dapp-scratch <ContractName> --contract './contracts/ContractName.sol'
$ dapp-scratch build
$ dapp-scratch -h

Usage: dapp-scratch [options] [command]
Options:
-V, --version   output the version number
    -a, --address   Address
    -b, --abi       ABI
    -c, --contract  Contract
    -h, --help      output usage information
Commands:
* <filename>  Build Wrapper from Contract
build         Build a dummy solidity contract for testing

```

## results
```
$ dapp-scratch ContractName
ABI found at ./build/contracts/ContractName.json
bignumber.js installed
web3 installed
web3-provider-engine installed
@aeternity/id-manager-provider@0.0.5 installed
Wrapper Created at ./dapp-scratch-wrapper/ContractName/index.js
/*
 * To use ContractName just import it into your project:
 */
import ContractName from './dapp-scratch-wrapper/ContractName'
let contractName = new ContractName()
ContractName.helloWorld()
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

## TODO
* add event listening
* generate ABI from .sol when no is ABI present
* reduce dependencies
* rebuild tests

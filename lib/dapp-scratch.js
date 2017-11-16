"use strict"
const fs = require('fs-extra')
var colors = require('colors')
const web3Eth = require('web3-eth')
class DappScratch {

    constructor ({contractPath, abiPath, skip}) {
      if (!contractPath && !abiPath && !skip) throw new Error('No Contract')
      this.path = null
      this.abi = null
      this.address = null
      this.projectName = null
      this.projectNameCapitalized = null
      this.projectNameSmall = null
      this.abiPath = abiPath
      this.contractPath = contractPath
      this.contractName = 'sampleContract'
      this.contractNameCapitalized = this.contractName.charAt(0).toUpperCase() + this.contractName.slice(1)
      this.filename = './contracts/' + this.contractNameCapitalized + '.sol'
      this.starterTemplate = __dirname + '/starterTemplate.js'
      this.wrapperFile = ''
      this.types = [
        'bool',

        'int',
        'int8',
        'int256',

        'uint',
        'uint8',
        'uint256',

        // 'fixed',
        // 'fixed8x0',
        // 'fixed256x80',
  

        // 'ufixed',
        // 'ufixed8x0',
        // 'ufixed256x80',

        'address',

        'byte',
        'bytes1',
        'bytes32',

        'bytes',
        'string'
      ]
    }

    /* 
    *
    *
    *
    * build wrapper
    *
    *
    */

    createWrapper (address = '\'REPLACE_WITH_CONTRACT_ADDRESS\'') {
      this.address = address
      return new Promise((resolve, reject) => {
        return this.readTemplate()
        .then(this.getAbi.bind(this))
        .then(this.wrapperReplaceName.bind(this))
        .then(this.buildFunctions.bind(this))
        .then(this.writeWrapper.bind(this))
        .then(resolve)
        .catch((err) => {
          reject(new Error(err))
        })
      })
    }

    readTemplate () {
      return new Promise((resolve, reject) => {
        fs.readFile(this.starterTemplate, 'utf8', (err, data) => {
          if (err) reject(new Error(err))
          this.wrapperFile = data
          resolve()
        })
      })
    }

    wrapperReplaceName() {
      return new Promise((resolve, reject) => {
        this.wrapperFile = this.wrapperFile.replace(new RegExp('__NAME__', 'g'), this.projectNameCapitalized)
        this.wrapperFile = this.wrapperFile.replace(new RegExp('__ADDRESS__', 'g'), this.address)
        resolve()
      })
    }

    writeWrapper () {
      return new Promise((resolve, reject) => {
        if (fs.existsSync('./dapp-scratch')) fs.removeSync('./dapp-scratch')
        fs.mkdirSync('./dapp-scratch')
        fs.mkdirSync('./dapp-scratch/' + this.projectName)
        this.path = './dapp-scratch/' + this.projectName + '/index.js'
        fs.writeFile(this.path, this.wrapperFile, (err) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve()
          }
        })
      })
    }



    getAbi () {
      return new Promise((resolve, reject) => {
        if (this.abiPath) {
          fs.readFile(this.abiPath, 'utf8', (err, data) => {
            if (err) reject(new Error(err))
            try {
              data = JSON.parse(data)
            } catch(err) {
              reject(new Error(err))
            }
            this.projectName = data.contractName
            this.projectNameSmall = this.projectName.charAt(0).toLowerCase() + this.projectName.slice(1)
            this.projectNameCapitalized = this.projectName.charAt(0).toUpperCase() + this.projectName.slice(1)

            this.abi = data.abi
            resolve()
          })
        } else if (this.contractPath) {
          // compile abi from contract
          fs.readFile(this.contractPath, 'utf8', (err, data) => {
            if (err) reject(new Error(err))
            web3Eth.compile.solidity(data).then((response) => {
              this.abi = response.info.abiDefinition
              resolve()
            }).catch((err) => {
              reject(new Error(err))
            })
          })
        } else {
          reject(new Error('No ABI or Contract'))
        }
      })
    }


    buildFunctions () {
      return new Promise((resolve, reject) => {
        this.generateFunctionSet().then((all) => {
          this.wrapperFile = this.wrapperFile.replace(new RegExp('___FUNCTIONS___', 'g'), all)
          resolve()
        }).catch(reject)
      })
    }

    generateFunctionSet (typeIndex = 0, all = '') {


      return new Promise ((resolve, reject) => {


        let functionTypes =[
          {
            stateMutability: 'view',
            name: 'Constant Functions',
            type: 'function'
          }, 
          {
            stateMutability: 'nonpayable',
            name: 'Transaction Functions',
            type: 'function'
          }, 
          {
            stateMutability: 'view',
            name: 'Events',
            type: 'event'
          }
        ]
        if (typeIndex >= functionTypes.length) {
         return resolve(all)
        }
        let curr = functionTypes[typeIndex]

        all += '\n'
        all += '  /*\n'
        all += '   *\n'
        all += '   * ' + curr.name + '\n'
        all += '   *\n'
        all += '   */\n'
        all += '\n'




        if (curr.type === 'event') {
          this.generateEvents(curr, all).then((all) => {
            this.generateFunctionSet(typeIndex + 1, all).then((all) => {
              resolve(all)
            }).catch(reject)
          })
        } else {
          this.generateFunctions(curr, all).then((all) => {
            this.generateFunctionSet(typeIndex + 1, all).then((all) => {
              resolve(all)
            }).catch(reject)
          })
        }
      })
    }


    generateFunctions (curr, all) {

      return new Promise((resolve, reject) => {
        try {
          this.abi.forEach((info) => {
            if (!info.name) return
            if (curr.stateMutability !== info.stateMutability) return
            all += '  ' + info.name + ' ('

            let functions = ''
            let typedFunctions = ''
            info.inputs.forEach((input, index) => {
              if (info.name === 'undefined') return
              functions += input.name
              functions += (index === info.inputs.length - 1 ? '' : ', ')

              switch(input.type.slice(0, 3)) {
                case('boo'):
                    typedFunctions += '(bool) ' + input.name
                  break
                case('int'):
                case('uin'):
                    typedFunctions += 'new BN(' + input.name + ', 10)'
                  break
                case('add'):
                case('byt'):
                  if (input === 'bytes') {
                    typedFunctions += input.name + '.map((a) => new BN(a, 16))'
                  } else {
                    typedFunctions += 'new BN(' + input.name + ', 16)'
                  }
                  break
                case('str'):
                    typedFunctions += input.name
                  break
              }
              typedFunctions += (index === info.inputs.length - 1 ? '' : ', ')
            })

            all += functions + ') {\n'

            if (info.stateMutability === 'nonpayable') {
              all += '    if (!this.account) return new Error(\'Unlock Wallet\')\n'
            }

            all += '    return this.' + this.projectName + '.methods.' + info.name + '(' + typedFunctions + ')'
            switch(info.stateMutability) {
              case('view'):
                all += '.call()'
                break
              case('nonpayable'):
                all += '.send({from: this.account})\n'
                all += '    .on(\'transactionHash\', (hash) => {\n'
                all += '      console.log(hash)\n'
                all += '      this.loading = true\n'
                all += '    })\n'
                break
            }
            all += '    .then((resp) => {\n'
            if (info.stateMutability === 'nonpayable') {
              all += '      this.loading = false\n'
            }
            all += '      console.log(resp)\n'
            all += '      return resp\n'
            all += '    }).catch((err) => {\n'
            if (info.stateMutability === 'nonpayable') {
              all += '      this.loading = false\n'
            }
            all += '      console.error(err)\n'
            all += '    })\n'
            all += '  }\n'
          })
          resolve(all)
        } catch(err) {
          reject(new Error(err))
        }
      })
    }

    generateEvents (curr, all) {
      return new Promise((resolve, reject) => {
        resolve(all)
      })
    }


    /* 
    *
    *
    *
    * Dummy Contract Generator
    *
    *
    */

    createDummyContract () {
      return new Promise((resolve, reject) => {
        return this.createEmptyContract()
        .then(this.createAllContractTypes.bind(this))
        .then(this.createContractConstructor.bind(this))
        .then(this.createAllContractFunctions.bind(this))
        .then(this.closeContract.bind(this))
        .catch((err) => {
          reject(new Error(err))
        })
        .then(resolve)
      })
    }

    createEmptyContract () {
      return new Promise((resolve, reject) => {
        fs.writeFile(this.filename, 'pragma solidity ^0.4.17;\ncontract ' + this.contractNameCapitalized + ' {\n', (err) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve()
          }
        })
      })
    }

    createAllContractTypes () {
      let all = ''
      this.types.forEach((type) => {
        all += '  ' + type + ' _' + type + ';\n'
      })

      return new Promise((resolve, reject) => {
        fs.appendFile(this.filename, all, (err) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve()
          }
        })
      })
    }


    createContractConstructor () {
      let all = '  function ' + this.contractNameCapitalized + '() {}\n';

      return new Promise((resolve, reject) => {
        fs.appendFile(this.filename, all, (err) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve()
          }
        })
      })
    }

    createAllContractFunctions () {
      return this.createAllContractCallFunctions()
      .then(this.createAllContractTransactionFunctions(this))
      .catch(error => {
        reject(new Error(error))
      })
    }

    createAllContractCallFunctions () {
      let all = ''
      this.types.forEach((type) => {
        let functionName = 'function ' + type 
        let functionParams = ' (' + type + ' _' + type
        let typeString = type.charAt(0).toUpperCase() + type.slice(1)

        this.types.forEach((_type) => {
          let returns = '(' + _type + ' __' + _type + ')'
          let work = '{\n    ' + _type + ' ___' + _type + ';\n    return __' + _type + ';\n  }'
          let _typeString = _type.charAt(0).toUpperCase() + _type.slice(1)

          all += '  ' + functionName + 'FunctionReturns' + _typeString + functionParams + ') public constant returns' + returns + work + '\n'
          all += '  event ' + typeString + 'EventReturns' + _typeString + returns + ';\n'

        })
        let randType = false
        while(randType === false || randType === type) {
          randType = this.types[Math.floor(Math.random() * this.types.length)]
        }

        let randTypeString = randType.charAt(0).toUpperCase() + randType.slice(1)
        functionParams += ', ' + randType + ' __' + randType

        let returns = '(' + type + ' __' + type + ', ' + randType + ' _' + randType + '_)'
        let work = '{\n    ' + type + ' ___' + type + ';'
        work +=    '\n    ' + randType + ' ___' + randType + ';'
        work +=    '\n    return (___' + type + ', ___' + randType + ');'
        work +=    '\n  }'

        all += '  ' + functionName + randTypeString + 'FunctionReturns' + typeString + randTypeString + functionParams + ') public constant returns' + returns + work + '\n'

      })
      return new Promise((resolve, reject) => {
        fs.appendFile(this.filename, all, (err) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve()
          }
        })
      })
    }

    createAllContractTransactionFunctions () {
      let all = ''
      this.types.forEach((type) => {
        let typeString = type.charAt(0).toUpperCase() + type.slice(1)
        all += '  function change' + typeString + '(' + type + ' __' + type + ') public {\n'
        all += '    _' + type + ' = __' + type + ';\n'
        all += '  }\n'
      })
      return new Promise((resolve, reject) => {
        fs.appendFile(this.filename, all, (err) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve()
          }
        })
      })
    }


    closeContract () {
      return new Promise((resolve, reject) => {
        fs.appendFile(this.filename, '\n}', (err) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve()
          }
        })
      })
    }
}

exports = module.exports = DappScratch;





































"use strict"
const fs = require('fs-extra')
const web3Eth = require('web3-eth')
class DappScratch {

    constructor ({contractPath, abiPath, skip}) {
      if (!contractPath && !abiPath && !skip) throw new Error('No Contract')
      this.abi = null
      this.projectName = null
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


    createWrapper () {
      return new Promise((resolve, reject) => {
        return this.readTemplate()
        .then(this.wrapperReplaceName.bind(this))
        .then(this.getAbi.bind(this))
        .then(this.buildFunctions.bind(this))
        .then(this.writeWrapper.bind(this))
        .then(resolve)
        .catch((err) => {
          reject(new Error(err))
        })
      })
    }

    readTemplate () {
      console.log('readTemplate')
      return new Promise((resolve, reject) => {
        fs.readFile(this.starterTemplate, 'utf8', (err, data) => {
          if (err) reject(new Error(err))
          this.wrapperFile = data
          resolve()
        })
      })
    }

    wrapperReplaceName() {
      console.log('wrapperReplaceName')
      return new Promise((resolve, reject) => {
        this.wrapperFile = this.wrapperFile.replace(new RegExp('__NAME__', 'g'), this.contractNameCapitalized)
        resolve()

      })
    }

    writeWrapper () {
      console.log('writeWrapper')
      return new Promise((resolve, reject) => {
        if (fs.existsSync('./dapp-scratch-' + this.contractName)) fs.removeSync('./dapp-scratch-' + this.contractName)
        fs.mkdirSync('./dapp-scratch-' + this.contractName)
        fs.writeFile('./dapp-scratch-' + this.contractName + '/index.js', this.wrapperFile, (err) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve()
          }
        })
      })
    }



    getAbi () {
      console.log('getAbi')
      return new Promise((resolve, reject) => {
        if (this.abiPath) {
          fs.readFile(this.abiPath, 'utf8', (err, data) => {
            if (err) reject(new Error(err))
            data = JSON.parse(data)
            console.log('readfile abi')
            this.projectName = data.contractName
            this.abi = data.abi
            resolve()
          })
        } else if (this.contractPath) {
          // compile abi from contract
          fs.readFile(this.contractPath, 'utf8', (err, data) => {
            if (err) reject(new Error(err))
            web3Eth.compile.solidity(data).then((response) => {
              console.log(response.info.abiDefinition)
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
      console.log('buildFunctions')
      let all = ''
      return new Promise ((resolve, reject) => {
        this.abi.forEach((info) => {
          if (info.type === 'event') return
          console.log(info)
          all += '  ' + info.name + ' ('
          let functions = ''
          info.inputs.forEach((input, index) => {
            functions += input.name + (index === info.inputs.length - 1 ? '' : ', ')
            // switch(input.type.slice(0, 3)) {
            //   case('boo'):

            //     break
            //   case('int'):

            //     break
            //   case('uin'):

            //     break
            //   case('add'):

            //     break
            //   case('byt'):
            //     if (input === 'bytes') {

            //     } else if (input === 'byte') {

            //     }
            //     break
            //   case('string'):

            //     break
            // }
            // all += input.name
          })
          all += functions + ') {\n'
          all += '    return this.' + this.projectName + '.' + info.name + '(' + functions + ')'
          switch(info.stateMutability) {
            case('view'):
              all += '.call()'
              break
            case('nonpayable'):
              all += '.send({from: this.account})'
              break
          }
          all += '.then((resp) => {\n      console.log(resp)\n    })\n  }\n'
        })
        this.wrapperFile = this.wrapperFile.replace(new RegExp('___FUNCTIONS___', 'g'), all)
        resolve()
      })
    }


    // build contract functions

    createDummyContract () {
      return new Promise((resolve, reject) => {
        return this.createEmptyContract()
        .then(this.createAllTypes.bind(this))
        .then(this.createConstructor.bind(this))
        .then(this.createAllFunctions.bind(this))
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

    createAllTypes () {
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


    createConstructor () {
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

    createAllFunctions () {
      return this.createCallFunctions()
      .then(this.createChangeFunctions(this))
      .catch(error => {
        reject(new Error(error))
      })
    }

    createCallFunctions () {
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

    createChangeFunctions () {
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





































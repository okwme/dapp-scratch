"use strict"
const fs = require('fs')
class DappScratch {

    constructor () {
      this.contractName = 'sample'
      this.contractNameCapitalized = this.contractName.charAt(0).toUpperCase() + this.contractName.slice(1)
      this.filename = './contracts/' + this.contractNameCapitalized + 'Contract.sol'
      this.starterTemplate = './assets/starterTemplate.js'
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

    hello () {
      return 'hello'
    }

    createWrapper () {
      return new Promise((resolve, reject) => {
        fs.readFile(this.starterTemplate, 'utf8', (err, data) => {
          if (err) throw new Error(err)
          data = data.replace(new RegExp('__NAME__', 'g'), this.contractNameCapitalized);
          fs.writeFile('./assets/' + this.contractName + '.js', data, (err) => {
            if (err) {
              throw new Error(err)
            } else {
              resolve()
            }
          })
        })
      })
    }

    createDummyContract () {
      return new Promise((resolve, reject) => {
        return this.createEmptyContract()
        .then(this.createAllTypes(this))
        .then(this.createConstructor(this))
        .then(this.createAllFunctions(this))
        .then(this.closeContract(this))
        .catch((err) => {
          throw new Error(err)
        })
        .then(resolve)
      })
    }

    createEmptyContract () {
      console.log('createEmptyContract')
      return new Promise((resolve, reject) => {
        fs.writeFile(this.filename, 'pragma solidity ^0.4.17;\ncontract ' + this.contractNameCapitalized + ' {\n', (err) => {
          if (err) {
            throw new Error(err)
          } else {
            resolve()
          }
        })
      })
    }

    createAllTypes () {
      console.log('createAllTypes')
      let all = ''
      this.types.forEach((type) => {
        all += '  ' + type + ' _' + type + ';\n'
      })

      return new Promise((resolve, reject) => {
        fs.appendFile(this.filename, all, (err) => {
          if (err) {
            throw new Error(err)
          } else {
            resolve()
          }
        })
      })
    }

    createConstructor () {
      console.log('createConstructor')
      let all = '  function ' + this.contractNameCapitalized + '() {}\n';

      return new Promise((resolve, reject) => {
        fs.appendFile(this.filename, all, (err) => {
          if (err) {
            throw new Error(err)
          } else {
            resolve()
          }
        })
      })
    }

    createAllFunctions () {
      console.log('createAllFunctions')
      let all = ''
      this.types.forEach((type) => {
        let functionName = 'function ' + type 
        let functionParams = ' (' + type + ' _' + type
        let typeString = type.charAt(0).toUpperCase() + type.slice(1)

        this.types.forEach((_type) => {
          let returns = '(' + _type + ' __' + _type + ')'
          let work = '{\n    ' + _type + ' ___' + _type + ';\n    return __' + _type + ';\n  }'
          let _typeString = _type.charAt(0).toUpperCase() + _type.slice(1)

          all += '  ' + functionName + 'FunctionReturns' + _typeString + functionParams + ') public pure returns' + returns + work + '\n'
          all += '  event ' + typeString + 'EventReturns' + _typeString + returns + ';\n'

        })
        let randType = false
        while(randType === false || randType === type) {
          randType = this.types[Math.floor(Math.random() * this.types.length)]
        }

        let randTypeString = randType.charAt(0).toUpperCase() + randType.slice(1)
        functionParams + ', ' + randType + '__' + randType

        let returns = '(' + type + ' __' + type + ', ' + randType + ' _' + randType + '_)'
        let work = '{\n    ' + type + ' ___' + type + ';'
        work +=    '\n    ' + randType + ' ___' + randType + ';'
        work +=    '\n    return (___' + type + ', ___' + randType + ');'
        work +=    '\n  }'

        all += '  ' + functionName + randTypeString + 'FunctionReturns' + typeString + randTypeString + functionParams + ') public pure returns' + returns + work + '\n'

      })
      return new Promise((resolve, reject) => {
        fs.appendFile(this.filename, all, (err) => {
          if (err) {
            throw new Error(err)
          } else {
            resolve()
          }
        })
      })
    }

    closeContract () {
      console.log('closeContract')
      return new Promise((resolve, reject) => {
        fs.appendFile(this.filename, '\n}', (err) => {
          if (err) {
            throw new Error(err)
          } else {
            resolve()
          }
        })
      })
    }
}

exports = module.exports = new DappScratch();





































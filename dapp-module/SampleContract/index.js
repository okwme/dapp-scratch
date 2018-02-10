
import SampleContractArtifacts from '../../build/contracts/SampleContract.json'

import Web3 from 'web3'
const BN = Web3.utils.BN
import ZeroClientProvider from 'web3-provider-engine/zero.js'

class SampleContract {
  constructor (options) {

    this.SampleContract = null

    this.pollingInterval = null
    this.account = null
    this.unlocked = false
    this.balanceWei = 0
    this.balance = 0
    this.address = ''REPLACE_WITH_CONTRACT_ADDRESS''
    this.genesisBlock = 0
    this.loading = false
    this.options = {
      readonlyRpcURL: 'https://mainnet.infura.io'
      autoInit: true,
      getPastEvents: false,
      watchFutureEvents: false,
      connectionRetries: 3
    }
    Object.assign(this.options, options)
    if (this.options.autoInit) this.initWeb3()
  }

  // hello world : )
  helloWorld () {
    console.log('hello world!')
  }

  /*
   * Connect
   */

  initWeb3 () {
    return new Promise((resolve, reject) => {

      let web3Provider = false

        // check for metamask
        if (global.web3) {
          web3Provider = web3.currentProvider
          // attempt to try again if no web3Provider
        } else if (this.options.connectionRetries > 0){
          this.options.connectionRetries -= 1
          setTimeout(() => {
            this.initWeb3().then(resolve).catch((error) => {
              reject(new Error(error))
            })
          }, 1000)
          // revert to a read only version using infura endpoint
        } else {
          this.readOnly = true
          web3Provider = ZeroClientProvider({
            getAccounts: function(){},
            rpcUrl: this.options.readonlyRpcURL
          })
        }

        if (web3Provider) {
          global.web3 = new Web3(web3Provider)
          this.startChecking()

          if (this.options.getPastEvents) this.getPastEvents()
          if (this.options.watchFutureEvents) this.watchFutureEvents()
        }
      })
    })
  }

  /*
   * Check every second for switching network or switching wallet
   */

  startChecking () {
    if (this.pollingInterval) clearInterval(this.pollingInterval)
    this.getGenesisBlock()
    .then(() => {
      this.pollingInterval = setInterval(this.check.bind(this), 1000)
    })
    .catch((err) => {
      throw new Error(err)
    })
  }

  check () {
    this.checkNetwork()
    .then(this.checkAccount.bind(this))
    .catch((error) => {
      console.error(error)
      throw new Error(error)
    })
  }

  checkNetwork () {
    return global.web3.eth.net.getId((err, netId) => {
      if (err) console.error(err)
      if (!err && this.network !== netId) {
        this.network = netId
        return this.deployContract()
      }
    })
  }

  deployContract () {
    if (!this.address || this.address === 'REPLACE_WITH_CONTRACT_ADDRESS') return new Error('Please provide a contract address')
    this.SampleContract = new global.web3.eth.Contract(SampleContractArtifacts.abi, this.address)
  }

  checkAccount () {
    return global.web3.eth.getAccounts((error, accounts) => {
      if (error) throw new Error(error)
      if (accounts.length && this.account !== accounts[0]) {
        this.unlocked = true
        this.account = accounts[0]
      } else if (!accounts.length) {
        this.unlocked = false
        this.account = null
      }
    })
  }


  /*
   * Not Yet Implemented vvvv
   */

  getGenesisBlock () {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  getPastEvents () {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  watchFutureEvents () {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }




  /*
   *
   * Constant Functions
   *
   */

  boolFunctionReturnsBool (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsBool((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsInt (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsInt((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsInt8 (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsInt8((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsInt256 (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsInt256((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsUint (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsUint((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsUint8 (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsUint8((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsUint256 (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsUint256((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsAddress (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsAddress((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsByte (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsByte((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsBytes1 (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsBytes1((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsBytes32 (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsBytes32((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsBytes (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsBytes((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolFunctionReturnsString (_bool) {
    return this.SampleContract.methods.boolFunctionReturnsString((bool) _bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  boolUint256FunctionReturnsBoolUint256 (_bool, __uint256) {
    return this.SampleContract.methods.boolUint256FunctionReturnsBoolUint256((bool) _bool, new BN(__uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsBool (_int) {
    return this.SampleContract.methods.intFunctionReturnsBool(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsInt (_int) {
    return this.SampleContract.methods.intFunctionReturnsInt(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsInt8 (_int) {
    return this.SampleContract.methods.intFunctionReturnsInt8(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsInt256 (_int) {
    return this.SampleContract.methods.intFunctionReturnsInt256(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsUint (_int) {
    return this.SampleContract.methods.intFunctionReturnsUint(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsUint8 (_int) {
    return this.SampleContract.methods.intFunctionReturnsUint8(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsUint256 (_int) {
    return this.SampleContract.methods.intFunctionReturnsUint256(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsAddress (_int) {
    return this.SampleContract.methods.intFunctionReturnsAddress(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsByte (_int) {
    return this.SampleContract.methods.intFunctionReturnsByte(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsBytes1 (_int) {
    return this.SampleContract.methods.intFunctionReturnsBytes1(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsBytes32 (_int) {
    return this.SampleContract.methods.intFunctionReturnsBytes32(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsBytes (_int) {
    return this.SampleContract.methods.intFunctionReturnsBytes(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intFunctionReturnsString (_int) {
    return this.SampleContract.methods.intFunctionReturnsString(new BN(_int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  intBytes32FunctionReturnsIntBytes32 (_int, __bytes32) {
    return this.SampleContract.methods.intBytes32FunctionReturnsIntBytes32(new BN(_int, 10), __bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsBool (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsBool(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsInt (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsInt(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsInt8 (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsInt8(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsInt256 (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsInt256(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsUint (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsUint(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsUint8 (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsUint8(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsUint256 (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsUint256(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsAddress (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsAddress(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsByte (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsByte(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsBytes1 (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsBytes1(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsBytes32 (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsBytes32(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsBytes (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsBytes(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8FunctionReturnsString (_int8) {
    return this.SampleContract.methods.int8FunctionReturnsString(new BN(_int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int8Bytes32FunctionReturnsInt8Bytes32 (_int8, __bytes32) {
    return this.SampleContract.methods.int8Bytes32FunctionReturnsInt8Bytes32(new BN(_int8, 10), __bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsBool (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsBool(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsInt (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsInt(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsInt8 (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsInt8(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsInt256 (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsInt256(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsUint (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsUint(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsUint8 (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsUint8(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsUint256 (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsUint256(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsAddress (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsAddress(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsByte (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsByte(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsBytes1 (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsBytes1(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsBytes32 (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsBytes32(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsBytes (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsBytes(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256FunctionReturnsString (_int256) {
    return this.SampleContract.methods.int256FunctionReturnsString(new BN(_int256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  int256Uint8FunctionReturnsInt256Uint8 (_int256, __uint8) {
    return this.SampleContract.methods.int256Uint8FunctionReturnsInt256Uint8(new BN(_int256, 10), new BN(__uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsBool (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsBool(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsInt (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsInt(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsInt8 (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsInt8(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsInt256 (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsInt256(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsUint (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsUint(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsUint8 (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsUint8(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsUint256 (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsUint256(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsAddress (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsAddress(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsByte (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsByte(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsBytes1 (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsBytes1(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsBytes32 (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsBytes32(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsBytes (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsBytes(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintFunctionReturnsString (_uint) {
    return this.SampleContract.methods.uintFunctionReturnsString(new BN(_uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uintBoolFunctionReturnsUintBool (_uint, __bool) {
    return this.SampleContract.methods.uintBoolFunctionReturnsUintBool(new BN(_uint, 10), (bool) __bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsBool (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsBool(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsInt (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsInt(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsInt8 (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsInt8(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsInt256 (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsInt256(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsUint (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsUint(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsUint8 (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsUint8(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsUint256 (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsUint256(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsAddress (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsAddress(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsByte (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsByte(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsBytes1 (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsBytes1(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsBytes32 (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsBytes32(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsBytes (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsBytes(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8FunctionReturnsString (_uint8) {
    return this.SampleContract.methods.uint8FunctionReturnsString(new BN(_uint8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint8StringFunctionReturnsUint8String (_uint8, __string) {
    return this.SampleContract.methods.uint8StringFunctionReturnsUint8String(new BN(_uint8, 10), __string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsBool (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsBool(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsInt (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsInt(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsInt8 (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsInt8(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsInt256 (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsInt256(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsUint (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsUint(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsUint8 (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsUint8(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsUint256 (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsUint256(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsAddress (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsAddress(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsByte (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsByte(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsBytes1 (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsBytes1(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsBytes32 (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsBytes32(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsBytes (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsBytes(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256FunctionReturnsString (_uint256) {
    return this.SampleContract.methods.uint256FunctionReturnsString(new BN(_uint256, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  uint256StringFunctionReturnsUint256String (_uint256, __string) {
    return this.SampleContract.methods.uint256StringFunctionReturnsUint256String(new BN(_uint256, 10), __string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsBool (_address) {
    return this.SampleContract.methods.addressFunctionReturnsBool(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsInt (_address) {
    return this.SampleContract.methods.addressFunctionReturnsInt(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsInt8 (_address) {
    return this.SampleContract.methods.addressFunctionReturnsInt8(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsInt256 (_address) {
    return this.SampleContract.methods.addressFunctionReturnsInt256(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsUint (_address) {
    return this.SampleContract.methods.addressFunctionReturnsUint(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsUint8 (_address) {
    return this.SampleContract.methods.addressFunctionReturnsUint8(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsUint256 (_address) {
    return this.SampleContract.methods.addressFunctionReturnsUint256(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsAddress (_address) {
    return this.SampleContract.methods.addressFunctionReturnsAddress(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsByte (_address) {
    return this.SampleContract.methods.addressFunctionReturnsByte(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsBytes1 (_address) {
    return this.SampleContract.methods.addressFunctionReturnsBytes1(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsBytes32 (_address) {
    return this.SampleContract.methods.addressFunctionReturnsBytes32(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsBytes (_address) {
    return this.SampleContract.methods.addressFunctionReturnsBytes(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressFunctionReturnsString (_address) {
    return this.SampleContract.methods.addressFunctionReturnsString(_address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  addressIntFunctionReturnsAddressInt (_address, __int) {
    return this.SampleContract.methods.addressIntFunctionReturnsAddressInt(_address, new BN(__int, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsBool (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsBool(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsInt (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsInt(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsInt8 (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsInt8(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsInt256 (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsInt256(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsUint (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsUint(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsUint8 (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsUint8(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsUint256 (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsUint256(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsAddress (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsAddress(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsByte (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsByte(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsBytes1 (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsBytes1(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsBytes32 (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsBytes32(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsBytes (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsBytes(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteFunctionReturnsString (_byte) {
    return this.SampleContract.methods.byteFunctionReturnsString(_byte).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  byteBoolFunctionReturnsByteBool (_byte, __bool) {
    return this.SampleContract.methods.byteBoolFunctionReturnsByteBool(_byte, (bool) __bool).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsBool (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsBool(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsInt (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsInt(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsInt8 (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsInt8(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsInt256 (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsInt256(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsUint (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsUint(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsUint8 (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsUint8(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsUint256 (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsUint256(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsAddress (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsAddress(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsByte (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsByte(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsBytes1 (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsBytes1(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsBytes32 (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsBytes32(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsBytes (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsBytes(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1FunctionReturnsString (_bytes1) {
    return this.SampleContract.methods.bytes1FunctionReturnsString(_bytes1).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes1BytesFunctionReturnsBytes1Bytes (_bytes1, __bytes) {
    return this.SampleContract.methods.bytes1BytesFunctionReturnsBytes1Bytes(_bytes1, __bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsBool (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsBool(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsInt (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsInt(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsInt8 (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsInt8(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsInt256 (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsInt256(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsUint (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsUint(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsUint8 (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsUint8(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsUint256 (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsUint256(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsAddress (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsAddress(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsByte (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsByte(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsBytes1 (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsBytes1(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsBytes32 (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsBytes32(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsBytes (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsBytes(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32FunctionReturnsString (_bytes32) {
    return this.SampleContract.methods.bytes32FunctionReturnsString(_bytes32).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytes32AddressFunctionReturnsBytes32Address (_bytes32, __address) {
    return this.SampleContract.methods.bytes32AddressFunctionReturnsBytes32Address(_bytes32, __address).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsBool (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsBool(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsInt (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsInt(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsInt8 (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsInt8(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsInt256 (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsInt256(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsUint (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsUint(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsUint8 (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsUint8(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsUint256 (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsUint256(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsAddress (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsAddress(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsByte (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsByte(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsBytes1 (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsBytes1(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsBytes32 (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsBytes32(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsBytes (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsBytes(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesFunctionReturnsString (_bytes) {
    return this.SampleContract.methods.bytesFunctionReturnsString(_bytes).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  bytesUintFunctionReturnsBytesUint (_bytes, __uint) {
    return this.SampleContract.methods.bytesUintFunctionReturnsBytesUint(_bytes, new BN(__uint, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsBool (_string) {
    return this.SampleContract.methods.stringFunctionReturnsBool(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsInt (_string) {
    return this.SampleContract.methods.stringFunctionReturnsInt(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsInt8 (_string) {
    return this.SampleContract.methods.stringFunctionReturnsInt8(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsInt256 (_string) {
    return this.SampleContract.methods.stringFunctionReturnsInt256(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsUint (_string) {
    return this.SampleContract.methods.stringFunctionReturnsUint(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsUint8 (_string) {
    return this.SampleContract.methods.stringFunctionReturnsUint8(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsUint256 (_string) {
    return this.SampleContract.methods.stringFunctionReturnsUint256(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsAddress (_string) {
    return this.SampleContract.methods.stringFunctionReturnsAddress(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsByte (_string) {
    return this.SampleContract.methods.stringFunctionReturnsByte(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsBytes1 (_string) {
    return this.SampleContract.methods.stringFunctionReturnsBytes1(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsBytes32 (_string) {
    return this.SampleContract.methods.stringFunctionReturnsBytes32(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsBytes (_string) {
    return this.SampleContract.methods.stringFunctionReturnsBytes(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringFunctionReturnsString (_string) {
    return this.SampleContract.methods.stringFunctionReturnsString(_string).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  stringInt8FunctionReturnsStringInt8 (_string, __int8) {
    return this.SampleContract.methods.stringInt8FunctionReturnsStringInt8(_string, new BN(__int8, 10)).call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }

  /*
   *
   * Transaction Functions
   *
   */

  changeBool (__bool) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeBool((bool) __bool).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeInt (__int) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeInt(new BN(__int, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeInt8 (__int8) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeInt8(new BN(__int8, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeInt256 (__int256) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeInt256(new BN(__int256, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeUint (__uint) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeUint(new BN(__uint, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeUint8 (__uint8) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeUint8(new BN(__uint8, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeUint256 (__uint256) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeUint256(new BN(__uint256, 10)).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeAddress (__address) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeAddress(__address).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeByte (__byte) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeByte(__byte).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeBytes1 (__bytes1) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeBytes1(__bytes1).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeBytes32 (__bytes32) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeBytes32(__bytes32).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeBytes (__bytes) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeBytes(__bytes).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  changeString (__string) {
    if (!this.account) return new Error('Unlock Wallet')
    return this.SampleContract.methods.changeString(__string).send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
      .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }

  /*
   *
   * Events
   *
   */




}

export default SampleContract

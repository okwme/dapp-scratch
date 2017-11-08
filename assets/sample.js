// import contract from 'truffle-contract'
/* YOU MAY NEED TO CHANGE THIS */
import SampleArtifacts from '../build/contracts/Sample.json'
import Web3 from 'web3'
import ZeroClientProvider from 'web3-provider-engine/zero.js'
// import utils from 'web3-utils'

class Sample {
  constructor (options) {

    this.Sample = null

    this.pollingInterval = null
    this.account = null
    this.unlocked = false
    this.balanceWei = 0
    this.balance = 0

    this.options = {
      autoInit: true,
      getPastEvents: false,
      watchFutureEvents: false,
      connectionRetries: 3
    }
    Object.assign(this.options, options)
    if (this.options.autoInit) this.initWeb3()
  }

  // Connections
  initWeb3 () {
    return new Promise((resolve, reject) => {

      let web3Provider = false
      if (global.web3) {
        web3Provider = web3.currentProvider
      } else if (this.options.connectionRetries > 0){
        this.options.connectionRetries -= 1
        setTimeout(() => {
          this.initWeb3().then(resolve).catch((error) => {
            reject(new Error(error))
          })
        }, 1000)
      } else {
        this.readOnly = true
        web3Provider = ZeroClientProvider({
          getAccounts: function(){},
          rpcUrl: 'https://mainnet.infura.io',
        })
      }

      if (web3Provider) {
        web3 = new Web3(web3Provider)
        this.pollingActivity()
        // if (this.options.getPastEvents) this.getPastEvents()
        // if (this.options.watchFutureEvents) this.watchFutureEvents()
      }
    })
  }

  pollActivity () {
    this.pollNetwork().then(this.pollAccount(this)).catch((error) => {
      throw new Error(error)
    })
  }

  pollNetwork () {
    return web3.eth.net.getId((err, netId) => {
      if (this.network !== netId) {
        this.network = netId
        this.deployContract()
      }
    })
  }

  pollAccount () {
    return web3.eth.getAccounts((error, accounts) => {
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

  pollingActivity () {
    this.pollActivity()
    if (this.pollingInterval) clearInterval(this.pollingInterval)
    this.pollingInterval = setInterval(this.pollActivity, 1000)
  }

  deployContract () {
    // this.Sample = contract(SampleArtifacts)
    // this.Sample.setProvider(web3.currentProvider)
    this.Sample = new global.web3.eth.Contract(SampleArtifacts.abi, SampleArtifacts[this.networkId].address)
  }

  /* FUNCTIONS */

  /* CALL FUNCTIONS */



}

export default Sample

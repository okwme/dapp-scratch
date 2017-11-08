var Web3 = require('web3')
var ZeroClientProvider = require('web3-provider-engine/zero.js')
// import utils from 'web3-utils'

class Sample {
  constructor (options) {

    this.accountInterval = null
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
        web3.eth.net.getId((err, netId) => {
          this.network = netId
          this.setAccountInterval()

          // if (this.options.getPastEvents) this.getPastEvents()
          // if (this.options.watchFutureEvents) this.watchFutureEvents()

          return this.checkAccount().then(resolve).catch((error) => {
            reject(new Error(error))
          })
        })
      }
    })
  }

  checkAccount () {
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

  setAccountInterval () {
    if (this.accountInterval) clearInterval(this.accountInterval)
    this.accountInterval = setInterval(this.checkAccount, 1000)
  }

}

export default Sample

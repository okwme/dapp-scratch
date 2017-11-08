

var assert = require('assert');
import Sample from '../assets/sample'
var ZeroClientProvider = require('web3-provider-engine/zero.js')
const account = '0x5899c1651653E1e4A110Cd45C7f4E9F576dE0670'
let currentProvider = ZeroClientProvider({
  getAccounts: function(cb){
    cb(null, [account])
  },
  rpcUrl: 'https://rinkeby.infura.io',
})
global.web3 = {currentProvider}
       


describe('Constructor', function() {
  describe('init', function() {
    let sample = null
    it('should merge init options on construction', function() {
      let getPastEvents = true
      let watchFutureEvents = false
      let autoInit = false
      sample = new Sample({
        autoInit,
        getPastEvents,
        watchFutureEvents
      })
      assert.equal(sample.options.watchFutureEvents, watchFutureEvents);
      assert.equal(sample.options.getPastEvents, getPastEvents);
      assert.equal(sample.options.connectionRetries, 3);
    });

    it ('should return an unlocked account after initialization', function () {
      sample.initWeb3().then((resp) => {
        console.log(sample)
        assert.equal(sample.account, account)
      }).catch((error) => {
        console.error(error)
      })
    })
  });

});
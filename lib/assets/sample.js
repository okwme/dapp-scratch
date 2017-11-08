'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Web3 = require('web3');
var ZeroClientProvider = require('web3-provider-engine/zero.js');
// import utils from 'web3-utils'

var web3 = self && self.web3;

var Sample = function () {
  function Sample(options) {
    _classCallCheck(this, Sample);

    this.accountInterval = null;
    this.account = null;
    this.unlocked = false;
    this.balanceWei = 0;
    this.balance = 0;

    this.options = {
      getPastEvents: false,
      watchFutureEvents: false,
      connectionRetries: 3
    };
    Object.assign(this.options, options);
  }

  // Connections


  _createClass(Sample, [{
    key: 'initWeb3',
    value: function initWeb3() {
      var _this = this;

      var web3Provider = false;
      if (web3) {
        web3Provider = web3.currentProvider;
      } else if (this.options.connectionRetries > 0) {
        this.options.connectionRetries -= 1;
        setTimeout(this.initWeb3, 1000);
      } else {
        this.readOnly = true;
        web3Provider = ZeroClientProvider({
          getAccounts: function getAccounts() {},
          rpcUrl: 'https://mainnet.infura.io'
        });
      }

      if (web3Provider) {
        web3 = new Web3(web3Provider);
        web3.version.getNetwork(function (err, netId) {
          _this.network = netId;
          _this.checkAccount();
          _this.setAccountInterval();
          if (_this.options.getPastEvents) _this.getPastEvents();
          if (_this.options.watchFutureEvents) _this.watchFutureEvents();
        });
      }
    }
  }, {
    key: 'checkAccount',
    value: function checkAccount() {
      var _this2 = this;

      if (!web3) {
        this.initWeb3();
        return;
      }
      web3.eth.getAccounts(function (error, accounts) {
        if (error) throw new Error(error);
        if (accounts.length && _this2.account !== accounts[0]) {
          _this2.unlocked = true;
          _this2.account = accounts[0];
        } else if (!accounts.length) {
          _this2.unlocked = false;
          _this2.account = null;
        }
      });
    }
  }, {
    key: 'setAccountInterval',
    value: function setAccountInterval() {
      if (this.accountInterval) clearInterval(this.accountInterval);
      this.accountInterval = setInterval(this.checkAccount, 1000);
    }
  }]);

  return Sample;
}();

exports.default = Sample;
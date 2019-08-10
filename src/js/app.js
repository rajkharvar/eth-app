App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function () {
    return App.initWeb3()
  },

  initWeb3: async function () {
    if (typeof web3 !== 'undefined') {
      // if a instance if provided by metamask
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      // specify default instance of web3
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
      web3 = new Web3(App.web3Provider)
    }
    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Election.json', function (election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election)
      // connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider)
    })
    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function (adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});

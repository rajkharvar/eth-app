$.ajaxSetup({ async: false })
App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  // init function
  init: function () {
    return App.initWeb3()
  },

  // init connection of client side application with local-blockchain
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

  // initContract from ABI
  initContract: function () {
    $.getJSON('Election.json', function (election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election)
      // connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider)
      return App.render();
    })
  },

  render: function () {
    var electionInstance
    var loader = $('#loader')
    var content = $('#content')

    loader.show()
    content.show()

    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account
        $('#accountAddress').html("Your account Address:" + account)
      }
    })

    App.contracts.Election.deployed().then(function (instance) {
      electionInstance = instance
      return electionInstance.candidateCount()
    }).then(function (candidateCount) {
      var candidateResults = $('#candidateResults')
      candidateResults.empty()

      for (var i = 1; i <= candidateResults; i++) {
        electionInstance.candidates(i).then(function (candidate) {
          console.log(candidate)
          var id = candidate[0]
          var name = candidate[1]
          var voterCount = candidate[2]

          var template = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voterCount + "</td></tr>"
          candidateResults.append(template)
          // var candidateOption ="<option value='" + id + "' >" + name + "</ option>"
        })
      }
      loader.hide()
      content.show()
    }).catch(function (err) {
      console.warn(err)
    })
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});

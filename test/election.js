var Election = artifacts.require('./Election.sol')

contract("Election", function (accounts) {

    it("was it initialise?", function () {
        return Election.deployed().then(function (i) {
            return i.candidateCount()
        }).then(function (c) {
            assert.equal(c, 2)
        })
    })
})
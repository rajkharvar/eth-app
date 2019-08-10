var Election = artifacts.require('./Election.sol')

contract("Election", function (accounts) {
    var electionInstance
    it("was it initialise?", function () {
        return Election.deployed().then(function (i) {
            return i.candidateCount()
        }).then(function (c) {
            assert.equal(c, 2)
        })
    })

    it("are all values correct", function () {
        return Election.deployed().then(function (i) {
            electionInstance = i
            return electionInstance.candidates(1)
        }).then(function (candidate) {
            assert.equal(candidate[0], 1, "Correct id")
            assert.equal(candidate[1], 0, "correct vote count")
            assert.equal(candidate[2], "Candidate 1", "correct candidate name")
            return electionInstance.candidates(2)
        }).then(function (candidate) {
            assert.equal(candidate[0], 2, "Correct id")
            assert.equal(candidate[1], 0, "correct vote count")
            assert.equal(candidate[2], "Candidate 2", "correct candidate name")
        })
    })
})
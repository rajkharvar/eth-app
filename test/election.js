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

    it("allows users to vote", function () {
        return Election.deployed().then(function (i) {
            candidateId = 2
            electionInstance = i
            return electionInstance.vote(candidateId, { from: accounts[3] })
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, "event triggered")
            assert.equal(receipt.logs[0].event, "votedEvent", "correct event type")
            assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "correct voterId")
            return electionInstance.voters(accounts[1])
        }).then(function (voted) {
            assert(voted, "voter has voted")
            return electionInstance.candidates(2)
        }).then(function (candidate) {
            var voteCount = candidate[1]
            assert.equal(voteCount, 2, "increments the candidate's vote count")
        })
    })
})
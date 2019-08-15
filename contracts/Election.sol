pragma solidity ^0.5.0;

contract Election {
    // string public candidate;
    // string public anotherCandidate;
    // mapping allows to return a value based on key
    // In this case it is eth address and return type is Candidate
    // here candidates is a function that iterate over it
    struct Candidate {
        uint id;
        uint votersCount;
        string name;
    }

    uint public candidateCount;
    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    // list voters account
    mapping(address => bool) public voters;

    // list all canidates
    mapping(uint => Candidate) public candidates;

    // add Canidate in the blockchain
    function addCandidate (string memory _name) private {
        candidateCount ++;
        candidates[candidateCount] = Candidate(candidateCount, 0, _name);
    }

    // vote function
    function vote (uint _candidateId) public {
        // check if the user has not already voted
        require(!voters[msg.sender], "Already voted");
        // check if it is valid userID
        require(_candidateId > 0 && _candidateId <= candidateCount && _candidateId > 0, "Invalid candidate Id");
        // record that voter has already voted
        voters[msg.sender] = true;
        // increment voteCount of candidate
        candidates[_candidateId].votersCount ++;
    }
}
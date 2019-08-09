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
    mapping(uint => Candidate) public candidates;

    function addCandidate (string memory _name) private {
        candidateCount ++;
        candidates[candidateCount] = Candidate(candidateCount, 0, _name);
    }
}
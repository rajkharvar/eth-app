pragma solidity ^0.5.0;

contract Election {
    string public candidate;
    string public anotherCandidate;

    constructor() public {
        candidate = "Candidate 1";
        anotherCandidate = "Candidate 2";
    }
}
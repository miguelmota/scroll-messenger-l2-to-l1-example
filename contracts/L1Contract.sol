//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IScrollMessenger.sol";

contract L1Contract {
    string private greeting;
    address l2Contract;
    address l1Messenger;

    constructor(address _l2Contract, address _l1Messenger) {
      l2Contract = _l2Contract;
      l1Messenger = _l1Messenger;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        require(msg.sender == l1Messenger);
        require(l2Contract == IScrollMessenger(l1Messenger).xDomainMessageSender());
        greeting = _greeting;
    }
}

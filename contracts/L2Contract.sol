//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IL2ScrollMessenger.sol";
import "./IL1Contract.sol";

contract L2Contract {
    address l2Messenger;

    constructor(address _l2Messenger) {
      l2Messenger = _l2Messenger;
    }

    function sendMessageToL1(address _to, string memory _greeting) payable public {
      uint256 _gasLimit = 100000;
      bytes memory _message = abi.encodeWithSelector(
        IL1Contract.setGreeting.selector,
        _greeting
      );

      IL2ScrollMessenger(l2Messenger).sendMessage{ value: msg.value }(_to, 0, _message, _gasLimit);
    }
}

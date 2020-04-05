pragma solidity >=0.5.0 <0.7.0;

import '@openzeppelin/token/ERC20/ERC20.sol';
import '@openzeppelin/token/ERC20/ERC20Detailed.sol';


contract MBCToken is ERC20, ERC20Detailed {
    constructor(
        uint256 initialSupply,
        string memory name,
        string memory symbol,
        uint8 decimals
    ) public ERC20Detailed(name, symbol, decimals) {
        _mint(msg.sender, initialSupply);
    }
}

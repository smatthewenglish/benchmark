// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * 
 */
contract SimpleStorage {
    //Storage. Persists in between transactions
    uint256 _value;

    constructor() {
        _value = 0;
    }

    //Allows the unsigned integer stored to be changed
    function set(uint256 value_) external {
        _value = value_;
    }
    
    //Returns the currently stored unsigned integer
    function get() external view returns (uint256 value)  {
        value = _value;
    }
}
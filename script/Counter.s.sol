// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "../lib/forge-std/src/Script.sol";
import {Counter} from "../src/Counter.sol";

contract CounterScript is Script {

    Counter public counter;

    function setUp() public {
        uint256 newGasPrice = 0;
        vm.txGasPrice(newGasPrice);

        counter = new Counter();
        counter.setNumber(0);
    }

    function run() public {
        // vm.broadcast();
        // counter.increment();
        // console.log("counter.number():", counter.number());


        uint256 privateKey = 0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63;
        vm.broadcast(privateKey);
       
        
        // will trigger a transaction
        counter.increment();     
    }
}

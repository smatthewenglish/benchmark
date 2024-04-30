// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

//import {Test, console} from "forge-std/Test.sol";
import {Test, console} from "../lib/forge-std/src/Test.sol";
import {Counter} from "../src/Counter.sol";

contract ForkTest is Test {
    Counter public counter;

    function setUp() public {

        uint256 number = 367;
        vm.createSelectFork('http://localhost:8545', number);

        counter = new Counter();
        counter.setNumber(0);
    }

    function test_Increment() public {

        for (uint256 index = 0; index < 100_000; index++) {
            counter.increment();
        }
        assertEq(counter.number(), 100_000);
    }

}

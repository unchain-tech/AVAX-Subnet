// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Counter {
    int256 num;

    function get_num() public view returns (int256) {
        return num;
    }

    function count() public {
        num++;
    }
}

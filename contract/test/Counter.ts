import { ethers } from "hardhat";
import { BigNumber, Overrides } from "ethers";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Counter", function () {
  async function deployContract() {
    const accounts = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    return {
      deployAccount: accounts[0],
      userAccounts: accounts.slice(1, accounts.length),
      counter,
    };
  }

  describe("basic", function () {
    it("generate NFT contract and check details", async function () {
      const { counter } = await loadFixture(deployContract);

      const before = await counter.get_num();

      expect(before).to.equal(0);

      await counter.count();

      const after = await counter.get_num();

      expect(after).to.equal(1);
    });
  });
});

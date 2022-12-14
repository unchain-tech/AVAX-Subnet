import { ethers } from "hardhat";
import { BigNumber, Overrides } from "ethers";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Bank", function () {
  async function deployContract() {
    const accounts = await ethers.getSigners();

    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();

    return {
      deployAccount: accounts[0],
      userAccounts: accounts.slice(1, accounts.length),
      bank,
    };
  }

  describe("request", function () {
    it("Correct bill requested", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const oneWeekInSecond = 60 * 60 * 24 * 7;

      const account = userAccounts[0];
      const price = 100;
      const expirationDate = BigNumber.from(Date.now())
        .div(1000) // in second
        .add(oneWeekInSecond); // one week later

      await bank.connect(account).request(price, expirationDate);

      const bill = await bank.getBill(0);

      expect(bill.id).to.equal(0);
      expect(bill.price).to.equal(price);
      expect(bill.expirationDate).to.equal(expirationDate);
      expect(bill.status).to.equal(0);
      expect(bill.borrower).to.equal(account.address);
      expect(bill.lender).to.equal(
        "0x0000000000000000000000000000000000000000"
      );
    });
  });

  describe("lend", function () {
    it("Bill is properly lend.", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const oneWeekInSecond = 60 * 60 * 24 * 7;

      const borrower = userAccounts[0];
      const lender = userAccounts[1];
      const price = 100;
      const expirationDate = BigNumber.from(Date.now())
        .div(1000) // in second
        .add(oneWeekInSecond); // one week later

      await bank.connect(borrower).request(price, expirationDate);

      await expect(
        bank.connect(lender).lend(0, { value: price } as Overrides)
      ).to.changeEtherBalances([borrower, lender], [price, -price]);

      const bill = await bank.getBill(0);

      expect(bill.status).to.equal(1);
      expect(bill.lender).to.equal(lender.address);
    });
  });

  describe("repay", function () {
    it("Bills is properly repaid", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const oneWeekInSecond = 60 * 60 * 24 * 7;

      const borrower = userAccounts[0];
      const lender = userAccounts[1];
      const price = 100;
      const expirationDate = BigNumber.from(Date.now())
        .div(1000) // in second
        .add(oneWeekInSecond); // one week later

      await bank.connect(borrower).request(price, expirationDate);

      await bank.connect(lender).lend(0, { value: price } as Overrides);

      await expect(
        bank.connect(borrower).repay(0, { value: price } as Overrides)
      ).to.changeEtherBalances([borrower, lender], [-price, price]);

      const bill = await bank.getBill(0);

      expect(bill.status).to.equal(2);
    });
  });

  describe("claim", function () {
    it("Bills is properly claimed", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const oneWeekInSecond = 60 * 60 * 24 * 7;

      const borrower = userAccounts[0];
      const lender = userAccounts[1];
      const price = 100;
      const expirationDate = BigNumber.from(Date.now())
        .div(1000) // in second
        .add(oneWeekInSecond); // one week later

      await bank.connect(borrower).request(price, expirationDate);

      const bill = await bank.getBill(0);

      expect(bill.status).to.equal(2);
    });
  });
});

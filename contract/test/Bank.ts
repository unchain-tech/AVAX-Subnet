import { ethers } from "hardhat";
import { BigNumber, Overrides } from "ethers";
import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";

describe("Bank", function () {
  async function getLastBlockTimeStamp() {
    const blockNumberBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumberBefore);
    return BigNumber.from(blockBefore.timestamp);
  }

  async function deployContract() {
    const accounts = await ethers.getSigners();

    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy({
      value: 10000,
    } as Overrides);

    return {
      deployAccount: accounts[0],
      userAccounts: accounts.slice(1, accounts.length),
      bank,
    };
  }

  describe("issueBill", function () {
    it("Correct bill issued.", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const issuer = userAccounts[0];
      const recipient = userAccounts[1];
      const amount = BigNumber.from(100);

      await bank.connect(issuer).issueBill(amount, recipient.address);
      const newId = 0;

      const bill = await bank.allBills(newId);
      const activeStatus = 0;

      expect(bill.id).to.equal(newId);
      expect(bill.amount).to.equal(amount);
      expect(bill.timestamp).to.equal(await getLastBlockTimeStamp());
      expect(bill.issuer).to.equal(issuer.address);
      expect(bill.recipient).to.equal(recipient.address);
      expect(bill.status).to.equal(activeStatus);
    });
  });

  describe("cashBill", function () {
    it("Token is transferred correctly.", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const issuer = userAccounts[0];
      const recipient = userAccounts[1];
      const amount = BigNumber.from(100);

      await bank.connect(issuer).issueBill(amount, recipient.address);
      const newId = 0;

      const term = await bank.term();
      await time.increase(term);

      await expect(
        bank.connect(recipient).cashBill(newId)
      ).to.changeEtherBalances([bank, recipient], [-amount, amount]);
    });

    it("Discounted amount of token is transferred correctly.", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const issuer = userAccounts[0];
      const recipient = userAccounts[1];
      const amount = BigNumber.from(100);

      const discountRate = await bank.discountRate();
      const discountedAmount = amount.sub(amount.mul(discountRate).div(100));

      await bank.connect(issuer).issueBill(amount, recipient.address);
      const newId = 0;

      await expect(
        bank.connect(recipient).cashBill(newId)
      ).to.changeEtherBalances(
        [bank, recipient],
        [-discountedAmount, discountedAmount]
      );
    });

    it("Revert if call twice.", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const issuer = userAccounts[0];
      const recipient = userAccounts[1];
      const amount = BigNumber.from(100);

      await bank.connect(issuer).issueBill(amount, recipient.address);
      const newId = 0;

      await bank.connect(recipient).cashBill(newId);
      await expect(bank.connect(recipient).cashBill(newId)).to.be.reverted;
    });

    it("Revert if different user call.", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const issuer = userAccounts[0];
      const recipient = userAccounts[1];
      const amount = BigNumber.from(100);

      await bank.connect(issuer).issueBill(amount, recipient.address);
      const newId = 0;

      await expect(bank.connect(issuer).cashBill(newId)).to.be.reverted;
    });
  });

  describe("Token is transferred correctly.", function () {
    it("Token", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const account = userAccounts[0];
      const amount = BigNumber.from(100);

      await expect(
        bank.connect(account).lockToken({
          value: amount,
        } as Overrides)
      ).to.changeEtherBalances([account, bank], [-amount, amount]);

      expect(await bank.connect(account).getBalance()).to.equal(amount);
    });
  });

  describe("completeBill", function () {
    it("Revert if call before due date", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const issuer = userAccounts[0];
      const recipient = userAccounts[1];
      const amount = BigNumber.from(100);

      await bank.connect(issuer).issueBill(amount, recipient.address);
      const newId = 0;

      await expect(bank.completeBill(newId)).to.be.reverted;
    });

    it("Bill is properly completed", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const issuer = userAccounts[0];
      const recipient = userAccounts[1];
      const amount = BigNumber.from(100);

      await bank.connect(issuer).issueBill(amount, recipient.address);
      const newId = 0;

      const interestRate = await bank.interestRate();
      const amountWithFee = amount.add(amount.mul(interestRate).div(100));
      await bank.connect(issuer).lockToken({
        value: amountWithFee,
      } as Overrides);

      const term = await bank.term();
      await time.increase(term);

      await bank.completeBill(newId);
      const statusCompleted = 2;

      expect(await bank.connect(issuer).getBalance()).to.equal(0);
      expect((await bank.allBills(newId)).status).to.equal(statusCompleted);
    });

    it("Bill is properly dishonored.", async function () {
      const { bank, userAccounts } = await loadFixture(deployContract);

      const issuer = userAccounts[0];
      const recipient = userAccounts[1];
      const amount = BigNumber.from(100);

      await bank.connect(issuer).issueBill(amount, recipient.address);
      const newId = 0;

      const term = await bank.term();
      await time.increase(term);

      await bank.completeBill(newId);
      const statusDishonored = 3;

      expect((await bank.allBills(newId)).status).to.equal(statusDishonored);
      expect(await bank.dishonoredAddresses(0)).to.equal(issuer.address);
    });
  });
});

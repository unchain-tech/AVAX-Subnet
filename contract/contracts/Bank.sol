// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Bank {
    enum BillStatus {
        Requesting,
        Lending,
        Completed,
        Dishonored
    }

    struct Bill {
        uint256 id;
        uint256 price;
        uint256 expirationDate;
        BillStatus status;
        address borrower;
        address lender;
    }

    Bill[] allBills;

    modifier activeBill(uint256 id) {
        require(
            allBills[id].status != BillStatus.Completed,
            "Bill is completed"
        );
        require(
            allBills[id].status != BillStatus.Dishonored,
            "Bill is Dishonored"
        );
        _;
    }

    function sendAvax(address payable _to, uint256 _amount) private {
        (bool success, ) = (_to).call{value: _amount}("");
        require(success, "Failed to send AVAX");
    }

    function request(uint256 _price, uint256 _expirationDate) public {
        require(_expirationDate > block.timestamp); // timestampは正確な値ではありません。

        Bill memory bill = Bill(
            allBills.length,
            _price,
            _expirationDate,
            BillStatus.Requesting,
            msg.sender,
            address(0)
        );

        allBills.push(bill);
    }

    function lend(uint256 _id) public payable activeBill(_id) {
        Bill storage bill = allBills[_id];

        require(msg.value == bill.price, "Not match amount of price");

        bill.status = BillStatus.Lending;
        bill.lender = msg.sender;

        sendAvax(payable(bill.borrower), bill.price);
    }

    //TODO: 利子の実装, 割引の実装
    function repayment(uint256 _id) public payable activeBill(_id) {
        Bill storage bill = allBills[_id];

        require(msg.value == bill.price, "Not match amount of price");
        bill.status = BillStatus.Completed;

        sendAvax(payable(bill.lender), bill.price);
    }

    function claim(uint256 _id) public payable {
        Bill storage bill = allBills[_id];

        if (bill.expirationDate <= block.timestamp) {
            bill.status = BillStatus.Dishonored;
        }
    }
}

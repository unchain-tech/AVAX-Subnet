// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Bank {
    // 手形の属性です。
    struct Bill {
        uint256 id;
        uint256 price;
        uint256 timestamp;
        address issuer;
        address recipient;
        BillStatus status;
    }

    // 手形の状態を表します。
    enum BillStatus {
        Active,
        Completed,
        Dishonored
    }

    // 全ての手形を保存します。
    Bill[] public allBills;

    // 不渡りを起こしたアドレスを保存します。
    address[] public dishonoredAddresses;

    // 各アドレスがコントラクトにロックしたトークンの数を保有します。
    mapping(address => uint256) private balance;

    // 手形の期間を定数で用意します。
    uint256 public constant term = 1 days * 60;

    // 割引金利
    uint256 public constant discountRate = 10;

    // 手形手数料
    uint256 public constant interestRate = 10;

    constructor() payable {}

    function sendAvax(address payable _to, uint256 _amount) private {
        (bool success, ) = (_to).call{value: _amount}("");
        require(success, "Failed to send AVAX");
    }

    function getNumberOfBills() public view returns (uint256) {
        return allBills.length;
    }

    function getBalance() public view returns (uint256) {
        return balance[msg.sender];
    }

    function beforeDueDate(uint256 _id) public view returns (bool) {
        Bill memory bill = allBills[_id];

        if (bill.timestamp + term < block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

    function getAmountToCashBill(uint256 _id) public view returns (uint256) {
        Bill memory bill = allBills[_id];

        if (beforeDueDate(_id)) {
            return (bill.price * (100 - discountRate)) / 100;
        }

        return bill.price;
    }

    function getAmountToDemandPayment(uint256 _id)
        public
        view
        returns (uint256)
    {
        Bill memory bill = allBills[_id];
        return (bill.price * (100 + discountRate)) / 100;
    }

    function issueBill(uint256 _price, address _recipient) public {
        Bill memory bill = Bill(
            allBills.length,
            _price,
            block.timestamp, // block.timestampは正確な値ではありません。
            msg.sender,
            _recipient,
            BillStatus.Active
        );

        allBills.push(bill);
    }

    function cashBill(uint256 _id) public payable {
        Bill memory bill = allBills[_id];

        require(bill.status == BillStatus.Active, "Bill is not active");

        require(bill.recipient == msg.sender, "Your are not recipient");

        uint256 amount = getAmountToCashBill(_id);

        sendAvax(payable(msg.sender), amount);
    }

    function lockToken() public payable {
        balance[msg.sender] = msg.value;
    }

    function demandPayment(uint256 _id) public payable {
        Bill storage bill = allBills[_id];

        require(!beforeDueDate(_id), "Before due date");

        uint256 amount = getAmountToDemandPayment(_id);

        if (amount <= balance[bill.issuer]) {
            balance[bill.issuer] -= amount;
            bill.status = BillStatus.Completed;
        } else {
            bill.status = BillStatus.Dishonored;
            dishonoredAddresses.push(bill.issuer);
        }
    }
}

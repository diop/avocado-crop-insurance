pragma solidity ^0.4.18;

contract AvocadoPolicy {
  address owner;
  uint256 ownerAccount;
  mapping (address => uint256) policyAccount;

  modifier ownerOnly {
    require(msg.sender == owner);
    _;
  }

  function AvocadoPolicy() public {
    owner = msg.sender;
  }

  struct PolicyData {
    uint premiumAmount;
    uint endDateTimestamp;
    uint nextPremiumTimestamp;
    uint maxPayout;
    string region;
    bool claimed;
  }

  function disbursePayments(uint256 paymentAmount, address farmer) public payable {
    uint256 totalPayouts = policyAccount[farmer] + paymentAmount;
    policyAccount[farmer] = totalPayouts;
    msg.sender.transfer(paymentAmount);
  }

  function ownerWithdraw(uint256 amount) public payable ownerOnly {
     require(ownerAccount >= amount);
     msg.sender.transfer(amount);
  }

  function selfdestruct(address owner) ownerOnly {
    selfdestruct(owner);
  }

  function () public payable {}
}

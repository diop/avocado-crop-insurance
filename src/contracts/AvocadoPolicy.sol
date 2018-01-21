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
    uint nextPaymentTimestamp;
    uint monthlyPayment;
    uint maxPayout;
    address farmer;
    string region;
    bool claimed;
    bool confirmed;
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

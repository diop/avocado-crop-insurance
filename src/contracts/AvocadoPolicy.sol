pragma solidity ^0.4.18;

//import "./SafeMath.sol";

library SafeMath {
  function mul(uint256 a, uint256 b) internal constant returns (uint256) {
    uint256 c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal constant returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal constant returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal constant returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}


contract AvocadoPolicy {
  using SafeMath for uint256;
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
    uint startDate;
    uint endDate;
    uint nextPremium;
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

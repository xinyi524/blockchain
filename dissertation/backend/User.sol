pragma solidity ^0.5.8;

import "./Super.sol";

contract User is Ownable{
    
    Super public super_contract;
    
    address payable public superAddress;
    
    using SafeMath for uint256;
    using SafeMath for uint32;
    
    constructor(address super_contract_address)
    public{
        super_contract = Super(super_contract_address);
        (superAddress,,,,,) = super_contract.admin();
        
        require(msg.sender !=superAddress);

        _register();
    }
	
	modifier OnlyFunder(uint32 _fundID, address _user){
        (address temp,,,,,,) = super_contract.funds(_fundID);
        require(temp == _user);
        _;
    }
    
    modifier validFund(uint32 fundID){
        (,bool state,,,,,) = super_contract.funds(fundID);
        require(state==true);
        _;
    }
    
    modifier OnlyInvestor(uint256 _investID, address _user){
        (address temp,,,) = super_contract.invests(_investID);
        require(temp == _user);
        _;
    }
    
    function getSuperInfo()
    public
    view
    returns(uint256 superBalance, 
    uint256 fundsNum1,
    uint256 fundsNum2,
    uint256 fundsNum3,
    uint256 fundsNum4)
    {
        (,superBalance,fundsNum1,fundsNum2,fundsNum3,fundsNum4)=super_contract.admin();
    }

    mapping (address => mapping (address => uint256)) allowed;
    
    function _register()
    internal
    onlyOwner
    returns(uint256)
    {
        uint256 id = super_contract.existUser(msg.sender);
        //not exist
        if(id == 0){
            return super_contract.createAccount(msg.sender);
        }
        return id-1;
    }
    
    function getOwnAccount()
    public
    view
    onlyOwner
    returns(uint256 blackListID, uint256 balance, uint8 defaultCount, uint32[] memory fundsID, uint32[] memory investID)
    {
        uint256 accountID = super_contract.ownerToAccount(msg.sender);
        (,blackListID, balance, defaultCount) = super_contract.accounts(accountID);
        
        fundsID = super_contract.getOwnFundsID(msg.sender);
        investID = super_contract.getOwnInvests(msg.sender);
        return(
            blackListID,
            balance,
            defaultCount,
            fundsID,
            investID
            );
    }
    
    function getOtherAccountInfo(address _user)
    public
    view
    returns(uint256 blacklistID, uint8 defaultCount)
    {
        uint256 id=super_contract.ownerToAccount(_user);
        (,blacklistID,,defaultCount) = super_contract.accounts(id);
        return (
            blacklistID,
            defaultCount);
    }
    
    function getBlacklistedAddress()
    public
    view
    returns(address[] memory blacklistedAddress)
    {
        return super_contract.getBlacklistedAddress();
    }
    
    function userTopup()
    public
    onlyOwner
    payable
    returns(bool success)
    {
        //transfer token from contract to Super
        superAddress.transfer(msg.value);
        
        //add to owner account and super
        return super_contract.topup(msg.sender, msg.value);
    }
    
    function withdraw(uint256 _value) 
    public
    onlyOwner
    returns(bool success)
    {   
        return super_contract.withdraw(msg.sender, _value);
    }

    function newFund(uint8 _interest, uint8 _type, uint256 _minDeposit)
    public
    onlyOwner
    returns(uint32 fundID)
    {
        require(_interest>=0 && _type!=0);
        fundID = super_contract.newFund(msg.sender, _interest, _type, _minDeposit);
        return fundID;
    }
    
    function getFundNum()
    public
    view
    returns(uint fundNum)
    {
        return super_contract.getFundNum();
    }
    
    function getFundInfo(uint32 _fundID)
    public
    view
    returns(address owner,bool state, uint8 fundType,uint8 interest, uint32 defaultCount, uint256 balance, uint256 minDeposit)
    {
        (owner,state, fundType, interest,defaultCount, minDeposit, balance)
        = super_contract.funds(_fundID);
        return (
            owner,
            state,
            fundType,
            interest,
            defaultCount,
            balance,
            minDeposit);
    }
    
    function getInvestInfo(uint256 _investId)
    public
    view
    returns(address _user,uint32 _fundID,uint256 _value, uint256 _date)
    {
        return super_contract.invests(_investId);
    }
    
    function requestReturnInvest(uint256 _investID, uint256 _value)
    public
    onlyOwner
    returns(bool)
    {
        (address investor,,uint256 value,)= super_contract.invests(_investID);
        
        require(investor==msg.sender&&value>=_value);
        
        return super_contract.requestReturnInvest( _investID, _value,msg.sender);
    }
    
    function changeFundState(uint32 _fundID)
    public
    onlyOwner
    returns(bool state)
    {
        return super_contract.changeFundState(_fundID, owner);
    }
    
    function changeFundDepositTime(uint32 _fundID, uint32 _times)
    public
    onlyOwner
    returns(bool success)
    {
        return super_contract.changeFundDepositTime(_fundID,_times,msg.sender);
    }
    
    function invest(uint32 _fundID, uint256 _value)
    public
    onlyOwner
    returns(bool success)
    {
        return super_contract.invest(msg.sender, _fundID, _value);
    }
    
    function getFundPendings(uint32 _fundID)
    public
    view
    onlyOwner
    returns(uint256[] memory)
    {
        return super_contract.getFundPendings(_fundID, msg.sender);
    }
        
    function getPendingInfo(uint256 _pendingID)
    public
    view
    onlyOwner
    returns(uint32 fundID, uint256 value, uint256 requiredDate)
    {
        (,,,fundID,value,requiredDate) = super_contract.pending(_pendingID);
    }
    
    function returnFundPending(uint256 _pendingID)
    public
	onlyOwner
    returns(bool success)
    {
        return super_contract.returnFundPending(_pendingID);
    }
    
    function deleteOwnFund(uint32 _fundID)
    onlyOwner
    public
    returns(bool success)
    {
        return super_contract.deleteFund(msg.sender, _fundID);
    }
}
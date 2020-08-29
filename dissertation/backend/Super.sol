pragma solidity ^0.5.8;

import "./safemath.sol";
import "./ownable.sol";

contract Super is Ownable{
    
    event NewAccount();
    
    struct superAccount{
        address payable superAddress;
        uint256 superBalance;//contract balance
        uint256 fundNum1;
        uint256 fundNum2;
        uint256 fundNum3;
        uint256 fundNum4;
    }
    
    superAccount public admin;
    
    address[] public blacklistedAddress;
    
    using SafeMath for uint256;
    using SafeMath for uint32;
    
    modifier onlySuper(){
        require(msg.sender == admin.superAddress);
        _;
    }

    constructor() public{
        admin.superAddress= msg.sender;
        blacklistedAddress.push(admin.superAddress);
    }
    
    function _topupSuper(uint256 _value)
    internal
    {
        admin.superBalance += _value;
    }
    
    function _withdrawSuper(uint256 _value)
    internal
    {
        require(admin.superBalance>_value);
        admin.superBalance -= _value;
    }
    
    function _changeFundNum(uint256 _type, bool addOrsub)
    internal
    {
        if(addOrsub==true){
            if(_type==1)
            admin.fundNum1++;
            else if(_type==2)
            admin.fundNum2++;
            else if(_type==3)
            admin.fundNum3++;
            else if(_type==4)
            admin.fundNum4++;
        }
        else if(addOrsub==false){
            if(_type==1)
            admin.fundNum1--;
            else if(_type==2)
            admin.fundNum2--;
            else if(_type==3)
            admin.fundNum3--;
            else if(_type==4)
            admin.fundNum4--;
        }
    }
    
/*********************************************************/

    struct Account{
        address payable owner;
        uint256 blackListID;
        uint256 accountBalance;
        uint8 defaultCount;
    }
    
    struct Fund{
        address payable owner;
        bool state;
        uint8 fundType;
        uint8 interest;
        uint8 defaultCount;
        uint256 minDeposit;
        uint256 fundBalance;
    }
    
    struct Investment{
        address investor;
        uint32 fundID;
        uint256 value;
        uint256 date;
    }
    
    struct Withdraw{
        address payable user;
        uint256 value;
    }
    
    Account[] public accounts;
    Fund[] public funds;
    Investment[] public invests;
    Withdraw[] public withdraws;
    
    //keeps track of the address that owns an account by ID
    mapping (address=>uint) public ownerToAccount;
    
    function existUser(address _user)
    public
    view
    returns(uint)
    {
        for(uint i=0;i<accounts.length;i++){
            if(accounts[i].owner == _user){
                return i+1;
            }
        }
        return 0;
    }
    
    function createAccount(address payable _user) 
    external
    returns(uint256 id)
    {
        id = accounts.push(Account(_user, 0,0,0)).sub(1);
        ownerToAccount[_user]=id;
        emit NewAccount();
        return id;
    }
    
    function getUserNum()
    public
    view
    returns(uint userNum)
    {
        return accounts.length;
    }
    
    function getFundNum()
    public
    view
    returns(uint fundNum)
    {
        return funds.length;
    }
    
    function getInvestNum()
    public
    view
    returns(uint userNum)
    {
        return invests.length;
    }
    
    function getBlacklistedAddress()
    public
    view
    returns(address[] memory)
    {
        return blacklistedAddress;
    }
    
    function topup(address _user, uint _value)
    external
    returns(bool success)
    {
        _topupSuper(_value);
        
        return _changeAccountBalance(_user, _value,true);
    }
    
    function withdraw(address payable _user, uint _value)
    external
    payable
    returns(bool success)
    {
        //prevent mutiple withdraw
        uint256 sum = _value;
        for(uint256 i = 0;i<withdraws.length;i++)
        {
            if(withdraws[i].user==_user){
                sum = sum.add(withdraws[i].value);
            }
        }
        if(accounts[ownerToAccount[_user]].accountBalance>sum)
        {
            return false;
        }
        withdraws.push(Withdraw(_user,_value));
        return true;
    }
    
    function getWithdrawNum()
    public
    onlySuper
    view
    returns(uint256 num)
    {
        return withdraws.length;
    }
    
    function _withdraw(uint256 _withdrawID)
    public
    payable
    onlySuper
    returns(bool success)
    {
        address payable user = withdraws[_withdrawID].user;
        user.transfer(msg.value);
        _changeAccountBalance(user,msg.value,false);
        withdraws[_withdrawID].value = withdraws[_withdrawID].value.sub(msg.value);
        _withdrawSuper(msg.value);
        
        if(withdraws[_withdrawID].value==0)
        {
            delete withdraws[_withdrawID];
        }
        return true;
    }
    
    /*********************************************************/
    
    mapping(address=>uint32[]) ownFunds;
    mapping(address=>uint32[]) public ownInvests;
    mapping(uint32=>uint256[]) public fundPending;
    
    struct Pending{
        bool state;
        address investor;
        address funder;
        uint32 fundID;
        uint256 value;
        uint256 requiredDate;
    }
    
    Pending[] public pending;
    
    uint8 public earlyWithdrawal = 85;
    uint public pendingReturn = 5 days;
    uint8 public maxDefaultTimes = 5;
    
    modifier OnlyFunder(uint32 _fundID, address _user){
        require(funds[_fundID].owner == _user);
        _;
    }
    
    modifier validFund(uint32 fundID){
        require(funds[fundID].state==true);
        _;
    }
	
	modifier OnlyInvestor(uint256 _investID, address _user){
        require(invests[_investID].investor == _user);
        _;
    }
    
    function changeMaxDefaultTime(uint8 times)
    public
    onlySuper
    returns(bool success)
    {
        maxDefaultTimes = times;
        //change
        for(uint i = 0;i<accounts.length;i++)
        {
            if(accounts[i].defaultCount<=times)
            {
                accounts[i].blackListID = 0;
            }
            else
            blackList(accounts[i].owner, true);
        }
        return true;
    }
    
    function blackList(address _user,bool list)
    internal
    onlySuper
    returns(bool success)
    {
        if(list)
        {
            accounts[ownerToAccount[_user]].blackListID = blacklistedAddress.push(_user).sub(1);
        }
        else
        {
            delete blacklistedAddress[accounts[ownerToAccount[_user]].blackListID];
            accounts[ownerToAccount[_user]].blackListID = 0;
        }
        return true;
    }
    
    function changeDefaultCount(uint32 _fundID, bool _addOrsub)
    public
    onlySuper
    returns(uint32 accountDefaultCount, uint32 fundDefaultCount)
    {
        uint accountID = ownerToAccount[funds[_fundID].owner];
        //add default count
        if(_addOrsub){
            funds[_fundID].defaultCount ++;
            accounts[accountID].defaultCount++;
        }
        //sub default count
        else{
            funds[_fundID].defaultCount --;
            accounts[accountID].defaultCount--;
        }
        
        if(accounts[accountID].defaultCount>maxDefaultTimes){
            blackList(funds[_fundID].owner, true);
        }
        
        if(accounts[accountID].defaultCount<=maxDefaultTimes && accounts[accountID].blackListID!=0){
            blackList(funds[_fundID].owner,false);
        }
        
        return (
            accounts[accountID].defaultCount,
            funds[_fundID].defaultCount);
    }
    
    function changeEarlyWithdrawFine(uint8 newPercentage)
    public
    onlySuper
    returns(bool success)
    {
        earlyWithdrawal = newPercentage;
        return true;
    }
    
	function getOwnInvests(address _user)
    external
    view
    returns(uint32[] memory investHistory)
    {
        return ownInvests[_user];
    }

    function newFund(address payable _user, uint8 _interest, uint8 _type, uint _minimumepositTime)
    external
    returns(uint32 id)
    {
        id = uint32(funds.push(Fund(_user, true,_type,_interest,0,_minimumepositTime,0)).sub(1));
        ownFunds[_user].push(id);
        _changeFundNum(_type,true);
        return id;
    }
    
    function getOwnFundsID(address _user)
    external
    view
    returns(uint32[] memory ownFundsID)
    {
        return ownFunds[_user];
    }
        
    function changeFundState(uint32 _fundID, address _user)
    public
    returns(bool state)
    {
        //only owner or super
        require(_user==funds[_fundID].owner||_user==admin.superAddress);
        
        if(funds[_fundID].state==false){
            funds[_fundID].state=true;
        }
        else
        funds[_fundID].state=false;
        
        return funds[_fundID].state;
    }
    
    function changeFundDepositTime(uint32 _fundID, uint256 _newDepositTime, address _user)
    public
    OnlyFunder(_fundID,_user)
    returns(bool success)
    {
        funds[_fundID].minDeposit = _newDepositTime;
        return true;
    }
    
    function invest(address _investor, uint32 _fundID, uint256 _value)
    external
    validFund(_fundID)
    returns(bool result)
    {
        require(_investor!=funds[_fundID].owner);
        
        // investor account balance - 
        // fund owner balance +
        //fund balance +
        result = _changeAccountBalance(_investor, _value, false)&&
        _changeAccountBalance(funds[_fundID].owner, _value, true) &&
        _changeFundBalance(_fundID, _value, true);

        //add transfer history Y
        if(result){
            uint id = invests.push(Investment(accounts[ownerToAccount[_investor]].owner, _fundID, _value, now)).sub(1);
            ownInvests[accounts[ownerToAccount[_investor]].owner].push(uint32(id));
        }
        
        return result;
    }
    
    function requestReturnInvest(uint256 _investID, uint256 _value,address _investor)
    external
	OnlyInvestor(invests[_investID].fundID,_investor)
    returns(bool)
    {
        uint32 fundID = invests[_investID].fundID;
        
        //invest money is more the return money
        require(invests[_investID].value>=_value);
        
        uint totalReturn;

        if(now - invests[_investID].date<=funds[fundID].minDeposit){
            totalReturn = _value.mul(earlyWithdrawal).div(100);
        }
        else{
            //interest calculate
            //value*(1+interest/1 year)*(now-data)/(1 days)
            totalReturn = _value.mul(1+funds[fundID].interest/(365 days)).mul((now.sub(invests[_investID].date).div(1 days)));
        }
        
        address investor = invests[_investID].investor;
        address funder = funds[fundID].owner;
        
        bool result;
        
        // -ether from fund balance
        // - ether from owner account
        // + ether from investor account
        //- invest value
        result = _changeFundBalance(fundID, totalReturn, false) &&
        _changeAccountBalance(funder, totalReturn, false) && 
        _changeAccountBalance(investor, totalReturn, true) &&
        _changeInvestBalance(_investID, totalReturn,false);
        
        if(!result){
            uint id = pending.push(Pending(true, investor, funder,fundID,totalReturn, now)).sub(1);
            fundPending[fundID].push(id);
        }
        return result;
    }
    
    function getFundPendings(uint32 _fundID, address _user)
    public
    view
    OnlyFunder(_fundID,_user)
    returns(uint256[] memory)
    {
        return fundPending[_fundID];
    }
    
    function returnFundPending(uint256 _pendingID)
    external
    returns(bool success)
    {
        //require owner balance more than value to return
        require(accounts[ownerToAccount[pending[_pendingID].funder]].accountBalance>=pending[_pendingID].value);

        if(_changeAccountBalance(pending[_pendingID].funder,pending[_pendingID].value, false)){
            
            _changeFundBalance(pending[_pendingID].fundID,pending[_pendingID].value,false);
            _changeAccountBalance(pending[_pendingID].investor,pending[_pendingID].value,true);
                
            //delete pending information
            delete pending[_pendingID];
            return true;
        }
        else
        return false;
    }
    
    function deleteFund(address _user, uint32 _fundID)
    external
    OnlyFunder(_fundID,_user)
    returns(bool)
    {
        uint256 sum = 0;
        uint256[] memory tempPending = getFundPendings(_fundID,_user);
        for(uint32 i = 0;i< tempPending.length;i++){
            sum = sum.add(pending[tempPending[i]].value);
        }
        if(sum==0){
            delete funds[_fundID];
            return true;
        }
        else
        return false;
    }
    
    function _changeAccountBalance(address owner, uint256 _value, bool addORsub)
    private
    returns(bool success)
    {
        uint256 accountBalance = accounts[ownerToAccount[owner]].accountBalance;
        if(addORsub){
            accounts[ownerToAccount[owner]].accountBalance = accountBalance.add(_value);
        }
        else{
            if (accountBalance < _value){
                return false;
            }
            accounts[ownerToAccount[owner]].accountBalance = accountBalance.sub(_value);
        }
        return true;
    }
	
	function _changeFundBalance(uint32 _fundID, uint256 _value, bool addORsub)
    private
    returns(bool success)
    {
        uint256 fundBalance = funds[_fundID].fundBalance;
        if(addORsub){
            funds[_fundID].fundBalance = fundBalance.add(_value);
        }
        else{
            if (fundBalance < _value){
                return false;
            }
            funds[_fundID].fundBalance = fundBalance.sub(_value);
        }
        return true;
    }
	
	function _changeInvestBalance(uint256 _investID, uint256 _value, bool addORsub)
    private
    returns(bool success)
    {
        uint256 investValue = invests[_investID].value;
        if(addORsub){
            invests[_investID].value = investValue.add(_value);
        }
        else{
            if (investValue < _value){
                return false;
            }
            invests[_investID].value = investValue.sub(_value);
        }
        return true; 
    }
}
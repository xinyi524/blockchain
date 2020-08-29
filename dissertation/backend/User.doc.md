# User


## getPendingInfo - view onlyOwner
|name |type |description
|-----|-----|-----------
|_pendingID|uint256|pending ID
**return pending information from super**

## userTopup - onlyOwner payable
**user top up with ether**

## withdraw - onlyOwner
|name |type |description
|-----|-----|-----------
|_value|uint256|withdraw value
**call super contract to withdraw**

## getFundNum - view
**retunr number of all funds**

## invest - onlyOwner
|name |type |description
|-----|-----|-----------
|_fundID|uint32|invest fund id
|_value|uint256|invest value
**call super contract to invest**

## returnFundPending - onlyOwner
|name |type |description
|-----|-----|-----------
|_pendingID|uint256|pending id
**funder answer withdraw request**

## superAddress - view
**address of super account**

## getBlacklistedAddress - view
**return blacklisted account addresses**

## getOtherAccountInfo - view
|name |type |description
|-----|-----|-----------
|_user|address|other user address(funder)
**return nonprivate information of other account**

## super_contract - view
**super contract address**

## getFundInfo - view
|name |type |description
|-----|-----|-----------
|_fundID|uint32|fundID
**return information of the funding request**

## owner - view
**contract owner**

## requestReturnInvest - onlyOwner
|name |type |description
|-----|-----|-----------
|_investID|uint256|invest id
|_value|uint256|request return value
**request withdraw**

## changeFundState - onlyOwner
|name |type |description
|-----|-----|-----------
|_fundID|uint32|fudn id
**change the state of the funding request**

## deleteOwnFund - onlyOwner
|name |type |description
|-----|-----|-----------
|_fundID|uint32|fund id
**call super contract to delete funging record**

## getInvestInfo - onlyOwner
|name |type |description
|-----|-----|-----------
|_investId|uint256|invest id
**return detail of this investment**

## newFund - onlyOwner
|name |type |description
|-----|-----|-----------
|_interest|uint8|annual interest
|_type|uint8|the fund usage
|_minDeposit|uint256|min deposit time
**add new funding request, return new funding id**

## getFundPendings - onlyOwner
|name |type |description
|-----|-----|-----------
|_fundID|uint32|fund id
**return all pending ID of this funding**

## changeFundDepositTime - onlyOwner
|name |type |description
|-----|-----|-----------
|_fundID|uint32|fund id
|_times|uint32|new fund min deposit time
**funder can change min deposit time of their funding request**

## getSuperInfo - view
**return information of balance of super account, number of each type of funding request**

## getOwnAccount - view onlyOwner
**return all personal information**

## constructor - read
|name |type |description
|-----|-----|-----------
|super_contract_address|address|
function Object() { [native code] }
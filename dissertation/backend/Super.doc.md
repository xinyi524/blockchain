# Super


## changeEarlyWithdrawFine - onlySuper
|name |type |description
|-----|-----|-----------
|newPercentage|uint8|new early withdraw fine
**super account can change the parametre of early withdraw fine**

## maxDefaultTimes - view
**default >maxDefaultTimes will be blacklisted
value is set to be 5, but can be changed by super
**

## getFundNum - view
**get number of all funding requests**

## pendingReturn - view
**funder answer withdraw request in 5 days**

## topup - external
|name |type |description
|-----|-----|-----------
|_user|address|the user who transfered ether to top up
|_value|uint256|top up value
**add balance of the super account,return the new balance of the account**

## returnFundPending - external
|name |type |description
|-----|-----|-----------
|_pendingID|uint256|the ID in the pending list
**funder balance minus the value of the pending**

## getOwnFundsID - external view
|name |type |description
|-----|-----|-----------
|_user|address|funder address
**return the fundign IDs**

## changeFundState - onlyFunder
|name |type |description
|-----|-----|-----------
|_fundID|uint32|funding ID
|_user|address|funder address
**only the funder can change the funding state**

## ownInvests - mapping view
|name |type |description
|-----|-----|-----------
||address|
||uint256|
**mapping user address with invest IDs**

## getInvestNum - view
**return the number of investments**

## getBlacklistedAddress - view
**return blacklist user addresses**

## withdraws - view array
|name |type |description
|-----|-----|-----------
||uint256|withdraw list
**withdraw list for super account to return ether**

## getOwnInvests - external view
|name |type |description
|-----|-----|-----------
|_user|address|caller address
**return a array of investment ID**

## changeMaxDefaultTime - onlySuper
|name |type |description
|-----|-----|-----------
|times|uint8|new max default times
**only super can change this parameter.**

## requestReturnInvest - external onlyInvestor
|name |type |description
|-----|-----|-----------
|_investID|uint256|ID of investment
|_value|uint256|request return value
|_investor|address|the address of investor
**return bool**

## fundPending - mapping view
|name |type |description
|-----|-----|-----------
||uint32|
||uint256|
**map fund ID with pending ID**

## funds - view
|name |type |description
|-----|-----|-----------
||uint256|
**funding request list**

## invests - view
|name |type |description
|-----|-----|-----------
||uint256|
**investment list**

## deleteFund - external onlyFunder
|name |type |description
|-----|-----|-----------
|_user|address|funder address
|_fundID|uint32|fund ID
**only funder can delete their own funding request.**

## owner - view
**contract owner (super address)**

## earlyWithdrawal - view
**how much investor can receive if the early withdrawal (85%)**

## newFund - external
|name |type |description
|-----|-----|-----------
|_user|address|funder address
|_interest|uint8|annul interest of the funding
|_type|uint8|the fund is use for
|_minimumepositTime|uint256|invest min time
**return new funding id**

## createAccount - external
|name |type |description
|-----|-----|-----------
|_user|address|new account address
**new user account, return id**

## changeFundDepositTime - onlyFunder
|name |type |description
|-----|-----|-----------
|_fundID|uint32|fund ID
|_newDepositTime|uint256|new deposit time
|_user|address|funder adderss
**funder can change their own funding's min deposit time**

## blacklistedAddress - view
|name |type |description
|-----|-----|-----------
||uint256|
**an array to store blacklisted user address**

## _withdraw - payable onlySuper
|name |type |description
|-----|-----|-----------
|_withdrawID|uint256|withdraw id
**super account pay back to the user**

## pending - view
|name |type |description
|-----|-----|-----------
||uint256|
**the pending list**

## invest - external validFund
|name |type |description
|-----|-----|-----------
|_investor|address|investor address
|_fundID|uint32|fund id to invest
|_value|uint256|invested value
**require the state of fund is true**

## getWithdrawNum - view
**return the number of withdraw requests**

## getUserNum - view
**return the number of all users**

## ownerToAccount - mapping
|name |type |description
|-----|-----|-----------
||address|
**mapping user address to their account id**

## existUser - view
|name |type |description
|-----|-----|-----------
|_user|address|the address to be check if is regerested before
**if the user exists, return 0; else return user id+1**

## accounts - view
|name |type |description
|-----|-----|-----------
||uint256|
**array of all user accounts**

## withdraw - external payable
|name |type |description
|-----|-----|-----------
|_user|payable address|the address to pay to
|_value|uint256|the value required to pay
**super account pay ether to user**

## getFundPendings - view onlyFunder
|name |type |description
|-----|-----|-----------
|_fundID|uint32|fund ID
|_user|address|the funder
**funder can see the pending withdraw request made by investors**

## admin - view
**super account**

## changeDefaultCount - onlySuper
|name |type |description
|-----|-----|-----------
|_fundID|uint32|fund ID
|_addOrsub|bool|add or sub default time
**super account can change the default time of funding**

## constructor - read
function Object() { [native code] }

## NewAccount - read
**event of new account**
var UserABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fundID",
				"type": "uint32"
			}
		],
		"name": "changeFundState",
		"outputs": [
			{
				"name": "state",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "changeMinTimeNeedGetInterest",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fundID",
				"type": "uint32"
			}
		],
		"name": "deleteOwnFund",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fundID",
				"type": "uint32"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "invest",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_interest",
				"type": "uint8"
			},
			{
				"name": "_type",
				"type": "uint8"
			},
			{
				"name": "_minDeposit",
				"type": "uint256"
			}
		],
		"name": "newFund",
		"outputs": [
			{
				"name": "fundID",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_investID",
				"type": "uint256"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "returnOnInvest",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "userTopup",
		"outputs": [
			{
				"name": "blockNumber",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "account_contract_address",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "account_contract",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_fundID",
				"type": "uint32"
			}
		],
		"name": "getFundInfo",
		"outputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "state",
				"type": "bool"
			},
			{
				"name": "accountType",
				"type": "uint8"
			},
			{
				"name": "balance",
				"type": "uint256"
			},
			{
				"name": "defaultCount",
				"type": "uint256"
			},
			{
				"name": "interest",
				"type": "uint8"
			},
			{
				"name": "minDeposit",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getFundNum",
		"outputs": [
			{
				"name": "fundNum",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_investId",
				"type": "uint256"
			}
		],
		"name": "getInvestHistory",
		"outputs": [
			{
				"name": "_user",
				"type": "address"
			},
			{
				"name": "_fundID",
				"type": "uint32"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_time",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getInvestHistoryID",
		"outputs": [
			{
				"name": "investHistory",
				"type": "uint32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getOtherAccountInfo",
		"outputs": [
			{
				"name": "state",
				"type": "bool"
			},
			{
				"name": "defaultCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOwnAccount",
		"outputs": [
			{
				"name": "state",
				"type": "bool"
			},
			{
				"name": "balance",
				"type": "uint256"
			},
			{
				"name": "defaultCount",
				"type": "uint256"
			},
			{
				"name": "fundsID",
				"type": "uint32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOwnID",
		"outputs": [
			{
				"name": "userID",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getSuperInfo",
		"outputs": [
			{
				"name": "superBalance",
				"type": "uint256"
			},
			{
				"name": "fundsNum1",
				"type": "uint256"
			},
			{
				"name": "fundsNum2",
				"type": "uint256"
			},
			{
				"name": "fundsNum3",
				"type": "uint256"
			},
			{
				"name": "fundsNum4",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "superAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
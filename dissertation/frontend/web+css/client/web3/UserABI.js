var UserABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fundID",
				"type": "uint32"
			},
			{
				"name": "_times",
				"type": "uint32"
			}
		],
		"name": "changeFundDepositTime",
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
		"name": "requestReturnInvest",
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
		"inputs": [
			{
				"name": "_pendingID",
				"type": "uint256"
			}
		],
		"name": "returnFundPending",
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
		"inputs": [],
		"name": "userTopup",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
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
				"name": "super_contract_address",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBlacklistedAddress",
		"outputs": [
			{
				"name": "blacklistedAddress",
				"type": "address[]"
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
				"name": "state",
				"type": "bool"
			},
			{
				"name": "fundType",
				"type": "uint8"
			},
			{
				"name": "interest",
				"type": "uint8"
			},
			{
				"name": "defaultCount",
				"type": "uint32"
			},
			{
				"name": "balance",
				"type": "uint256"
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
				"name": "_fundID",
				"type": "uint32"
			}
		],
		"name": "getFundPendings",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
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
		"name": "getInvestInfo",
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
				"name": "_date",
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
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getOtherAccountInfo",
		"outputs": [
			{
				"name": "blacklistID",
				"type": "uint256"
			},
			{
				"name": "defaultCount",
				"type": "uint8"
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
				"name": "blackListID",
				"type": "uint256"
			},
			{
				"name": "balance",
				"type": "uint256"
			},
			{
				"name": "defaultCount",
				"type": "uint8"
			},
			{
				"name": "fundsID",
				"type": "uint32[]"
			},
			{
				"name": "investID",
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
				"name": "_pendingID",
				"type": "uint256"
			}
		],
		"name": "getPendingInfo",
		"outputs": [
			{
				"name": "fundID",
				"type": "uint32"
			},
			{
				"name": "value",
				"type": "uint256"
			},
			{
				"name": "requiredDate",
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
		"name": "super_contract",
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
/**
 * Bankroll-logs :
 * A jquery plugin that display bankroll network smart contract events
 * in a terminal style way.
 */
; /* the semi-colon before function invocation is a safety net against concatenated scripts and/or other plugins which may not be closed properly. */
(function ($, window, document, undefined) {
    /* Plugin name */
    const pluginName = "bankroll_logs";
    /* Value that determine the speed of the typing effect in the command line section. */
    const COMMAND_LINE_TYPE_SPEED = 100;
    /* Delay (in miliseconds) between to display rendering cycle. */
    const DISPLAY_LOOP_INTERVAL = 500;
    /* Command line text when waiting for transactions */
    const COMMAND_LINE_SCANNING_TRANSACTION = "Scanning transactions ... ";
    /* Command line invite text */
    const COMMAND_LINE_INVITE = "bankroll.network $> ";
    /* Command line cursor symbol */
    const COMMAND_LINE_CURSOR = "&#9608;";
    /* Tron grid URL */
    const TRON_GRID_URL = "https://api.trongrid.io";
    /* Tron Default address */
    const TRON_DEFAULT_ADDRESS = "TVJ6njG5EpUwJt4N9xjTrqU5za78cgadS2";
    /* Blockchain Tron */
    const BLOCKCHAIN_TRON = "tron";
    /* Blockchain Ethereum */
    const BLOCKCHAIN_ETHEREUM = "ethereum";
    /* Contracts configuration */
    const CONTRACTS_CONFIG = {
        "TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq": {
            "blockchain": "tron",
            "name": "Boost",
            "balance": {
                "show": true,
                "token": "BTT",
                "method": "totalSupply"
            },
            "events": {
                "onLeaderBoard": {
                    "hide": true
                },
                "onTokenPurchase": {
                    "action": {
                        "name": "BUY",
                        "class": "action-buy"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "bought for"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BTT",
                            "content": "1",
                            "class": "token-amount-buy",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onTokenSell": {
                    "action": {
                        "name": "SELL",
                        "class": "action-sell"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "sold"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BTT",
                            "content": "1",
                            "class": "token-amount-sell",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onReinvestment": {
                    "hide": true
                },
                "onWithdraw": {
                    "action": {
                        "name": "WITHDRAW",
                        "class": "action-withdraw"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "withdrew"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BTT",
                            "content": "1",
                            "class": "token-amount-withdraw",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onBalance": {
                    "hide": true
                },
                "onDonation": {
                    "action": {
                        "name": "DONATE",
                        "class": "action-donate"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "donated"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BTT",
                            "content": "1",
                            "class": "token-amount-donate",
                            "noEndingSpace": true
                        }
                    ]
                },
                "OwnershipTransferred": {
                    "hide": true
                },
                "logContractBalance": {
                    "virtual": true,
                    "action": {
                        "name": "BALANCE",
                        "class": "action-balance"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "There is "
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BTT",
                            "content": "balance",
                            "class": "token-amount-balance"
                        },
                        {
                            "type": "string",
                            "content": "in the contract",
                            "noEndingSpace": true
                        }
                    ]
                }
            }
        },
        "TUTik4srgKuzgXoL4KfV75foQbYuP8SirY": {
            "blockchain": "tron",
            "name": "Credits",
            "balance": {
                "show": true,
                "token": "TRX"
            },
            "events": {
                "onTokenPurchase": {
                    "action": {
                        "name": "BUY",
                        "class": "action-buy"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "bought for"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "1",
                            "class": "token-amount-buy",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onTokenSell": {
                    "action": {
                        "name": "SELL",
                        "class": "action-sell"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "sold"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "1",
                            "class": "token-amount-sell",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onReinvestment": {
                    "hide": true
                },
                "onWithdraw": {
                    "action": {
                        "name": "WITHDRAW",
                        "class": "action-withdraw"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "withdrew"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "1",
                            "class": "token-amount-withdraw",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onTransfer": {
                    "action": {
                        "name": "TRANSFER",
                        "class": "action-transfer"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "transferred"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "2",
                            "class": "token-amount-withdraw"
                        },
                        {
                            "type": "string",
                            "content": "to"
                        },
                        {
                            "type": "address",
                            "content": "1",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onDonation": {
                    "action": {
                        "name": "DONATE",
                        "class": "action-donate"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "donated"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "1",
                            "class": "token-amount-donate",
                            "noEndingSpace": true
                        }
                    ]
                },
                "OwnershipTransferred": {
                    "hide": true
                },
                "logContractBalance": {
                    "virtual": true,
                    "action": {
                        "name": "BALANCE",
                        "class": "action-balance"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "There is "
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "balance",
                            "class": "token-amount-balance"
                        },
                        {
                            "type": "string",
                            "content": "in the contract",
                            "noEndingSpace": true
                        }
                    ]
                }
            }
        },
        "THVYLtjFbXNcXwDvZcwCGivS95Wtd4juFn": {
            "blockchain": "tron",
            "name": "Daily+",
            "balance": {
                "show": true,
                "token": "TRX"
            },
            "events": {
                "onLeaderBoard": {
                    "hide": true
                },
                "onTokenPurchase": {
                    "action": {
                        "name": "BUY",
                        "class": "action-buy"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "bought for"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "1",
                            "class": "token-amount-buy",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onTokenSell": {
                    "action": {
                        "name": "SELL",
                        "class": "action-sell"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "sold"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "1",
                            "class": "token-amount-sell",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onReinvestment": {
                    "hide": true
                },
                "onWithdraw": {
                    "action": {
                        "name": "WITHDRAW",
                        "class": "action-withdraw"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "withdrew"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "1",
                            "class": "token-amount-withdraw",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onTransfer": {
                    "action": {
                        "name": "TRANSFER",
                        "class": "action-transfer"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "transferred"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "2",
                            "class": "token-amount-transfer"
                        },
                        {
                            "type": "string",
                            "content": "to"
                        },
                        {
                            "type": "address",
                            "content": "1",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onBalance": {
                    "hide": true
                },
                "onDonation": {
                    "action": {
                        "name": "DONATE",
                        "class": "action-donate"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "donated"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "1",
                            "class": "token-amount-donate",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onDistribution": {
                    "splitEventList": ["onDistributionPlayers", "onDistributionBNKRDepot"],
                    "action": {
                        "name": "PAYOUTS",
                        "class": "action-donate"
                    },
                    "messageFragments": []
                },
                "onDistributionPlayers": {
                    "virtual": true,
                    "action": {
                        "name": "PAYOUT",
                        "class": "action-donate"
                    },
                    "messageFragments": [{
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "0",
                            "class": "token-amount-donate",
                        },
                        {
                            "type": "string",
                            "content": "distributed to players",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onDistributionBNKRDepot": {
                    "virtual": true,
                    "action": {
                        "name": "PAYOUT",
                        "class": "action-donate"
                    },
                    "messageFragments": [{
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "1",
                            "class": "token-amount-donate",
                        },
                        {
                            "type": "string",
                            "content": "distributed to BNKR Depot pool",
                            "noEndingSpace": true
                        }
                    ]
                },
                "OwnershipTransferred": {
                    "hide": true
                },
                "logContractBalance": {
                    "virtual": true,
                    "action": {
                        "name": "BALANCE",
                        "class": "action-balance"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "There is "
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "balance",
                            "class": "token-amount-balance"
                        },
                        {
                            "type": "string",
                            "content": "in the contract",
                            "noEndingSpace": true
                        }
                    ]
                }
            }
        },
        "TBbdx9G136y5Bf3cPipYQPkq4iukNEvZMn": {
            "blockchain": "tron",
            "name": "Air",
            "balance": {
                "show": true,
                "token": "TRX"
            },
            "events": {
                "onPlayerSummary": {
                    "action": {
                        "name": "FREE ROLL",
                        "class": "action-freeroll"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "rolled for round"
                        },
                        {
                            "type": "value",
                            "content": "1",
                            "class": "token-amount-freeroll",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onRoundSummary": {
                    "action": {
                        "name": "WIN",
                        "class": "action-buy"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "1"
                        },
                        {
                            "type": "string",
                            "content": "won round"
                        },
                        {
                            "type": "value",
                            "content": "0",
                            "class": "token-amount-buy",
                            "noEndingSpace": true
                        }
                    ]
                },
                "OwnershipTransferred": {
                    "hide": true
                },
                "logContractBalance": {
                    "virtual": true,
                    "action": {
                        "name": "BALANCE",
                        "class": "action-balance"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "There is "
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "balance",
                            "class": "token-amount-balance"
                        },
                        {
                            "type": "string",
                            "content": "in the contract",
                            "noEndingSpace": true
                        }
                    ]
                }
            }
        },
        "TNo59Khpq46FGf4sD7XSWYFNfYfbc8CqNK": {
            "blockchain": "tron",
            "name": "BNKR",
            "balance": {
                "show": true,
                "token": "BNKR",
                "method": "mintedSupply"
            },
            "events": {
                "Mint": {
                    "action": {
                        "name": "MINING",
                        "class": "action-mining"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "mined"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "1",
                            "class": "token-amount-mining",
                            "noEndingSpace": true
                        }
                    ]
                },
                "MintFinished": {
                    "hide": true
                },
                "OwnershipTransferred": {
                    "hide": true
                },
                "Approval": {
                    "hide": true
                },
                "Transfer": {
                    "action": {
                        "name": "STAKING",
                        "class": "action-stacking"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "staked"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "2",
                            "class": "token-amount-stacking",
                            "noEndingSpace": true
                        }
                    ]
                },
                "logContractBalance": {
                    "virtual": true,
                    "action": {
                        "name": "BALANCE",
                        "class": "action-balance"
                    },
                    "messageFragments": [{
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "balance",
                            "class": "token-amount-balance"
                        },
                        {
                            "type": "string",
                            "content": "have been mined",
                            "noEndingSpace": true
                        }
                    ]
                }
            }
        },
        "THjY7rDKfjMiyCFMoCMCXdQAtRakD21RZQ": {
            "blockchain": "tron",
            "name": "Save",
            "balance": {
                "show": true,
                "token": "TRX"
            },
            "events": {
                "onFreeze": {
                    "action": {
                        "name": "DEPOSIT",
                        "class": "action-deposit"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "deposit"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "1",
                            "class": "token-amount-deposit",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onUnfreeze": {
                    "action": {
                        "name": "WITHDRAW",
                        "class": "action-withdraw"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "withdrew"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "1",
                            "class": "token-amount-withdraw",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onClaim": {
                    "action": {
                        "name": "CLAIM",
                        "class": "action-claim"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "0"
                        },
                        {
                            "type": "string",
                            "content": "claimed"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "1",
                            "class": "token-amount-claim",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onBalance": {
                    "hide": true
                },
                "onContractBalance": {
                    "hide": true
                },
                "WhitelistedAddressAdded": {
                    "hide": true
                },
                "WhitelistedAddressRemoved": {
                    "hide": true
                },
                "OwnershipTransferred": {
                    "hide": true
                },
                "logContractBalance": {
                    "virtual": true,
                    "action": {
                        "name": "BALANCE",
                        "class": "action-balance"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "There is "
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "balance",
                            "class": "token-amount-balance"
                        },
                        {
                            "type": "string",
                            "content": "in the contract",
                            "noEndingSpace": true
                        }
                    ]
                }
            }
        },
        "TRXYvAoYvCqmvZWpFCTLc4rdQ7KxbLsUSj": {
            "blockchain": "tron",
            "name": "Swap",
            "balance": {
                "show": true,
                "token": "TRX"
            },
            "events": {
                "onTokenPurchase": {
                    "action": {
                        "name": "BUY",
                        "class": "action-buy"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "buyer"
                        },
                        {
                            "type": "string",
                            "content": "bought"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "token_amount",
                            "class": "token-amount-buy",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onTrxPurchase": {
                    "action": {
                        "name": "SELL",
                        "class": "action-sell"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "buyer"
                        },
                        {
                            "type": "string",
                            "content": "sold"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "token_amount",
                            "class": "token-amount-sell",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onAddLiquidity": {
                    "action": {
                        "name": "ADD LIQUIDITY",
                        "class": "action-add-liquidity"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "provider"
                        },
                        {
                            "type": "string",
                            "content": "added"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "trx_amount",
                            "class": "token-amount-add-liquidity"
                        },
                        {
                            "type": "string",
                            "content": "and"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "token_amount",
                            "class": "token-amount-add-liquidity"
                        },
                        {
                            "type": "string",
                            "content": "to liquidity pool",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onRemoveLiquidity": {
                    "action": {
                        "name": "REMOVE LIQUIDITY",
                        "class": "action-remove-liquidity"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "provider"
                        },
                        {
                            "type": "string",
                            "content": "removed"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "trx_amount",
                            "class": "token-amount-remove-liquidity"
                        },
                        {
                            "type": "string",
                            "content": "and"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "token_amount",
                            "class": "token-amount-remove-liquidity"
                        },
                        {
                            "type": "string",
                            "content": "from liquidity pool",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onLiquidity": {
                    "hide": true
                },
                "onContractBalance": {
                    "hide": true
                },
                "onPrice": {
                    "action": {
                        "name": "PRICE",
                        "class": "action-price"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "1 BNKR",
                            "class": "token-amount-price"
                        },
                        {
                            "type": "string",
                            "content": "price is"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "0",
                            "class": "token-amount-price",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onSummary": {
                    "hide": true
                },
                "Transfer": {
                    "hide": true
                },
                "Approval": {
                    "hide": true
                },
                "logContractBalance": {
                    "virtual": true,
                    "action": {
                        "name": "BALANCE",
                        "class": "action-balance"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "There is "
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "balance",
                            "class": "token-amount-balance"
                        },
                        {
                            "type": "string",
                            "content": "in the contract",
                            "noEndingSpace": true
                        }
                    ]
                },
                "logSwapVolume": {
                    "virtual": true,
                    "action": {
                        "name": "VOLUME",
                        "class": "action-volume"
                    },
                    "messageFragments": [{
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "totalTRXVolume",
                            "class": "token-amount-volume"
                        },
                        {
                            "type": "string",
                            "content": "swapped in the last 24 hours",
                            "noEndingSpace": true
                        }
                    ]
                }
            }
        },
        "TNbpnzNg2quViNYDDBUgvBuYofzkJvy3Aw": {
            "blockchain": "tron",
            "name": "Stack (BNKR)",
            "balance": {
                "show": true,
                "token": "BNKR",
                "method": "totalTokenBalance"
            },
            "events": {
                "onLeaderBoard": {
                    "hide": true
                },
                "onTokenPurchase": {
                    "action": {
                        "name": "BUY",
                        "class": "action-buy"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "customerAddress"
                        },
                        {
                            "type": "string",
                            "content": "bought"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "incomingtrx",
                            "class": "token-amount-buy",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onTokenSell": {
                    "action": {
                        "name": "SELL",
                        "class": "action-sell"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "customerAddress"
                        },
                        {
                            "type": "string",
                            "content": "sold"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "tokensBurned",
                            "class": "token-amount-sell",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onReinvestment": {
                    "hide": true
                },
                "onWithdraw": {
                    "action": {
                        "name": "WITHDRAW",
                        "class": "action-withdraw"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "customerAddress"
                        },
                        {
                            "type": "string",
                            "content": "withdrew"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "trxWithdrawn",
                            "class": "token-amount-withdraw",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onClaim": {
                    "hide": true
                },
                "onTransfer": {
                    "hide": true
                },
                "onBuyBack": {
                    "hide": true
                },
                "onBalance": {
                    "hide": true
                },
                "onDonation": {
                    "hide": true
                },
                "logContractBalance": {
                    "virtual": true,
                    "action": {
                        "name": "BALANCE",
                        "class": "action-balance"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "There is "
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "balance",
                            "class": "token-amount-balance"
                        },
                        {
                            "type": "string",
                            "content": "in the contract",
                            "noEndingSpace": true
                        }
                    ]
                }
            }
        },
        "TWkuzBQqzJpQFYoX4DXzMeswgeAqH7EkX2": {
            "blockchain": "tron",
            "name": "Credits v2",
            "balance": {
                "show": true,
                "token": "TRX"
            },
            "events": {
                "onLeaderBoard": {
                    "hide": true
                },
                "onTokenPurchase": {
                    "action": {
                        "name": "BUY",
                        "class": "action-buy"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "customerAddress"
                        },
                        {
                            "type": "string",
                            "content": "bought"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "incomingtrx",
                            "class": "token-amount-buy",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onTokenSell": {
                    "action": {
                        "name": "SELL",
                        "class": "action-sell"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "customerAddress"
                        },
                        {
                            "type": "string",
                            "content": "sold"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "tokensBurned",
                            "class": "token-amount-sell",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onReinvestment": {
                    "hide": true
                },
                "onWithdraw": {
                    "action": {
                        "name": "WITHDRAW",
                        "class": "action-withdraw"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "customerAddress"
                        },
                        {
                            "type": "string",
                            "content": "withdrew"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "trxWithdrawn",
                            "class": "token-amount-withdraw",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onClaim": {
                    "action": {
                        "name": "CLAIM",
                        "class": "action-claim"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "customerAddress"
                        },
                        {
                            "type": "string",
                            "content": "claimed"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "tokens",
                            "class": "token-amount-claim",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onTransfer": {
                    "action": {
                        "name": "TRANSFER",
                        "class": "action-transfer"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "from"
                        },
                        {
                            "type": "string",
                            "content": "transferred"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "tokens",
                            "class": "token-amount-transfer"
                        },
                        {
                            "type": "string",
                            "content": "to"
                        },
                        {
                            "type": "address",
                            "content": "to",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onBuyBack": {
                    "action": {
                        "name": "BUY BACK",
                        "class": "action-buy"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "Contract bought back"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "BNKR",
                            "content": "tokenAmount",
                            "class": "token-amount-buy"
                        },
                        {
                            "type": "string",
                            "content": "for"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "trxAmount",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onBalance": {
                    "hide": true
                },
                "onDonation": {
                    "hide": true
                },
                "OwnershipTransferred": {
                    "hide": true
                },
                "logContractBalance": {
                    "virtual": true,
                    "action": {
                        "name": "BALANCE",
                        "class": "action-balance"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "There is "
                        },
                        {
                            "type": "tokenAmount",
                            "token": "TRX",
                            "content": "balance",
                            "class": "token-amount-balance"
                        },
                        {
                            "type": "string",
                            "content": "in the contract",
                            "noEndingSpace": true
                        }
                    ]
                }
            }
        },

        "0x3d76cd9723e0cc8875907CF944c147eE4baFB29E": {
            "blockchain": "ethereum",
            "name": "Life",
            "balance": {
                "show": true,
                "token": "ETH"
            },
            "abi": [{
                "constant": true,
                "inputs": [{
                    "name": "_customerAddress",
                    "type": "address"
                }],
                "name": "dividendsOf",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "_customerAddress",
                    "type": "address"
                }],
                "name": "claimsOf",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "swapCollector_",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "_ethToSpend",
                    "type": "uint256"
                }],
                "name": "calculateTokensReceived",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "_customerAddress",
                    "type": "address"
                }],
                "name": "statsOf",
                "outputs": [{
                    "name": "",
                    "type": "uint256[16]"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "myDividends",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "totalClaims",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "sellPrice",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "claim",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "totalTxs",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "totalEthBalance",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "_customerAddress",
                    "type": "address"
                }],
                "name": "buyFor",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "_customerAddress",
                    "type": "address"
                }],
                "name": "balanceOf",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "distributionInterval",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "myClaims",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "totalDeposits",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "swapAddress",
                "outputs": [{
                    "name": "",
                    "type": "address"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "buyPrice",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "_tokensToSell",
                    "type": "uint256"
                }],
                "name": "calculateethReceived",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "myTokens",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "tokenAddress",
                "outputs": [{
                    "name": "",
                    "type": "address"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "buy",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "_toAddress",
                    "type": "address"
                }, {
                    "name": "_amountOfTokens",
                    "type": "uint256"
                }],
                "name": "transfer",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "swapBalance_",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "_customerAddress",
                    "type": "address"
                }],
                "name": "dailyClaimEstimate",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "depotFlushSize",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "lastPayout",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "dividendBalance_",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "players",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "_amountOfTokens",
                    "type": "uint256"
                }],
                "name": "sell",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "donatePool",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "_customerAddress",
                    "type": "address"
                }],
                "name": "tokenBalance",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "_customerAddress",
                    "type": "address"
                }],
                "name": "dailyEstimate",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "balanceInterval",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "reinvest",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "inputs": [{
                    "name": "_tokenAddress",
                    "type": "address"
                }, {
                    "name": "_swapAddress",
                    "type": "address"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }, {
                "payable": true,
                "stateMutability": "payable",
                "type": "fallback"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "customerAddress",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "invested",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "tokens",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "soldTokens",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "claims",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint256"
                }],
                "name": "onLeaderBoard",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "customerAddress",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "incomingeth",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "tokensMinted",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint256"
                }],
                "name": "onTokenPurchase",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "customerAddress",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "tokensBurned",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "ethEarned",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint256"
                }],
                "name": "onTokenSell",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "customerAddress",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "ethReinvested",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "tokensMinted",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint256"
                }],
                "name": "onReinvestment",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "customerAddress",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "ethWithdrawn",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint256"
                }],
                "name": "onWithdraw",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "customerAddress",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "tokens",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint256"
                }],
                "name": "onClaim",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                }, {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "tokens",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint256"
                }],
                "name": "onTransfer",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "name": "ethAmount",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "tokenAmount",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint256"
                }],
                "name": "onBuyBack",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "name": "balance",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint256"
                }],
                "name": "onBalance",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint256"
                }],
                "name": "onDonation",
                "type": "event"
            }],
            "events": {
                "onLeaderBoard": {
                    "hide": true
                },
                "onTokenPurchase": {
                    "action": {
                        "name": "BUY",
                        "class": "action-buy"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "customerAddress"
                        },
                        {
                            "type": "string",
                            "content": "bought"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "ETH",
                            "content": "incomingeth",
                            "class": "token-amount-buy",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onTokenSell": {
                    "action": {
                        "name": "SELL",
                        "class": "action-sell"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "customerAddress"
                        },
                        {
                            "type": "string",
                            "content": "sold"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "ETH",
                            "content": "tokensBurned",
                            "class": "token-amount-sell",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onReinvestment": {
                    "hide": true
                },
                "onWithdraw": {
                    "action": {
                        "name": "WITHDRAW",
                        "class": "action-withdraw"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "customerAddress"
                        },
                        {
                            "type": "string",
                            "content": "withdrew"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "ETH",
                            "content": "ethWithdrawn",
                            "class": "token-amount-withdraw",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onClaim": {
                    "action": {
                        "name": "CLAIM",
                        "class": "action-claim"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "customerAddress"
                        },
                        {
                            "type": "string",
                            "content": "claimed"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "VLT",
                            "content": "tokens",
                            "class": "token-amount-claim",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onTransfer": {
                    "action": {
                        "name": "TRANSFER",
                        "class": "action-transfer"
                    },
                    "messageFragments": [{
                            "type": "address",
                            "content": "from"
                        },
                        {
                            "type": "string",
                            "content": "transferred"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "ETH",
                            "content": "tokens",
                            "class": "token-amount-transfer"
                        },
                        {
                            "type": "string",
                            "content": "to"
                        },
                        {
                            "type": "address",
                            "content": "to",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onBuyBack": {
                    "action": {
                        "name": "BUY BACK",
                        "class": "action-buy"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "Contract bought back"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "VLT",
                            "content": "tokenAmount",
                            "class": "token-amount-buy"
                        },
                        {
                            "type": "string",
                            "content": "for"
                        },
                        {
                            "type": "tokenAmount",
                            "token": "ETH",
                            "content": "ethAmount",
                            "noEndingSpace": true
                        }
                    ]
                },
                "onBalance": {
                    "hide": true
                },
                "onDonation": {
                    "hide": true
                },
                "logContractBalance": {
                    "virtual": true,
                    "action": {
                        "name": "BALANCE",
                        "class": "action-balance"
                    },
                    "messageFragments": [{
                            "type": "string",
                            "content": "There is "
                        },
                        {
                            "type": "tokenAmount",
                            "token": "ETH",
                            "content": "balance",
                            "class": "token-amount-balance"
                        },
                        {
                            "type": "string",
                            "content": "in the contract",
                            "noEndingSpace": true
                        }
                    ]
                }
            }
        }
    };

    /* Default plugin options value */
    const defaultOptions = {
        balanceReportLimit: 10,
        logContractBalanceEventName: "logContractBalance",
        swapVolumeReportLimit: 10,
        swapBuyEventName: "onTokenPurchase",
        swapSellEventName: "onTrxPurchase",
        swapContractAddress: "TRXYvAoYvCqmvZWpFCTLc4rdQ7KxbLsUSj",
        logSwapVolumeEventName: "logSwapVolume",
        particles: true,
        firstRenderFetchEventNumber: 3,
        custodyWalletAddressInHexFormat: "0x976b2df04558bc6b3997b143c02c13614dc5f5a4",
        contractsConfig: CONTRACTS_CONFIG,
        maxTerminalLogNumber: 100,
        dailyPlusContractAddress: "THVYLtjFbXNcXwDvZcwCGivS95Wtd4juFn",
        bnkrTokenContractAddress: "TNo59Khpq46FGf4sD7XSWYFNfYfbc8CqNK",
        saveContractAddress: "THjY7rDKfjMiyCFMoCMCXdQAtRakD21RZQ",
        onDistributionBNKRDepotEventName: "onDistributionBNKRDepot",
        etherumProvider: 'wss://mainnet.infura.io/ws/v3/5d14817c65244792b5c61aaec31d92cb'
    };

    /**
     * Plugin constructor
     */
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaultOptions, options);
        this._name = pluginName;
        this.init();
    }

    /**
     * Plugin functions
     */
    $.extend(Plugin.prototype, {
            /**
             * Init function. Called only once in the plugin constructor.
             */
            init: function () {
                /* Init no display effect counter */
                this.noDisplayEffectEntryNumber = 0;
                /* Init display without effect counter */
                this.displayWithoutEffectMaxEntry = 0;
                /* Balance limit report counter */
                this.balanceReportCounter = {};
                /* Swap volume limit report counter */
                this.swapVolumeReportCounter = 0;
                /* Set up TronWeb client */
                this.initTronWebClient();
                /* Set up Web3 client */
                this.initWeb3Client();
                /* Fetch initial data */
                this.loadEventsFirstRender();
                /* Fetch swap volume on first render */
                this.retrieveSwapVolume(this.options.swapContractAddress, true);
                /* Build terminal HTML structure */
                this.buildTerminalHtml(this.element);
                /* Load particle background or not */
                if (this.options.particles) {
                    this.loadParticleJS();
                }
                /* Start display loop */
                this.displayEventsLoop();
                /* Start event monitoring */
                this.startEventsWatchers();
            },

            /**
             * Tronweb client initialization.
             */
            initTronWebClient: function () {
                this.tronWebClient = new TronWeb({
                    fullNode: TRON_GRID_URL,
                    solidityNode: TRON_GRID_URL,
                    eventServer: TRON_GRID_URL
                })
                /* TronWeb default address */
                this.tronWebClient.setAddress(TRON_DEFAULT_ADDRESS);
            },

            /**
             * Web3 client initialization.
             */
            initWeb3Client: async function () {
                let provider = new Web3.providers.WebsocketProvider(this.options.etherumProvider);
                this.web3Client = new Web3(provider);
            },

            /**
             * Build HTML terminal structure
             * @param {*} element element onto the plugin is applied.
             */
            buildTerminalHtml: function (element) {
                /* Main terminal container */
                let terminalHtml = $("<div />").addClass("event-terminal");
                /* ParticleJS container */
                let terminalParticleJs = $("<div id=" + "\"" + this.element.id + "-event-terminal-particles-js\" />").addClass("event-terminal-particles-js");
                /* Command line container */
                let terminalCommandLine = $("<div />").addClass("event-terminal-command-line");
                let terminalCommandLineMark = $("<span />").addClass("event-terminal-command-line-mark").html(COMMAND_LINE_INVITE);
                let terminalCommandLineWrite = $("<span />").addClass("event-terminal-command-line-write").html(COMMAND_LINE_SCANNING_TRANSACTION);
                let terminalCommandLineCursor = $("<span />").addClass("event-terminal-command-line-cursor").html(COMMAND_LINE_CURSOR);
                terminalCommandLine.append(terminalCommandLineMark, terminalCommandLineWrite, terminalCommandLineCursor);
                /* Logs container */
                let terminalLogs = $("<div />").addClass("event-terminal-logs");

                /* Build terminal HTML structure */
                terminalHtml.append(terminalParticleJs, terminalCommandLine, terminalLogs);

                /* Add to element onto plugin is applied */
                $(element).append(terminalHtml);
            },

            /**
             * Enable particle rendering of terminal background.
             * Require particlejs library : https://vincentgarreau.com/particles.js/
             */
            loadParticleJS: function () {
                let particleJSConfig = {
                    "particles": {
                        "number": {
                            "value": 80,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#ffffff"
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 5
                            },
                            "image": {
                                "src": "img/github.svg",
                                "width": 100,
                                "height": 100
                            }
                        },
                        "opacity": {
                            "value": 0.5,
                            "random": false,
                            "anim": {
                                "enable": false,
                                "speed": 1,
                                "opacity_min": 0.1,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 3,
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 40,
                                "size_min": 0.1,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#ffffff",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 6,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": false,
                                "mode": "grab"
                            },
                            "onclick": {
                                "enable": false,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 400,
                                "line_linked": {
                                    "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 40,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 200,
                                "duration": 0.4
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                    "retina_detect": false
                };

                particlesJS(this.element.id + "-event-terminal-particles-js", particleJSConfig, function () {
                    console.log('callback - particles.js config loaded');
                });
            },

            /**
             * Data fetching on first render
             */
            loadEventsFirstRender: function () {
                const self = this;

                /* Loop on contract configuration to loop on events */
                for (let [contractAddress, contractConfig] of Object.entries(this.options.contractsConfig)) {
                    (async function (contractAddress, contractConfig) {
                        await self.fetchContractEventsFirstRender(contractAddress, contractConfig);

                    })(contractAddress, contractConfig);
                }
            },

            /**
             * Fetch events from contracts via tronWeb.getEventResult method.
             * Used only to fetch first event and don't display an empty terminal
             * until the first live event shows up.
             * @param {*} contractAddress Contract address.
             * @param {*} contractConfig Contract configuration object.
             */
            fetchContractEventsFirstRender: async function (contractAddress, contractConfig) {
                const self = this;
                if (this.options.firstRenderFetchEventNumber > 0) {
                    switch (contractConfig.blockchain) {
                        case BLOCKCHAIN_TRON:
                            let eventFilter = {
                                onlyConfirmed: true,
                                size: this.options.firstRenderFetchEventNumber
                            };

                            self.tronWebClient.getEventResult(contractAddress, eventFilter)
                                .then(
                                    function (events) {
                                        for (let tronEvent of events) {
                                            /* Launch event processing */
                                            self.processEvent(self.tronEventToGenericEvent(tronEvent), contractConfig, true);
                                        }
                                    })
                                .catch(function (error) {
                                    console.error("error:", error);
                                });

                            break;
                        case BLOCKCHAIN_ETHEREUM:
                            const ethereumContract = new this.web3Client.eth.Contract(contractConfig.abi, contractAddress);
                            const currentBlockNumber = await this.web3Client.eth.getBlockNumber();
                            ethereumContract.getPastEvents("allEvents", {
                                    fromBlock: currentBlockNumber - 3000,
                                    toBlock: 'latest'
                                })
                                .then(
                                    function (events) {
                                        /* Keep the 3 latest events */
                                        for (let i = 1; i <= self.options.firstRenderFetchEventNumber; i++) {
                                            let eventIndex = events.length - i;
                                            /* Launch event processing */
                                            self.processEvent(self.ethereumEventToGenericEvent(events[eventIndex]), contractConfig, true);
                                        }
                                    })
                                .catch(function (error) {
                                    console.error("error:", error);
                                });
                            break;
                    }
                }
            },

            /**
             * Get Swap last 24H volume and send to the display queue.
             * @param {*} contractAddress Swap contract address
             * @param {*} firstRender Enable or disable the typing display effect
             */
            retrieveSwapVolume: async function (contractAddress, firstRender) {
                let events = await this.fetchSwapLast24HBuyAndSellEvents(contractAddress);
                let swapVolumes = this.computeSwapLast24HVolume(events);

                /* Generate swapVolume event */
                let event = this.generateLogSwapVolumeEvent(swapVolumes, contractAddress);
                /* Push event in display queue */
                this.addEventToDisplayQueue(event, firstRender);
            },

            /**
             * Show the last 24 hours Swap BNKR volume.
             * @param {*} event Event triggered
             * @param {*} firstRender true if firstRender phase.
             */
            showSwapVolume: async function (event, firstRender) {
                if (!firstRender && event.contract === this.options.swapContractAddress) {
                    /* Handle swapVolumeReportLimit flag to display Swap volume when needed */
                    if (event.name !== this.options.logSwapVolumeEventName) {
                        this.swapVolumeReportCounter++;
                        /* Show swap volume when needed */
                        if (this.swapVolumeReportCounter % this.options.swapVolumeReportLimit == 0) {
                            /* Retrieve swap volume */
                            await this.retrieveSwapVolume(event.contract, firstRender);
                        }
                    }
                }
            },

            /**
             * Fetch last 24 hours buy and sell events.
             * @param {*} contractAddress 
             */
            fetchSwapLast24HBuyAndSellEvents: async function (contractAddress) {
                /* Compute last 24H timestamp */
                let last24hTimestamp = moment().subtract(1, "days").utc().valueOf();

                /* Fetch buy events */
                let buyEventFilter = {
                    eventName: this.options.swapBuyEventName,
                    onlyConfirmed: true,
                    size: 100
                };
                let buyEvents = await this.tronWebClient.getEventResult(contractAddress, buyEventFilter);
                let getNextChunk = true;
                /* Iterate on event history until last 24H timestamp is reach. */
                while (buyEvents.length > 0 && buyEvents[buyEvents.length - 1].fingerprint && getNextChunk) {
                    buyEventFilter.fingerprint = buyEvents[buyEvents.length - 1].fingerprint;
                    let buyEventsChunk = await this.tronWebClient.getEventResult(contractAddress, buyEventFilter);
                    if (!buyEventsChunk[buyEventsChunk.length - 1].timestamp < last24hTimestamp) {
                        getNextChunk = false;
                    }
                    buyEvents = buyEvents.concat(buyEventsChunk);
                }

                /* Fetch sell events */
                let sellEventFilter = {
                    eventName: this.options.swapSellEventName,
                    onlyConfirmed: true,
                    size: 100
                };
                let sellEvents = await this.tronWebClient.getEventResult(contractAddress, sellEventFilter);
                getNextChunk = true;
                /* Iterate on event history until last 24H timestamp is reach. */
                while (sellEvents.length > 0 && sellEvents[sellEvents.length - 1].fingerprint && getNextChunk) {
                    sellEventFilter.fingerprint = sellEvents[sellEvents.length - 1].fingerprint;
                    let sellEventsChunk = await this.tronWebClient.getEventResult(contractAddress, sellEventFilter);
                    if (!sellEventsChunk[sellEventsChunk.length - 1].timestamp < last24hTimestamp) {
                        getNextChunk = false;
                    }
                    sellEvents = sellEvents.concat(sellEventsChunk);
                }

                /* Concat buy and sell events into one array. */
                let allEvents = buyEvents.concat(sellEvents);
                /* Filter events that are over the timestamp */
                allEvents = _.filter(allEvents, function (event) {
                    if (event.timestamp > last24hTimestamp) return event;
                });

                return allEvents;
            },

            /**
             * Return a swapVolume object with Buy TRX volume, Sell TRX volume
             * and Total TRX volume.
             * Volume value are in SUN base.
             * @param {*} events event list to compute.
             */
            computeSwapLast24HVolume: function (events) {
                let swapVolumes = {
                    "buyTRXVolume": 0,
                    "sellTRXVolume": 0,
                    "totalTRXVolume": 0
                };

                for (let event of events) {
                    switch (event.name) {
                        case this.options.swapBuyEventName:
                            swapVolumes.buyTRXVolume += Number(event.result["trx_amount"]);
                            break;
                        case this.options.swapSellEventName:
                            swapVolumes.sellTRXVolume += Number(event.result["trx_amount"]);
                            break;
                    }
                }

                swapVolumes.totalTRXVolume = swapVolumes.buyTRXVolume + swapVolumes.sellTRXVolume;

                return swapVolumes;
            },

            /**
             * Start to watch for events via contract method watcher.
             */
            startEventsWatchers: async function () {

                const self = this;
                /* Loop on each contract config */
                for (let [contractAddress, contractConfig] of Object.entries(this.options.contractsConfig)) {
                    (async function (contractAddress, contractConfig) {
                        try {
                            /* Get contract instance */
                            let contractInstance;
                            switch (contractConfig.blockchain) {
                                case BLOCKCHAIN_TRON:
                                    contractInstance = await self.tronWebClient.contract().at(contractAddress);
                                    break;
                                case BLOCKCHAIN_ETHEREUM:
                                    contractInstance = new self.web3Client.eth.Contract(contractConfig.abi, contractAddress);
                                    break;
                            }
                            /* Loop on each contract event config */
                            for (let [eventName, eventConfig] of Object.entries(self.options.contractsConfig[contractAddress].events)) {
                                (function (eventName, eventConfig) {
                                    /* Do not process virtual and hidden event */
                                    if (!eventConfig.virtual && !eventConfig.hide) {
                                        switch (contractConfig.blockchain) {
                                            case BLOCKCHAIN_TRON:
                                                contractInstance[eventName]().watch(
                                                    function (error, tronEvent) {
                                                        if (tronEvent) {
                                                            self.processEvent(self.tronEventToGenericEvent(tronEvent), contractConfig, false);
                                                        }
                                                    }
                                                );
                                                break;
                                            case BLOCKCHAIN_ETHEREUM:
                                                contractInstance.events[eventName]()
                                                    .on('data', (ethereumEvent) => {
                                                        if (ethereumEvent) {
                                                            self.processEvent(self.ethereumEventToGenericEvent(ethereumEvent), contractConfig, false);
                                                        }
                                                    });
                                                break;
                                        }
                                    }
                                })(eventName, eventConfig);
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    })(contractAddress, contractConfig);
                }
            },

            /**
             * Get the contract balance and add it to display queue.
             * @param {*} contractAddress Contract address to fetch balance from.
             */
            fetchContractBalance: async function (contractAddress) {
                let contractConfig = this.options.contractsConfig[contractAddress];

                if (contractConfig.balance.show) {
                    /* Contract which need to call a specific method to get the balance */
                    let balance;
                    let blockchain;
                    if (contractConfig.balance.method) {
                        switch (contractConfig.blockchain) {
                            case BLOCKCHAIN_TRON:
                                /* Get contract instance */
                                let contractInstance = await this.tronWebClient.contract().at(contractAddress);
                                balance = await contractInstance[contractConfig.balance.method]().call();
                                blockchain = BLOCKCHAIN_TRON;
                                break;
                            case BLOCKCHAIN_ETHEREUM:
                                /* Not implemented yet */
                                blockchain = BLOCKCHAIN_ETHEREUM;
                                balance = 0;
                                break;
                        }
                        if (balance) {
                            /* Generate and add event to Queue */
                            let event = this.generateLogBalanceEvent(blockchain, balance, contractAddress);
                            this.addEventToDisplayQueue(event, false);
                        }
                    }
                    /* Contract that use the generic TRX contract balance */
                    else {
                        switch (contractConfig.blockchain) {
                            case BLOCKCHAIN_TRON:
                                balance = await this.tronWebClient.trx.getBalance(contractAddress);
                                blockchain = BLOCKCHAIN_TRON;
                                break;
                            case BLOCKCHAIN_ETHEREUM:
                                balance = await this.web3Client.eth.getBalance(contractAddress);
                                blockchain = BLOCKCHAIN_ETHEREUM;
                                break;
                        }
                        if (balance) {
                            /* Generate and add event to Queue */
                            let event = this.generateLogBalanceEvent(blockchain, balance, contractAddress);
                            this.addEventToDisplayQueue(event, false);
                        }
                    }
                }
            },

            /**
             * Display rendering loop
             */
            displayEventsLoop: function () {
                const self = this;

                self.logDisplayQueue = [];
                self.isDisplayInProgress = false;
                this.commandLineCursorAnimate();
                setInterval(async function () {
                    self.displayEvents();
                }, DISPLAY_LOOP_INTERVAL);
            },

            /**
             * Add an event to the display rendering queue.
             * @param {*} event Event to add.
             * @param {*} firstRender flag indicating that it is the  first render display phase.
             */
            addEventToDisplayQueue: async function (event, firstRender) {
                /* Mute events that we don't want to display by contract configuration */
                if (!this.hideEvent(event)) {
                    /* Mute event on specific business rules */
                    if (!this.hideEventOnBusinessRules(event)) {
                        let log = this.eventToLog(event);
                        if (log) {
                            this.logDisplayQueue.push(log);
                            /* Increment counter to display first render events without display effect. */
                            if (firstRender) {
                                this.displayWithoutEffectMaxEntry++;
                            }
                            /* Show contract balance if needed */
                            await this.showContractBalance(event, firstRender);
                            /* Show Swap contract volume if needed */
                            await this.showSwapVolume(event, firstRender);
                        }
                    }
                }
            },

            /**
             * Generic event processing.
             * @param {*} event Generic event to process.
             * @param {*} contractConfig contract configuration object.
             * @param {*} firstRender flag indicating that it is the  first render display phase.
             */
            processEvent: function (event, contractConfig, firstRender) {
                /* Split event into virtuals ones if needed */
                if (!this.mustSplitEvent(event)) {
                    this.addEventToDisplayQueue(event, firstRender);
                } else {
                    this.splitEvent(event, contractConfig, firstRender);
                }
            },

            /**
             * Convert a Tron event to a generic event.
             * @param {object} tronEvent event in the tron blockchain structure.
             * @returns a generic event.
             */
            tronEventToGenericEvent: function (tronEvent) {
                let genericEvent = {};
                genericEvent.blockchain = BLOCKCHAIN_TRON;
                genericEvent.contract = tronEvent.contract;
                genericEvent.name = tronEvent.name;
                genericEvent.timestamp = tronEvent.timestamp;
                genericEvent.transaction = tronEvent.transaction;
                genericEvent.data = _.clone(tronEvent.result, true);

                return genericEvent;
            },

            /**
             * Convert a Tron event to a generic event.
             * @param {object} tronEvent event in the tron blockchain structure.
             * @returns a generic event.
             */
            ethereumEventToGenericEvent: function (ethereumEvent) {
                let genericEvent = {};
                genericEvent.blockchain = BLOCKCHAIN_ETHEREUM;
                genericEvent.contract = ethereumEvent.address;
                genericEvent.name = ethereumEvent.event;
                genericEvent.timestamp = ethereumEvent.returnValues["timestamp"] + "000";
                genericEvent.transaction = ethereumEvent.transactionHash;
                genericEvent.data = _.clone(ethereumEvent.returnValues, true);

                return genericEvent;
            },

            /**
             * Show contract balance if balanceReportLimit is hit.
             * @param {*} event event data.
             * @param {*} firstRender flag indicating that it is the  first render display phase.
             */
            showContractBalance: async function (event, firstRender) {
                if (!firstRender && event.name !== this.options.logContractBalanceEventName) {
                    /* Handle balance report flag to display balance when needed */
                    if (!this.balanceReportCounter[event.contract]) {
                        this.balanceReportCounter[event.contract] = 1
                    } else {
                        this.balanceReportCounter[event.contract]++;
                    }
                    /* Get balance when needed */
                    if (this.balanceReportCounter[event.contract] % this.options.balanceReportLimit == 0) {
                        /* Retrieve contract balance */
                        await this.fetchContractBalance(event.contract);
                    }
                }
            },

            /**
             * Return true if the event must be split into multiple virtual events.
             * See splitEventList contract configuration
             * @param {*} event Event that we want to know if it must be split or not.
             */
            mustSplitEvent: function (event) {
                return this.options.contractsConfig[event.contract].events[event.name].splitEventList;
            },

            /**
             * Split an event into multiple virtual ones.
             * See splitEventList contract configuration.
             * @param {*} event Event to split
             * @param {*} contractConfig Contract configuration with the splitEventList array.
             * @param {*} firstRender flag indicating that it is the  first render display phase.
             */
            splitEvent: function (event, contractConfig, firstRender) {
                for (splitEventName of contractConfig.events[event.name].splitEventList) {
                    let eventClone = _.clone(event, true);
                    eventClone.name = splitEventName;
                    this.addEventToDisplayQueue(eventClone, firstRender);
                }
            },

            /**
             * Return true if an events has a "hide" attribute equal to true in contract
             * configuration. This event will be hidden.
             *  
             * @param {*} event An event.
             */
            hideEvent: function (event) {
                return this.options.contractsConfig[event.contract].events[event.name].hide;
            },

            /**
             * Apply specific business rules on event.
             * @param {*} event An event.
             */
            hideEventOnBusinessRules: function (event) {
                let result = false;

                /* Daily+ contract */
                if (event.contract === this.options.dailyPlusContractAddress) {
                    switch (event.name) {
                        /* if BNKR Depot distribution is < 1 TRX, hide it. */
                        case this.options.onDistributionBNKRDepotEventName:
                            if (event.data[1] < 10e5) { // 1 TRX in SUN
                                result = true;
                            }
                            break;
                    }
                }
                /* BNKR token contract */
                else if (event.contract === this.options.bnkrTokenContractAddress) {
                    switch (event.name) {
                        /* When tokens come from the ZERO address (0x0000000000000000000000000000000000000000 or T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb)
                         * they are mined, not staked, hide it.
                         */
                        case "Transfer":
                            if (event.data[0] === "0x0000000000000000000000000000000000000000") {
                                result = true;
                            }
                            break;
                            /* When mined amount is under 0.01 BNKR, hide it.
                             * Avoid to display "xxxx...xxxx mined 0.00 BNKR".
                             */
                        case "Mint":
                            if (event.data[1] < 10e3) {
                                result = true;
                            }
                            /* Hide mint event from custody address. */
                            else if (event.data[0] === this.options.custodyWalletAddressInHexFormat) {
                                result = true;
                            }
                            break;
                    }
                }
                /* Save contract */
                else if (event.contract === this.options.saveContractAddress) {
                    switch (event.name) {
                        /* Hide claim event from Bankroll custody address. */
                        case "onClaim":
                            if (event.data[0] === this.options.custodyWalletAddressInHexFormat) {
                                result = true;
                            }
                            break;
                    }
                }

                return result;
            },

            /**
             * Display rendering pipeline.
             * Check if it is time to render a log. If yes, start the log rendering
             * with or without the command line effect. 
             */
            displayEvents: function () {
                if (!this.isDisplayInProgress) {
                    /* Display next event */
                    this.logDisplayQueue = _.sortBy(this.logDisplayQueue, "timestamp");
                    let log = this.logDisplayQueue.shift();
                    if (log) {
                        this.isDisplayInProgress = true;
                        if (this.noDisplayEffectEntryNumber < this.displayWithoutEffectMaxEntry) {
                            this.displayEventWithoutEffect(log);
                        } else {
                            this.displayEventWithCommandLineWriterEffect(log.commandLine + "      ", 0, log.logLine);
                        }
                    }
                }
            },

            /**
             * Display a log without the command line effect.
             * @param {*} log a log object.
             */
            displayEventWithoutEffect: function (log) {
                this.addLogToTerminal(log.logLine);
                this.noDisplayEffectEntryNumber++;
                this.isDisplayInProgress = false;
            },

            /**
             * Display a log with the command line effect.
             * @param {*} message log message shown in the command line section.
             * @param {*} index index in the log message to display from.
             * @param {*} logLine log line  shown in the log section.
             */
            displayEventWithCommandLineWriterEffect: function (message, index, logLine) {
                const self = this;
                $("#" + this.element.id + " .event-terminal-command-line-write").text(message.substr(0, index));
                if (index < message.length + 1) {
                    setTimeout(function () {
                        self.displayEventWithCommandLineWriterEffect(message, index + 1, logLine);
                    }, COMMAND_LINE_TYPE_SPEED);
                } else {
                    this.updateLogsTimestamp();
                    this.addLogToTerminal(logLine);
                    $("#" + this.element.id + " .event-terminal-command-line-write").text(COMMAND_LINE_SCANNING_TRANSACTION);
                    this.isDisplayInProgress = false;
                }
            },

            /**
             * Add a log line to the terminal
             * @param {*} logLine 
             */
            addLogToTerminal: function (logLine) {
                /* Add new line at terminal beginning. */
                $("#" + this.element.id + " .event-terminal-logs").prepend(logLine);

                /* Remove last line if maxTerminalLogNumber is reach. */
                let terminalChildrenDomElement = $("#" + this.element.id + " .event-terminal-logs > .event-terminal-log");
                if (terminalChildrenDomElement.length > this.options.maxTerminalLogNumber) {
                    terminalChildrenDomElement.last().remove();
                }
            },

            /**
             * Command line cursor animation effect.
             */
            commandLineCursorAnimate: function () {
                const self = this;
                $("#" + this.element.id + " .event-terminal-command-line-cursor").fadeToggle(function () {
                    self.commandLineCursorAnimate();
                });
            },

            /**
             * Update the timestamp string on each rendered logs in the log section.
             */
            updateLogsTimestamp: function () {
                const self = this;
                $("#" + this.element.id + " .event-terminal-log-date").each(function () {
                    let timestamp = Number($(this).next("#" + self.element.id + " .event-terminal-log-timestamp").text());
                    $(this).html("(" + moment(timestamp).fromNow() + ")");
                });
            },

            /**
             * Generate a virtual log balance event.
             * Used to display contract balance.
             * @param {*} balance contract balance.
             * @param {*} contractAddress contract address.
             */
            generateLogBalanceEvent: function (blockchain, balance, contractAddress) {
                let logBalanceEvent = {
                    blockchain: blockchain,
                    contract: contractAddress,
                    name: this.options.logContractBalanceEventName,
                    timestamp: moment().utc().valueOf()
                };
                logBalanceEvent.data = {
                    "balance": balance
                };

                return logBalanceEvent;
            },

            /**
             * Generate a virtual log swap volume event.
             * Used to display swap volume.
             * @param {*} swapVolumes Swap volumes object obtained from
             * computeSwapLast24HVolume function.
             * @param {*} contractAddress contract address.
             */
            generateLogSwapVolumeEvent: function (swapVolumes, contractAddress) {
                let logEvent = {
                    contract: contractAddress,
                    name: "logSwapVolume",
                    timestamp: moment().utc().valueOf()
                };
                logEvent.data = {
                    "buyTRXVolume": swapVolumes.buyTRXVolume,
                    "sellTRXVolume": swapVolumes.sellTRXVolume,
                    "totalTRXVolume": swapVolumes.totalTRXVolume
                };

                return logEvent;
            },

            /**
             * Convert an event object into a log object.
             * @param {*} event An event.
             */
            eventToLog: function (event) {
                let log;
                if (event) {
                    let logLine = $("<div />").addClass("event-terminal-log");
                    let commandLine = this.buildLogBody(logLine, event);
                    log = {
                        "timestamp": event.timestamp,
                        "commandLine": commandLine,
                        "logLine": logLine
                    }
                }

                return log;
            },

            getTransactionHrefBase: function (blockchain) {
                let hrefBase;
                switch (blockchain) {
                    case BLOCKCHAIN_TRON:
                        hrefBase = "https://tronscan.org/#/transaction/";
                        break;
                    case BLOCKCHAIN_ETHEREUM:
                        hrefBase = "https://etherscan.io/tx/";
                        break;
                }

                return hrefBase;
            },

            getContractHrefBase: function (blockchain) {
                let hrefBase;
                switch (blockchain) {
                    case BLOCKCHAIN_TRON:
                        hrefBase = "https://tronscan.org/#/contract/";
                        break;
                    case BLOCKCHAIN_ETHEREUM:
                        hrefBase = "https://etherscan.io/address/";
                        break;
                }

                return hrefBase;
            },

            /**
             * Build the body of a log object (log line and command line). 
             * @param {*} logLine Parent div log container.
             * @param {*} event An event.
             */
            buildLogBody: function (logLine, event) {
                const contractConfig = this.options.contractsConfig[event.contract];
                const eventConfig = contractConfig.events[event.name];

                // Link to the transaction on tronscan
                if (event.transaction) {
                    let link = $("<a />", {
                        target: "_blank",
                        href: this.getTransactionHrefBase(event.blockchain) + event.transaction
                    });
                    link.append($("<span />").html("[" + this.identifierReducer(event.transaction, 6) + "]"));
                    logLine.append($(link).addClass("event-terminal-tronscan-link"));
                } else {
                    let link = $("<a />", {
                        target: "_blank",
                        href: this.getContractHrefBase(event.blockchain) + event.contract
                    });
                    link.append($("<span />").html("[" + this.identifierReducer(event.contract, 6) + "]"));
                    logLine.append($(link).addClass("event-terminal-tronscan-link"));
                }
                logLine.append(" ");


                // Contract name
                let contractName = contractConfig.name;
                logLine.append($("<span />").addClass("event-terminal-log-contract-name").html(contractName));
                let commandLine = contractName + " | ";

                // Action
                let action = eventConfig.action.name;
                logLine.append($("<span />")
                    .addClass("event-terminal-log-action")
                    .addClass(eventConfig.action.class)
                    .html(" " + action + " "));
                commandLine += action;
                logLine.append($("<span />").addClass("event-terminal-log-message").html(" : "));

                // Message fragments
                for (fragment of eventConfig.messageFragments) {
                    switch (fragment.type) {
                        case "address":
                            // Convert hex format address to Base58 format
                            let address = this.identifierReducer(this.tronWebClient.address.fromHex(event.data[fragment.content]), 5);
                            if (!fragment.noEndingSpace) {
                                address += " ";
                            }
                            logLine.append($("<span />").addClass("event-terminal-log-wallet-addr").html(address));
                            commandLine += " | " + address;
                            break;
                        case "string":
                            let message = fragment.content;
                            if (!fragment.noEndingSpace) {
                                message += " ";
                            }
                            logLine.append($("<span />").addClass("event-terminal-log-message").addClass(fragment.class).html(message));
                            break;
                        case "value":
                            let value = event.data[fragment.content];
                            if (!fragment.noEndingSpace) {
                                value += " ";
                            }
                            logLine.append($("<span />").addClass("event-terminal-log-value").addClass(fragment.class).html(value));
                            break;
                        case "tokenAmount":
                            let tokenAmount = this.formatTokenAmount(event.data[fragment.content], fragment.token, event.blockchain);
                            if (!fragment.noEndingSpace) {
                                tokenAmount += " ";
                            }
                            logLine.append($("<span />")
                                .addClass("event-terminal-log-token-amount")
                                .addClass(fragment.class)
                                .html(tokenAmount));
                            commandLine += " | " + tokenAmount;
                            break;
                    }
                }

                // Ending dot
                logLine.append($("<span />").addClass("event-terminal-log-message").html(". "));

                // Date
                let date = moment(Number(event.timestamp)).fromNow();
                logLine.append($("<span />").addClass("event-terminal-log-date").html("(" + date + ") "));
                logLine.append($("<span />").addClass("event-terminal-log-timestamp").html(event.timestamp));

                return commandLine;
            },

            /**
             * Format a token amount in a human readable string.
             * @param {number} amount 
             * @param {string} token
             * @param {string} blockchain 
             */
            formatTokenAmount: function (amount, token, blockchain) {
                if (token.toUpperCase() === "SUN") {
                    return numeral(amount).format("0,0") + " " + token;
                } else if (blockchain === BLOCKCHAIN_ETHEREUM) {
                    return numeral(amount).divide(10e17).format("0,0.00") + " " + token;
                } else {
                    return numeral(amount).divide(10e5).format("0,0.00") + " " + token;
                }
            },

            /**
             * Reduce an identifier from start and end for display purpose.
             * @param {*} identifier identifier to reduce. 
             * @param {*} size Character number to show before and after the "..." part.
             */
            identifierReducer: function (identifier, size) {
                return identifier.substr(0, size) + "..." + identifier.substr(identifier.length - size, identifier.length);
            }
        }),

        /**
         * jQuery plugin options management.
         * @param {*} options Options to manage.
         */
        $.fn[pluginName] = function (options) {
            return this.each(function () {
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(this, "plugin_" +
                        pluginName, new Plugin(this, options));
                }
            });
        };

})(jQuery, window, document);
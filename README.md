# Bankroll Logs

Bankroll logs is a jquery plugin that display bankroll network smart contract events in a terminal style way.

![](assets/bankroll_logs_demo.gif)

[Try the live demo !](https://fcojean.github.io/tron-bankroll-logs)

## How to use it

### 1. Include plugin and dependencies JavaScript files 

#### Load the dependencies libraries in this minimal version or above :

| Library   | Minimal version |
| --------- | --------------- |
| jQuery    | 3.3.1           |
| lodash    | 4.17.15         |
| moment    | 2.24.0          |
| numeral   | 2.0.6           |
| particles | 2.0.0           |
| tronweb   | 2.10.1          |

```
<script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js"
            integrity="sha256-VeNaFBVDhoX3H+gJ37DpT/nTuZTdjYro9yBruHjVmoQ=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tronweb@2.10.1/dist/TronWeb.js" integrity="sha256-yTGcZoX5gMrnHm+NWm4l0Zh3pIr0Nlth+EOXNnmEVFI=" crossorigin="anonymous"></script>
```
> If you don't want to use the particle effect, you can remove the `particles.min.js` dependency and set the `particles` plugin option to `false`.

#### Load the plugin

```
<script src="js/jquery.bankroll-logs.js"></script>
```

### 2. Include CSS file

```
<link rel="stylesheet" href="./css/jquery.bankroll-logs.css">
```

### 3. Call the plugin in your JS code

Create a div and apply the jquery plugin on it.

```
<div id="logs-with-particles"></div>
<script>$("#logs-with-particles").bankroll_logs();</script>
```

### 4. Style the container div element

Give an height property to the container div element.

```
<style>
    /* Target the div where the plugin is applied  */
    #logs-with-particles {
        height: 300px;
    }
</style>
```

## Plugin options

| Option                          | Type    | Default value   | Description |
| ------------------------------- | ------- | --------------- | ----------- |
| balanceReportLimit              | Number  | 10              | Displayed contract event number before reporting contract balances. |
| logContractBalanceEventName              | String  | logContractBalance | virtual log contract balance event name use to log contract balance |
| swapVolumeReportLimit              | Number  | 10              | Displayed contract event number before reporting BNKR swapped volume |
| swapContractAddress              | String  | TRXYvAoYvCqmvZWpFCTLc4rdQ7KxbLsUSj              | Swap contract address |
| swapBuyEventName              | String  | onTokenPurchase              | Swap Buy event name |
| swapSellEventName              | String  | onTrxPurchase              | Swap Sell event name |
| logSwapVolumeEventName              | String  | logSwapVolume              | Swap log swap volume virtual event name use to log swap volume |
| particles                       | Boolean | true            | Enable the particle effect in terminal background. |
| firstRenderFetchEventNumber     | Number  | 3               | Event number to fetch from blockchain for the first render. |
| custodyWalletAddressInHexFormat | String  | 0x976b2df04558bc6b3997b143c02c13614dc5f5a4 | Bankroll custody wallet address. |
| contractsConfig                 | Object  | See in source code, look for CONTRACTS_CONFIG constant | Allow to provide a custom contracts configuration object. |
| maxTerminalLogNumber       | Number  | 100             | Maximum log number displayed in the terminal |
| dailyPlusContractAddress       | String  | THVYLtjFbXNcXwDvZcwCGivS95Wtd4juFn             | Daily+ contract address |
| bnkrTokenContractAddress       | String  | TNo59Khpq46FGf4sD7XSWYFNfYfbc8CqNK             | BNKR token contract address |
| saveContractAddress       | String  | THjY7rDKfjMiyCFMoCMCXdQAtRakD21RZQ             | Save contract address |
| onDistributionBNKRDepotEventName       | String  | onDistributionBNKRDepot             | onDistributionBNKRDepot virtual event name |


### Example :

```
<script>$("#logs-with-particles").bankroll_logs({balanceReportLimit:5, particles:false});</script>
```

## Contracts information

### Boost contract information

* TronScan page : https://tronscan.org/#/contract/TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq/code

#### Contract Events

| Event name           | Action                | Hidden |
| -------------------- | --------------------- | ------ |
| onLeaderBoard        |                       | Yes    |
| onTokenPurchase      | Buy                   |        |
| onTokenSell          | Sell                  |        |
| onReinvestment       | Roll                  | Yes    |
| onWithdraw           | Withdraw              |        |
| onBalance            | Contract balance      | Yes    |
| onDonation           | Donate                |        |
| OwnershipTransferred | Transfer ownership    | Yes    |

#### Specific virtual events

| Event name         | Action                                        |
| ------------------ | --------------------------------------------- |
| logContractBalance | Log contract balance                          |

### Credits contract information

* TronScan page : https://tronscan.org/#/contract/TUTik4srgKuzgXoL4KfV75foQbYuP8SirY/code

#### Contract Events

| Event name           | Action                | Hidden |
| -------------------- | --------------------- | ------ |
| onTokenPurchase      | Buy                   |        |
| onTokenSell          | Sell                  |        |
| onReinvestment       | Roll                  | Yes    |
| onWithdraw           | Withdraw              |        |
| onTransfer           | Transfer              |        |
| onDonation           | Donate                |        |
| OwnershipTransferred | Transferred ownership | Yes    |

#### Specific virtual events

| Event name         | Action                                        |
| ------------------ | --------------------------------------------- |
| logContractBalance | Log contract balance                          |

### Daily+ contract information

* TronScan page : https://tronscan.org/#/contract/THVYLtjFbXNcXwDvZcwCGivS95Wtd4juFn/code

#### Contract Events

| Event name           | Action                            | Hidden |
| -------------------- | --------------------------------- | ------ |
| onLeaderBoard        |                                   |  Yes   |
| onTokenPurchase      | Buy                               |        |
| onTokenSell          | Sell                              |        |
| onReinvestment       | Roll                              | Yes    |
| onWithdraw           | Withdraw                          |        |
| onTransfer           | Transfer                          |        |
| onBalance            | Contract balance                  | Yes    |
| onDonation           | Donate                            |        |
| onDistribution       | Distribute payout (Profit, depot) |        |
| OwnershipTransferred | Transferred ownership             | Yes    |

#### Specific virtual events

| Event name         | Action                                        |
| ------------------ | --------------------------------------------- |
| logContractBalance | Log contract balance                          |

### Air contract information

* TronScan page : https://tronscan.org/#/contract/TBbdx9G136y5Bf3cPipYQPkq4iukNEvZMn/code

#### Contract Events

| Event name           | Action                | Hidden |
| -------------------- | --------------------- | ------ |
| onPlayerSummary      | Free Roll             |        | 
| onRoundSummary       | Win                   |        |
| OwnershipTransferred | Transferred ownership | Yes    |

#### Specific virtual events

| Event name         | Action                                        |
| ------------------ | --------------------------------------------- |
| logContractBalance | Log contract balance                          |

### BNKR token contract information

* TronScan page : https://tronscan.org/#/contract/TNo59Khpq46FGf4sD7XSWYFNfYfbc8CqNK/code

#### Contract Events

| Event name           | Action                | Hidden                                      |
| -------------------- | --------------------- | ------------------------------------------- |
| Mint                 | Token are mined       | Yes if BNKR mined amount is under 0.01 BNKR or if from custody address. |
| MintFinished         |                       | Yes                                         |
| OwnershipTransferred | Transferred ownership | Yes                                         |
| Approval             | Approve staking       | Yes                                         |
| Transfer             | Stake token           | Yes if it come from the ZERO address        |

**Note :** for `Transfer` event :

> When tokens come from the ZERO address (0x0000000000000000000000000000000000000000 or T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb) they are mined.

> When tokens are sent to the stake address (TXwYAQ9y9r8u4E2o6KrdeELMr5x6NFekge) they are staked.

#### Specific virtual events

| Event name         | Action                                        |
| ------------------ | --------------------------------------------- |
| logContractBalance | Log contract balance                          |

### Save contract information

* TronScan page : https://tronscan.org/#/contract/THjY7rDKfjMiyCFMoCMCXdQAtRakD21RZQ/code

#### Contract Events

| Event name                | Action                       | Hidden |
| ------------------------- | ---------------------------- | ------ |
| onFreeze                  | Deposit                      |        |
| onUnfreeze                | Withdraw                     |        |
| onClaim                   | Claim                        | Yes if from custody address.       |
| onBalance                 | Customer balance             | Yes    |
| onContractBalance         | Contract balance             | Yes    |
| WhitelistedAddressAdded   | Add a whitelisted address    | Yes    |
| WhitelistedAddressRemoved | Remove a whitelisted address | Yes    |
| OwnershipTransferred      | Transferred ownership        | Yes    |

#### Specific virtual events

| Event name         | Action                                        |
| ------------------ | --------------------------------------------- |
| logContractBalance | Log contract balance                          |

### Swap contract information

* TronScan page : https://tronscan.org/#/contract/TRXYvAoYvCqmvZWpFCTLc4rdQ7KxbLsUSj/code

#### Contract Events

| Event name        | Action                    | Hidden |
| ----------------- | ------------------------- | ------ |
| onTokenPurchase   | Buy                       |        |
| onTrxPurchase     | Sell                      |        |
| onAddLiquidity    | Add liquidity             |        |
| onRemoveLiquidity | Remove liquidity          |        |
| onLiquidity       | Liquidity                 | Yes    |
| onContractBalance | Contract balance          | Yes    |
| onPrice           | Price info                |        |
| onSummary         | Summary event             | Yes    |
| Transfer          | Transfer fund             | Yes    |
| Approval          | Enable player on contract | Yes    |

#### Specific virtual events

| Event name         | Action                                        |
| ------------------ | --------------------------------------------- |
| logContractBalance | Log contract balance                          |
| logSwapVolume      | Allow to display last 24H BNKR swapped volume |

### Stack contract information

* TronScan page : https://tronscan.org/#/contract/TNbpnzNg2quViNYDDBUgvBuYofzkJvy3Aw/code

#### Contract Events

| Event name      | Action           | Hidden |
| --------------- | ---------------- | ------ |
| onLeaderBoard   |                  | Yes    |
| onTokenPurchase | Buy              |        |
| onTokenSell     | Sell             |        |
| onReinvestment  | Roll             | Yes    |
| onWithdraw      | Withdraw         |        |
| onClaim         |                  | Yes    |
| onTransfer      | Transfer fund    | Yes    |
| onBuyBack       |                  | Yes    |
| onBalance       | Contract balance | Yes    |
| onDonation      |                  | Yes    |


#### Specific virtual events

| Event name         | Action                                        |
| ------------------ | --------------------------------------------- |
| logContractBalance | Log contract balance                          |

/**
 * Bankroll-logs :
 * A jquery plugin that display bankroll network smart contract events
 * in a terminal style way.
 */
; /* the semi-colon before function invocation is a safety net against concatenated scripts and/or other plugins which may not be closed properly. */
(function ($, window, document, undefined) {
    /* Default plugin options value */
    const defaultOptions = {
        balanceReportLimit: 10,
        particles: true
    };
    /* Plugin name */
    const pluginName = "bankroll_logs";
    /* Value that determine the speed of the typing effect in the command line section. */
    const COMMAND_LINE_TYPE_SPEED = 100;
    /* Delay (in milliseconds) between to events data fetching cycle. */
    const LOAD_EVENTS_LOOP_INTERVAL = 3000;
    /* Delay (in miliseconds) between to display rendering cycle. */
    const DISPLAY_LOOP_INTERVAL = 500;
    /* Command line text when waiting for transactions */
    const COMMAND_LINE_SCANNING_TRANSACTION = "Scanning transactions ... ";
    /* Command line invite text */
    const COMMAND_LINE_INVITE = "bankroll.network $> ";
    /* Command line cursor symbol */
    const COMMAND_LINE_CURSOR = "&#9608;";
    /* Number of log that will be displayed without effect after first event loading. */
    const DISPLAY_WITHOUT_EFFECT_MAX_ENTRY = 10;
    /* Contracts configuration */
    const CONTRACTS_CONFIG = {
        "TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq": {
            "name": "Boost",
            "fetchUrl": "https://api.tronex.io/events/TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq",
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
                }
            }
        },
        "TUTik4srgKuzgXoL4KfV75foQbYuP8SirY": {
            "name": "Credits",
            "fetchUrl": "https://api.tronex.io/events/TUTik4srgKuzgXoL4KfV75foQbYuP8SirY",
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
                }
            }
        },
        "THVYLtjFbXNcXwDvZcwCGivS95Wtd4juFn": {
            "name": "Daily+",
            "fetchUrl": "https://api.tronex.io/events/THVYLtjFbXNcXwDvZcwCGivS95Wtd4juFn",
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
                }
            }
        },
        "TBbdx9G136y5Bf3cPipYQPkq4iukNEvZMn": {
            "name": "Air",
            "fetchUrl": "https://api.tronex.io/events/TBbdx9G136y5Bf3cPipYQPkq4iukNEvZMn",
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
                }
            }
        }
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
                /* Init contract last fetch timestamp object */
                this.contractsLastFetchTimestamp = {}
                /* Init no display effect counter */
                this.noDisplayEffectEntryNumber = 0;
                /* Fetch initial data */
                this.loadEventsFirstRender();
                /* Build terminal HTML structure */
                this.buildTerminalHtml(this.element);
                /* Load particle background or not */
                if (this.options.particles) {
                    this.loadParticleJS();
                }
                /* Start display loop */
                this.displayEventsLoop();
                /* Start event monitoring loop */
                this.loadEventsLoop();
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
                self.eventHistoryStack = [];
                for (let [contractAddress, contractConfig] of Object.entries(CONTRACTS_CONFIG)) {
                    (async function (contractAddress, contractConfig) {
                        await self.fetchContractEvents(contractAddress, contractConfig);
                    })(contractAddress, contractConfig);
                }
            },

            /**
             * Data fetching loop
             */
            loadEventsLoop: function () {
                const self = this;
                for (let [contractAddress, contractConfig] of Object.entries(CONTRACTS_CONFIG)) {
                    (function (contractAddress, contractConfig) {
                        setInterval(function () {
                            self.fetchContractEvents(contractAddress, contractConfig);
                        }, LOAD_EVENTS_LOOP_INTERVAL);
                    })(contractAddress, contractConfig);
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
             * Fetch events from contracts
             * @param {*} contractAddress Contract address.
             * @param {*} contractConfig Contract configuration object.
             */
            fetchContractEvents: async function (contractAddress, contractConfig) {
                const self = this;
                let contractFetchUrl = contractConfig.fetchUrl + "?sort=-timeStamp";
                if (this.contractsLastFetchTimestamp[contractAddress]) {
                    /* Fetch since last timestamp */
                    contractFetchUrl += "&since=" + this.contractsLastFetchTimestamp[contractAddress];
                } else {
                    /* On first fetch, limit to 4 events */
                    contractFetchUrl += "&limit=4"
                }
                $.get(contractFetchUrl)
                    .done(function (events) {
                        for (let event of events) {
                            /* Avoid to handle twice the same event. */
                            if (!self.doesEventAllreadyInEventHistoryStack(event)) {
                                self.eventHistoryStack.push(event);
                                if (!self.mustSplitEvent(event)) {
                                    self.addEventToDisplayQueue(event);
                                } else {
                                    self.splitEvent(event, contractConfig);
                                }
                                /* Save last timestamp */
                                if (!self.contractsLastFetchTimestamp[contractAddress] ||
                                    self.contractsLastFetchTimestamp[contractAddress] < event.timeStamp) {
                                    self.contractsLastFetchTimestamp[contractAddress] = event.timeStamp;
                                }
                            }
                        }
                    })
                    .fail(function (error) {
                        console.log("error:", error);
                    });
            },
            
            /**
             * Add an event to the display rendering queue.
             * @param {*} event Event to add.
             */
            addEventToDisplayQueue: function (event) {
                /* Mute events that we don't want to display by contract configuration */
                if (!this.hideEvent(event)) {
                    /* Mute event on specific business rules */
                    if (!this.hideEventOnBusinessRules(event)) {
                        let log = this.eventToLog(event);
                        if (log) {
                            this.logDisplayQueue.push(log);
                        }
                    }
                }
            },

            /**
             * Return true if the event must be split into multiple virtual events.
             * See splitEventList contract configuration
             * @param {*} event Event that we want to know if it must be split or not.
             */
            mustSplitEvent: function (event) {
                return CONTRACTS_CONFIG[event.contractAddress].events[event.eventName].splitEventList;
            },

            /**
             * Split an event into multiple virtual ones.
             * See splitEventList contract configuration.
             * @param {*} event Event to split
             * @param {*} contractConfig Contract configuration with the splitEventList array.
             */
            splitEvent: function (event, contractConfig) {
                for (splitEventName of contractConfig.events[event.eventName].splitEventList) {
                    let eventClone = _.clone(event, true);
                    eventClone.eventName = splitEventName;
                    this.addEventToDisplayQueue(eventClone);
                }
            },

            /**
             * Return true if an events has a "hide" attribute equal to true in contract
             * configuration. This event will be hidden.
             *  
             * @param {*} event An event.
             */
            hideEvent: function (event) {
                return CONTRACTS_CONFIG[event.contractAddress].events[event.eventName].hide;
            },

            /**
             * Apply specific business rules on event.
             * @param {*} event An event.
             */
            hideEventOnBusinessRules: function (event) {
                let result = false;

                switch (event.eventName) {
                    case "onDistributionBNKRDepot":
                        if (event[1] < 10e5) { // 1 TRX in SUN
                            result = true;
                        }
                        break;
                }

                return result;
            },

            /**
             * Check if the event has already been process.
             * @param {*} event An event.
             */
            doesEventAllreadyInEventHistoryStack: function (event) {
                let index = _.findIndex(this.eventHistoryStack, {
                    transactionId: event.transactionId,
                    eventName: event.eventName,
                    contractAddress: event.contractAddress
                });
                let result = true;
                // -1 :  index not found in stack.
                if (index == -1) {
                    result = false;
                }

                return result;
            },

            /**
             * Display rendering pipeline.
             * Check if it is time to render a log. If yes, start the log rendering
             * with or with the command line effect. 
             */
            displayEvents: function () {
                if (!this.isDisplayInProgress) {
                    this.logDisplayQueue = _.sortBy(this.logDisplayQueue, "timestamp");
                    let log = this.logDisplayQueue.shift();
                    if (log) {
                        this.isDisplayInProgress = true;
                        if (this.noDisplayEffectEntryNumber <= DISPLAY_WITHOUT_EFFECT_MAX_ENTRY) {
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
                $("#" + this.element.id + " .event-terminal-logs").prepend(log.logLine);
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
                    $("#" + this.element.id + " .event-terminal-logs").prepend(logLine);
                    $("#" + this.element.id + " .event-terminal-command-line-write").text(COMMAND_LINE_SCANNING_TRANSACTION);
                    this.isDisplayInProgress = false;
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
             * Convert an event object into a log object.
             * @param {*} event An event.
             */
            eventToLog: function (event) {
                let log;
                if (event) {
                    let logLine = $("<div />").addClass("event-terminal-log");
                    let commandLine = this.buildLogBody(logLine, event);
                    log = {
                        "timestamp": event.timeStamp,
                        "commandLine": commandLine,
                        "logLine": logLine
                    }
                }

                return log;
            },

            /**
             * Build the body of a log object (log line and command line). 
             * @param {*} logLine Parent div log container.
             * @param {*} event An event.
             */
            buildLogBody: function (logLine, event) {
                const contractConfig = CONTRACTS_CONFIG[event.contractAddress];
                const eventConfig = contractConfig.events[event.eventName];

                // Link to the transaction on tronscan
                let link = $("<a />", {
                    target: "_blank",
                    href: "https://tronscan.org/#/transaction/" + event.transactionId
                });
                link.append($("<span />").html("[" + this.shortWalletAddr(event.transactionId, 6) + "]"));
                logLine.append($(link).addClass("event-terminal-tronscan-link"));
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
                            let address = this.shortWalletAddr(event[fragment.content], 5);
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
                            logLine.append($("<span />").addClass("event-terminal-log-message").html(message));
                            break;
                        case "value":
                            let value = event[fragment.content];
                            if (!fragment.noEndingSpace) {
                                value += " ";
                            }
                            logLine.append($("<span />").addClass("event-terminal-log-value").addClass(fragment.class).html(value));
                            break;
                        case "tokenAmount":
                            let tokenAmount = this.sunToToken(event[fragment.content], fragment.token);
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
                let date = moment(event.timeStamp).fromNow();
                logLine.append($("<span />").addClass("event-terminal-log-date").html("(" + date + ") "));
                logLine.append($("<span />").addClass("event-terminal-log-timestamp").html(event.timeStamp));

                return commandLine;
            },

            /**
             * Convert SUN to TOKEN value.
             * @param {*} sunAmount 
             * @param {*} token 
             */
            sunToToken: function (sunAmount, token) {
                if (token.toUpperCase() === "SUN") {
                    return numeral(sunAmount).format("0,0") + " " + token;
                } else {
                    return numeral(sunAmount).divide(10e5).format("0,0.00") + " " + token;
                }
            },

            /**
             * Format a wallet address.
             * @param {*} walletAddress string to format. 
             * @param {*} size Character number to show before and after the "dot dot dot".
             */
            shortWalletAddr: function (walletAddress, size) {
                return walletAddress.substr(0, size) + "..." + walletAddress.substr(walletAddress.length - size, walletAddress.length);
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
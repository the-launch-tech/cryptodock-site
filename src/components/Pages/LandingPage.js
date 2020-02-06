import React from 'react'

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="py-10">
        <h1 className="text-center font-display text-red-2 cursor-default">CryptoDock</h1>
        <h4 className="text-center font-head mb-10 text-gray-3 cursor-default font-thin">
          A cryptocurrency research and trading platform for developers
        </h4>
        <div className="flex flex-wrap justify-center items-start w-full">
          <div className="w-1/3 h-full px-5 my-10 ">
            <div
              className="h-full w-full border-1 border-solid border-gray-1 rounded-lg p-5 flex flex-col justify-start items-center shadow-md"
              style={{ minHeight: 330 }}
            >
              <h4 className="font-head text-center font-thin text-gray-3 cursor-default">
                CryptoDock iOS App
              </h4>
              <i className="fab fa-apple my-5 text-5xl text-green-1"></i>
              <p className="font-body text-sm text-gray-3 font-hairline">
                IOS application for algorithmic trading across multiple Cryptocurrency exchanges.
                Write strategies leveraging the C.D. Python SDK locally and the remote C.D. API,
                bootstrap them to the local C.D., backtest them with the remote C.D. Backtesters and
                manage live trading in from the interface.
              </p>
            </div>
          </div>
          <div className="w-1/3 h-full px-5 my-10">
            <div
              className="h-full w-full border-1 border-solid border-gray-1 rounded-lg p-5 flex flex-col justify-start items-center shadow-md"
              style={{ minHeight: 330 }}
            >
              <h4 className="font-head text-center font-thin text-gray-3 cursor-default">
                CryptoDock Remote API
              </h4>
              <i className="fal fa-server my-5 text-5xl text-green-1"></i>
              <p className="font-body text-sm text-gray-3 font-hairline">
                Cross-exchange DataBuilder and remote API for CryptoDock. Aggregates from across
                cryptocurrency exchanges and normalizes the response objects and naming conventions.
                This includes Klines, Trades, Tickers, and Products across CoinbasePro and Kucoin.
                Binance and Kraken coming soon.
              </p>
            </div>
          </div>
          <div className="w-1/3 h-full px-5 my-10">
            <div
              className="h-full w-full border-1 border-solid border-gray-1 rounded-lg p-5 flex flex-col justify-start items-center shadow-md"
              style={{ minHeight: 330 }}
            >
              <h4 className="font-head text-center font-thin text-gray-3 cursor-default">
                CryptoDock SDK
              </h4>
              <i className="fab fa-python my-5 text-5xl text-green-1"></i>
              <p className="font-body text-sm text-gray-3 font-hairline">
                SDK for CryptoDock's remote API. Includes an semantic API interface, Strategy
                Wrapper and Backtest Wrapper. The SDK is meant to be leveraged with strategies
                bootstrapped from the CryptoDock desktop interface. Strategy trading and backtesting
                is managed through the desktop app interface.
              </p>
            </div>
          </div>
          <div className="w-1/3 h-full px-5 my-10">
            <div
              className="h-full w-full border-1 border-solid border-gray-1 rounded-lg p-5 flex flex-col justify-start items-center shadow-md"
              style={{ minHeight: 330 }}
            >
              <h4 className="font-head text-center font-thin text-gray-3 cursor-default">
                CryptoDock Strategy Framework
              </h4>
              <i className="fal fa-lightbulb-dollar my-5 text-5xl text-green-1"></i>
              <p className="font-body text-sm text-gray-3 font-hairline">
                Strategy Framework for CryptoDock. Event-driven Strategy wrapper and Backtester. The
                Strategy Framework is meant to be leveraged with strategies bootstrapped from the
                CryptoDock desktop interface. Strategy trading and backtesting is managed through
                the desktop app interface, the communication and heartbeat events are driven by a
                websocket connection with the NodeJS parent process.
              </p>
            </div>
          </div>
          <div className="w-1/3 h-full px-5 my-10">
            <div
              className="h-full w-full border-1 border-solid border-gray-1 rounded-lg p-5 flex flex-col justify-start items-center shadow-md"
              style={{ minHeight: 330 }}
            >
              <h4 className="font-head text-center font-thin text-gray-3 cursor-default">
                CryptoDock Research Suite
              </h4>
              <i className="fal fa-cubes my-5 text-5xl text-green-1"></i>
              <p className="font-body text-sm text-gray-3 font-hairline">
                Data Suite for CryptoDock. Use Pandas and other popular Python packages to analyze
                the results and meta data from the CryptoDock trading and backtesting sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

# Trading Dashboard - README

## Overview
This **Trading Dashboard** is a Python-based application that integrates **real-time sentiment analysis**, **account monitoring**, and **trading capabilities** using the **Alpaca API**. The system scrapes news from cryptocurrency and stock websites, analyzes sentiment using **TextBlob** and **FinBERT**, and places trades based on that analysis. It also provides account management features like equity, buying power, and trading restrictions.

## Key Features:

### 1. **Account Monitoring**:
- Fetches account details: account ID, equity, cash balance, buying power.
- Alerts on trading restrictions: Notifies if the account is blocked or flagged as a **Pattern Day Trader (PDT)**.
- Provides additional insights, such as whether **short-selling** is enabled.

### 2. **Trade Execution Panel**:
- Allows users to place **market**, **limit**, and **bracket orders** with **stop-loss** and **take-profit**.
- Executes trades using **Alpaca API** (MarketOrderRequest, LimitOrderRequest, StopLossRequest).

### 3. **Sentiment Analysis**:
- Real-time news scraping using **Selenium** to fetch cryptocurrency and stock market updates.
- **TextBlob** for basic sentiment polarity analysis and **FinBERT** for more accurate sentiment classification on financial news.

### 4. **Visualization**:
- **Chart.js** is used to display **trade history** over time, visualizing trade value and portfolio equity curves.

### 5. **Trade Updates**:
- **Alpaca Streaming API** listens for real-time trade updates (fills, cancels, rejections).
- Provides **feedback** on trade statuses.

## Installation & Setup

### Prerequisites:
1. **Install Python dependencies**:
   ```bash
   pip install selenium transformers textblob nltk newspaper3k
Install ChromeDriver: Ensure chromedriver is available in your system’s path.

Set Up Alpaca API Credentials: Replace 'your-api-key' and 'your-secret-key' with your Alpaca API credentials.

Running the Application:
Run the Backend (Flask/FastAPI):

bash
Copy code
python server.py
Run the Frontend (React):

bash
Copy code
npm start
Key Features:
Account Information & Monitoring:
Fetches account details such as buying power, cash, and equity.
Alerts if the account is restricted from trading or flagged as a Pattern Day Trader (PDT).
Real-Time Trade Execution:
Place trades through market, limit, and bracket orders.
Allows setting stop-loss and take-profit levels.
Sentiment Analysis Integration:
TextBlob for sentiment polarity analysis.
FinBERT for advanced sentiment classification on financial news.
Visualization & Data Tracking:
Uses Chart.js to visualize historical trade data over time.
Example Usage:
python
Copy code
# Example of placing a market order
submit_market_order(symbol="SPY", qty=1, side="buy")

# Example of placing a bracket order
submit_bracket_order(symbol="SPY", qty=5, side="buy", take_profit=400, stop_loss=300)

# Example of fetching account information
get_account_info()
Example Trade Update Stream:
Listen for real-time trade updates and handle trade events like fill, cancel, or reject.
python
Copy code
from alpaca.trading.stream import TradingStream

stream = TradingStream('your-api-key', 'your-secret-key', paper=True)

@stream.on_trade_update
async def handle_trade_update(data):
    print(f"Trade Update Received: {data.event}")
    if data.event == "fill":
        print(f"Order filled: {data.qty} shares of {data.symbol} at ${data.price}")
    elif data.event == "canceled":
        print(f"Order canceled: {data.order_id}")
    elif data.event == "rejected":
        print(f"Order rejected: {data.order_id}")
    else:
        print(f"Unhandled event: {data.event}")

stream.subscribe_trade_updates(handle_trade_update)
stream.run()
Conclusion:
This Trading Dashboard offers a modern interface with real-time sentiment analysis, trade execution, and account monitoring, making it ideal for automated trading based on current market conditions and sentiment.

markdown
Copy code

### Explanation:
- This **README** has been updated to suit a **Python-based** environment, incorporating details on installation, setup, and features of the **Trading Dashboard**.
- The **sentiment analysis**, **Alpaca trading**, and **real-time trade updates** have been outlined in the context of a Python backend.
- The key functionalities like **account information**, **trade execution**, and **visualization** are explained in an easy-to-understand manner.






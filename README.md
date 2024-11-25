Trading Dashboard - README
Overview
This Trading Dashboard is built with Node.js for the backend and React for the frontend. It integrates real-time sentiment analysis, account monitoring, and trading capabilities using Alpaca API. The system scrapes news from cryptocurrency and stock websites, analyzes sentiment using TextBlob and FinBERT, and places trades based on that analysis. It also provides account management features, including equity, buying power, and trading restrictions.

Key Features:
1. Account Monitoring:
Fetches account details: account ID, equity, cash balance, buying power, etc.
Alerts on trading restrictions: Notifies if the account is trading blocked or flagged as a Pattern Day Trader (PDT).
Shows additional insights: Like short-selling enabled.
2. Trade Execution Panel:
Allows users to place market orders with stop-loss and take-profit via a modal dialog.
Executes trades using Alpaca API (MarketOrderRequest, LimitOrderRequest, StopLossRequest, etc.).
3. Sentiment Analysis:
Real-time news scraping using Selenium to fetch cryptocurrency and stock market updates.
Analyzes sentiment using TextBlob for basic sentiment and FinBERT for financial-specific sentiment analysis.
4. Visualization:
Chart.js is used to display trade history over time in Line Chart format, showing trade value and equity curves.
5. Trade Updates:
Alpaca Streaming API listens for real-time trade updates (fills, cancels, or rejections).
Provides feedback on trade statuses.
Installation & Setup
Prerequisites:
Install Node.js and npm:

Ensure you have Node.js and npm installed.
Install Dependencies:

bash
Copy code
npm install express axios selenium-webdriver chart.js react-chartjs-2
Install ChromeDriver for Selenium:

Ensure chromedriver is available in your system’s path.
Set Up Alpaca API Credentials:

Replace 'your-api-key' and 'your-secret-key' with your Alpaca API credentials.
Running the Application:
Backend (Node.js):

bash
Copy code
node server.js
Frontend (React):

bash
Copy code
npm start
Features:
Account Information & Monitoring
Fetches account details such as buying power, cash, equity.
Alerts if the account is restricted from trading or flagged as a Pattern Day Trader (PDT).
Real-Time Trade Execution
Place trades through market, limit, and bracket orders.
Allows setting stop-loss and take-profit levels.
Sentiment Analysis Integration
TextBlob for sentiment polarity analysis.
FinBERT for advanced sentiment classification on financial news.
Visualization & Data Tracking
Uses Chart.js to visualize historical trade data.
Example:
javascript
Copy code
// Search for Symbol and Display Sentiment
handleSearch = () => {
  axios.get(`http://localhost:5000/api/search/${symbol}`)
    .then(response => {
      setSearchResult(response.data);
      setSentiment(response.data.sentiment);
    })
    .catch(error => console.error(error));
};

// Fetch Account Info
axios.get('http://localhost:5000/api/account')
  .then(response => setAccountInfo(response.data))
  .catch(error => console.error(error));
API Endpoints:
/api/account: Fetch account information.
/api/search/{symbol}: Search market data and perform sentiment analysis.
/api/submit_trade: Submit market, limit, and bracket orders.
Conclusion:
This Trading Dashboard offers a modern interface with real-time sentiment analysis, trade execution, and account monitoring, making it ideal for automated trading based on current market conditions and sentiment.

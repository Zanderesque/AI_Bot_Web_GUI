import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Button, Typography, Paper, Modal } from '@mui/material';
import { Line } from 'react-chartjs-2';

function App() {
    const [symbol, setSymbol] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [accountInfo, setAccountInfo] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [stopLoss, setStopLoss] = useState('');
    const [takeProfit, setTakeProfit] = useState('');
    const [sentiment, setSentiment] = useState(null);
    const [tradeData, setTradeData] = useState([]);

    useEffect(() => {
        // Fetch account information from backend
        axios.get('http://localhost:5000/api/account')
            .then(response => setAccountInfo(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSearch = () => {
        // Fetch market data and sentiment analysis for the symbol
        axios.get(`http://localhost:5000/api/search/${symbol}`)
            .then(response => {
                setSearchResult(response.data);
                setSentiment(response.data.sentiment);
            })
            .catch(error => console.error(error));
    };

    const handleTrade = () => {
        // Submit trade details with stop loss and take profit
        const orderDetails = {
            symbol,
            stopLoss,
            takeProfit
        };

        axios.post('http://localhost:5000/api/submit_trade', orderDetails)
            .then(response => {
                console.log('Trade executed:', response);
            })
            .catch(error => console.error(error));

        setOpenModal(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Trading Dashboard</Typography>

            {/* Search Bar */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Search Symbol"
                        variant="outlined"
                        fullWidth
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button variant="contained" fullWidth onClick={handleSearch}>Search</Button>
                </Grid>
            </Grid>

            {/* Account Information */}
            <Paper style={{ marginTop: '20px', padding: '20px' }}>
                <Typography variant="h6">Account Information:</Typography>
                <Typography>Account ID: {accountInfo.account_number}</Typography>
                <Typography>Equity: ${accountInfo.equity}</Typography>
                <Typography>Cash Balance: ${accountInfo.cash}</Typography>
                <Typography>Buying Power: ${accountInfo.buying_power}</Typography>
                <Typography>{accountInfo.trading_blocked ? 'Account is restricted from trading.' : 'Account is active for trading.'}</Typography>
            </Paper>

            {/* Sentiment and Search Results */}
            <Paper style={{ marginTop: '20px', padding: '20px' }}>
                <Typography variant="h6">Search Results:</Typography>
                {searchResult.length > 0 ? (
                    <div>
                        {searchResult.map(item => (
                            <div key={item.id}>
                                <Typography variant="body1">{item.name} ({item.symbol})</Typography>
                                <Typography variant="body2">Price: ${item.current_price}</Typography>
                            </div>
                        ))}
                        <Typography variant="body2">Sentiment: {sentiment ? sentiment : 'No sentiment data available'}</Typography>
                    </div>
                ) : (
                    <p>No results found</p>
                )}
            </Paper>

            {/* Trade Execution Modal */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Paper style={{ padding: '20px', marginTop: '100px', marginLeft: '20%', marginRight: '20%' }}>
                    <Typography variant="h6">Place a Trade</Typography>
                    <TextField
                        label="Stop Loss (%)"
                        variant="outlined"
                        fullWidth
                        value={stopLoss}
                        onChange={(e) => setStopLoss(e.target.value)}
                    />
                    <TextField
                        label="Take Profit (%)"
                        variant="outlined"
                        fullWidth
                        value={takeProfit}
                        onChange={(e) => setTakeProfit(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleTrade}>Submit Trade</Button>
                </Paper>
            </Modal>

            {/* Trade History Visualization */}
            <Typography variant="h6" style={{ marginTop: '20px' }}>Trade History</Typography>
            <Line
                data={{
                    labels: tradeData.map(data => data.time),
                    datasets: [{
                        label: 'Trade Value',
                        data: tradeData.map(data => data.value),
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                }}
                options={{ responsive: true }}
            />
        </Container>
    );
}

export default App;

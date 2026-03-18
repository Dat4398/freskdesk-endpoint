const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Port configuration
const PORT = process.env.PORT || 3000;

// Basic GET endpoint to test the server
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express API',
    status: 'Server is running'
  });
});

// POST endpoint to receive JSON data
app.post('/api/get-ticket', (req, res) => {
  try {
    // const { name, email, message } = req.body;

    // Log received data
    console.log('Received data:', req.body);

    // // Validate that required fields are present
    // if (!name || !email) {
    //   return res.status(400).json({
    //     error: 'Missing required fields: name and email'
    //   });
    // }

    // Process the data (you can replace this with your logic)
    res.status(201).json({
      success: true,
      message: 'Data received successfully',
      receivedData: req.body
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

// // POST endpoint for webhook (Freshdesk webhook example)
// app.post('/webhook/freshdesk', (req, res) => {
//   try {
//     const webhookData = req.body;
//     console.log('Webhook received from Freshdesk:', webhookData);

//     res.status(200).json({
//       success: true,
//       message: 'Webhook processed successfully'
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: 'Failed to process webhook',
//       details: error.message
//     });
//   }
// });

// // POST endpoint to receive any custom JSON
// app.post('/api/custom', (req, res) => {
//   try {
//     const receivedData = req.body;
//     console.log('Custom data received:', receivedData);

//     res.json({
//       success: true,
//       message: 'Custom data processed',
//       dataReceived: receivedData
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: 'Failed to process data',
//       details: error.message
//     });
//   }
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Something went wrong',
    message: err.message
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`  GET  http://localhost:${PORT}/`);
  console.log(`  POST http://localhost:${PORT}/api/data`);
  console.log(`  POST http://localhost:${PORT}/webhook/freshdesk`);
  console.log(`  POST http://localhost:${PORT}/api/custom`);
});

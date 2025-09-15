// app.js
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userToken = require("./routes/userTokenRoute")

const mpesaRoutes = require("./routes/mpesaRoutes");

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/token", userToken)

// M-Pesa payment route
app.use("/api/mpesa", mpesaRoutes);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Trying a different port...`);
        const altPort = Number(PORT) + 1;
        app.listen(altPort, () => {
            console.log(`Server is running on port ${altPort}`);
        });
    } else {
        throw err;
    }
});
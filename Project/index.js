const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 9000;

mongoose.connect("mongodb://localhost:27017/buuzByteYear")
    .then(() => { console.log("MongoDB connected successfully !!!") })
    .catch((err) => { console.log(`Error connecting with mongoDB: ${err}`) })

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
app.use(express.static(path.resolve('./assets')));
app.use(express.static(path.resolve('./scripts')));

const Users = require('./models/users');
const Reservation = require('./models/reservation'); 
const Contact = require('./models/contact');
const Cart = require('./models/cart');
const Order = require('./models/order');


app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/cart', async (req, res) => {
    const allItems = await Cart.find({});
    res.render('cart', {
        cart: allItems
    });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/menu', (req, res) => {
    res.render('menu');
});

app.get('/portal', (req, res) => {
    res.render('reservation_portal');
});

app.get('/reservation', (req, res) => {
    res.render('reservation');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    await Users.create({
        firstName,
        lastName,
        email,
        password
    });
    return res.redirect('/login');
})

app.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await Users.findOne({ email: email });
        if(!user){
            res.redirect('/signup');
        }
        const psswd = user.password;
        if(psswd == password){
            res.redirect('/');
        }
        else{
            res.redirect('/login');
        }
    }
    catch(err){
        res.redirect('/login');
    }
})

app.post('/reserve', async (req, res) => {
    const { tableNumber, capacity, date, time } = req.body;

    if (!tableNumber || !capacity || !date || !time) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newReservation = new Reservation({
            tableNumber,
            capacity,
            date,
            timeStamps: `${date} ${time}`
        });

        await newReservation.save();

        res.status(201).json({ message: "Reservation created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});


app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("All fields are required");
    }

    try {
        await Contact.create({ name, email, message });
        res.status(201).send("Thank you for your feedback!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try again later.");
    }
});

app.get('/contact/messages', async (req, res) => {
    try {
        const messages = await Contact.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try again later.");
    }
});

// Add item to the cart
app.post('/cart/add', async (req, res) => {
    try {
        const { item } = req.body;
    
        if (!item) {
          return res.status(400).json({ message: 'Item name is required.' });
        }
    
        const newCartItem = new Cart({ itemName: item });
    
        await newCartItem.save();
    
        res.status(201).json({ message: `${item} has been added to the cart.` });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Failed to add item to the cart.' });
      }
});

app.delete('/cart/remove/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedItem = await Cart.findByIdAndDelete(id);
  
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found.' });
      }
  
      res.status(200).json({ message: 'Item removed from cart.' });
    } catch (error) {
      console.error('Error removing item:', error);
      res.status(500).json({ message: 'Failed to remove item from cart.' });
    }
  });

// Clear all items in the cart
app.delete('/cart/clear', async (req, res) => {
    try {
        await Cart.deleteMany({});
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to clear cart' });
    }
});

// Place an order
app.post('/order', async (req, res) => {
    const { userId, name, address, contact } = req.body;

    if (!userId || !name || !address || !contact) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = new Order({
            userId,
            items: cart.items,
            name,
            address,
            contact,
        });

        await order.save();
        await Cart.deleteOne({ userId }); // Clear cart after order placement

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

app.listen(PORT, (err) => {
    if(err){
        console.log(`Error connecting with the server`);
    }
    else{
        console.log(`Server is listening on port -> ${PORT}`);
        console.log(`\n\nhttp://localhost:${PORT}\n\n`);
    }
})
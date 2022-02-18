const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request } = require("firebase-tools/lib/api");
const { response } = require("express");
const stripe = require("stripe")
('enterTheSecretKeyFrom stripe.com');
//Enter the secret key in the line above eg: const stripe = require("stripe")('AKDJFJ13716479364928');

//API


//App config
const app = express();

//Middleware
app.use(cors({ origin:true }));
app.use(express.json());


//API Routes
app.get('/',(request,response) => response.status(200).send("hello world"));

// app.get('/anshit',(request,response) => response.status(200).send('hello Anshit'))
//API end point: http://localhost:5001/challenge-681e2/us-central1/api  (got from running firbase emulators:start)

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('payment request recieved:',total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount : total,
        currency : "inr",
    });

    // OK - created
    response.status(201).send({
        clientSecret : paymentIntent.client_secret,
    })
})
//Listen command

exports.api = functions.https.onRequest(app)
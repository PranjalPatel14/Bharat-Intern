const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', async function main(req, res) { // Add 'req' and 'res' parameters
    const uri = "mongodb+srv://patelpranjal:ab1298775@cluster0.eroov6l.mongodb.net/?retryWrites=true&w=majority";

    // Creating an Instance of MongoDB
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await insertData(client, {
            Fname: req.body.Fname,
            Lname: req.body.Lname,
            BDate: req.body.BDate,
            Email: req.body.email,
            Password: req.body.pass
        });

        // Redirect to the homepage after successful insertion
        res.redirect("/");
    } catch (e) {
        console.error(e);
        // Handle errors more gracefully, you might want to send an error response to the client
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

async function insertData(client, Data) {
    const result = await client.db("Registration_Details").collection("User_details").insertOne(Data);

    console.log(result);
}

app.listen(3000, () => {
    console.log("Server is running on 3000.");
});

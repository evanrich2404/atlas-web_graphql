const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const { schema } = require('./schema/schema');

// Replace with your username, password, and database name
const username = 'evanrich2404';
const password = '6kjfg0BTvM8NoN3H'; // Remember to URL-encode if necessary
const dbName = 'Cluster0'; // The database you want to connect to in Atlas

const app = express();

// MongoDB Atlas connection string
const mongoDBAtlasConnection = `mongodb+srv://${username}:${password}@cluster0.7h91772.mongodb.net/${dbName}`;

mongoose.connect(mongoDBAtlasConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});

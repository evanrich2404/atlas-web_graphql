const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const { schema } = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

mongoose.connection.on('error', (err) => {
  console.log('Connection error:', err);
});

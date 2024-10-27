const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get("/api/quotes/random", (req, res, next) => {
  let randomQuote = getRandomElement(quotes);
  res.send({quote: randomQuote});
});

app.get("/api/quotes", (req, res, next) => {
  const person = req.query.person
  if (person) {
    const filteredQuotes = quotes.filter(quote => quote.person === person)
    res.send({ quotes: filteredQuotes })
  } else {
    res.send({ quotes })
  }
});

app.post("/api/quotes", (req, res, next) => {
  const quote = req.query.quote;
  const person = req.query.person;
  if (!quote || !person) {
    res.status(400).send();
  } else {
    const newQuote ={
      quote: req.query.quote,
      person: req.query.person
    };
    quotes.push(newQuote);
    res.send({ quote: newQuote })
  }
});

app.listen(PORT);


const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const request = require('request');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/productlist', (req, res) => {
  res.render('productlist');
});

router.get('/addproduct', (req, res) => {
  res.render('addproduct');
});

router.get('/mercadolibre', (req, res) => {
  res.render('mercadolibre');
});

module.exports = router;

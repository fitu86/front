const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const request = require('request');

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;

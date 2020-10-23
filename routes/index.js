var express = require('express');
const Article = require('./../models/article')
const Project = require('./../models/project')
var router = express.Router();

/* GET home page. */

router.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('portfolio/index', { articles: articles });
});

router.get('/about', function(req, res, next) {
  res.render('portfolio/about', { title: 'Express' });
});

router.get('/portfolio', async (req, res) => {
  const articles = await Project.find().sort({ createdAt: 'desc' })
  res.render('portfolio/portfolio', { articles: articles });
});

router.get('/contact', function(req, res, next) {
  res.render('portfolio/contact', { title: 'Express' });
});






module.exports = router;
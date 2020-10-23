const express = require('express')
const Article = require('./../models/article')
const articlerouter = express.Router()
var cloudinary = require('cloudinary').v2;
const multer = require('multer')
var upload = multer({ dest: 'public/articlebg/' })
articlerouter.get('/', async (req, res) => { 
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

articlerouter.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})


articlerouter.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
})





articlerouter.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})





articlerouter.post('/',upload.single("articlebg"), async (req, res, next) => {
  var arr
  let article = {}
 cloudinary.uploader.upload(req.file.path, async function(error, result) {
   console.log(result, error)
arr = result.url
console.log(req.file)
article.title = req.body.title
article.description = req.body.description
article.markdown = req.body.markdown
article.img = arr
console.log(arr)
try {
  await Article.create(article)
  console.log("HELLO")
   console.log(article)
   res.redirect(`/articles/${article.slug}`)
 } catch (e) {
   res.render(`articles/new`, { article: article })
 }
  });
})



articlerouter.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))


articlerouter.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/articles')
})




function saveArticleAndRedirect(path) {
  
  return async (req, res) => {
    console.log(req.file)
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    article.img = req.file.originalname
    try {
      article = await article.save()
      console.log(article)
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}



module.exports = articlerouter

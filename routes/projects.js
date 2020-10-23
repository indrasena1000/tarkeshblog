const express = require('express')
const Project = require('./../models/project')
const projectrouter = express.Router()



projectrouter.get('/', async (req, res) => { 
  const articles = await Project.find().sort({ createdAt: 'desc' })
  res.render('projects/portfolioprojectsindex', { articles: articles })
})

projectrouter.get('/new', (req, res) => {
  res.render('projects/newportfolioproject', { article: new Project() })
})


projectrouter.get('/edit/:id', async (req, res) => {
  const article = await Project.findById(req.params.id)
  res.render('projects/editportfolioproject', { article: article })
})



projectrouter.get('/:slug', async (req, res) => {
  const article = await Project.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('projects/showportfolioprojects', { article: article })
})


projectrouter.post('/', async (req, res, next) => {
  req.article = new Project()
  next()
}, saveArticleAndRedirect('new'))




projectrouter.put('/:id', async (req, res, next) => {
  req.article = await Project.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))


projectrouter.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id)
  res.redirect('/projects')
})





function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
  
    try {
      article = await article.save()
      res.redirect(`/projects/${article.slug}`)
    } catch (e) {
      res.render(`projects/${path}`, { article: article })
    }
  }
}



module.exports = projectrouter
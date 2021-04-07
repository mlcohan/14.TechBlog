const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        where: {
            userId: req.session.userId
        }
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('all-posts', { 
        posts,
        layout:'dashboard' 
      });
    } catch (err) {
      res.redirect('login')
    }
  });

router.get('/new', withAuth, async (req, res) => {
    res.render('new-post', {
        layout: 'dashboard'
    })
})

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
  if (postData){
    const post = postData.get({plain: true})
    res.render('edit-post', {
      post,
      layout:'dashboard'
    })
  }else {
    res.status(404).end()
  }
  
    } catch (err) {
      res.redirect('login')
    }
  });
  
  module.exports =  router
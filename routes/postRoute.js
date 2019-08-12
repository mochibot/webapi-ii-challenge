const router = require('express').Router();

const database = require('../data/db');

//get all posts
router.get('/', (req, res) => {
  database.find()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: "The posts information could not be retrieved" });
    })
})

//get specific by id
router.get('/:id', (req, res) => {
  let postId = req.params.id;
  database.findById(postId)
    .then(response => {
      if (response.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(response[0]);
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be retrieved" });
    })
})

//get comments for a specific post
router.get('/:id/comments', (req, res) => {
  let postId = req.params.id;
  database.findById(postId)
    .then(response => {
      if (response.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      } else {
        database.findPostComments(postId)
          .then(response => {
            res.status(200).json(response);
          })
          .catch(error => {
            res.status(500).json({ error: "The comments information could not be retrieved" });
          })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be retrieved" });
    })
})

//add a post
router.post('/', (req, res) => {
  let newPost = req.body; 
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({errorMessage: "Please provide title and contents for the post" });
  } else {
    database.insert(newPost)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
      })
  }
})

//add a comment to a post
router.post('/:id/comments', (req, res) => {
  let newComment = req.body;
  let postId = req.params.id;
  if (!newComment.text) {
    res.status(400).json({errorMessage: "Please provide text for the comment" });
  } else {
    database.findById(postId)
      .then(response => {
        if (response.length === 0) {
          res.status(404).json({ message: "The post with the specified ID does not exist" });
      } else {
        newComment = {
          ...newComment,
          post_id: Number(postId),
        }
        database.insertComment(newComment)
          .then(response => {
            res.status(201).json(response);
          })
          .catch(error => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" });
          })
      }
    })
  }
})

//delete a post
router.delete('/:id', (req, res) => {
  let postId = req.params.id;
  database.findById(postId)
    .then(response => {
      if (response.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      } else {
        let currPost = response[0];
        database.remove(postId)
          .then(response => {
            res.status(200).json(currPost);
          })
          .catch(error => {
            res.status(500).json({ error: "The post could not be removed" });
          })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be retrieved" });
    })
})

//edit a post
router.put('/:id', (req, res) => {
  let postId = req.params.id;
  let newPost = req.body;
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({errorMessage: "Please provide title and contents for the post" });
  } else {
    database.findById(postId)
      .then(response => {
        if (response.length === 0) {
          res.status(404).json({ message: "The post with the specified ID does not exist" });
        } else {
          let currPost = response[0];
          currPost = {
            ...currPost,
            title: newPost.title,
            contents: newPost.contents
          }
          database.update(postId, currPost)
            .then(response => {
              res.status(201).json(currPost);
            })
            .catch(error => {
              res.status(500).json({ error: "The post information could not be modified" });
            })
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved" });
      })
  }
})

module.exports = router;
module.exports = {
    getAllPosts: (req, res) => {
        const db = req.app.get('db');
        
        db.posts.get_all_posts().then(resp => {
            console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    getPost: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.posts.get_post([id]).then(resp => {
            res.status(200).send(resp[0])
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    addPost: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        const { img, title, content } = req.body;

        db.posts.add_post([id, img, title, content]).then(resp => {
            res.status(200).send(resp);
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    deletePost: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.posts.delete_post([id]).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    updatePost: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        const { post } = req.body;

        db.update_post([id, post]).then(resp => {
            res.status(200).send(resp);
        }).catch(err => {
            res.status(500).send(err);
        })
    }
}
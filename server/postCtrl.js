module.exports = {
    getAllPosts: (req, res) => {
        const db = req.app.get('db');
        
        db.posts.get_all_posts().then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    getPost: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.posts.get_post([id]).then(resp => {
            console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    searchPost: async (req, res) => {
        const db = req.app.get('db');
        let {search} = req.query;
        // console.log(111, search)
        search = `%${search}%`
        // console.log(222, search)
        let posts = await db.posts.search_posts({search});
        // console.log(posts)
        res.status(200).send(posts)
    },

    addPost: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        const { img, title, content } = req.body;
        // console.log(req.session)
        db.posts.add_post([id, img, title, content]).then(resp => {
            res.status(200).send(resp);
        }).catch(err => {
            console.log(err)
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
        const { img, title, content } = req.body;

        db.update_post([id, img, title, content]).then(resp => {
            res.status(200).send(resp);
        }).catch(err => {
            res.status(500).send(err);
        })
    },

    getUser: async (req,res) => {
        const db = req.app.get('db');
        let {id} = req.params;
        let posts = await db.posts.get_user({user_id:id}) 
        res.status(200).send(posts)
    },

    getNonUser: async (req,res) => {
        const db = req.app.get('db');
        console.log(req.query)
        let {search,id} = req.query;
        console.log(search,id)
        // let {id} = req.params;
        search = `%${search}%`
        // id = +id
        let posts = await db.posts.get_non_user({search,id}) 
        console.log(posts) 
        res.status(200).send(posts)
    }
}
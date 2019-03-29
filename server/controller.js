const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        console.log('hit')
        const { username, password } = req.body;
        const db = req.app.get('db');
        let taken = await db.auth.check_username({ username });
        taken = +taken[0].count;
        if(taken !== 0) {
            return res.sendStatus(409)
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let user = await db.auth.register({ username, password: hash });
        user = user[0]
        console.log({before: session})
        sessionStorage.user = user;
        res.status(200).send(session.user)
    }
}
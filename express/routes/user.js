const expressd = require('express');
const router = expressd.Router();
const userController = require('../controllers/user-controllers');

router.get('/', (req, res) => {
    const user = userController.getUser(req);
    res.json(user);
});
router.post('/', (req, res) => {
    const user = userController.createUser(req);
    res.json(user);
});

module.exports = router;

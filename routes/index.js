var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('FIND THE EXACT PLAYLIST FOR YOUR MOOD');
});

router.use('/usuarios', require('./usuarios'));
router.use('/playlists', require('./playlists'));
router.use('/newplaylists', require('./newplaylists'));


module.exports = router;

const controller = {};

controller.displayHomePage = (req, res) => {
    res.render('pages/index', { 
        title: 'Trang chủ',
        //user: req.user
      });
}

module.exports = controller;
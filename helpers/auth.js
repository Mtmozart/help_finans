module.exports.checkAuth = function (req, res, next) {
  const userId = req.session.userid

  if (!userId) {    
    req.flash('message', 'Sem autorização para acesso! Por favor, faça o login')
    res.redirect('/auth/login')
  }
  
   next()
}
 

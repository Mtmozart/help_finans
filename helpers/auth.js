module.exports.checkAuth = function (req, res, next) {
  const userId = req.session.userid

  if (!userId) {    
    req.flash('message', 'Sem autorização para acesso! Por favor, faça o login')
    res.redirect('/auth/login')
  }
   //sessionExpired() 
   next()
}
 
/*function sessionExpired() {
  setTimeout(() => {
    res.redirect('/auth/login')
    req.flash('message', 'Sessão expirada, faça novamente o login')
    res.render('auth/login')
  }, 3600000)
}*/
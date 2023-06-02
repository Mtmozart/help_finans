const User = require('../models/User')
const Prohibited = require('../models/Prohibited')
const Exit = require('../models/Exit')
const Balance = require('../models/Balance')
const { Op } = require('sequelize')

module.exports = class FinansController{

  static async showDashboard(req, res){
    

     //Trabalhando dashboard
     const id = req.session.userid 

     if(typeof id === 'number'){
      const user = await User.findOne({ 
        where: { id: id },
        attributes: { exclude: ['password', 'email', 'createdAt', 'updatedAt'] },
        plain: true,
        raw: true,
        });     
       res.render('finans/dashboard', {user})      
     }         
  } 

  static showProhibited(req, res){
    res.render('finans/prohibited')
  }

  static async registerValues(req, res){
    const {title, description, value, category, month }= req.body
    const userId = req.session.userid

    if(!title){
    req.flash('message', 'É obrigatório preencher o campo do título!')
    res.render('finans/prohibited')
    return
    }
    
    let checkValue = value.includes(",") ? parseFloat(value.replace(",", ".")) : parseFloat(value);
    
    if(!checkValue || typeof checkValue !== "number"){
      req.flash('message', 'É obrigatório preencher o campo do valor!')
      res.render('finans/prohibited')
      return
    }
    if(isNaN(checkValue)){      
      req.flash('message', 'Digite carcteres válidos')
      res.render('finans/prohibited')
      return
    } 

    if(!description){
    req.flash('message', 'É obrigatório preencher o campo da descrição!')
    res.render('finans/prohibited')
    return
      }
    if(!category){
    req.flash('message', 'É obrigatório preencher o campo da categoria!')
    res.render('finans/prohibited')
    return
      }
    if(!month){
    req.flash('message', 'É obrigatório preencher o campo do mês!')
    res.render('finans/prohibited')
    return
      }
     
    
   

    
  const prohibited = {
    title, 
    value: checkValue, 
    description, 
    category, 
    month,
    UserId: userId
  }
  try {
   const createdProhibited =  await Prohibited.create(prohibited)
   req.flash('message', 'Cadastro realizado com sucesso!')      
   res.redirect('prohibited')     
  } catch (error) {
    req.flash('message', 'Houve um erro ao cadastrar!')      
    res.redirect('prohibited') 
    console.log(error)
  }
    }
//Control of exits

static showExit(req, res){
  res.render('finans/exit')
}

static async registerValuesExit(req, res){
  const {title, description, value, category, month }= req.body
  const userId = req.session.userid

  if(!title){
  req.flash('message', 'É obrigatório preencher o campo do título!')
  res.render('finans/exit')
  return
  }
  let checkValue = value.includes(",") ? parseFloat(value.replace(",", ".")) : parseFloat(value);
    
  if(!checkValue || typeof checkValue !== "number"){
    req.flash('message', 'É obrigatório preencher o campo do valor!')
    res.render('finans/prohibited')
    return
  }
  if(isNaN(checkValue)){      
    req.flash('message', 'Digite carcteres válidos')
    res.render('finans/prohibited')
    return
  } 

  if(!description){
  req.flash('message', 'É obrigatório preencher o campo da descrição!')
  res.render('finans/exit')
  return
    }
  if(!category){
  req.flash('message', 'É obrigatório preencher o campo da categoria!')
  res.render('finans/exit')
  return
    }
  if(!month){
  req.flash('message', 'É obrigatório preencher o campo do mês!')
  res.render('finans/exit')
  return
    }

const exit = {
  title, 
  value: checkValue, 
  description, 
  category, 
  month,
  UserId: userId
}
try {
 const createdExit =  await Exit.create(exit)
 req.flash('message', 'Cadastro realizado com sucesso!')      
 res.redirect('exit')     
} catch (error) {
  req.flash('message', 'Houve um erro ao cadastrar!')      
  res.redirect('exit') 
  console.log(error)
}
}

static async showAllProhibited(req, res){
  const month_search = req.query
  const userId = req.session.userid

  const month = month_search['month_search'];
 
  if(!month){
    req.flash('message', 'É obrigatório preencher o campo do mês!')
    res.render('finans/prohibited')
    return
    }
  
     const prohibiteds = await Prohibited.findAll({
      where:{
      month: month,
      UserId: userId,
      }, 
                
     })


    let empty = false

    if(prohibiteds.length == 0) {
      empty = true
      req.flash('message', 'Não há dados sobre este mês!')
      res.render('finans/prohibited')
    }


   const prohibited = prohibiteds.map((result) => result.dataValues)
   res.render('finans/prohibited', { prohibited, empty})
  }

  static removeProhibited(req, res) {
    const id = req.body.id
    const userId = req.session.userid


    Prohibited.destroy({
       where: {
         id: id,
         UserId: userId,        
        } 
      })
      .then(() => {
        req.flash('message', 'Entrada removida com sucesso!')
        req.session.save(() => {
          res.redirect('/finans/prohibited')
        })
      })
      .catch((err) => {
        req.flash('message', 'Entrada removida com sucesso!')
        req.session.save(() => {
        res.redirect('/finans/prohibited')
        })
      })
  }

  //Exit

  static async showAllExit(req, res){
    const month_search = req.query
    const userId = req.session.userid  
    const month = month_search['month_search'];
   
    if(!month){
      req.flash('message', 'É obrigatório preencher o campo do mês!')
      res.render('finans/exit')
      return
      }
    
       const exits = await Exit.findAll({
        where:{
        month: month,
        UserId: userId,
        }, 
                    
       })
  
  
      let empty = false
  
      if(exits.length == 0) {
        empty = true
        req.flash('message', 'Não há dados sobre este mês!')
        res.render('finans/exit')
     }
     const exit = exits.map((result) => result.dataValues)
     res.render('finans/exit', { exit,  empty })
     }

    static removeExit(req, res) {
      const id = req.body.id
      const userId = req.session.userid  
  
      Exit.destroy({
         where: {
           id: id,
           UserId: userId,        
          } 
        })
        .then(() => {
          req.flash('message', 'Entrada removida com sucesso!')
          req.session.save(() => {
            res.redirect('/finans/exit')
          })
        })
        .catch((err) => {
          req.flash('message', 'Entrada removida com sucesso!')
          req.session.save(() => {
          res.redirect('/finans/exit')
          })
        })
    }

    //Balance -----------------------------------
    
  static async showBalances(req, res){
    const userId = req.session.userid;  
      
   const balances = await Balance.findAll({
     where:{
     UserId: userId,
     },                
    })   
      
    const balance = await balances.map((result) => result.dataValues)
    await res.render('finans/balances', { balance })
     
  }

 static async showBalancesPost(req, res){

  const userId = req.session.userid;       
  const count = await Balance.count({
  where: {
    UserId: userId
  }
});

  if(count === 0){
    // de criar
  let month = 0  
  let value = 0

  const balance = {
    UserId: userId,
    month,
    value,
  }
  
  for(let i = 0; i <= 11; i++){
   balance.month =  balance.month + 1
   const createdBalance =  await Balance.create(balance)
   if(balance.month == 11){
    req.flash('message', 'Criado a base do seu balaço anual!')      
    res.redirect('balances');    
   }    
  }  

  } /*Lógica do else*/  else {
    let month = 1  
    let value = 0
       
    
   for(let j = 0; i <=11; i++){
   const prohibiteds = await Prohibited.findAll({
      where:{
      month: month,
      UserId: userId,
      }, 
        row: true,     
     })
    } 
  }
 
  }
}




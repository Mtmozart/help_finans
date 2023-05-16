const User = require('../models/User')
const Prohibited = require('../models/Prohibited')
const Exit = require('../models/Exit')
const Balance = require('../models/Balance')
const { Op } = require('sequelize')

module.exports = class FinansController{

  static showDashboard(req, res){
    res.render('finans/dashboard')
  }

  static showProhibited(req, res){
    res.render('finans/prohibited')
  }

  static async registerValues(req, res){
    const {title, value, description, category, month }= req.body
    const userId = req.session.userid

    if(!title){
    req.flash('message', 'É obrigatório preencher o campo do título!')
    res.render('finans/prohibited')
    return
    }
    if(!value){
      req.flash('message', 'É obrigatório preencher o campo do valor!')
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
    value, 
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
  const {title, value, description, category, month }= req.body
  const userId = req.session.userid

  if(!title){
  req.flash('message', 'É obrigatório preencher o campo do título!')
  res.render('finans/exit')
  return
  }
  if(!value){
    req.flash('message', 'É obrigatório preencher o campo do valor!')
    res.render('finans/exit')
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
  value, 
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
        //plain: true,
         
     })


    let emptyProhibited = false

    if(prohibiteds.length < 0) {
      emptyProhibited = true
      req.flash('message', 'Não há dados sobre este mês!')
      res.render('finans/prohibited')
    }


   const prohibited = prohibiteds.map((result) => result.dataValues)
   res.render('finans/prohibited', { prohibited })
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
  
  
      let emptyProhibited = false
  
      if(exits.length < 0) {
        emptyProhibited = true
        req.flash('message', 'Não há dados sobre este mês!')
        res.render('finans/exit')
      }
  
     const exit = exits.map((result) => result.dataValues)
     res.render('finans/exit', { exit })
  
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
    
    if(balances.length > 0) {
       
      const balance = await balances.map((result) => result.dataValues)
      await res.render('finans/balances', { balance })
    }   

  }

  static async showBalancesPost(req, res){
   const userId = req.session.userid;    
  
  const balances = await Balance.findAll({
    where:{
    UserId: userId,
    },                
   })

  if(balances.length == 0) {
 
  const balance = {
    value,
    month: "",
    UserId: userId
  }
 
  for(let i = 0; i < 12; i++){
    balance.month = months[i]
    try {
     const createdBalance =  await Balance.create(balance)
     if(i == 11) {      
      setTimeout(() => {
        req.flash('message', 'Criado a base do seu balaço anual!')      
        res.redirect('balances');
      }, 3000);
    }
     } catch (error) {
      req.flash('message', 'Erro ao realizar')      
      res.render('balances')
      console.log(error)  
        }       
      } 
     } else {      
      const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];  
     
      let month = 0;
      let value = 0;
      let statusUpdate = 0
      for (var l = 0; l < 12; l++){
        let month = months[l]; 

          const prohibiteds = await Prohibited.findAll({
            where:{
            month,
            UserId: userId,
            },                
          }) 

         
          const prohibited = await prohibiteds.map((result) => result.dataValues);
          const p = prohibited.length
          let i = 0;
          let prohibitedsValue = 0;
          
          while (i < p){
          prohibitedsValue = prohibitedsValue + prohibited[i].value;
          i++
          }
          //exit
          const exits = await Exit.findAll({
            where:{
            month: month,
            UserId: userId,
            },           
           })
          const exit = exits.map((result) => result.dataValues);
          let e = await exit.length;

          let exitValue = 0;
          let j = 0
          while (j < e){    
          exitValue = exitValue + exit[j].value
          j++
            }

          const value = await prohibitedsValue - exitValue
          
          try {
            const balance = {
              value,
              month,
              UserId: userId
            }
          
            const updateBalance = await Balance.update(balance, 
              {
                where: {
                  month: month,
                  UserId: userId
                }
            })
            statusUpdate = 1
              } catch (error) {
               console.log(error) 
               statusUpdate = 0 
              }
        }
        if(statusUpdate === 1){
          req.flash('message', 'Dados atualizados!')   
          statusUpdate = 0    
          res.redirect('balances')           
         }else{
          req.flash('message', 'Erro cadastrar!')      
          res.redirect('balances')
         }
     }
  }

 
 
 }




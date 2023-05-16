const express = require("express");
const router =express.Router();
const FinansController = require('../controllers/FinansController')

const checkAuth = require("../helpers/auth").checkAuth;


router.get('/dashboard', checkAuth, FinansController.showDashboard);
//prohibited
router.get('/prohibited', checkAuth, FinansController.showProhibited);
router.get('/all_prohibited', checkAuth, FinansController.showAllProhibited);
router.post('/prohibited', checkAuth, FinansController.registerValues);
//exit

router.get('/exit', checkAuth, FinansController.showExit);
router.post('/exit', checkAuth, FinansController.registerValuesExit);
router.get('/all_exit', checkAuth, FinansController.showAllExit);
//balance
router.get('/balances', checkAuth, FinansController.showBalances);
router.post('/balance', checkAuth, FinansController.showBalancesPost);

//universal
router.post("/remove", checkAuth, FinansController.removeProhibited);



module.exports = router
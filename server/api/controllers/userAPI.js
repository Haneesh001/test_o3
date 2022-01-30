const express = require('express')
const router = express.Router()
const userApi = require('../models/userApi')
const passport = require('passport')



router.post('/createUserApi', (req, res, next) => {
  return userApi.createUser(req, res, next)
})

router.post('/updateUserApi', (req, res, next) => {
  return userApi.updateUserApi(req, res, next)
})



router.post('/login', (req, res, next) => {
  return userApi.loginUser(req, res, next)
})

router.post(
  '/createContact',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res, next) => {
    return userApi.createContact(req, res, next)
  }
)
router.post('/deleteContactApi',passport.authenticate('jwt', {
  session: false,
}), (req, res, next) => {
  return userApi.deleteContactApi(req, res, next)
})
router.get('/contact-list',passport.authenticate('jwt', {
  session: false,
}), (req, res, next) => {
  return userApi.getContactList(req, res, next)
})



module.exports = router

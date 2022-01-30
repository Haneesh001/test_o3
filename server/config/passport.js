// import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const knex = require('../config/db')

module.exports = (passport) => {
  let options = {}
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  options.secretOrKey = process.env.JWT_SECRET.trim()
  //console.log('options', options)
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      knex
        .raw(`select * from users where users_id = ${payload.users_id}`)
        .then((response) => {
          if (response && response.rows.length) {
            const { users_id, email, organization_id, name, app_id } =
              response.rows[0]
            const customUser = {
              users_id,
              email: email,
              organization_id,
              app_id,
              name,
            }
            return done(null, customUser)
          } else return done(null, false)
        })
        .catch((error) => {
          return done(error, false)
        })
    })
  )
}

const knex = require('../../config/db')
const genToken = require('../../utils/genToken')
const Response = require('../../utils/responseBody')
const bcrypt = require('bcryptjs')
const nodemailer = require("../utilities/nodeMailer");




////Create user

const createUser = async (req, res, next) => {
  
  const {
    // organization_id,
    users_name,
    users_email,
    users_password,
  } = req.body

  try {
    if (!users_password) {
      return res
        .status(400)
        .send(
          Response.json(false, null, `Please Enter valid email and password!`)
        )
    }

    if (users_email) {
      const isAlreadyExists = await knex('users')
        .where({
          users_email,
        })
       
      if (isAlreadyExists && isAlreadyExists.length) {
        return res
          .status(400)
          .send(
            Response.json(
              false,
              null,
              `User with email ${users_email}, is already exists!`
            )
          )
      }
    }

    const isAlreadyExistsName = await knex('users')
      .where({
        users_name,
      })
     

    if (isAlreadyExistsName && isAlreadyExistsName.length) {
      return res
        .status(400)
        .send(
          Response.json(
            false,
            null,
            `User with username ${users_name}, is already exists!`
          )
        )
    }

    const hashPassword = await bcrypt.hash(users_password, 10)

 

    const rowInsert = await knex
      .insert({
       
        users_name,
        users_password: hashPassword,
       
        users_email,
        
      
      })
      .into('users')
      .returning('*')

    if (!rowInsert || !rowInsert.length) {
      return res
        .status(400)
        .send(Response.json(false, null, 'Unable to create user'))
    }
    let random =  Math.floor((Math.random() * 100) + 54)
    nodemailer.sendConfirmationEmail(
        users_name,
        users_email,
        random
    );
    return res.send(Response.json(true, null, 'User created Successfully.'))
    
  } catch (error) {
    return res.status(400).send(Response.json(false, null, error.message))
  }
}
/*--------------------------------------------Update users--------------------------------------------*/



//Delete user details by ID
const deleteUserApi = async (req, res, next) => {
  try {
    //Db call
    knex
      .raw(
        `update public.users set record_status = 'Deleted' where users_id = ${req.body.users_id}`
      )
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Success',
        })
      })
  } catch (error) {
    //Handled any Internal err
    return res.status(400).json({
      success: false,
      message: 'Please try again',
    })
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * Create login for users.
 */
const loginUser = async (req, res, next) => {
  const { users_email, users_password } = req.body



  try {
    if (!users_email || !users_password) {
      return res.status(400).send({
        success: false,
        message: 'Please enter valid email and password!',
      })
    }

    let query = ''
    if (!users_email.includes('@')) {
      query = `select 
                  users_id,
                  users.users_name, 
                
                   users.users_email, 
                   users.users_password
                 from users 
                  where users.users_email='${users_email}'`
    } else {
      query = `select 
      users_id,
      users.users_name, 
      users.users_password,
  
       users.users_email
     from users 
      where users.users_email='${users_email}'`
    }
    // const rowUser = await knex('users').where({ email })

    const row = await knex.raw(query)
    if (!row || !row.rows.length) {
      return res.status(400).send({
        success: false,
        message: 'User not found!',
      })
    }

  
    const { users_password: userPassword,  } = row.rows[0]

    const isMatch = await bcrypt.compare(users_password, userPassword)

    if (!isMatch) {
      return res
        .status(400)
        .send(Response.json(false, null, 'Invalid Password! Please try again.'))
    }

    const userInfo = { ...row.rows[0] }

    const user = { ...row.rows[0],  } // we listed application in the db
    const userPayload = {
      users_id: user.users_id,
      user_name: user.users_name,
      email: user.users_email,
     
    }
    const token = genToken(userPayload)

    return res.send({
      success: true,
      details: user,
      message: 'Login Successful.',
      auth_token: token,
    })
  } catch (error) {
    return res.status(400).send({ message: error })
  }
}

const createContact = async (req, res, next) => {
  const { users_id} =req.user
  const {
    // organization_id,
    contacts_name,
    contacts_email,
   
    contacts_number,
   

  } = req.body

  try {
  
    const rowInsert = await knex
      .insert({
       
    contacts_name,
    contacts_email,
   
    contacts_number,
    users_id,
    record_status: true
        
      
      })
      .into('contacts_list')
      .returning('*')

    if (!rowInsert || !rowInsert.length) {
      return res
        .status(400)
        .send(Response.json(false, null, 'Unable to create Contact'))
    }

    return res.send(Response.json(true, null, 'Contact created Successfully.'))
  } catch (error) {
    return res.status(400).send(Response.json(false, null, error.message))
  }
}

//Delete contact details by ID
const deleteContactApi = async (req, res, next) => {
  try {
    //Db call
    knex
      .raw(
        `update contacts_list set record_status = false where contacts_id = ${req.body.contacts_id}`
      )
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Deleted Successfully',
        })
      })
  } catch (error) {
    //Handled any Internal err
    return res.status(400).json({
      success: false,
      message: 'Please try again',
    })
  }
}

//get contact details
const getContactList = async (req, res, next) => {
  const {users_id} = req.user;
  try {
    //Db call
    knex
      .raw(
        `select * from contacts_list where users_id =${users_id} and record_status=true`
      )
      .then((result) => {
        return res.status(200).json({
          success: true,
          message: null,
          data:result.rows
        })
      })
  } catch (error) {
    //Handled any Internal err
    return res.status(400).json({
      success: false,
      message: 'Please try again',
    })
  }
}



module.exports = {

  loginUser: loginUser,
  
  createUser,
  createContact,
  deleteContactApi,
  getContactList
}

const {response} = require('../helper/response')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

//function to register the user
exports.registerUser = async(req,res, next) => {
    try{
        const {name, email, password} = req.body;
        if(!name){
            return response(res, 400, false, 'User Name is required',{})
        }
        if(!email){
            return response(res, 400, false, 'Email is required', {})
        }
        if(!password){
            return response(res, 400, false, 'Password is required', {})
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response(res, 400, false, 'Email already registered', {});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await User.create({
            name,
            email, 
            password: hashedPassword
        })
        return response(res, 200, true, 'User created successfully', {createUser})

    }catch(error){
    next(error)
    }
}

//function to login a user
exports.login = async(req,res,next) => {
    try{
        const {email, password} = req.body;
        if(!email){
            return response(res, 400, false, 'Email is required',{})
        }
        if(!password){
            return response(res, 400, false, 'Password is required',{})
        }
        const existingUser = await User.findOne({email: email, isDeleted: false})
        if(!existingUser){
            return response(res, 404, false, 'User does not exist', {})
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if(!passwordMatch){
            return response(res, 400, false, 'Password does not match', {})
        }
            
         // Generate JWT token
         const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email },  
            process.env.JWT_SECRET,    // Secret key (store in .env)
            { expiresIn: '1y' }    // Expiry time
        );

        return response(res, 200, true, 'Login successful',{token})
    
    }catch(error){
       next(error)
    }
}



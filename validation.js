const joi = require('@hapi/joi');

const registerValidation = data =>{
    const user = joi.object({
        name : joi.string(),
        lastname : joi.string(),
        birthday : joi.string(),
        email : joi.string().min(6).email(),
        address : joi.string(),
        city : joi.string(),
        password : joi.string().min(6),
        repassword : joi.string().min(6)
    })
    return user.validate(data)
}
const loginValidation = data =>{    
    const user = joi.object({
        email : joi.string().email(),
        password : joi.string().min(6)
    })
    return user.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
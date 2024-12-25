const dotenv =require('dotenv');
dotenv.config();


module.exports={
    server:{
        port:process.env.PORT
    },
    adminData:{
        password:process.env.PASSWORD,
        username:process.env.USERSTORE
    }
}

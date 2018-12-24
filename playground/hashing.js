const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
/***** hashing with crypto-js ******/

var msg = "Message To Be Hashed";

var hash = SHA256(msg).toString();

console.log(`Message: ${msg}`,`hash: ${hash}`);


var data = {
    id : 21215
}

var token = {
    data,
    hash: SHA256(JSON.stringify(data)+'some-salt').toString()
}
// token.data = {
//     id :66446
// }
var resultHash = SHA256(JSON.stringify(token.data)+'some-salt').toString()

if(token.hash === resultHash) {
    console.log('Data is not manipulated');
} else {
    console.log('Warning! Data is manipulated');
}

/***** hashing with jwt ******/

var jwtToken = jwt.sign(data,'some-salt');
console.log(`JWT Token: ${jwtToken}`);
var decoded = jwt.verify(jwtToken,'some-salt');
console.log(`Decoded: ${JSON.stringify(decoded)}`);


/***** hashing with bcryptjs ******/

var password = 'password@123';

bcrypt.genSalt(10,(err,salt)=>{
    if(err)
    {
        throw err;
    }
    bcrypt.hash(password,salt,(err,hash) =>{
        if(err)
        {
            throw err;
        }
        console.log(hash);
    });
});

var hashedPassword = '$2a$10$/DJxWdHZWRs7o8ST2eDSIuulFutidCtozinrZHd1ApWPycaEqEb.e';

bcrypt.compare(password,hashedPassword,(err,res)=>{
    if(!err)
    {
        return console.log(res);
    }
    return console.log(err);
});
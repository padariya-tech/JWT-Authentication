const express = require('express')
const dotenv = require('dotenv').config();
const cors = require('cors')
const app = express();
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');




mongoose.connect(process.env.MONGO_URL)
.then(() => {
 console.log("Database Connected");   
}).catch((err) => {
    console.log("Database not connected",err);
});
app.use(express.json())

// cookie parser
app.use(cookieParser())
// write comment about below
// url encoded is used for form data in postman request
app.use(express.urlencoded({extended:false}))


app.use('/',require('./routes/authRoutes'))

app.listen(8000,()=>console.log(`server is running on port 8000`))


import express from 'express'
import initApp from './src/module/app.router.js'
import connectDB from './DB/connection.js';


const app = express()
const port = 3000
initApp(app, express);
connectDB().then(() => {
    app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))
});


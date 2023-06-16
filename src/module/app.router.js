import authRouter from './auth/auth.router.js';
import userRouter from './user/user.router.js';
import messageRouter from './message/message.router.js';

const initApp = (app, express) => {

    app.use(express.json());
    app.get('/', (req, res) => {
        return res.send("hello..!");
    })
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/message', messageRouter)
    app.use('*', (req, res) => {
        return res.json({ message: 'page not found' });
    })
}
export default initApp;
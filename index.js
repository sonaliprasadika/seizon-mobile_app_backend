'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user-routes');
const goalRoutes = require('./routes/goals-routes');
const userAvatarRoutes = require('./routes/avatar-routes');
const { authMiddleware } = require('./middleware/authMiddleware');
const levelRoutes = require('./routes/level-routes');
const UserLevelRoutes = require('./routes/userLevel-routes');
const LevelChallengeRoutes = require('./routes/levelChallenge-routes');
const swagger = require('./config/swagger');
const FriendChallenge = require('./models/friendChallenge');
const friendChallengeRoutes = require('./routes/friendChallenge-routes');
const commonChallengeRoutes = require('./routes/commonChallenge-routes');
const userChallengeRoutes = require('./routes/userChallenge-routes');
const sessionRoutes = require('./routes/sessionRoutes');
const mountainRoutes = require('./routes/mountain-routes')
const userMountainRoutes = require('./routes/userMountain-routes')
const friendsRoutes = require('./routes/friends-routes')
const baseCampRoutes = require('./routes/baseCamp-routes')
const userBaseCampRoutes = require('./routes/userBaseCamp-routes')

dotenv.config();
const {PORT,HOST} = process.env

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

swagger(app)

app.use(authMiddleware);
app.use('/api', userRoutes.routes);
app.use('/api', goalRoutes.routes);
app.use('/api', userAvatarRoutes.routes);
app.use('/api', mountainRoutes.routes);
app.use('/api', userMountainRoutes.routes);
app.use('/api', friendsRoutes.routes);
app.use('/api', baseCampRoutes.routes);
app.use('/api', userBaseCampRoutes.routes);
app.use('/api', levelRoutes.routes);
app.use('/api', UserLevelRoutes.routes);
app.use('/api', LevelChallengeRoutes.routes);
app.use('/api', friendChallengeRoutes.routes);
app.use('/api', commonChallengeRoutes.routes);
app.use('/api', userChallengeRoutes.routes);
app.use('/api', sessionRoutes.routes);
app.listen(PORT, () => console.log('App is listening on url http://'+HOST+':' + PORT));
module.exports = {app}
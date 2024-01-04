'use strict';
const db = require('../config/db');
const GoalSessions = require('../models/goalSessions');

const manageSession = async (req, res, next) => {
    const spentTime = req.body.spent_time;
    const userID = req.user.id;
    const updateGoalResult = await updateGoals(spentTime, userID)
    if(!updateGoalResult){
        res.status(500).send('Goals are not updated');
    }
    const updateChallengeResult = await updateChallenge(spentTime, userID)
    if(!updateChallengeResult){
        res.status(500).send('Challenges are not updated');
    }
    res.status(200).send('Record has updated successfully');
}

async function updateGoals(spentTime, userID){
        const userGoals= await db.collection('Goals').where('user_id', '==', userID).get();
        const goalData = userGoals.docs[0].data();
        const goalIDs = userGoals.docs.map(doc => doc.id);
        const goalSession = await db.collection('GoalSession').where('goal_id', '==', goalIDs[0]).get()
        let goalSessionData = null;
        if(!goalSession.empty){
            goalSessionData = goalSession.docs[0].data();
        }

        if(!goalSessionData){
            console.log("creating new reord")
            let remainingTime = goalData.total_time - spentTime
            if(remainingTime<0){
                remainingTime = 0
            }
            const newGoalSession = new GoalSessions(
                goalIDs[0],
                spentTime,
                remainingTime,
                new Date().toLocaleDateString('en-US'),
                1,
                );
            await db.collection('GoalSession').add(JSON.parse(JSON.stringify(newGoalSession)));
        }else{
            const session = await db.collection('GoalSession').where('goal_id', '==', goalIDs[0]).get()
            const sessionIds = session.docs.map(doc => doc.id);
            let flag = false
            for (const sessionId of sessionIds) {
                const sessionRef =  await db.collection('GoalSession').doc(sessionId);
                const sessionDataRef = await sessionRef.get();
                const sessionData = sessionDataRef.data()
                if(sessionData.created_at == new Date().toLocaleDateString('en-US')){
                    let remainingTime = sessionData.remaining_time - spentTime

                    if(remainingTime<0){
                        remainingTime = 0
                    }
                    sessionData.spent_time = spentTime;
                    sessionData.remaining_time = remainingTime;
                    const sessionObj =  await db.collection('GoalSession').doc(sessionId);
                    
                    await sessionObj.update(sessionData);
                    flag = true
                }
            }
            if(!flag){
                let remainingTime = goalData.total_time - spentTime
                if(remainingTime<0){
                    remainingTime = 0
                }
                const newGoalSession = new GoalSessions(
                    goalIDs[0],
                    spentTime,
                    remainingTime,
                    new Date().toLocaleDateString('en-US'),
                    1,
                    );
                await db.collection('GoalSession').add(JSON.parse(JSON.stringify(newGoalSession)));
            }       
        }   
        return true;
}
async function updateChallenge(spentTime, userID){
    try{
        const userChallengesRef= await db.collection('UserChallenge').where('user_id', '==', userID).get();
        const userChallengeIds = userChallengesRef.docs.map(doc=>doc.id)

        let total_xp_points =0
        for (const challengeID of userChallengeIds) {
            const userChallengeRef =  await db.collection('UserChallenge').doc(challengeID);
            const userChallengeData = await userChallengeRef.get();
            const data = await userChallengeData.data();
            let callengeRemainingTime= data.remaining_time - spentTime;
            if(callengeRemainingTime<0){
                callengeRemainingTime = 0
                const xpPoints = data.xp_points
                total_xp_points = total_xp_points + xpPoints
                
            }
            await userChallengeRef.update({
                remaining_time: callengeRemainingTime,
            })
        }
        const userRef_xp =  await db.collection('Users').doc(userID);
        await userRef_xp.update({
            xp_points: total_xp_points,
        })
        const level1Ref= await db.collection('Levels').where('level_name', '==', 'Level_1').get();
        const level1_xpPoints = level1Ref.docs[0].data().xp_points
        if(total_xp_points > level1_xpPoints){
            await updateNewLevel(total_xp_points,userID)
        }   
    return true; 

    }catch(error) {
        return false;
    } 
}

async function updateNewLevel(xp_points, userID) {
    try {
        let levelName;
        const level2Ref= await db.collection('Levels').where('level_name', '==', 'Level_2').get();
        const level2_xpPoints = level2Ref.docs[0].data().xp_points
    
        const level3Ref= await db.collection('Levels').where('level_name', '==', 'Level_3').get();
        const level3_xpPoints = level3Ref.docs[0].data().xp_points
    
        const level4Ref= await db.collection('Levels').where('level_name', '==', 'Level_4').get();
        const level4_xpPoints = level4Ref.docs[0].data().xp_points
    
        const level5Ref= await db.collection('Levels').where('level_name', '==', 'Level_5').get();
        const level5_xpPoints = level5Ref.docs[0].data().xp_points
    
        switch (true) {
            case xp_points <= level2_xpPoints:
                levelName = "Level_2";
              break;
            case xp_points <= level3_xpPoints:
                levelName = "Level_3";
              break;
            case xp_points <= level4_xpPoints:
                levelName = "Level_4";
              break;
            case xp_points <= level5_xpPoints:
                levelName = "Level_5";
        }
        const levelRef= await db.collection('Levels').where('level_name', '==', levelName).get();
        const lowerLevelId = levelRef.docs.map(doc => doc.id);
    
        const levelChallengesRef = await db.collection('LevelChallenge').where('level_id', '==', lowerLevelId[0]).get()
        const levelChallengeIds = levelChallengesRef.docs.map(doc=>doc.id)
    
        for (const challengeID of levelChallengeIds) {
            const levelRef =  await db.collection('LevelChallenge').doc(challengeID);
            const levelChallengeData = await levelRef.get();
            await db.collection('UserChallenge').add({
                user_id: userID,
                externel_challenge_id: challengeID,
                challenge_progress: 'INCOMPLETE',
                remaining_time: levelChallengeData.data().duration,
                challenge_type: levelChallengeData.data().challenge_type,
                xp_points: levelChallengeData.data().xp_points,
            });
        }
    } catch (error) {
        console.error('Cannot get new challenges from next level:', error);
        throw error;
    }
}

module.exports = {
    manageSession
}
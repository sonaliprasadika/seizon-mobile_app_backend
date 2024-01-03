'use strict';
const db = require('../config/db');
const GoalSessions = require('../models/GoalSessions');
const Goals = require('../models/goals');

const manageSession = async (req, res, next) => {

    //get the time from the request
    //we get the time and step count body = {time, steps}
    const spentTime = req.body.spent_time;
    const userID = req.user.id;
    
    try {
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
            const sessionResponse = await db.collection('GoalSession').add(JSON.parse(JSON.stringify(newGoalSession)));
           
            res.send(`User record saved successfully with ID: ${sessionResponse.id}`);
        }else{
            const session = await db.collection('GoalSession').where('goal_id', '==', goalIDs[0]).get()
            const sessionId = session.docs.map(doc => doc.id);
            const exsistingSession = session.docs[0].data();
            
            if(exsistingSession.created_at ==  new Date().toLocaleDateString('en-US')){
                let remainingTime = exsistingSession.remaining_time - spentTime

                if(remainingTime<0){
                    remainingTime = 0
                }
                exsistingSession.spent_time = spentTime;
                exsistingSession.remaining_time = remainingTime;
                const sessionObj =  await db.collection('GoalSession').doc(sessionId[0]);
                
                await sessionObj.update(exsistingSession);
                res.send('session record updated successfuly'); 
            }else{
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
                const sessionResponse = await db.collection('GoalSession').add(JSON.parse(JSON.stringify(newGoalSession)));
                res.send(`creating new session record for new date  ${sessionResponse.id}`); 
            }       
        }
    } catch (error) {
        res.status(400).send(error.message);
    } 
}

const updateChallenge = async(req, res, next) => {
    try{

        const spentTime = req.body.spent_time;
        const userID = req.user.id;

        const userChallengesRef= await db.collection('UserChallenge').where('user_id', '==', userID).get();
        const userChallengeIds = userChallengesRef.docs.map(doc=>doc.id)

        for (const challengeID of userChallengeIds) {
            const userChallengeRef =  await db.collection('UserChallenge').doc(challengeID);
            const userChallengeData = await userChallengeRef.get();
            const data = await userChallengeData.data();
            let callengeRemainingTime= data.remaining_time - spentTime;
            if(callengeRemainingTime<0){
                callengeRemainingTime = 0
            }
            await userChallengeRef.update({
                remaining_time: callengeRemainingTime,
            })
        }
        
    res.send(`User challenges has updated successfully`); 

    }catch(error) {
        res.status(400).send(error.message);
    } 
}


module.exports = {
    manageSession,
    updateChallenge
}
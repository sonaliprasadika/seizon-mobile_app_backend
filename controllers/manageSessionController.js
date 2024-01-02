'use strict';
const db = require('../config/db');
const GoalSessions = require('../models/GoalSessions');
const Goals = require('../models/goals');

const manageSession = async (req, res, next) => {

    //get the time from the request
    //we get the time and step count body = {time, steps}
    const spentTime = req.body.spent_time;
    const userID = req.user.id;
    
    // try {
        //api goalUpdateAndCheckCompletion
        // one user can only have one goal
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
        // console.log(userGoals);
        // res.status(200).send({message:goalSessionData});

        // const user =  await db.collection('Goals').doc(id);
        // await user.update(data);
        // res.send('User record updated successfuly');        
    // } catch (error) {
    //     res.status(400).send(error.message);
    // }

    //update the goal table

    //check the status of the goal

    //if complete -> update the goal status

//challenges update

    //update the user challenges table

        //get all incomplete challenges from user challenge table

        //update the remaining time 

        //if remaining time <= 0 update status as challenge complete

        //update xp points in levels table
            //level update

//moutain and basecamp tables update

    // add required classes for mountain and basecamps

    // select the 'inprogress' basecamp record from userBaseCamp table (logic should be in baseCampCntrlr update method)

    // update remaining steps

    // if remaining steps < req.body.steps, req.body.step - remaining steps -> update the next base camp remaining steps

        // update current base camp tocomplete and next pending one to in progress

            // if next base camp belongs to the next mountain, update the mountain table

    //ui update response
    
}

module.exports = {
    manageSession
}
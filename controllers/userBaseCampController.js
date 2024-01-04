'use strict';
const db = require('../config/db');
const UserBaseCamp = require('../models/userBaseCamp');

const addUserBaseCamp = async (req, res, next) => {
    try {
        //this needs mountain_id as the input and it will add the required basecamps to the user according to mountain

        const userBaseCampData = req.body;
        const userID = req.user.id;
        const mountainID = userBaseCampData.mountain_id;

        //retrive basecamps for mountain id
        const baseCamps = await db.collection('BaseCamps').where('mountain_id', '==', mountainID).get();

        const sortedBaseCamps = getSortedBaseCamps(baseCamps);
  
        if (sortedBaseCamps.empty) {
            res.status(404).send(`No basecamp records found with mountain id: ${mountainID}`);
        }else{

            sortedBaseCamps.map(async(baseCamp, index)=>{
                const status = index === 0 ? 'inprogress' : 'pending';
                
                const userBaseCamp = new UserBaseCamp(
                    userID,
                    baseCamp.steps_to_base_camp,
                    baseCamp.base_camp_id,
                    status
                 );
                const userBaseCampRef = await db.collection('UserBaseCamps').add(JSON.parse(JSON.stringify(userBaseCamp)));

                // Update the same record to include the received doc ID
                await db.collection('UserBaseCamps').doc(userBaseCampRef.id).update({
                    user_base_camp_id: userBaseCampRef.id
                });
            }) 
      
        }
        res.send(`User base camps record saved successfully`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSortedBaseCamps = (baseCamps) => {
    const sortedBaseCamps = baseCamps.docs.map( doc => doc.data()).sort((a, b) => a.base_camp_id - b.base_camp_id)
    return sortedBaseCamps;
}

const getUserBaseCampByUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        const g_id = req.params.id;
        console.log(id)
        console.log(g_id)
        const querySnapshot = await db.collection('UserBaseCamps').where('user_id', '==', id).get(g_id);

        if (querySnapshot.empty) {
            res.status(404).send('Base camp not found for the given ID');
        } else {
            const documentData = querySnapshot.docs[0].data();
            res.send(documentData);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error getting base camp');
    }
};

// after receiving walked distance from app
const updateUserBaseCamp = async (req, res, next) => {
    try {
    // get the time from req
    const walkedSteps = req.body.session_steps;
    const userID = req.user.id;

    // get the basecamp inprogress
    const activeBasecampQS = await db.collection('UserBaseCamps').where('user_id', '==', userID).where('base_camp_progress', '==', 'inprogress').get();

    if (activeBasecampQS.empty) {
        console.log(`No active basecamps for the moment`);
        //need to chcek user mountain and add mountain and basecamp
    }else{
        const activeBasecamp = activeBasecampQS.docs[0].data();
        const remaining_steps = activeBasecamp.remaining_steps;
        const userBaseCamp =  await db.collection('UserBaseCamps').doc(activeBasecamp.user_base_camp_id);

        if(remaining_steps>walkedSteps){
            //update the same base camp
            await userBaseCamp.update({
                remaining_steps: (remaining_steps-walkedSteps) 
            });
            res.send('User base camp record updated successfuly');   

        }else if(remaining_steps<=walkedSteps){

            const stepsToCarry = (walkedSteps - remaining_steps);

            // check if there are next base camps
            const pendingBasecampsQS = await db.collection('UserBaseCamps').where('user_id', '==', userID).where('base_camp_progress', '==', 'pending').get();

            if (pendingBasecampsQS.empty) {
                console.log(`No pending basecamps for the moment, end of the mountain`);
                // Logic to add new mountain to the userMountain table
                // Update the current basecamp to completed
                
                if(pendingBasecampsQS.empty && !activeBasecampQS.empty){
                    // no next base camp, but current one is in progress, then need to update that to complete
                    await userBaseCamp.update({
                        remaining_steps: 0,
                        base_camp_progress: 'completed'
                    });
                }

                res.send('last base camp updated and need to add new mountain'); 
            }else{
                //change base camp to completed 
                await userBaseCamp.update({
                    remaining_steps: 0,
                    base_camp_progress: 'completed'
                });

                const sortedPendingBaseCamps = getSortedBaseCamps(pendingBasecampsQS);
                const nextBaseCamp = sortedPendingBaseCamps[0];
                const nextUserBaseCamp =  await db.collection('UserBaseCamps').doc(nextBaseCamp.user_base_camp_id);

                await nextUserBaseCamp.update({
                    base_camp_progress: 'inprogress',
                    remaining_steps: (nextBaseCamp.remaining_steps - stepsToCarry),
                });

                res.send('new user base added successfuly'); 
            }
        }   
    }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUserBaseCamp = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('UserBaseCamps').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUserBaseCamp,
    getUserBaseCampByUser,
    updateUserBaseCamp,
    deleteUserBaseCamp
}
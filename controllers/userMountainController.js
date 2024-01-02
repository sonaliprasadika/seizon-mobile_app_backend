'use strict';
const db = require('../config/db');
const UserMountain = require('../models/userMountain');

const addMountainToUser = async (req, res, next) => {

    try {
        // req body -> empty
        // req body -> nextMountain

        const userMountainData = req.body;
        const userID = req.user.id;

        //get all record in usermountain table for user id from token
        const UserMountains = await db.collection('UserMountain').where('user_id', '==', userID).get();

        //if results == null, add the first mountain to the userMountain table from the mountains table
        if (UserMountains.empty) {
            console.log(`No mountain records found with id: ${userID}`);
            // add the first mountain to the userMountain table from the mountains table
            addMountainWithParams(res, userID, 1, 'inprogress')

        }else if(userMountainData.next_mountain){
            //if body has a chosen next mountain ID, then add it to the list - user can choose mountain
            addMountainWithParams(res, userID, userMountainData.next_mountain, 'inprogress')
        }

        
    } catch (error) {
        res.status(400).send(error.message);
    }
    
}

const addMountainWithParams = async (res, userID, mountain_number, mountain_progress) => {
            // get the mountain from mountain table
            const Mountain = await db.collection('Mountains').where('mountain_number', '==', mountain_number).get();

            if (Mountain.empty) {
                res.status(404).send('Mountain with the given mountain number not found');
            } else {
                const mountainData = Mountain.docs[0].data();

                const userMountain = new UserMountain(
                    userID,
                    mountainData.doc_id,
                    mountainData.total_steps,
                    mountain_progress
                );

                const userMountainRef = await db.collection('UserMountain').add(JSON.parse(JSON.stringify(userMountain)));

                // Update the same record to include the received doc ID
                await db.collection('UserMountain').doc(userMountainRef.id).update({
                    doc_id: userMountainRef.id
                });

                res.send(`UserMountain record saved successfully with ID: ${userMountainRef.id}`);
            }
}



module.exports = {
    addMountainToUser
}









//if results == null, add the first mountain to the userMountain table from the mountains table
// if (UserMountains.empty) {
//     console.log(`No user record found with id: ${userID}`);
//     // add the first mountain to the userMountain table from the mountains table
//     const firstMountain = await db.collection('Mountains').where('mountain_number', '==', 1).get();

//     if (firstMountain.empty) {
//         res.status(404).send('Mountain with the given ID not found');
//     } else {
//         const mountainData = firstMountain.docs[0].data();

//         const userMountain = new UserMountain(
//             userID,
//             mountainData.doc_id,
//             mountainData.total_steps,
//             'inprogress'
//         );

//         const userMountainRef = await db.collection('UserMountain').add(JSON.parse(JSON.stringify(userMountain)));

//         // Update the same record to include the received doc ID
//         await db.collection('UserMountain').doc(userMountainRef.id).update({
//             doc_id: userMountainRef.id
//         });

//     }

// }
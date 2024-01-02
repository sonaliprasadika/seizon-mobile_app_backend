'use strict';
const db = require('../config/db');
const CommonChallenge = require('../models/commonChallenge');

const addCommonChallenge = async (req, res, next) => {
    try {
        const commonChallengeData = req.body;
        // Create a new User instance using the data from the request body
        const commonChallenge = new CommonChallenge(
            commonChallengeData.challenge_id,
            commonChallengeData.challenge_name,
            commonChallengeData.challenge_type,
            commonChallengeData.start_date,
            commonChallengeData.end_date,
            commonChallengeData.xp_points,
            );
        const commonChallengeRef = await db.collection('CommonChallenge').add(JSON.parse(JSON.stringify(commonChallenge)));
        console.log(JSON.parse(JSON.stringify(commonChallenge)))
        res.send(`User record saved successfully with ID: ${commonChallengeRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCommonChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await db.collection('CommonChallenge').doc(id);
        const data = await user.get();
        if(!data.exists) {
            res.status(404).send('Common Challenge with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCommonChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('CommonChallenge').doc(id);
        console.log(data)
        await user.update(data);
        res.send('Record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCommonChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('CommonChallenge').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addCommonChallenge,
    getCommonChallenge,
    updateCommonChallenge,
    deleteCommonChallenge
}
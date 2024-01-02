'use strict';
const db = require('../config/db');
const Mountains = require('../models/mountain');

const createMountain = async (req, res, next) => {
    try {
        const mountainData = req.body;

        //only admins should be able to create mountains with this endpoint add checkup required here
        const userID = req.user.id;

        const mountain = new Mountains(
            mountainData.mountain_name,
            mountainData.mountain_description,
            mountainData.total_steps,
            mountainData.mountain_number,
        );

        const mountainRef = await db.collection('Mountains').add(JSON.parse(JSON.stringify(mountain)));       

        // Update the same record to include the received doc ID
        await db.collection('Mountains').doc(mountainRef.id).update({
            // Add the fields you want to update with the doc ID
            // For example:
            doc_id: mountainRef.id
        });

        res.send(`User record saved successfully with ID: ${mountainRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllMountains = async (req, res, next) => {
    try {
        const mountains = await db.collection('Mountains');
        const data = await mountains.get();

        const mountainsArray = [];

        if (data.empty) {
            res.status(404).send('No mountain records found');
        } else {
            data.forEach(doc => {
                const mountainData = {};
                const docData = doc.data();
                
                for (const key in docData) {
                    if (docData.hasOwnProperty(key)) {
                        mountainData[key] = docData[key];
                    }
                }
                mountainsArray.push(mountainData);
            });

            res.send(mountainsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMountain = async (req, res, next) => {
    try {
        const id = req.body.doc_id;
        const data = req.body;
        const mountain =  await db.collection('Mountains').doc(id);
        await mountain.update(data);
        res.send('Mountain record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMountain = async (req, res, next) => {
    try {
        // const id = req.params.id;
        const id = req.body.doc_id;
        await db.collection('Mountains').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    createMountain,
    getAllMountains,
    updateMountain,
    deleteMountain
}
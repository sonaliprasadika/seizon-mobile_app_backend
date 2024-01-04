'use strict';
const db = require('../config/db');
const BaseCamp = require('../models/baseCamp');

const addBaseCamp = async (req, res) => {   
    try {
        const newBaseCampData = req.body;

        //add incremental id to identify the basecamp
        const newBaseCamp = new BaseCamp(
            newBaseCampData.base_camp_id, 
            newBaseCampData.mountain_id, 
            newBaseCampData.base_camp_name, 
            newBaseCampData.steps_to_base_camp
            );
        const baseCampRef = await db.collection('BaseCamps').add(JSON.parse(JSON.stringify(newBaseCamp)));

        // Update the same record to include the received doc ID
        await db.collection('BaseCamps').doc(baseCampRef.id).update({
            doc_id: baseCampRef.id
        });

        res.json(`Base camp record saved successfully with ID: ${baseCampRef.id}`);
    } catch (error) {
        console.error('Error adding base camp', error);
        res.status(400).json({ error: 'Error adding base camp' });
    }
}

const getAllBaseCamps = async (req, res) => {
    try {
        console.log("start method")
        const baseCamps = await db.collection('BaseCamps');
        const data = await baseCamps.get();
        const baseCampsArray = [];

        if (data.empty) {
            res.status(404).send('No base camp records found');
        } else {
            data.forEach(doc => {
                const baseCampData = {};
                const docData = doc.data();
                
                for (const key in docData) {
                    if (docData.hasOwnProperty(key)) {
                        baseCampData[key] = docData[key];
                    }
                }

                baseCampsArray.push(baseCampData);
            });
            res.send(baseCampsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBaseCampByID = async (req, res) => {
    const baseCampId = req.params.id;
    try {
        const baseCampDoc = await db.collection('BaseCamps').doc(baseCampId).get();
        if (!baseCampDoc.exists) {
            res.status(404).json({ error: 'Base camp not found' });
        } else {
            res.json(baseCampDoc.data());
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting base camp' });
    }
}

const updateBaseCamp = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const baseCamp =  await db.collection('BaseCamps').doc(id);
        await baseCamp.update(data);
        res.send('Base camp record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteBaseCamp = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('BaseCamps').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addBaseCamp,
    getAllBaseCamps,
    getBaseCampByID,
    updateBaseCamp,
    deleteBaseCamp
}

import db from 'db/mongo';
import { Sensor } from 'models/sensor';


async function get(id) {
    const sensor = await Sensor.findById(id)
        .populate([
            { path: 'type' }, { path: 'parentDev' }
        ]);
    if (!sensor) {
        throw 'sensor can not created.'
    }
    return sensor;
}

async function put(id, body) {
    const sensor = await Sensor.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    })
        .populate([
            { path: 'type' }, { path: 'parentDev' }
        ]);
    if (!sensor) {
        throw 'sensor can not updated.'
    }
    return sensor;
}

async function remove(id) {
    const deletedSensor = await Sensor.deleteOne({ _id: id });
    if (!deletedSensor) {
        throw 'sensor can not removed.'
    }
    return {};
}


const call = async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    try {
        await db.connect();
        switch (method) {
            case 'GET':
                res.status(200).json({ success: true, data: await get(id) });
                break;
            case 'PUT':
                res.status(200).json({ success: true, data: await put(id, req.body) });
                break;
            case 'DELETE':
                res.status(200).json({ success: true, data: await remove(id) });
                break;
            default:
                res.status(400).json({ success: false, error: "Unsupported method" });
                break;
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error });
    }
    await db.disconnect();
}

export default call;

import db from 'db/mongo';
import Device from 'models/device';


async function get(id) {
    const device = await Device.findById(id);
    if (!device) {
        throw 'device can not created.'
    }
    return device;
}

async function put(id, body) {
    const device = await Device.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    });
    if (!device) {
        throw 'device can not updated.'
    }
    return device;
}

async function remove(id) {
    const deletedDevice = await Device.deleteOne({ _id: id });
    if (!deletedDevice) {
        throw 'device can not removed.'
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

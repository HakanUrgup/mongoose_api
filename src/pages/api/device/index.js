import db from 'db/mongo';
import Device from 'models/device';


async function get() {
    return await Device.find();
}

async function post(body) {
    return await Device.create(body);
}

async function clear() {
    return await Device.deleteMany();
}


const call = async (req, res) => {
    const { method } = req;

    try {
        await db.connect();
        switch (method) {
            case 'GET':
                res.status(200).json({ success: true, data: await get() })
                break;
            case 'POST':
                res.status(200).json({ success: true, data: await post(req.body) })
                break;
            case 'DELETE':
                res.status(200).json({ success: true, data: await clear() });
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

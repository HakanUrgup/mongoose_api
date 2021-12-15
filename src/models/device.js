const mongoose = require('mongoose');

/* Device schema */
const DeviceSchema = new mongoose.Schema({
    DeviceName: { type: String },
    hwaddr: { type: String, unique: true },
    description: { type: String }
});


module.exports = mongoose.models.Device || mongoose.model('Device', DeviceSchema);

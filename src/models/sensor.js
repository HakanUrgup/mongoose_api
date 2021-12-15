const mongoose = require('mongoose');

/* SensorType schema */
const SensorTypeSchema = new mongoose.Schema({
  type: { type: Number, unique: true },
  description: { type: String },
  valuetype: { type: String, unique: true },
});

/* Sensor schema */
const SensorSchema = new mongoose.Schema({
  ıonum: { type: Number },
  SensorName: { type: String },
  type: { type: mongoose.Schema.Types.ObjectId, ref: "SensorType" },
  parentDev: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
});


module.exports =
{
  SensorType: mongoose.models.SensorType || mongoose.model('SensorType', SensorTypeSchema),
  Sensor: mongoose.models.Sensor || mongoose.model('Sensor', SensorSchema)
};

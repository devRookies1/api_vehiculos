import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllVehicles = async (callback) => {
  const baseDeDatos = getDB();
  console.log('query');
  await baseDeDatos.collection('vehiculos').find({}).limit(50).toArray(callback);
};


const crearVehiculo = async (datosVehiculo, callback) => {
  if (
    Object.keys(datosVehiculo).includes('id')&&
    Object.keys(datosVehiculo).includes('nombre') &&
    Object.keys(datosVehiculo).includes('marca') &&
    Object.keys(datosVehiculo).includes('precio') &&
    Object.keys(datosVehiculo).includes('estado')
 
  ) {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('vehiculos').insertOne(datosVehiculo, callback);
  } else {
    return 'error';
  }
};

const consultarVehiculo = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('vehiculos').findOne({ _id: new ObjectId(id) }, callback);
};

const editarVehiculo = async (id, edicion, callback) => {
  const filtroVehiculo = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('vehiculos')
    .findOneAndUpdate(filtroVehiculo, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarVehiculo = async (id, callback) => {
  const filtroVehiculo = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('vehiculos').deleteOne(filtroVehiculo, callback);
};

export { queryAllVehicles, crearVehiculo, consultarVehiculo, editarVehiculo, eliminarVehiculo };
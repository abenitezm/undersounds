import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const serviceAccount = require('./key_service_account.json'); // Carga las credenciales de servicio de Firebase para poder meter datos
const data = require('./bd.json'); // Carga de los datos del json en data. Se puede hacer también con el import de siempre

const collectionKey = "albums"; // Nombre de la colección *TABLA* de firestore

async function uploadData() {
  try {
    // Inicializamos la base de datos donde vamos a meter los datos
    initializeApp({
      credential: cert(serviceAccount), // Autentificación para poder meter datos
      databaseURL: "https://undersounds-cd613.firebaseio.com"
    });

    const firestore = getFirestore();
    firestore.settings({ ignoreUndefinedProperties: true }); // Ignoramos campos con valor de undefined

    const batch = firestore.batch(); // Creamos un batch para poder meter varios documentos a la vez
    const collectionRef = firestore.collection(collectionKey); // Referencia a la colección donde vamos a meter los datos
    
    // Recorremos cada elemento
    Object.keys(data).forEach((key) => {
      const docRef = collectionRef.doc(key.toString()); // Creamos documentos con el id del elemento
      batch.set(docRef, data[key]); // Lo almacenamos para subirlo
    });

    await batch.commit(); // Escribe en la base de datos todos los documentos que hemos almacenado en el batch
    console.log('✅ Todos los documentos se subieron correctamente');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

uploadData();

/* IMPORTANTE --> Para meter los datos modificados meter este script en la terminal : node --experimental-json-modules uploadDataBD.js
   Creo que tambien se puede con npm run node uploadDataBD.js pero no lo quiero probar porque he usado el de arriba y a lo mejor lo jodo 
   porque se sobreescriben datos*/
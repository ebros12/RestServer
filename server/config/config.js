// ========================
// puerto 
// ========================

process.env.PORT = process.env.PORT || 3000;

// ========================
// Entorno 
// ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
// Vencimiento del token
// ========================
//60 seg
//60 min
//24 hrs
//30 dias
process.env.CADUCIDAD_TOKEN = '48h'


// ========================
// Semilla Validacion
// ========================

process.env.SEED = process.env.SEED || 'seed-desarrollo'


// ========================
// Base de Datos
// ========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;



// ========================
// Google Client ID
// ========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '421228536184-d9fbauchbp2n00di1l3h1aggt81pm5vl.apps.googleusercontent.com';
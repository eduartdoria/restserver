// ===========================
// Puerto
// ===========================
process.env.PORT = process.env.PORT || 3000;


// ===========================
// Entorno
// ===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/cafe';
// } else {
urlDB = process.env.MOGODB_URL;
//'mongodb+srv://udemy:SaIMe923JGUUaNr9@cluster0-rfjbz.mongodb.net/cafe';
// }

process.env.URL_DB = urlDB;
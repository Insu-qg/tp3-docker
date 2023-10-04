import express from 'express'
import bodyParser from 'body-parser'
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'back-end/database.sqlite'
});

export const User = sequelize.define('user', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: true }
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
  }
})
// User.associate = (models) => {
//   User.hasMany(models.achat)
// }


export const Livre = sequelize.define('Livre', {
  ISBN: {
      type: DataTypes.STRING,
      primaryKey: true,
  },
  nom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
  },
  description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
  },
  urlImg: {
      type: DataTypes.STRING
  }
});

// Livre.associate = (models) => {
//   Livre.belongsToMany(models.Achat, { through: 'AchatLivre' }); // Un livre peut être contenu dans plusieurs achats
// };

export const Achat = sequelize.define('Achat', {
  date: {
      type: DataTypes.DATE
  },
  userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'User', // Nom de la table référencée
          key: 'id' // Nom de la colonne de clé primaire dans la table référencée
      }
  },
  livreISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
          model: 'Livre', // Nom de la table référencée
          key: 'ISBN' // Nom de la colonne de clé primaire dans la table référencée
      }
  }
});

// Achat.associate = (models) => {
//   Achat.belongsTo(models.User); // Un achat appartient à un seul utilisateur
//   Achat.belongsToMany(models.Livre, { through: 'AchatLivre' }); // Un achat peut contenir plusieurs livres
// };

sequelize.sync();
const app = express();
const port = process.env.PORT || 3000; // Port d'écoute, utilisez celui de votre choix

// Middleware pour traiter les données JSON
app.use(bodyParser.json());

// Routes pour les utilisateurs, achats et livres
import {router as users} from './src/routes/users.js' // Importez vos fichiers de routes
import {router as achats} from './src/routes/achats.js'
import {router as livres} from './src/routes/livres.js'

// Utilisez les routes dans votre application
app.use('/users', users); // Par exemple, les routes pour les utilisateurs commencent par /api/users
app.use('/achats', achats);
app.use('/livres', livres);

app.get('/', (req, res) => {
  res.send('hello world')
})

// Gestion des erreurs 404 (route non trouvée)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion des erreurs 500 (erreur serveur)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

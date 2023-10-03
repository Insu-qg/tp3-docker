import express from 'express'
import { Achat } from '../../app.js' // Importez correctement votre modèle Achat

export const router = express.Router();

// Route pour obtenir tous les achats
router.get('/', async (req, res) => {
  try {
    const achats = await Achat.findAll();
    res.json(achats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des achats' });
  }
});

// Route pour obtenir un achat par ID utilisateur
router.get('/:userId', async (req, res) => {
  const achatId = req.params.id;
  try {
    const achat = await Achat.findByPk(achatId);
    if (achat) {
      res.json(achat);
    } else {
      res.status(404).json({ message: 'Achat non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'achat' });
  }
});

// Route pour créer un achat
router.post('/', async (req, res) => {
  try {
    // Récupérez les données de la requête (par exemple : utilisateurId, livreISBN, quantite, etc.)
    const { utilisateurId, livreISBN, quantite } = req.body;

    // Créez un nouvel achat dans la base de données
    const nouvelAchat = await Achat.create({
      utilisateurId, // ID de l'utilisateur qui a effectué l'achat
      quantite // La quantité d'exemplaires achetés
    });

    // Ajoutez le ou les livres associés à l'achat
    await nouvelAchat.addLivres(livreISBN);

    res.status(201).json(nouvelAchat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'achat' });
  }
});
    
    
// Ajoutez d'autres routes pour créer, mettre à jour et supprimer un achat si nécessaire
import express from 'express'
import Livre from '../../app' // Importez correctement votre modèle Livre

export const router = express.Router();

// Route pour obtenir tous les livres
router.get('/', async (req, res) => {
  try {
    const livres = await Livre.findAll();
    res.json(livres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des livres' });
  }
});

// Route pour obtenir un livre par ISBN
router.get('/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const livre = await Livre.findOne({ where: { ISBN: isbn } });
    if (livre) {
      res.json(livre);
    } else {
      res.status(404).json({ message: 'Livre non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du livre' });
  }
});


router.post('/', async (req, res) => {
  try {
    // Récupérez les données de la requête (par exemple : ISBN, nom, description, urlImg, etc.)
    const { ISBN, nom, description, urlImg } = req.body;

    // Créez un nouveau livre dans la base de données
    const nouveauLivre = await Livre.create({
      ISBN, // ISBN du livre
      nom, // Nom du livre
      description, // Description du livre
      urlImg // URL de l'image du livre (facultatif)
    });

    res.status(201).json(nouveauLivre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du livre' });
  }
});

// Ajoutez d'autres routes pour créer, mettre à jour et supprimer un livre si nécessaire
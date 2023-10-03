import express from 'express'
import { User } from '../../app' // Assurez-vous d'importer correctement le modèle User

export const router = express.Router();

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// Récupérer un utilisateur par ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'Utilisateur introuvable' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
  }
});

// Ajouter un nouvel utilisateur
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // try {
    const newUser = await User.create({ email, password });
    res.status(201).json(newUser);
  // } catch (error) {
  //   res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  // }
});

// Mettre à jour un utilisateur par ID
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { email, password } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'Utilisateur introuvable' });
    } else {
      user.email = email;
      user.password = password;
      await user.save();
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
});

// Supprimer un utilisateur par ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'Utilisateur introuvable' });
    } else {
      await user.destroy();
      res.json({ message: 'Utilisateur supprimé avec succès' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
});

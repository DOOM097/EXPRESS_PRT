const { Router } = require('express');
const Card = require('../models/card');
const Course = require('../models/course');
const router = Router();

router.post('/add', async (req, res) => {
  try {
    const course = await Course.getById(req.body.id);
    await Card.add(course);
    res.redirect('/card');
  } catch (error) {
    console.error('Error adding course to card:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/remove/:id', async (req, res) => {
  try {
    const card = await Card.remove(req.params.id);
    res.status(200).json(card);
  } catch (error) {
    console.error('Error removing course from card:', error);
    res.status(500).json({ error: 'Failed to remove course from card' });
  }
});

router.get('/', async (req, res) => {
  try {
    const card = await Card.fetch();
    res.render('card', {
      title: 'Корзина',
      isCard: true,
      courses: card.courses,
      price: card.price
    });
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;


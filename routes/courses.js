const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const courses = await Course.getAll();
    res.render('courses', {
      title: 'Курсы',
      isCourses: true,
      courses,
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    if (!req.query.allow) {
      return res.redirect('/');
    }
    const course = await Course.getById(req.params.id);
    res.render('course-edit', {
      title: `Редактировать ${course.title}`,
      course,
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/edit', async (req, res) => {
  try {
    await Course.update(req.body);
    res.redirect('/courses');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

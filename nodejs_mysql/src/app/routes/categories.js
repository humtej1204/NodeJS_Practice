const express = require('express');
const router = express.Router();

const pool = require('../../config/dbConnection');

router.get('/categories', (req, res) => {
    res.render('add/categories');
});

router.post('/categories', async (req, res) => {
    const { name } = req.body;
    const newCateg = {
        name
    }
    await pool.query('INSERT INTO categories SET ?', [newCateg]);
    res.redirect('/add/categories_added')
});

router.get('/categories_added', async (req, res) => {
        const list_categories = await pool.query('SELECT * FROM categories');
        res.render('add/list_categories', {list_categories: list_categories});
});

router.get('/category_delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM categories WHERE ID = ?', [id]);
    res.redirect('/add/categories_added');
});

router.get('/category_edit/:id', async (req, res) => {
    const { id } = req.params;
    const category = await pool.query('SELECT * FROM categories WHERE ID = ?', [id]);
    res.render('add/edit_categories', {category: category[0]});
});

router.post('/category_edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const editedCat = {
        name
    };
    await pool.query('UPDATE categories SET ? WHERE id = ?', [editedCat, id]);
    res.redirect('/add/categories_added');
});

module.exports = router;
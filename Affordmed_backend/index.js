const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors=require('cors');
app.use(cors());

let db = null;
const dbPath = path.join(__dirname, 'product.db');

const initializeDBandServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        app.listen(5000, () => {
            console.log("Server is listening on port 5000");
        });
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
};

initializeDBandServer();

app.get('/getproducts/', async (req, res) => {
    // console.log("Request Came");
    let {
        category,
        company,
        rating,
        minPrice,
        maxPrice,
        availability,
        sortBy,
        sortOrder,
        page,
        pageSize
    } = req.query;

    let query = `SELECT * FROM product WHERE 1=1`;

    if (category) {
        query += ` AND product_category = '${category}'`;
    }
    if (company) {
        query += ` AND company = '${company}'`;
    }
    if (rating) {
        query += ` AND rating >= ${rating}`;
    }
    if (minPrice) {
        query += ` AND product_price >= ${minPrice}`;
    }
    if (maxPrice) {
        query += ` AND product_price <= ${maxPrice}`;
    }
    if (availability) {
        query += ` AND availability = '${availability}'`;
    }

    if (sortBy) {
        const order = sortOrder && (sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
        query += ` ORDER BY ${sortBy} ${order}`;
    }

    page = page ? parseInt(page) : 1;
    pageSize = pageSize ? parseInt(pageSize) : 10;
    const offset = (page - 1) * pageSize;

    query += ` LIMIT ${pageSize} OFFSET ${offset}`;

    try {
        const products = await db.all(query);
        res.send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/getproduct/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await db.get('SELECT * FROM product WHERE product_id = ?', [id]);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

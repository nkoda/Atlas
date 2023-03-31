const express = require('express');

const healthController = require('../controllers/health');
const productController = require('../controllers/products');

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Returns the health of the server.
 *     responses:
 *       200:
 *         description: Returns the uptime, message, and date of the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uptime:
 *                   type: number
 *                   description: The number of seconds the server has been running.
 *                 message:
 *                   type: string
 *                   description: A message indicating the health status of the server.
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The current date and time on the server.
 */
router.get('/health', healthController.getHealth);

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: A list of all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId: 
 *                     type: uuidv4
 *                   productName:
 *                     type: string
 *                   productOwnerName:
 *                     type: string
 *                   developers:
 *                     type: array
 *                     items:
 *                       type: string
 *                   scrumMasterName:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: year-month-day
 *                   methodology:
 *                     type: string
 *             example:
 *               productId: "f0dd9306-119e-44c8-a742-cf6d03a6a9c6"
 *               productName: "Product A"
 *               productOwnerName: "John Smith"
 *               developers: ["Jane Doe", "Bob Johnson"]
 *               scrumMasterName: "Sarah Lee"
 *               startDate: "2023-04-23"
 *               methodology: "Agile"
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId: 
 *                  type: uuidv4
 *               productName:
 *                 type: string
 *               productOwnerName:
 *                 type: string
 *               developers:
 *                 type: array
 *                 items:
 *                   type: string
 *               scrumMasterName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: year-month-day
 *               methodology:
 *                 type: string
 *             example:
 *               productName: "Product A"
 *               productOwnerName: "John Smith"
 *               developers: ["Jane Doe", "Bob Johnson"]
 *               scrumMasterName: "Sarah Lee"
 *               startDate: "2023-04-23"
 *               methodology: "Agile"
 *     responses:
 *       '200':
 *         description: Data successfully received
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Data successfully received"
 *       '400':
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Invalid request body"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Internal server error"
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /api/{id}:
 *   get:
 *     summary: Retrieve a product by ID.
 *     description: Retrieve a product from the server using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON object containing the product details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Error, could not find product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error, could not find product.
 */
router.get('/:id', productController.getProductsById); 

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a product with the specified ID
 *     description: Update a product by ID with the provided attributes
 *     tags: 
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to update
 *       - in: body
 *         name: attributes
 *         description: Attributes to update the product with
 *         schema:
 *           type: object
 *           properties:
 *             productName:
 *               type: string
 *             productOwnerName:
 *               type: string
 *             developers:
 *               type: array
 *               items:
 *                 type: string
 *             scrumMasterName:
 *               type: string
 *             startDate:
 *               type: string
 *             methodology:
 *               type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: '201: Success'
 *       404:
 *         description: Update not successful
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /api/{id}:
 *   delete:
 *     summary: Delete a product with the specified ID.
 *     description: Delete a product with the specified ID from the JSON file.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to delete.
 *     responses:
 *       '204':
 *         description: Successfully deleted.
 *       '400':
 *         description: Deletion failed.
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;
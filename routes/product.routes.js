import express from 'express';
import ProductModel from '../models/products.model.js';

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const getAllProducts = await ProductModel.find();
        return response.status(200).json(getAllProducts);
    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Algo deu errado, verifique o terminal."});
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const getProductById = await ProductModel.findById(id).populate("orders");
        return response.status(200).json(getProductById);
    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Algo deu errado, verifique o terminal."});
    }
});

router.post('/create', async (request, response) => {
    try {
        const createNewProduct = await ProductModel.create(request.body);
        return response.status(201).json(createNewProduct);
        // Quando crio um pedido, tenho que acrescentar o id do pedido aqui no produto.
    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Algo deu errado, verifique o terminal."});
    }
});

export default router;
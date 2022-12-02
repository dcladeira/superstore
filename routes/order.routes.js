import express from 'express';
import OrderModel from '../models/orders.model.js';
import ProductModel from '../models/products.model.js';

const router = express.Router();

// getAllOrders
router.get('/', async (request, response) => {
    try {
        const getAllOrders = await OrderModel.find();
        return response.status(200).json(getAllOrders);
    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Algo deu errado, verifique o terminal."})
    }
});

// addProductToOrder
router.post('/insert', async (request, response) => {
    try {
        // criar um novo pedido
        const addProductToOrder = await OrderModel.create(
            { products: request.body.products }
        );
        
        // passar pelo array dos produtos do pedido
        addProductToOrder.products.forEach( async (element) => {
            // atualizar cada produto inserido no pedido
            await ProductModel.findByIdAndUpdate(
                // procurando o id do elemento (findById)
                element.product,
                // atualizar o meu element (AndUpdate)
                {
                    $push: { orders: addProductToOrder._id }
                },
                { new: true, runValidators: true }
            )
        });

        return response.status(201).json(addProductToOrder);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Algo deu errado, verifique o terminal."});
    }
});

// getOrderById
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const getOrderById = await OrderModel.findById(id).populate("products");

        return response.status(200).json(getOrderById);
    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Algo deu errado, verifique o terminal."});
    }
});

export default router;
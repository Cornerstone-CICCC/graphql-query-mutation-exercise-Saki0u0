"use strict";
const resolvers = {
    Query: {
        products: () => products,
        getProductById: (_, { id }) => {
            return products.find(product => product.id === id);
        },
        getProductTotalPrice: (_, { id }) => {
            const product = products.find(product => product.id === id);
            if (!product)
                return null;
            return product.price * product.qty;
        },
        getTotalQtyOfProducts: () => {
            return products.reduce((total, product) => total + product.qty, 0);
        }
    },
    Mutation: {
        addProduct: (_, { productName, price, qty }) => {
            const newProduct = {
                id: uuidv4(),
                productName,
                price,
                qty
            };
            products.push(newProduct);
            return newProduct;
        },
        updateProduct: (_, { id, productName, price, qty }) => {
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex === -1)
                return null;
            const updatedProduct = Object.assign(Object.assign({}, products[productIndex]), { productName: productName || products[productIndex].productName, price: price !== undefined ? price : products[productIndex].price, qty: qty !== undefined ? qty : products[productIndex].qty });
            products[productIndex] = updatedProduct;
            return updatedProduct;
        },
        deleteProduct: (_, { id }) => {
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex === -1)
                return null;
            const deletedProduct = products[productIndex];
            products.splice(productIndex, 1);
            return deletedProduct;
        }
    }
};

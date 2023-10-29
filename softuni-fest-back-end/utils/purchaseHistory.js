const { getBusinessById } = require("../services/businesses");
const { getById } = require("../services/products");
const { getUserById } = require("../services/users");

async function addPurchaseHistory(customerId, productId, paymentMethod) {
    try {
        const user = await getUserById(customerId);
        const business = await getBusinessById(customerId);
        const product = await getById(productId);
        if(!product){
            throw new Error('Product not found');
        }
        
        const purchaseInfo = {
            product: {
                name: product.name,
                description: product.description,
                price: product.price
            },
            paidWith: paymentMethod
        };
        if(!user){
            business.purchases.push(purchaseInfo);
            await business.save();
            return business.purchases;
        }else{
            user.purchases.push(purchaseInfo);
            await user.save();
            return user.purchases;
        }

    } catch (err) {
        console.log(err);
    }
}

async function getPurchaseHistory(customerId) {
    try {
        const user = await getUserById(customerId);
        const business = await getBusinessById(customerId);
        if(!user){
            return business.purchases;
        }else{
            return user.purchases;
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addPurchaseHistory,
    getPurchaseHistory
};
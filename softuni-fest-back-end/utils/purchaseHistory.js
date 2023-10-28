const { getBusinessById } = require("../services/businesses");
const { getUserById } = require("../services/users");

async function addPurchaseHistory(customerId, productId, paymentMethod) {
    try {
        const user = await getUserById(customerId);
        const business = await getBusinessById(customerId);
        const purchaseInfo = {
            product: productId,
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
            console.log(business.purchases);
            return business.purchases;
        }else{
            console.log(user.purchases);
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


const { getBusinessById } = require("../services/businesses");
const { getUserById } = require("../services/users");

// }
async function addPurchaseHistory(customerId, productId) {
    try {
        const user = await getUserById(customerId);
        const business = await getBusinessById(customerId);
        if(!user){
            business.purchases.push(productId);
            await business.save();
            return business.purchases;
        }else{
            user.purchases.push(productId);
            await user.save();
            return user.purchases;
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addPurchaseHistory,
};
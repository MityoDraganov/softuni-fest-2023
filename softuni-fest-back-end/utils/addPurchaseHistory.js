

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
            console.log(business.purchases);
            return business.purchases;
        }else{
            user.purchases.push(productId);
            await user.save();
            console.log(user.purchases);
            return user.purchases;
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addPurchaseHistory,
};
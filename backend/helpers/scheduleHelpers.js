
exports.printCollection = async (collection) => {
    return await collection.find({}).toArray();
};
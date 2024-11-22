export function getNameById(id, data) {
    const product = data.filter((item) => item._id == id);
    return product[0]?.name;
}

export function getPriceById(id, data) {
    const product = data.filter((item) => item._id == id);
    return product[0].price;
}
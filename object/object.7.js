
function transformObjectArray(products, config){

    for (const key in config) {
        if( !Object.hasOwn(config, key )) continue;

        switch(key){
        case 'filter':
            products = products.filter(item => eval(`${item[config[key].key]} ${config[key]. operator} ${config[key].value}`)
            )
            break;
        case 'map':
            products = products.map(item => {
                item.priceWithTax = eval(config[key].priceWithTax.replace(`price`, item.price))
                return item 
            })
            break;
        case 'sort':
            products = products.sort((a, b) => config[key].order == 'desc' ? b[config[key].key] - a[config[key].key] :  a[config[key].key] - a[config[key].key] )
            break;

        case 'group':
            products = products.reduce((acc, item) => ({
                ...acc,
                [item.category]: [...(acc[item.category] || []), item]
            }), {})
        }
    }
    

    

    return products
}


let products = [
  { id: 1, name: "Laptop", price: 1000, category: "Electronics", rating: 4.5 },
  { id: 2, name: "Phone", price: 500, category: "Electronics", rating: 4.2 },
  { id: 3, name: "Book", price: 20, category: "Education", rating: 4.8 }
];

let config = {
  filter: { key: "price", operator: ">=", value: 100 },
  map: { priceWithTax: "price * 1.1" },
  sort: { key: "rating", order: "desc" },
  group: "category"
};

console.log(transformObjectArray(products, config));

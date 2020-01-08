const CART = {
    KEY: 'MYFUKINGWOWCART',
    contents: [],
    init() {
        //check localStorage and initialize the contents of CART.contents
        let _contents = localStorage.getItem(CART.KEY);
        
        if (_contents) {
            CART.contents = JSON.parse(_contents);
        } else {
            
            CART.sync();
        }
    },
    async sync() {
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart);
    },
    find(id){
        //find an item in the cart by it's id
        let match = CART.contents.filter( item => {
            if (item.id == id)
                return true;
        });

        if(macth && match[0])
            return match[0];
    },
    add(id){
        //add a new item to the cart
        //check that it is not in the cart already
        if (CART.find(id)) {
            CART.increase(id, 1);
        } else {
            //PRODUCTS is an object that has the array of data that came from server
            //that is the product that we're displaying
            let arr = PRODUCTS.filter(product => {
                if (product.id == id){
                    return true;
                }
            });

            if (arr && arr[0]) {
                let obj = {
                    id: arr[0].id,
                    item_name: arr[0].item_name,
                    qty: 1,
                    price: arr[0].price
                };

                CART.contents.push(obj);

                //update localStorage
                CART.sync();
            } else {
                //product id does not exist in products data
                console.error('Invalid Product');
            }
        }
    },
    increase(id, qty=1) {
        //increase the quantity of an item in the cart
        CART.contents = CART.contents.map(item=>{
            if (item.id === id)
                item.qty = item.qty + qty;
            return item;
        });

        //update localStorage
        CART.sync();
    },
    reduce(id, qty) {
        //reduce the quantity of an item in the cart
        CART.contents = CART.contents.map(item => {
            if (item.id === id){
                item.qty = item.qty - qty;
            }

            return item;
        });

        CART.contents.forEach(async item => {
            if (item.id === id && item.qty === 0){
                await CART.remove(id);
            }
        });

        //update localStorage
        CART.sync();
    },
    remove(id) {
        //remove an item entirely from CART.contents based on it's id
        CART.contents = CART.contents.filter(item => {
            if (item.id !== id){
                return true;
            }
        });

        //update localStorage
        CART.sync();
    },
    empty() {
        //empty whole cart
        CART.contents = [];

        //update localStorage
        CART.sync();
    },
    logContents(prefix) {
        console.log(prefix, CART.contents);
    }
};

module.exports = CART;
import fs from "fs"

export class ProductManager{
    
    constructor(){
        this.products = [];
        this.path = "./data/products.json";
    }

    addProduct(product){
        this.getProducts();
        const {title, description, price, thumnail, code, stock, category, status} = product;
        if(title === "" || description === "" || price === "" || thumnail === "" || code === "" || stock === "", category === "", status === ""){
            throw new Error("debe completar todos los campos.");
        }

        if(this.products.some((p) => p.code === code)){
            throw new Error("el producto ya existe")
        }

        const newProduct = {
            id: this.products.length + 1,
            title: title,
            description: description,
            price: price,
            thumnail: thumnail,
            code: code,
            stock: stock,
            status: status,
            category: category,
        };

        this.products.push(newProduct);
        console.log("producto agregado correctamente");

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log("producto guardado exitosamente");
            return newProduct;
        } catch (error) {
            console.error("no se guardo el producto", error);
            throw error;
        }
    }

    getProducts(){
        try {
            const data = fs.readFileSync(this.path, "utf8");
            this.products = JSON.parse(data);
            return this.products;

        } catch (error) {
            console.error("error al leer el archivo", error);
            return [];
        }
        
    }

    getProductsById(id){
        this.getProducts();
        const product = this.products.find((p) => p.id === id);
        if(product){
            return product;
        } else {
            console.log(`el producto con id ${id} no existe`);
        }
    }

    updatesProduct(id, productActualizado){
        this.getProducts();
        const productId = this.products.find((product) => product.id === id);
        if(productId){
            const Index = this.products.findIndex((product) => product.id === id);
            this.products[Index] = {id, ...productActualizado};
            try {
                fs.writeFileSync(this.path, JSON.stringify(this.products));
                console.log("archivo actualizado");
            } catch (error) {
                console.error("no se pudo actualizar el archivo", error);
            }
        } else {
            console.log("no se encontro el producto");
        }
    }

    deleteProduct(id){
        this.getProducts();
        const productId = this.products.find (product => product.id === id);
        if(productId){
            const Index = this.products.findIndex (product => product.id === id);
            this.products.splice(Index, 1);
            try {
                fs.writeFileSync(this.path, JSON.stringify(this.products));
                console.log("archivo eliminado exitosamente");
            } catch (error) {
                console.error("no se pudo eliminar el archivo");
            }
        } else {
            console.log("no se encontro el producto");
        }
    }
}



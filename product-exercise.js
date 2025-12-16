const tbody = document.getElementById('productTableBody')
const name = document.getElementById('name')
const price = document.getElementById('price')
const color = document.getElementById('color')
const category = document.getElementById('category')
const model = document.getElementById('model')
const form = document.getElementById('productForm')

let products = []
let autoId =1 
function createProduct(){
    const newProduct = {
        id: autoId++,
        name: name.value,
        price: parseFloat(price.value),
        color: color.value,
        category: category.value,
        model: model.value
    }

    products.push(newProduct)
    renderProducts()
    clearValue()
    console.log(newProduct);
    
}
 
function renderProducts(){
    tbody.innerHTML = ""
    products.forEach(product => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td class="px-6 py-4">${product.id}</td>
            <td class="px-6 py-4 font-medium text-gray-900">${product.name}</td>
            <td class="px-6 py-4">${product.color}</td>
            <td class="px-6 py-4">${product.category}</td>
            <td class="px-6 py-4">${product.price}</td>
            <td class="px-6 py-4 text-center">
              <button onclick="" class="bg-blue-600 px-2 py-2 rounded-md text-white hover:underline">Edit</button>
              <button onclick="" class="bg-red-600 px-2 py-2 rounded-md text-white hover:underline">Delete</button>
            </td>
        `
        tbody.append(tr)
    })
}
function clearValue(){
    name.value = ""
    price.value = ""
    color.value= ""
    category.value = ""
    model.value = ""
    
}


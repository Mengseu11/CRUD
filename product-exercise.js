const tbody = document.getElementById('productTableBody')
const id = document.getElementById('id')
const name = document.getElementById('name')
const price = document.getElementById('price')
const color = document.getElementById('color')
const category = document.getElementById('category')
const form = document.getElementById('productForm')
const btnCreate = document.getElementById('btnCreate')
const btnUpdate = document.getElementById('btnUpdate')
const filterSelect = document.getElementById('filterSelect')
const searchInput = document.getElementById('searchInput')

let products = []
let productIndex;
document.addEventListener('DOMContentLoaded', function() {
      console.log('first load')
       loadFromCookie()
      renderProducts()
    //   const cookieName = getCookie('name')
    //   if(cookieName === ""){
    //     window.location.href = "login.html"
    //   }
    //   labelName.innerHTML = `<span style="color: red">${cookieName}</span>`
});

const FetchData = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')              
        const data = await response.json()
        console.log('data',data)
        renderProducts(data);
    } catch (error) {
        console.log('error',error);
        
    }    
}


function createProduct(){
    const newProduct = {
        id: products.length +1,
        name: name.value,
        price: parseFloat(price.value),
        color: color.value,
        category: category.value,
    }

    products.push(newProduct)
    saveToCookie()
    // saveToStorage()
    renderProducts()
    clearValue()
    console.log(newProduct);
    
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function saveToCookie(){
    document.cookie = `products = ${JSON.stringify(products)}`
}
function loadFromCookie(){
    const data = getCookie('products')
    if(data){
        products = JSON.parse(data)
    } 
}
// function saveToStorage(){
//     localStorage.setItem("products",JSON.stringify(products))
// }
// function loadFromStorage(){
//     const data = localStorage.getItem('products')
//     if(data){
//         products = JSON.parse(data)
//     }
// }
// function removeFromStorage(){
//     localStorage.removeItem('products')
//     products=[]
//     renderProducts()
// }
function editProduct(index){
    const product = products[index]
    // id.value = product.id
    name.value = product.name
    color.value = product.color
    category.value = product.category
    price.value = product.price
    console.log(index);
    console.log(product);
    
    
    productIndex = index
    console.log("hello");
    openModal()
    
    btnCreate.style.display ='none'
    btnUpdate.style.display = 'inline-block'

}
function updateProduct(){
    const proUpdate = {
        id: products.length +1,
        name: name.value,
        price: parseFloat(price.value),
        color: color.value,
        category: category.value
    }
    products[productIndex] = proUpdate
    // saveToStorage()
    closeModal()
    btnCreate.style.display ='inline-block'
    btnUpdate.style.display = 'none'
    saveToCookie()
    renderProducts()
    

}
function deleteProduct(index){
    products.splice(index,1)
    console.log('delete',index);
    
   renderProducts() 
}

function searchFilter(){
    const userSearch = searchInput.value.toLowerCase()

    const result = products.filter(product => product.name.toLowerCase().includes(userSearch))
    renderProducts(result)
}
function selectFilter(){
    const productSelect = filterSelect.value
        console.log('category', productSelect);
        
    let result = products
    if(productSelect == 'Laptop'){
        result = products.filter(product => product.category == 'Laptop')
    }else if(productSelect == 'Phones'){
        result = products.filter(product => product.category == 'Phones')
    }else if(productSelect == 'Accessories'){
        result = products.filter(product => product.category == 'Accessories')
    }
    renderProducts(result)

}
 
function renderProducts(productList = FetchData()){
    tbody.innerHTML = ""
    productList.forEach((product, index) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td class="px-6 py-4">${product.id}</td>
            <td class="px-6 py-4 font-medium text-gray-900">${product.name}</td>
            <td class="px-6 py-4">${product.email}</td>
            <td class="px-6 py-4">${product.phone}</td>
            <td class="px-6 py-4">${product.address.city}</td>
            <td class="px-6 py-4 text-center">
              <button onclick="editProduct(${index})" class="bg-blue-600 px-2 py-2 rounded-md text-white hover:underline">Edit</button>
              <button onclick="deleteProduct(${index})" class="bg-red-600 px-2 py-2 rounded-md text-white hover:underline">Delete</button>
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
    
}


function openModal(){
    document.getElementById('crud-modal').classList.remove('hidden')
}
function closeModal(){
    document.getElementById('crud-modal').classList.add('hidden')
}

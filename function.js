
/**
 * burada ise sayfaya eklenen listenin basliklarini eklemek icin yazdigimiz bir fonksiyon var bir kez yazilmasi yeterli olacagindan alttaki fonksiyona eklemedim.
 */
function printBig() {
    mainList.innerHTML = `
    <tr>
    <th class="date-text">Product Name</th>
    <th class="date-text">Price</th>
    <th class="date-text">Exp.Date</th>
    <th class="date-text"></th>
    <th class="date-text">Calories</th>
    </tr>`
}

/**
 * bu fonksiyon sayfaya listeyi yazdirmak icin eklenmis bir fonksyion
 */
function render() {
    let result = productList.map(function (product, index) {
        printBig()
        return `<tr>
              <td>${product.productName}</td>
              <td>${product.price} Fr</td>
              <td>${(product.expireDate).toDateString()}</td>
              <td><img src="${product.productImage}"></td>
              <td>${product.totalCalories}</td>
              <td><button id="${product.productName}${[index]}"><i class="fa fa-cart-plus fa-2x" aria-hidden="true"></i></button></td>
              </tr>`
    }).join("")
    mainList.innerHTML += result
}
/**
 * bu fonksiyon ise ekle dugmesine basildiginda bos olan sepet array ina urunun bilgielrini ve fiyatini atiyor ve listeyi guncel tutuyor
 */
function addToCart() {
    productList.map(function (shoplist, index) {
        document.getElementById(`${shoplist.productName}${[index]}`).addEventListener("click", function () {
                cartList.push({
                    "productName": shoplist.productName,
                    "price": shoplist.price,
                    "productImage": shoplist.productImage
                })
                priceList.push(shoplist.price)
                county()
                intZero()
                renderCart()
            }

        )
    })
}
/**
 * bu fonksiyon sayfada etkilesim olsa bile html e yazilan elementleri guncel tutuyor ve surekli yeniliyor
 */
function renderCart() {
    let resultCart = cartList.map(function (addto, index) {
        return `<tr>
              <td>${addto.productName}</td>
              <td>${addto.price}</td>
              <td><img src="${addto.productImage}"></td>
              <td><button id="${index}"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button></td>
              </tr>`
    }).join("")
    shoppingList.innerHTML = resultCart
    removeProduct()
}

/**
 * burada yazdigim fonksiyonda remove dugmesine bastigimizda sepetten bir urunu ve fiyatini silip listeyi guncel tutuyor
 */
let removeProduct = () => {
    cartList.map((shoplist, index) => {
        document.getElementById(`${index}`).addEventListener("click", function (e) {
            cartList.splice(index, 1)
            priceList.splice(index, 1)
            countymin()
            intZero()
            renderCart()
        })
    })

}
/**
 * Burada sepete eklenen urunlerin toplam fiyatini hesapladim.ve sepette urun kalmadigi zaman sifira sabitleyen fonksiyonu yazdim.
 */
function sumTotal() {
    let totalPrice = `${(priceList.reduce(reducer)).toFixed(1)} Fr`
    totalInput.value = totalPrice

}

function intZero() {
    if (priceList.length !== 0) {
        sumTotal()
    } else {
        totalInput.value = "0.0 Fr"
    }
}
/**
 * bu ikisi bir sayac fonksiyonu 
 */
function county() {
    count++;
    counterButton.innerHTML = `${count} items in your cart `
}

function countymin() {
    count--;
    counterButton.innerHTML = `${count} items in your cart `
}
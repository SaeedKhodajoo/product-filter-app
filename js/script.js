const filtersEl = document.querySelectorAll('.filter-box ul li')
const productsEl = document.querySelectorAll('.product')
const productsContainer = document.querySelector('.products')
const select = document.querySelector('#select')
const search = document.querySelector('.search-box form')
const searchInput = document.querySelector('#search')
let products = Array.from(productsEl)

productsEl.forEach(productEl => {
    const productName = productEl.querySelector('.product-details h3').textContent
    productEl.setAttribute('data-category', productName)
    const productPriceString = productEl.querySelector('.product-details .product-price span').textContent.trim()
    productPrice = parseFloat(productPriceString)
    productEl.setAttribute('data-price', productPrice)
})

filtersEl.forEach(filterEl => {
    filterEl.addEventListener('click', e => {
        e.preventDefault()
        filtersEl.forEach(el => {
            el.classList.remove('active')
        })
        filterEl.classList.add('active')

        const filter = filterEl.getAttribute('data-filter')


        productsEl.forEach(productEl => {

            if (filter == 'all') {
                productEl.style.display = 'block'
            } else {
                if (productEl.getAttribute('data-category') == filter) {
                    productEl.style.display = 'block'
                } else {
                    productEl.style.display = 'none'
                }
            }
        })


    })
})


select.addEventListener('change', () => {

    if (select.value === 'default') {
        while (productsContainer.firstChild) { productsContainer.removeChild(productsContainer.firstChild); }
        productsEl.forEach(productEl => {
            productsContainer.append(productEl)
        })
    } else if (select.value === 'hightolow') {
        sortElem(productsContainer, products, false)
    } else {
        sortElem(productsContainer, products, true)
    }
})

function sortElem(field, li, asc) {
    let dm, sortli;
    dm = asc ? 1 : -1;
    sortli = li.sort((a, b) => {
        const ax = parseFloat(a.getAttribute('data-price'));
        const bx = parseFloat(b.getAttribute('data-price'));
        return ax > bx ? (1 * dm) : (-1 * dm);
    });
    while (field.firstChild) { field.removeChild(field.firstChild); }
    field.append(...sortli);
}


search.addEventListener('submit', (e) => {
    e.preventDefault()
    const filter = document.querySelector('.filter-box .active').getAttribute('data-filter')
    const searchTerm = searchInput.value.toLowerCase()
    productsEl.forEach(product => {
        if (filter == 'all') {
            if (product.querySelector('.product-details h3').textContent.includes(searchTerm)) {
                product.style.display = 'block'
            } else {
                product.style.display = 'none'
            }
        } else if (product.getAttribute('data-category') == filter) {
            if (product.querySelector('.product-details h3').textContent.includes(searchTerm)) {
                product.style.display = 'block'
            } else {
                product.style.display = 'none'
            }
        }
    })
    searchInput.value = ''
})
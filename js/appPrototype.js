
function Insure(brand, year, type) {
    this.brand = brand
    this.year = year
    this.type = type
}

Insure.prototype.quoteInsure = (brand, year,type) => {
    /*
        1 = americano -> value 1.5
        2 = asiatico -> value 1.05
        3 = europeo -> value 1.35
    */
    let quantity
    const basicQuote = 2000

    switch (brand) {
        case '1':
            quantity = basicQuote * 1.15
            break;
        case '2':
            quantity = basicQuote * 1.05
            break;
        case '3':
            quantity = basicQuote * 1.35
            break;
        default:
            break;
    }

    let differenceYear = new Date().getFullYear() - year
    //Each year difference must be reduced by 3% the value
    quantity -= ((differenceYear * 3) * quantity) / 100

    /*
        if insure is standard it multiply by 30% more
        if insure is premium it multiply by 50% more
    */
    if (type === 'basico') {
       quantity *= 1.30
    } else {
       quantity *= 1.50
    }

    return quantity.toFixed(2)
}

function Interface() {}

Interface.prototype.getMessage = (message, type) => {
    let div = document.createElement('div')

    if (type === 'error') {
        div.classList.add('message', 'error')
    } else {
        div.classList.add('message', 'correcto')
    }
    div.innerHTML = `${message}`
    form.insertBefore(div, document.querySelector('.form-group'))

    setTimeout(() => {
        document.querySelector('.message').remove()
    }, 3000)
}

Interface.prototype.getResult = (ins, qua) => {
    let result = document.getElementById('resultado')
    let brand
    switch (ins.brand) {
        case '1':
            brand = 'Americano'
            break;
        case '2':
            brand = 'Asiatico'
            break;
        case '3':
            brand = 'Europeo'
            break;
        default:
            break;
    }

    let div = document.createElement('div')
    div.innerHTML = `
        <p class="header">
            Resumen:            
        </p>
        <p>MARCA: ${ins.brand}. </p>
        <p>AÑO: ${ins.year}.    </p>
        <p>TIPO: ${ins.type}.   </p>
        <br>
        <p>TOTAL: ${qua}.       </p>
    `
    const spinner = document.querySelector('#cargando img')
    spinner.style.display = 'block'
    setTimeout(() => {
        spinner.style.display = 'none'
        result.appendChild(div)
    }, 3000)
}

const form = document.getElementById('cotizar-seguro')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let brand = document.getElementById('marca')
    let selectedBrand = brand.options[brand.selectedIndex].value
    
    let year = document.getElementById('anio')
    let selectedYear = year.options[year.selectedIndex].value

    let type = document.querySelector('input[name = "tipo"]:checked').value

    const interface = new Interface();

    if (selectedBrand === '' || selectedYear === '' || type === '') {
         interface.getMessage('Faltan datos, revisa el formulario e intenta de nuevo', 'error')
    } else {
        const results = document.querySelector('#resultado div')

        if (results != null ) {
            results.remove()
        }

        const insure = new Insure(selectedBrand, selectedYear, type)

        const quantity = insure.quoteInsure(selectedBrand, selectedYear, type)
        interface.getResult(insure, quantity)
        interface.getMessage('Cotizando...', 'correcto')
    }
}) 

const max = new Date().getFullYear(),
      min = max - 20

const getYear = document.getElementById('anio')

for (let i = max; i > min; i--) {
    let option = document.createElement('option')
    option.value = i
    option.innerHTML = i

    getYear.appendChild(option)
}
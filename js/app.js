
function Insure(brand, year, type) {
    this.brand = brand
    this.year = year
    this.type = type
}

function Interface() {}

Interface.prototype.getError = (message, type) => {
    let div = document.createElement('div')

    if (type === 'error') {
        div.classList.add('message', 'error')
    } else {
        div.classListadd('message', 'correcto')
    }
    div.innerHTML = `${message}`
    form.insertBefore(div, document.querySelector('.form-group'))

    setTimeout(() => {
        document.querySelector('.message').remove()
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
         interfaz.getError('Faltan datos, revisa el formulario e intenta de nuevo', 'error')
    } else {

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
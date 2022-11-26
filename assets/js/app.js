// bloque 1: URL base para las peticiones
const baseUrl = 'https://restcountries.com/v2/all';

// bloque 2: Función que hace las peticiones a la API y retorna los resultados
const request = async (url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}

// bloque 3: Función que crea una url y llama a la función request()
// enviandole la url como parámetro
const getPopulation = async (population) => {
    const url = `${baseUrl}/${population}`
    return request(url);
}

// bloque 4: Función que crea una url y llama a la función request()
// enviandole la url como parámetro
const getRegion = async (population,capital,region) => {
    const url = `${baseUrl}/${population}/capital=${capital}&region=${region}`;
    return request(url);
}

// bloque 5: Ejecución de la aplicación por medio del evento submit,
// que realiza la implementación en base a Promesas 
let formulario = document.querySelector('form');

// Escucha evento submit del formulario
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    //Captura los valores de los campos del formulario
    const population = document.getElementById('population').value;
    const capital = document.getElementById('capital').value;
    const region = document.getElementById('region').value;

    // Promise.all llamando las dos funciones getUser() y getRepo()
    Promise.all([getPopulation(population),getRegion(population,capital,region)])
        .then(resp => {
        
       // Area de Resultados
       let resultados = document.getElementById('resultados');

        // IF-ELSE, IF para detectar error, else para mostrar datos en página web
            if (resp[0].name === null) {
            // Limpia área de Resultados
            resultados.innerHTML = '';
                
            // Crea error personalizado
            throw new Error('El país no existe');
        } else {
            // Agrega las filas a la columna 1
            resultados.innerHTML = `
        <
            article class = "card" >
            <
            img src = "${item.flag}"
        alt = "" / >
            <
            div class = "card-content" >
            <
            h3 > $ {
                item.name
            } < /h3> <
        p >
            <
            b > $ {
                item.population
            } < /b>
        5000000
            <
            /p> <
        p >
            <
            b > $ {
                item.capital
            } < /b>
        Santiago
            <
            /p> <
        p >
            <
            b > $ {
                item.region
            } < /b>
        América
            <
            /p> < /
        div > <
            /article >
        `

            // Ciclo FOR para agregar repositorios en la columna 2
            for( let i=0; i < resp[1].length; i++){
                $('#segunda_columna').append(`<a href=${resp[1][i].html_url} target='_blank'>${resp[1][i].name}</a></br>`);
            }
        }
    })
    .catch(err => alert(err)); //Atrapa el error y muestra un alert() 

    // Limpia los campos del formulario en cada evento submit
    document.getElementById('population').value = '';
    document.getElementById('capital').value = '';
    document.getElementById('region').value = '';
})
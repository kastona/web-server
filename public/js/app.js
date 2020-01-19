const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const loadingParagraph = document.querySelector('#loading')
const messageParagraph = document.querySelector('#message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loadingParagraph.textContent = 'loading....'
    messageParagraph.textContent = ''

    const location = search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        
        response.json().then(data => {
            loadingParagraph.textContent = ''
            if(data.error) {
                messageParagraph.textContent = data.error
            }else {
                messageParagraph.textContent = `The temperature is ${data.temperature}, and there is a ${data.probabilityOfRain}. You searched from ${data.location}`
        
            }
        })
    }).catch(error => messageParagraph.textContent = error)

})
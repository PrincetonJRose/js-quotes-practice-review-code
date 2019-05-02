// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

const form = document.getElementById('new-quote-form')

document.addEventListener('DOMContentLoaded',()=>{
    getQuotes();
    form.addEventListener('submit',formHandler)
})

function handleEdit(e)
{
    const id = e.target.parentElement.parentElement.dataset.id
    const newQuote = prompt("Enter new Quote")

    fetch(`http://localhost:3000/quotes/${id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            quote: newQuote
        })
    })
    .then(()=>{
        updateQuote(e,newQuote)
    })
    .catch((error)=>console.log(error))
}


function handleLike(e){
    const newLikes = parseInt(e.target.dataset.likes) + 1

    fetch(`http://localhost:3000/quotes/${e.target.parentElement.parentElement.dataset.id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            likes: newLikes
        })
    })
    .then(()=>{
        updateLikesOnPage(e,newLikes)
    })
    .catch((error)=>console.log(error))
}

function updateQuote(e,newQuote){
    const p = e.target.parentElement.querySelector('p')
    p.innerText = newQuote
}

function updateLikesOnPage(e,newLike){
    e.target.dataset.likes = newLike
    const span = e.target.querySelector('span')
    span.innerText = newLike
}

function handleDelete(e){
    fetch(`http://localhost:3000/quotes/${e.target.parentElement.parentElement.dataset.id}`,{
        method: 'DELETE'
    })
    .then((res)=>{
        console.log(res)
        e.target.parentElement.parentElement.remove()
    })
    .catch((error)=>console.log(error))
}

function formHandler(e){
    e.preventDefault()
    let newQuote = {
        quote: e.target['new-quote'].value,
        author: e.target['author'].value,
        likes: 0
    }
    e.target.reset();
    addQuotes(newQuote)
}

function addQuotes(quote){
    fetch('http://localhost:3000/quotes',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(quote)
    })
    .then((res)=>res.json())
    .then((quote)=>{
        const quoteObj = new Quotes(quote.quote,quote.author,quote.likes,quote.id)
        quoteObj.buildQuoteCard(quote)
    })
}

function getQuotes(){
    fetch('http://localhost:3000/quotes')
    .then((res)=>res.json())
    .then((quotes)=>quotes.forEach((quote)=>{
        const quoteObj = new Quotes(quote.quote,quote.author,quote.likes,quote.id)
        quoteObj.buildQuoteCard(quote)
    }))
    .catch((error)=>console.log(error))
}


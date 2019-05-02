class Quotes{

    constructor(quote,author,likes=0, id){
        this.quote = quote
        this.author = author
        this.likes = likes
        this.id = id
    }

    buildQuoteCard = ()=>{
        const ul = document.querySelector('#quote-list')
        
        let li = document.createElement('li')
        li.className = 'quote-card'
        li.dataset.id = this.id
        
        let blockquote = document.createElement('blockquote')
        blockquote.className = 'blockquote'

        let p = document.createElement('p')
        p.className = 'mb-0'
        p.innerText = this.quote

        let footer = document.createElement('footer')
        footer.className = 'blockquote-footer'
        footer.innerText = this.author

        let successBtn = document.createElement('button')
        successBtn.className = 'btn-success'
        successBtn.dataset.likes = this.likes
        successBtn.innerHTML = `Likes: <span>${this.likes}</span>`
        successBtn.addEventListener('click',handleLike)

        let dangerBtn = document.createElement('button')
        dangerBtn.className = 'btn-danger'
        dangerBtn.innerText = 'Delete'
        dangerBtn.addEventListener('click',handleDelete)

        let editBtn = document.createElement('button')
        editBtn.className = 'btn-edit'
        editBtn.innerText = 'Edit'
        editBtn.addEventListener('click',handleEdit)

        blockquote.appendChild(p)
        blockquote.appendChild(footer)
        let br = document.createElement('br')
        blockquote.appendChild(br)
        blockquote.appendChild(successBtn)
        blockquote.appendChild(dangerBtn)
        blockquote.appendChild(editBtn)

        li.appendChild(blockquote)
        ul.appendChild(li)
    }
}
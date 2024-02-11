const accessKey = "fb3qMq9GG-gkFrphKJuwiJVJb7AV9KKOb-lnwYxbNBQ"

const form = document.querySelector(".form")
const search_img = document.querySelector(".search_img")
const cards = document.querySelector(".cards")
const showMore = document.querySelector(".showMoreBtn")




var inputData = ""
var page = 1


async function searchImages() {
    inputData = search_img.value
    const api_link = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`


    const req = await fetch(api_link)
    const data = await req.json()

    const results = data.results

    if(page === 1){
        cards.innerHTML= ""
    }

    results.map((result)=>{
        const imageWrapper = document.createElement(`div`)
        imageWrapper.classList.add("card")
        const image = document.createElement(`img`)
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement(`a`)
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        cards.appendChild(imageWrapper)

        page++

        if(page > 1){
            showMore.style = " display: block;"
        }
    })
}

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    page = 1
    searchImages()
})


showMore.addEventListener("click", ()=>{
    searchImages()
})
class Mtg {
    
    constructor(baseUrl = "https://api.magicthegathering.io/v1/") {
        this.baseUrl = baseUrl;
        this.pages = new Set()
        this.countPage = 5
    }

    RandomPages() {
        while (this.pages.size !== this.countPage) {
            let randomNumber = Math.floor(Math.random() * 10) + 1;
            this.pages.add(randomNumber)
        }
    }

    loadCards(cardf=''){
        const url = `${this.baseUrl}cards` + `?name=${cardf}`
        console.log(url)
        return fetch(url)
            .then(response=>response.json())
            .then(json=>json.cards)
    }
        
    
}


export {Mtg}

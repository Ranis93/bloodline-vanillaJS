window.addEventListener('DOMContentLoaded', () => { 
    let activeCard = "none";
    const cards = document.querySelectorAll('.main__card'),
          main = document.querySelector('.main'),
          begginning = document.querySelector('.beginning'),
          useful = document.querySelector('.useful'),
          content = document.querySelector('.blbooks');

    function store(){
        switch (activeCard) {
            case "blbooks":
                main.style.display = "none"
                begginning.style.display = "none"
                content.style.display = "block"
                useful.style.display = "block"
                break;            
            default:
                main.style.display = "block"
                content.style.display = "none"
                break;
        }
        console.log("Обращение к store")
    }

    cards.forEach((card, idx) => {
        card.addEventListener("click", ()=>{
            main.style.display = 'none';
            switch (idx) {
                case 1:
                    activeCard = "blbooks"
                    break;            
                default:
                    activeCard = "none"
                    break;
            }
            store();
        })
    })
    


})
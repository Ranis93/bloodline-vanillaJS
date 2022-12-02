window.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.main'),
          begginning = document.querySelector('.beginning'),
          useful = document.querySelector('.useful'),
          bredcrumbsList = document.querySelector('.bredcrumbs__list'),
          headerBurgerMenu = document.querySelector('.header__burger-menu'),
          content = document.querySelector('.blbooks');
          

    function store(){
        let hash = window.location.hash.replace("#", '');
        useful.style.display = "none"   // Если сразу делать display:none - то слайдер не работает
        createBredcrumbs("Родословные книги");
        switch (hash) {
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
    function createBredcrumbs(name){
        const oldCurrentElem = document.querySelector('.bredcrumb.current');  
        if (oldCurrentElem.innerHTML !== name){
            oldCurrentElem.classList.remove("current");
            const element = document.createElement('div');
            const pointer = document.createElement('div');
            element.classList.add("bredcrumb", "current");
            pointer.classList.add("bredcrumb__pointer");
            element.innerHTML = `${name}`
            bredcrumbsList.appendChild(pointer)
            bredcrumbsList.appendChild(element)
        }
    }
    function addEvent(nodesClass) {
        const nodes = document.querySelectorAll(nodesClass)
        nodes.forEach((item, idx) => {
            item.addEventListener("click", ()=>{
                main.style.display = 'none';

                headerBurgerMenu.classList.remove('header__nav_active')
                switch (idx) {
                    case 1:
                        window.location.hash = "#blbooks"
                        break;            
                    default:
                        window.location.hash = ""
                        break;
                }
                store();
            })
        })
    }  

    addEvent('.main__card');
    addEvent('.nav_1');
    addEvent('.nav_2');
    addEvent('.nav_3');
    store();
    


})
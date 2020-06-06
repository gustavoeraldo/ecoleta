
// function findIbge(url, elementSelect, content_type){
//     fetch(url)
//     .then(res => res.json())
//     .then(elements => {
//         elementSelect.innerHTML =`<option value>Selecione a ${content_type}</option>`;
//         for (const element of elements){
//             elementSelect.innerHTML += `<option value=${element.nome}>${element.nome}</option>`;
//             console.log(elementSelect.innerHTML);
//         }
//     });
// }

function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]");
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    // findIbge(url, ufSelect, "Estado");

    fetch(url)
    .then(res => res.json())
    .then( states => {
        // ufSelect.innerHTML = "<option value>Selecione o Estado</option>";
        for (const state of states){
            ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`;
        }
    });
}

populateUfs();

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("[name=state]");
    const ufValue = event.target.value;

    const indexSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexSelectedState].text;
    
    console.log(ufValue);

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.disabled = true;
    // citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    // findIbge(url, citySelect,"Cidade");
    fetch(url)
    .then(res => res.json())
    .then(cities => {
        
        for (const city of cities){
            citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`;
            console.log(city.nome);
        }
    });
    citySelect.disabled = false;
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

// Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li");

// Verifica se algum dos itens foi clicado
for (const item of itemsToCollect){
    // Caso tenha sido clicado será tratado com a função handleSelectedItem
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items");

// Guarda os itens selecionados
let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;
    // classList tem as funções add, remove ou toggle (adicionar ou remover)
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    // findIndex procura por todos os items do array
    // no caso dessa função, vericamos se o item já foi selecionado 
    // e por fim retorna o indice, caso contrário retornará -1 
    const alreadySelected = selectedItems.findIndex(item => {
        return item == itemId;
    });

    if(alreadySelected >= 0){
        // remover a seleção
        const filteredItems = selectedItems.filter(item =>{
            return item != itemId;
        });
        
        selectedItems = filteredItems;
    }else{
        selectedItems.push(itemId);
    }
    
    collectedItems.value = selectedItems;
}
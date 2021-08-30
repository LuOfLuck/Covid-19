const countrySelect = document.getElementById("countries")
const casesDiv = document.getElementById("cases")
const countryH1 = document.getElementById("contry-select")
const modalCountry = document.querySelector("#modal-country");
const liList = document.querySelectorAll(".articul--li")

const init = async() => {
    try{
        const date = await fetch('https://api.covid19api.com/summary');
        const jsonDate = await date.json();
        addCasesTable(jsonDate.Global.NewConfirmed, jsonDate.Global.NewDeaths, jsonDate.Global.NewRecovered, jsonDate.Global.TotalConfirmed, jsonDate.Global.TotalDeaths, jsonDate.Global.TotalRecovered)
    }catch(error){
        console.log(error);
    }
}
const addCasesTable = (newConfirmed,newDeaths,newRecovered,totalConfirmed,totalDeaths,totalRecovered) =>{
    document.getElementById("table--tr__new__confirmed").innerText = newConfirmed;
    document.getElementById("table--tr__new__deaths").innerText = newDeaths;
    document.getElementById("table--tr__new__recovered").innerText = newRecovered;

    document.getElementById("table--tr__total__confirmed").innerText = totalConfirmed;
    document.getElementById("table--tr__total__deaths").innerText = totalDeaths;
    document.getElementById("table--tr__total__recovered").innerText = totalRecovered;

}
init()

const getCountries = async() => {
    try{
        const date = await fetch('https://api.covid19api.com/countries');
        const jsonDate = await date.json();
        jsonDate.forEach(element => {
            let countryOption = document.createElement("option");
            countryOption.innerText = element.Country;
            countrySelect.appendChild(countryOption);
        });
    }catch(error){
        console.log(error);
    }
} 
console.log(getCountries());

const getCountry  = async() => {
    try{
        casesDiv.innerHTML = '';
        onload(document.body)
        countryH1.innerText = countrySelect.value;
        console.log(countrySelect.value)
        const date = await fetch(`https://api.covid19api.com/live/country/${countrySelect.value}]/status/confirmed`);
        const jsonDate = await date.json();
        if (jsonDate.length > 0){
            jsonDate.forEach(element => addCases(element));
            totalConfirmed = jsonDate[jsonDate.length - 1].Confirmed;
            totalDeaths = jsonDate[jsonDate.length - 1].Deaths;
            totalRecovered = jsonDate[jsonDate.length - 1].Recovered;

            newConfirmed =  totalConfirmed - jsonDate[jsonDate.length - 2].Confirmed;
            newDeaths = totalDeaths - jsonDate[jsonDate.length - 2].Deaths;
            newRecovered = totalRecovered - jsonDate[jsonDate.length - 2].Recovered;
            addCasesTable(newConfirmed,newDeaths,newRecovered,totalConfirmed,totalDeaths, totalRecovered)
            addButtonModal()
        }else{
            alertRegistrer()
        }
        finishedLoad(document.body)
    }catch(error){
        console.log(error);
        finishedLoad(document.body)
    }
    
} 
const addCases = (element) =>{
    let divFech = document.createElement("div")
    divFech.classList.add("linertime--fech")
    
    let divDate = document.createElement("p")
    divDate.classList.add("linertime--fech--date")
    divDate.innerText = element.Date.substr(0,10)
    divFech.appendChild(divDate); 

    let divCases = document.createElement("p")
    divCases.classList.add("linertime--fech--case", "linertime--fech--flacha")
    divCases.innerText = "Confirmed: " + element.Confirmed
    divFech.appendChild(divCases);

    let divDeadths = document.createElement("p")
    divDeadths.classList.add("linertime--fech--case", "linertime--fech--flacha")
    divDeadths.innerText = "Deaths: " + element.Deaths
    divFech.appendChild(divDeadths);

    let divRecovered = document.createElement("p")
    divRecovered.classList.add("linertime--fech--case", "linertime--fech--flacha")
    divRecovered.innerText = "Recovered: " + element.Recovered
    divFech.appendChild(divRecovered);

    let divActive = document.createElement("p")
    divActive.classList.add("linertime--fech--case", "linertime--fech--flacha")
    divActive.innerText = "Active: " + element.Active
    divFech.appendChild(divActive);


        
    casesDiv.appendChild(divFech);
    // tableDay.classList.add("")
}

const alertRegistrer = () => alert("no hay regristros");

const onload = (element) =>{
    let divLoad = document.createElement("div")
    let load = document.createElement("div")
    divLoad.classList.add("loading")
    load.classList.add("loading--div")
    divLoad.appendChild(load)
    element.appendChild(divLoad)
}

const finishedLoad = (element) =>{
    let loading = document.querySelector(`#${element.id} > .loading`);
    element.removeChild(loading)
}

const returnModal = (modalCountry) => modalCountry.classList.add("open-modal");

const closeModal = (modalId) => document.getElementById(modalId).classList.remove("open-modal");

const addButtonModal = () => {
    if(document.getElementById("button-info")) return false
    let button = document.createElement("button");
    button.innerText = "mas informacion";
    button.classList.add("form--sudmit");
    button.id = "button-info";
    let form = document.getElementById("form-buttos").appendChild(button);
    button.addEventListener("click",() => returnModal(modalCountry));
}


liList.forEach(li => li.addEventListener("click",() => document.querySelector(`#${li.id} > .articul--li--ul`).classList.toggle("ul-active")))
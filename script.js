let input1 = document.querySelector("#input1");
    let input2 = document.querySelector("#input2");
    let select1 = document.querySelector("#select1");
    let select2 = document.querySelector("#select2");
    let euroBuy = document.querySelector("#euroBuy");
    let euroSale = document.querySelector("#euroSale");
    let dollarBuy = document.querySelector("#dollarBuy");
    let dollarSale = document.querySelector("#dollarSale");
    let url = "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";
    let btn = document.querySelector(".arrows");
    let selects = document.querySelectorAll(".custom-select");
    let select, option;
    
    input1.addEventListener("input", exchangeInput1);
    input2.addEventListener("input", exchangeInput1);
    document.addEventListener("click", closeAllSelect);
    input1.addEventListener("change", exchangeInput1);
    select2.addEventListener("change", exchangeInput1);

    btn.addEventListener("click", function(){
        let selOpt1 = document.querySelector(".d0");
        let selOpt2 = document.querySelector(".d1");
        let a,b,c,d;
            a = selOpt1.textContent;
            b = selOpt2.textContent;
            c = select1.value;
            d = select2.value;
            if(selOpt1.textContent != selOpt2.textContent){
                selOpt2.textContent = a;
                selOpt1.textContent = b;
                select1.value = d;
                select2.value = c;
            } 
        exchangeInput1();
    });

    
    fetch(url)
        .then(response => response.json())
        .then(json => getData(json))
    
    createCustomSelect();
    function getData(json){
        for(i = 0; i < json.length; i++){
            let currency = json[i];
            if(currency.ccy == "USD"){
                dollarBuy.innerHTML = currency.buy;
                dollarSale.innerHTML = currency.sale;
                }
            if(currency.ccy == "EUR"){
                euroBuy.innerHTML = currency.buy;
                euroSale.innerHTML = currency.sale;
                }
            }
        }
    function exchangeInput1(){
        if(isNaN(input1.value)) {
            input2.value == "";
            return;
        }
        if(select1.value == select2.value){
            input2.value = +input1.value;
            input2.value = Math.floor(input2.value*100)/100;
        }
        if(select1.value == "EUR" && select2.value == "UAH"){
            input2.value = +input1.value * euroBuy.textContent;
            input2.value = Math.floor(input2.value*100)/100;
        }
        if(select1.value =="USD" && select2.value == "UAH"){
            input2.value = +input1.value * dollarBuy.textContent;
            input2.value = Math.floor(input2.value*100)/100;
        }
        if(select1.value == "UAH" && select2.value == "EUR"){
            input2.value = +input1.value/ euroSale.textContent;
            input2.value = Math.floor(input2.value*100)/100;
        }
        if(select1.value == "UAH" && select2.value == "USD"){
            input2.value = +input1.value/ dollarSale.textContent;
            input2.value = Math.floor(input2.value*100)/100;
        }
        if(select1.value =="EUR" && select2.value =="USD"){
            input2.value = +input1.value * euroBuy.textContent/dollarSale.textContent;
            input2.value = Math.floor(input2.value*100)/100;
        }
        if(select1.value =="USD" && select2.value =="EUR"){
            input2.value = +input1.value * dollarBuy.textContent/euroSale.textContent;
            input2.value = Math.floor(input2.value*100)/100;
        }
    }
    
    function createCustomSelect(){
        for (let i = 0; i < selects.length; i++) {
        select = selects[i].querySelector("select");
        let divSelected = document.createElement("div");
        divSelected.classList.add("select-selected");
        divSelected.classList.add(`d${i}`);
        divSelected.innerHTML = select.options[select.selectedIndex].innerHTML;
        selects[i].append(divSelected);
    
        option = document.createElement("div");
        option.classList.add("select-items", "select-hide");
    
        createCustomOptions();
    
        selects[i].append(option);
        divSelected.addEventListener("click", selectedReaction);
    }
    }
    
    function createCustomOptions(){
        for (let j = 0; j < select.length; j++) {
            let itemOp = document.createElement("div");
            itemOp.innerHTML = select.options[j].innerHTML;
    
            itemOp.addEventListener("click", chooseSelected);
            itemOp.addEventListener("click", exchangeInput1);
            option.append(itemOp);
        }
    }
    
    function selectedReaction(e){
        e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
    }
    
    function chooseSelected(e){
        let upElem = this.parentElement; 
        let sel = upElem.parentElement.querySelector("select");
    
    
        for (let i = 0; i < sel.length; i++) {
            if (sel.options[i].innerHTML == this.innerHTML) {
                sel.selectedIndex = i;
                upElem.previousElementSibling.innerHTML = this.innerHTML;
                
            }
        }
    }
    
    function closeAllSelect(el) {
    let arr = [];
    let selItem = document.querySelectorAll(".select-items");
    let selSelected= document.querySelectorAll(".select-selected");
    for (let i = 0; i < selSelected.length; i++) {
        if (el == selSelected[i]) {
        arr.push(i)
        } else {
        selSelected[i].classList.remove("select-arrow-active");
        }
    }
    for (let i = 0; i < selItem.length; i++) {
        if (arr.indexOf(i)) {
        selItem[i].classList.add("select-hide");
        }
    }
    }
    

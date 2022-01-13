let bill_input_elem = document.querySelector("#bill-input");
let tip_buttons = document.querySelectorAll(".tip-button");
let custom_tip_elem = document.querySelector("#custom-input");
let people_input_elem = document.querySelector("#people-input");
let reset_btn = document.querySelector("#reset-btn");
let tip_person_elem = document.querySelector("#tip-per-person");
let total_person_elem = document.querySelector("#total-per-person");

let bill_amount = 0;
let tip_amount = 0;
let people_amount = 0;
let active_btn = null;

bill_input_elem.addEventListener("input", function(e) {
    bill_amount = parseFloat(e.target.value);
    if(people_amount && tip_amount) calcResult();
});

tip_buttons.forEach(btn => {
    btn.addEventListener("click", function() {
        if(active_btn) active_btn.style.backgroundColor = "hsl(183, 100%, 15%)";
        
        if(active_btn != this) {
            this.style.backgroundColor ="hsl(172, 67%, 45%)";
            active_btn = this;
            tip_amount = parseFloat(this.dataset.perc);
            if(custom_tip_elem.value!=0) custom_tip_elem.value = "";
            
        }
        else {
            tip_amount = 0;
            active_btn = null;
        }
        if(people_amount && bill_amount) calcResult();
    });
});

custom_tip_elem.addEventListener("input", function(e) {
    tip_amount = parseFloat(e.target.value) / 100; 
    if(isNaN(tip_amount)) tip_amount = 0;
    
    if(people_amount && bill_amount) calcResult();
})

people_input_elem.addEventListener("input", function(e) {
    people_amount = parseInt(e.target.value);
    if(bill_amount && tip_amount) calcResult(); 
});

reset_btn.addEventListener("click", function() {
    reset();
})


function calcResult() {
    let tip_perc = parseFloat((tip_amount * bill_amount).toFixed(2));
    let final_total = bill_amount + tip_perc;
    let tip_per_person = parseFloat((tip_perc / people_amount).toFixed(2));
    let total_per_person = parseFloat((final_total / people_amount).toFixed(2));
    console.log(tip_perc, final_total, tip_per_person, total_per_person);

    if(isNaN(tip_per_person) || isNaN(total_per_person)) {
        tip_per_person = 0;
        total_per_person = 0;
    }

    tip_person_elem.textContent = `$${tip_per_person}`;
    total_person_elem.textContent = `$${total_per_person}`;
}

function reset() {
    bill_amount = 0;
    tip_amount = 0;
    people_amount = 0;
    tip_person_elem.textContent = 0;
    total_person_elem.textContent = 0;
    bill_input_elem.value = "";
    if(custom_tip_elem.value!=0) custom_tip_elem.value = "";
    people_input_elem.value = "";
}


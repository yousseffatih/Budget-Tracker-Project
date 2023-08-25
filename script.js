const formEl = document.querySelector(".add");
const incomList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

let transactions =localStorage.getItem("transactions") !== null? JSON.parse(localStorage.getItem("transactions")) :[];


function updateStatistic(){
      const updatedIncome = transactions.filter(transaction =>transaction.amount > 0).
                              reduce((total , transaction) =>total+=transaction.amount ,0);
                             

      const updatedExpense = transactions.filter(transaction => transaction.amount < 0)
                              .reduce (( total , transaction )=> total += Math.abs(transaction.amount) ,0 );  
      const updatebalance = updatedIncome - updatedExpense;
      incomeEl.textContent = updatedIncome;   
      expenseEl.textContent = updatedExpense;
      balanceEl.textContent = updatebalance;
}



function generateTemplate(id,source,amount,time){
      return `<li data-id="${id}">
                  <p>
                        <span>${source} </span>
                        <span id="time"> ${time}</span>
                  </p>
                  $<span>${Math.abs(amount)}</span>
                        <i class="bi bi-trash delete"></i>
            </li>`;
}

function addTrasactionDOM(id,source,amount,time){     
      if(amount > 0)
      {
            incomList.innerHTML += generateTemplate(id,source,amount,time);
      }else{
            expenseList.innerHTML+= generateTemplate(id,source,amount,time);
      }
}


function addTrasaction(source , amount){
console.log(formEl.source.value , formEl.amount.value);
      const time = new Date();
      const trascation ={
            id : Math.floor(Math.random()*10000),
            source : source ,
            amount : amount ,
            time : `${time.toLocaleTimeString()} ${time.toLocaleDateString()}}`
      }
      transactions.push(trascation);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      addTrasactionDOM(trascation.id , source , amount ,trascation.time);
}



formEl.addEventListener("submit" ,event =>{
      event.preventDefault();
      if(formEl.source.value.time === "" || formEl.amount.value === ""){
            alert('please Add proper values');
      }
      addTrasaction(formEl.source.value.trim(),Number(formEl.amount.value));
      updateStatistic();
      formEl.reset();
})

function getTransactions(){
      transactions.forEach( trasaction =>{
            if(trasaction.amount >0){
                  incomList.innerHTML += generateTemplate(trasaction.id,trasaction.source,trasaction.amount,trasaction.time);
            }else{
                  expenseList.innerHTML += generateTemplate(trasaction.id,trasaction.source,trasaction.amount,trasaction.time);
            }
      });
}

 
function deleteTransaction(id){
      transactionS =  transactions.filter(trasaction => {
            return trasaction.id !== id;
      });
      localStorage.setItem("transactions", JSON.stringify(transactionS));
      
}

incomList.addEventListener("click" , event => {
      if(event.target.classList.contains("delete")){
            event.target.parentElement.remove();
            deleteTransaction(Number(event.target.parentElement.dataset.id));
            
      }
      updateStatistic();
});

expenseList.addEventListener("click" , event => {
      if(event.target.classList.contains("delete")){
            event.target.parentElement.remove();
            deleteTransaction(Number(event.target.parentElement.dataset.id));
            
      }
      updateStatistic();
});

function init (){
      updateStatistic();
      getTransactions();
}

init();


const input = document.getElementById("input")
const btn = document.getElementById("btn")
const ul = document.getElementById("ul")
const del = document.getElementById('del')
const tab  = document.getElementById('tab')
const leadValue = JSON.parse(localStorage.getItem('myLeads'))
let myLeads = []

if(leadValue){
    myLeads = leadValue
    render(leadValue)
}

tab.addEventListener('click',()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

del.addEventListener('click',()=>{
    ul.textContent= ''
    localStorage.clear()
    myLeads = []
})

btn.addEventListener('click',()=>{
    if(input.value){
        myLeads.push(input.value)
        render(myLeads)
        input.value = ''
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
    }
    else{
        alert("undefined")
    }
})


function render(Leads){
    let listItems = ''
    for(let i =0 ;i<Leads.length;i++){
        listItems += `
        <li>
        <a target="_blank" href="${Leads[i]}">
            ${Leads[i]}
        </a>
        
        </li>`
    }
    ul.innerHTML = listItems
}
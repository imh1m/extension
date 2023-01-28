// myLinks

let myLinks = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const undoBtn = document.getElementById("undo-btn")
const ulEl = document.getElementById("ul-el")

const linksfromLocalStorage = JSON.parse( localStorage.getItem("myLinks") )

const tabs = []


if (linksfromLocalStorage) {
   
    myLinks = linksfromLocalStorage
    render(myLinks)

}


function render(links) {
    
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
     listItems += `
     <li>
         <a target = '_blank' href='${links[i]}'>
             ${links[i]}
         </a> 
     </li>
    
     `
    
}

ulEl.innerHTML = listItems

}


inputBtn.addEventListener("click", function() {
   
    myLinks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
    
})


tabBtn.addEventListener("click", function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)

    })


})


deleteBtn.addEventListener("dblclick", function() {

    localStorage.clear()
    myLinks = []
    render(myLinks)

})



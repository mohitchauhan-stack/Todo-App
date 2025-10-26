const input = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const emptyText = document.querySelector('.empty-text');
const body = document.querySelector('body');
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';


// THEME TOGGLE
if (currentTheme === 'light') {
  body.classList.add('light-mode');
  themeToggle.classList.add('dark-mode');
  themeToggle.textContent = '🌙 Dark';
} else {
  body.classList.remove('light-mode');
  themeToggle.classList.remove('dark-mode');
  themeToggle.textContent = '🌞 Light';
}
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
    themeToggle.classList.add('dark-mode');
    themeToggle.textContent = '🌙 Dark';
  } else {
    localStorage.setItem('theme', 'dark');
    themeToggle.classList.remove('dark-mode');
    themeToggle.textContent = '🌞 Light';
  }
});


// UPDATE EMPTY STATE
function updateEmptyState() {
  if (listContainer.children.length === 0) {
    emptyText.classList.remove('hidden');
  } else {
    emptyText.classList.add('hidden');
  }
}
updateEmptyState();


// ADD TASK
function addTask() {
    if( input.value === '' ){
        alert("field empty!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = input.value;
        listContainer.appendChild(li);
        input.value = '';
        updateEmptyState();

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    input.value = '';
    saveData();
}

// MARK DONE / DELETE TASK
listContainer.addEventListener("click", function(elem) {
    if(elem.target.tagName === "LI") {
        elem.target.classList.toggle("checked");
        saveData();
    } else if(elem.target.tagName === "SPAN"){
        elem.target.parentElement.remove();
        updateEmptyState();
        saveData();
    }
}, false)


// saveData
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// display saved data
function displayData() {
    listContainer.innerHTML = localStorage.getItem("data");
}
displayData();
updateEmptyState();

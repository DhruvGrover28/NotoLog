function closeBtn(val) {
  console.log(val)
  let title = localStorage.key(val);

  let note = localStorage.getItem(title);
  localStorage.removeItem(localStorage.key(val))
  displayNotes()
}

function btnSubmit() {

  let title = document.getElementById("exampleInputEmail1").value;
  let note = document.getElementById("exampleInputPassword1").value;


  localStorage.setItem(title, note);

  document.getElementById("exampleInputEmail1").value = "";
  document.getElementById("exampleInputPassword1").value = "";

  displayNotes();
}

function displayNotes() {
  ihtml = "";
  for (let i = 0; i < localStorage.length; i++) {
    let title = localStorage.key(i);
    let note = localStorage.getItem(title);
    ihtml += `
      <div class="card mx-4 my-4" style="width: 22rem;">
        <div class="card-body">
          <button type="button" class="close" data-title="${title}" aria-label="Close" onclick="closeBtn(${i})" >
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${note}</p>
        </div>
      </div>
    `;
  }
  cardContainer.innerHTML = ihtml;
}

  window.onload = function() {
    displayNotes();
  };

  //bytes
  function getLocalStorageUsage() {
    let totalBytes = 0;

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      let serializedData = JSON.stringify({ key, value });
      totalBytes += serializedData.length;
    }

    return totalBytes;
  }

  let usedBytes = getLocalStorageUsage();
  console.log(`Used local storage space: ${usedBytes} bytes`);

  //dropdown
  function myFunction() {
    console.log("clicked")
    document.getElementById("drop").classList.toggle("show");
  }
 window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

//search


function searchNotes() {
  const searchTerm = document.getElementById('search').value;
  return searchTerm.toLowerCase();
}

const searchBtn = document.getElementById('butn');
searchBtn.addEventListener('click', function() {
  const searchTerm = searchNotes();
  filterNotes(searchTerm);
})

function filterNotes(searchTerm) {
  let ihtml = "";
  let found = false; 

  for (let i = 0; i < localStorage.length; i++) {
    let title = localStorage.key(i);
    let note = localStorage.getItem(title);

    if (title.toLowerCase().includes(searchTerm)) {
      found = true;
      ihtml += `
        <div class="card mx-4 my-4" style="width: 22rem;">
          <div class="card-body">
            <button type="button" class="close" data-title="${title}" aria-label="Close" onclick="closeBtn(${i})">
              <span aria-hidden="true">&times;</span>
            </button>
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${note}</p>
          </div>
        </div>
      `;
    }
  }

  if (!found) {
    ihtml = '<p>No records found.</p>'; 
  }
  ihtml += `
    <button class="btn btn-secondary mt-3" onclick="returnToHome()">Return to Home</button>
    
  `
  
  cardContainer.innerHTML = ihtml;
}
function returnToHome() {
  
  displayNotes();
  
  
  document.getElementById('search').value = '';
  
  
  const returnHomeButton = document.getElementById('returnHome');
  returnHomeButton.style.display = 'none';
}



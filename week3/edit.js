let editIndex = null;
let titles = [];
let durasi = [];
let contents = [];
let icon = [];
let images = [];

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    editIndex = parseInt(urlParams.get('id'), 10); // Pastikan editIndex adalah angka

    loadDataFromLocalStorage();
    
    // Periksa apakah editIndex valid sebelum memuat data
    if (isValidIndex(editIndex, titles.length)) {
        loadProjectForEdit(editIndex);
    } else {
        console.error("Invalid index:", editIndex);
        // Tampilkan pesan kesalahan dan arahkan pengguna ke halaman lain
        alert("Invalid project index. Redirecting...");
        window.location.href = "project.html"; // Atau halaman lain yang sesuai
    }
});

function loadDataFromLocalStorage() {
    if (localStorage.getItem("titles")) {
        titles = JSON.parse(localStorage.getItem("titles")) || [];
        durasi = JSON.parse(localStorage.getItem("durasi")) || [];
        contents = JSON.parse(localStorage.getItem("contents")) || [];
        icon = JSON.parse(localStorage.getItem("icon")) || [];
        images = JSON.parse(localStorage.getItem("images")) || [];
    }
}

function loadProjectForEdit(index) {
    if (!isValidIndex(index, titles.length)) {
        console.error("Invalid index in loadProjectForEdit:", index);
        return;
    }

    document.getElementById("title").value = titles[index];
    let startDate = durasi[index].slice(0, 10);
    let endDate = durasi[index].slice(10);
    document.getElementById("startInput").value = startDate;
    document.getElementById("endInput").value = endDate;
    document.getElementById("content").value = contents[index];

    const checkboxes = [
        { id: "check-php", name: "./assets/php.svg" },
        { id: "check-javascript", name: "./assets/js.svg" },
        { id: "check-java", name: "./assets/java.svg" },
        { id: "check-python", name: "./assets/python.svg" }
    ];

    checkboxes.forEach(checkbox => {
        document.getElementById(checkbox.id).checked = icon[index].includes(checkbox.name);
    });

    // Load existing image if available
    if (images[index]) {
        let imageElement = document.createElement('img');
        imageElement.src = images[index];
        imageElement.alt = 'Project Image';
        imageElement.classList.add('img-fluid');
        imageElement.style.maxWidth = '100%';
        imageElement.style.height = 'auto';
        document.getElementById("form").appendChild(imageElement);
    }
}

function saveChanges(event) {
    event.preventDefault();

    if (!isValidIndex(editIndex, titles.length)) {
        console.error("Invalid index in saveChanges:", editIndex);
        return;
    }

    titles[editIndex] = document.getElementById("title").value;
    let start = document.getElementById("startInput").value;
    let end = document.getElementById("endInput").value;
    durasi[editIndex] = start + end;
    contents[editIndex] = document.getElementById("content").value;

    // Update icons
    const checkboxes = [
        { id: "check-php", name: "./assets/php.svg" },
        { id: "check-javascript", name: "./assets/js.svg" },
        { id: "check-java", name: "./assets/java.svg" },
        { id: "check-python", name: "./assets/python.svg" }
    ];

    let ic = checkboxes
        .filter(checkbox => document.getElementById(checkbox.id).checked)
        .map(checkbox => checkbox.name);

    icon[editIndex] = ic;

    // Update image if a new one is selected
    let imageInput = document.getElementById("image");
    if (imageInput.files && imageInput.files[0]) {
        images[editIndex] = URL.createObjectURL(imageInput.files[0]);
    }

    // Save updated data to localStorage
    saveDataToLocalStorage();


    addproject();
}

function saveDataToLocalStorage() {
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("durasi", JSON.stringify(durasi));
    localStorage.setItem("contents", JSON.stringify(contents));
    localStorage.setItem("icon", JSON.stringify(icon));
    localStorage.setItem("images", JSON.stringify(images));
}

function isValidIndex(index, length) {
    return Number.isInteger(index) && index >= 0 && index < length;
}


function addproject() {
        // Go back to the project list or any other desired action
        window.location.href = "project.html";
    document.getElementById("new").innerHTML = "";

    for (let i = 0; i < titles.length; i++) {
        let iconImages = icon[i].map(iconSrc => `<img src="${iconSrc}" alt="" style="width: 30px; margin: 2px;">`).join('');

        document.getElementById("new").innerHTML += `
            <div class="card" style="width: 270px; margin: 5px 10px; box-shadow: 0px 0px 5px; border-radius: 10px;">
                <a href="project.html?id=${i}" target="_blank"> 
                    <img src="${images[i]}" alt="" style="width: 230px; border-radius: 10px;">
                    <h1 style="margin: 10px 20px;"></h1>
                    <p style="margin: 10px 20px;"></p>
                    <p style="margin: 10px 20px;"></p>
                </a>
                <h1>${titles[i]}</h1>
                <p>Durasi</p>
                <p>${durasi[i]}</p>
                <p>${contents[i]}</p>
                <div class="image-card">
                    ${iconImages}
                </div>
                <div class="button-card">
                    <button class="edit-card" onclick="editProject(${i})">Edit</button>
                    <button class="delete-card" onclick="deleteProject(${i})">Delete</button>
                </div>
            </div>
        `;
    }
}
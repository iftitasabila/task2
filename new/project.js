let titles = [];
let durasi = [];
let contents = [];
let icon = [];
let images = [];

// Fungsi untuk memyimpan data ke local storage
function saveDataToLocalStorage() {
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("durasi", JSON.stringify(durasi));
    localStorage.setItem("contents", JSON.stringify(contents));
    localStorage.setItem("icon", JSON.stringify(icon));
    localStorage.setItem("images", JSON.stringify(images));
}

//Fungsi untuk memuat data dari local storage
function loadDataFromLocalStorage() {
    if (localStorage.getItem("titles")) {
        titles = JSON.parse(localStorage.getItem("titles"));
        durasi = JSON.parse(localStorage.getItem("durasi"));
        contents = JSON.parse(localStorage.getItem("contents"));
        icon = JSON.parse(localStorage.getItem("icon"));
        images = JSON.parse(localStorage.getItem("images"))
    }
}

// Panggil fungsi loadDataFromLocalStorage di awal untuk mengisi data dari local storage
loadDataFromLocalStorage()

// Fungsi untuk menambahkan proyek baru
function project(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let start = document.getElementById("startInput").value;
    let end = document.getElementById("endInput").value;
    let content = document.getElementById("content").value;
    let imageInput = document.getElementById("image").files;

    let image =imageInput.length > 0 ? URL.createObjectURL(imageInput[0]) : '';
    // Data dari Array untuk mencentang option
    const checkboxes = [
        {id: "check-php", name: "./assets/php.svg"},
        {id: "check-javascript", name: "./assets/js.svg"},
        {id: "check-java", name: "./assets/java.svg"},
        {id: "check-python", name: "./assets/python.svg"}
    ];

    // Akan menampilkan hasil yg dipilih / difilter
    let ic = checkboxes
    .filter (checkbox => document.getElementById(checkbox.id).checked)
    .map(checkbox => checkbox.name);

    // Menampilkan data kedalam web
    titles.push(title);
    durasi.push(start + end);
    contents.push(content);
    icon.push(ic);
    images.push(image);

    // Menyimpan data di localstorage
    saveDataToLocalStorage();

    // Untuk menghapus form
    document.getElementById("form").reset();

    // Pemanggilan showdiv untuk memperbarui daftar
    showdiv();
}

// Fungsi untuk menampilkan post blog
function showdiv() {
    let newDiv = document.getElementById("new");
    if (!newDiv) {
        console.error('Element with id "new" not found.');
        return;
    }

    newDiv.innerHTML = "";

    for (let i = 0; i < titles.length; i++) {
        let iconImages = icon[i].map(iconSrc => `<img src="${iconSrc}" alt="" style="width: 30px; margin: 2px;">`).join('');

        newDiv.innerHTML += `
    <div class="card">
                <a href="project.html?id=${i}" target="_blank"> 
                    <img src="${images[i]}" alt="" style="display:block; margin:auto; border-radius: 10px;">
                    
                </a>
                <h1>${titles[i]}</h1>
                <p>Durasi:</p>
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

// Fungsi untuk mengedit projek
function editProject(index) {
    window.location.href = `edit.html?id=${index}`;
}

//Fungsi untuk menhapus projek
function deleteProject(index) {
    // Hapus item dari array berdasarkan index
    titles.splice(index, 1);
    durasi.splice(index, 1);
    contents.splice(index, 1);
    icon.splice(index, 1);
    images.splice(index, 1);


    // Memperbarui tampilan
    showdiv();
}

// Pastikan showdiv() dipanggil setelah DOM sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", function() {
    showdiv();
});

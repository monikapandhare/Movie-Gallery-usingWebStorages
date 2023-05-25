// console.log("hellojs");
let cl = console.log;

const showModelBtn = document.getElementById("showModelBtn");
const backDrop = document.getElementById("backDrop");
const mymodel = document.getElementById("mymodel");
const movieClose = [...document.querySelectorAll(".movieClose")];


const titleControl = document.getElementById("title");
const imgUrlControl = document.getElementById("imgUrl");
const ratingControl = document.getElementById("rating");
const moviesContainer = document.getElementById("moviesContainer");
const movieform = document.getElementById("movieform");
const updatebtn = document.getElementById("updatebtn");
const submitbtn = document.getElementById("submitbtn");



const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};
let movie = [
    {
        title : "Day Dreamer",
        imgUrl :"https://tse4.mm.bing.net/th?id=OIP.SPPKPdvhFeGR8Gx4DbpXAgHaET&pid=Api&P=0&h=180",
        rating : 5
    }
];

movie =JSON.parse(localStorage.getItem("movieInfo")) || [];

const KoreanDrama = (Drama) => {
    let result = "";
    Drama.forEach(dra => {
        result += `<div class="col-md-4 col-sm-6 mb-20">
        <div class="card-group">
            <div class="card border-0" id="${dra.id}">
                <div class="card-header">
                    <h2>${dra.title}</h2>
                </div>
                <div class="card-body">
                    <img src="${dra.imgUrl}"
                        class="card-img-top movieinfo" alt="">
                </div>
                <div class="card-footer">
                    <p>${dra.rating}/5</p>
                    <button class="btn btn-info" onclick="onEditbtn(this)" type="button" >
                                  <a><i class="fa-solid fa-pen-to-square"></i></a>
                    </button>
                    <button class="btn btn-danger" onclick="onDeletebtn(this)" type="button" >
                        <a><i class="fa-solid fa-trash"></i></a>
                    </button>
                </div>

            </div>
        </div>
    </div>`
    })
    moviesContainer.innerHTML=result;

}

KoreanDrama(movie)

const onshowHideModelBtn = () =>{
    mymodel.classList.toggle("visible");
    backDrop.classList.toggle("visible");
}

const onSubmitHandler =(eve) =>{
    eve.preventDefault()
    movieobj = {
        title:titleControl.value,
        imgUrl:imgUrlControl.value,
        rating:ratingControl.value,
        id : generateUuid()

    }

    movie.unshift(movieobj);
    KoreanDrama(movie)
    eve.target.reset()
    localStorage.setItem("movieInfo",JSON.stringify(movie))
    mymodel.classList.toggle("visible");
    backDrop.classList.toggle("visible");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Movie Added Successfully',
        showConfirmButton: false,
        timer: 3000
      })

}

const onEditbtn = (ele) => {
    let editId = ele.closest(".card").id;
    localStorage.setItem("editId",editId);
    // cl(editId);
    let obj = movie.find(arr => arr.id === editId);
    titleControl.value = obj.title,
    imgUrlControl.value = obj.imgUrl,
    ratingControl .value= obj.rating

    updatebtn.classList.remove("d-none");
    submitbtn.classList.add("d-none");
    mymodel.classList.toggle("visible");
    backDrop.classList.toggle("visible");
}


const onupdatebtnclick = () =>{
    let updateId = localStorage.getItem("editId");
    // cl(updateId);
    movie.forEach(arr => {
        if(arr.id === updateId){
            arr.title = titleControl.value,
            arr.imgUrl = imgUrlControl.value,
            arr.rating = ratingControl.value
        }
    })
    localStorage.setItem("movieInfo",JSON.stringify(movie))
    KoreanDrama(movie);
    movieform.reset();
    updatebtn.classList.add("d-none");
    submitbtn.classList.remove("d-none");
    mymodel.classList.toggle("visible");
    backDrop.classList.toggle("visible");
}

const onDeletebtn = (eve) =>{
    let deleId = eve.closest('.card').id;
    cl(deleId);

    let deleteIndx=movie.findIndex(obj=>obj.id === deleId)
    movie.splice(deleteIndx,1);
    localStorage.setItem('movieInfo',JSON.stringify(movie))
    KoreanDrama(movie)
    alert("Movie Deleted successfully...!!!")

}

showModelBtn.addEventListener("click",onshowHideModelBtn);

movieClose.forEach(ele=>ele.addEventListener("click",onshowHideModelBtn));

movieform.addEventListener("submit",onSubmitHandler);

updatebtn.addEventListener("click",onupdatebtnclick)
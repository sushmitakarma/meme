getMemes()
const memes = document.querySelector("#memes");
// const username=document.querySelector("#username")
// const password=document.querySelector("#username")
// const text0=document.querySelector("#text0")
// const text1=document.querySelector("#text1")
const templateId = document.querySelector("#template_id");
const submitBtn = document.querySelector("#creatememe");
const inputs = document.querySelectorAll("input");
const meme = document.querySelector("#meme");
let createMeme = {};

let currentMemeTemplate = "";

async function getMemes() {
  try {
    const blob = await fetch("https://api.imgflip.com/get_memes", {
      method: "GET",
    });
    const data = await blob.json();
    let str = data.data.memes
      .map((ele) => {
        return `
        <div id=${ele.id} class="card p-2 my-3 shadow-lg" style="background-color:#36008D; color:white; font-family: 'Luckiest Guy';">
            <h3>${ele.name}</h3>
            <img height="200px" width="200px" src=${ele.url} alt="">
            <button class="b1 my-2" style="width:200px" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${ele.id} onclick="setCurrentTemplate(this.id)">Create meme</button>
        </div>
        `;
      })
      .join("");
    memes.innerHTML = str;
  } catch (error) {
    console.log(error);
  }
}

// fetch("https://api.imgflip.com/get_memes",{
//     method:"GET"
// }).then((blob)=>{
//     return blob.json();
// }).then((data)=>{
//     console.log(data.data.memes);
//     let str=data.data.memes.map((ele)=>{
//         return `
//         <div id=${ele.id} class="card p-2 my-3 shadow-lg">
//             <h3>${ele.name}</h3>
//             <img height="200px" width="200px" src=${ele.url} alt="">
//             <button class="btn btn-primary my-2" style="width:200px" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${ele.id} onclick="setCurrentTemplate(this.id)">Create meme</button>
//         </div>
//         `
//     }).join("")
//     memes.innerHTML=str;
// })
function setCurrentTemplate(id) {
  currentMemeTemplate = id;
  templateId.value = currentMemeTemplate;
}

/// grab data/////

submitBtn.addEventListener("click", async() => {
  inputs.forEach((ele) => {
    createMeme[ele.id] = ele.value;
  });

  let formBody = [];
  for (let property in createMeme) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(createMeme[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  // fetch("https://api.imgflip.com/caption_image",{
  //     method:"POST",
  //     headers: {
  //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //       },
  //       body: formBody,
  // }).then(blob=>{return blob.json()})
  // .then(result=>{
  //     console.log(result);
  //     meme.innerHTML=`<img class="my-2" src=${result.data.url} width="200px" height="200px">`
  // })

 try {
    const blob= await  fetch("https://api.imgflip.com/caption_image",{
        method:"POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: formBody,
    })

    const result =await blob.json();
    meme.innerHTML=`<img class="my-2" src=${result.data.url} width="200px" height="200px">`
 } catch (error) {
    console.log(error);
 }
});

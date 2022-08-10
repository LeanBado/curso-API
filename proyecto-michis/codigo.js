//carga imagenes al html
const URL_random = "https://api.thecatapi.com/v1/images/search?limit=2&page=4?"
const URL_favoritos = "https://api.thecatapi.com/v1/favourites"
const URL_delete = (id)=>`https://api.thecatapi.com/v1/favourites/${id}?api_key=a1fb1987-480f-4620-a615-902ea6bd261b`
const key = "a1fb1987-480f-4620-a615-902ea6bd261b"
const URL_subir = "https://api.thecatapi.com/v1/images/upload"

const span = document.getElementById("error")

async function recarga(){
  const res = await fetch(URL_random) // el resultado de la solicitud GET al servidor se guarda en res
  const data = await res.json() // se parsea el resultado del servidor para ser leido en JS y se guarda en data
  console.log('random')
  console.log(data)
  
  if(res.status !== 200){
    span.innerHTML = `hubo un error: ${res.status}`
  }
    else{
    const img1 = document.getElementById("img1")
    const img2 = document.getElementById("img2")

    img1.src = data[0].url
    img2.src = data[1].url

    const btn1= document.getElementById("btn1")
    const btn2= document.getElementById("btn2")
    btn1.onclick = ()=> guardarFavorito(data[0].id)
    btn2.onclick = ()=> guardarFavorito(data[1].id)

  }
};

async function cargaFavoritos() {
  const res = await fetch(URL_favoritos,{
    headers:{
      "X-API-KEY": key
    }
  })
  const data = await res.json()
  console.log('Favoritos')
  console.log(data)

  if (res.status !== 200) {
    span.innerHTML = `hubo un error: ${res.status}`
  }else{
    const sect = document.getElementById("favoritesMichis")
    sect.innerHTML = ""
    const h2 = document.createElement("h2")
    h2.textContent = "Michis favoritos"
    sect.appendChild(h2)

    data.forEach(element =>{
      const img = document.createElement("img")
      const btn = document.createElement("button")

      img.width = 150
      img.src = element.image.url
      btn.textContent = "Sacar al michi de favoritos"

      const art = document.createElement("article")

      art.appendChild(img)
      art.appendChild(btn)
      sect.appendChild(art)

      btn.onclick = ()=> eliminaFavorito(element.id)
    })

  }
};

async function guardarFavorito(id){
  const res = await fetch(URL_favoritos,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": key
    },
    body: JSON.stringify({
      image_id: id
    })
  })
  const data = await res.json()
  cargaFavoritos()
};

async function eliminaFavorito(id){
  const res = await fetch(URL_delete(id),{
    method: "DELETE",
  })
  const data = await res.json()
  cargaFavoritos()
  console.log(res)
  console.log(data)
};

async function subeArchivo(){
  const form = document.querySelector("#form")
  const formInstancia = new FormData(form) // agarra los valores que haya en el form -> input

  console.log(formInstancia.get("file"))

  const res = await fetch(URL_delete,{
    method: "POST",
    headers:{
      "X-API-KEY": key
    },
    body: formInstancia //no necesita JSON.stringify porque formInstancia es una instancia
  })
};

recarga()
cargaFavoritos()
//-------------------------ApiKey-----------------------------------------//

const api_key = 'Your Apikey';

//-----------------------DomElements--------------------------------------//

const artistInput = document.querySelector('#artist-input');
const songInput = document.querySelector('#song-input');
const btn = document.querySelector('#btn');
const frontImg = document.querySelector('.album-img');
const backImg = document.querySelector('#back-img')
const artitsSpan = document.querySelector('#artists');
const songSpan = document.querySelector('#song');
const albumSpan = document.querySelector('#album');
const durationSpan = document.querySelector('#duration');
const errorDiv = document.querySelector('.err');
const cardDiv = document.querySelector('.card');

//---------------------------ApiFunction--------------------------------//

async function apiSong(artist, song, key){
    try{
        const api = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${key}&artist=${artist}&track=${song}&format=json`)
        const json = await api.json()
        console.log(json)
        artitsSpan.textContent = json.track.artist.name
        songSpan.textContent = json.track.name
        albumSpan.textContent = json.track.album.title
        durationSpan.textContent = lengthSong(json.track.duration)
        frontImg.style.backgroundImage = `url(${json.track.album.image[3]['#text']})`
        backImg.style.display = 'none'
        errorDiv.classList.add('hidde')
        cardDiv.classList.remove('hidde')
    }catch (err){
        console.log(`Ocorreu um erro requisicao ${err}`)
        cardDiv.classList.add('hidde')
        errorDiv.classList.remove('hidde')
        errorDiv.textContent = `Não encontramos resultados para '${artist} ${song}'`
    }
}

//--------------------------------TimeConverted------------------------------//

function lengthSong(time){

    const segundosTotais = Math.floor(time / 1000);
    const minutos = Math.floor(segundosTotais / 60);
    const segundos = segundosTotais % 60;
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}

//------------------------------EventListener-------------------------------//

btn.addEventListener('click',() =>{
    const artistValue = artistInput.value;
    const songValue = songInput.value;
    apiSong(artistValue,songValue,api_key)
})

document.addEventListener('keydown',(e)=>{
    const artistValue = artistInput.value;
    const songValue = songInput.value;
    if(e.key === 'Enter'){
        apiSong(artistValue,songValue,api_key)  
    }
})
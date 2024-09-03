
const form = document.getElementById("Form")

const Logradouro = document.getElementById("Logradouro")
const Bairro = document.getElementById("Bairro")
const Uf = document.getElementById("Uf")

const Clima = document.getElementById("Clima")


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        let LatitudeForm = document.getElementById("latitude")
        let LongitudeForm = document.getElementById("longitude")

        LatitudeForm.value = latitude
        LongitudeForm.value = longitude
    
        
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      }
    );
  } else {
    console.log("Geolocalização não é suportada pelo navegador.");
  }
  
  




const ConsultaCep = async(cep)=>{
    const url_Cep = `https://viacep.com.br/ws/${cep}/json/`

    try {
        const response = await fetch(url_Cep)
        const data = await response.json()

        Logradouro.innerHTML = data.logradouro
        Bairro.innerHTML = data.localidade
        Uf.innerHTML = data.uf

        
    } catch (error) {
        console.error("Erro ao consultar o Cep:", error);
    }
    
}

// latitu : 23.4848
// long : 46.4781

const ConsultaClima = async (lati,long) => {
    const url_Clima = `https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${long}&hourly=temperature_2m`;
  
    try {
      // Fazendo a requisição para a API
      const response = await fetch(url_Clima);
      const data = await response.json();
  
      // Acessando os dados da temperatura
      const temperatureArray = data.hourly.temperature_2m;
  
      Clima.innerHTML = temperatureArray[0] + "° C"

    } catch (error) {
      console.error("Erro ao consultar o clima:", error);
    }
  };
  



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    let nome = document.getElementById("firstName")
    let email = document.getElementById("email")
    let cep = document.getElementById("cep")
    let lati = document.getElementById("latitude")
    let long = document.getElementById("longitude")


    const SetCep = cep.value
    const SetLati = lati.value
    const SetLong = long.value

ConsultaCep(SetCep)
ConsultaClima(SetLati,SetLong)



})





  



const divAlarme = document.getElementById("divAlarme")
const div_time = document.getElementById("Timer")
const btnAtivar = document.getElementById("btnAtivar")
const btnParar = document.getElementById("btnParar")
const lbHorario = document.getElementById("lbHorario")
const inputNumber = document.getElementById("inputNumber")

let audio_alarme = new Audio("alarm.mp3")
audio_alarme.loop = -1 /*Fica repetindo o toque para sempre*/

let time_atual = null /*Tempo atual contando*/
let time_do_alarme = null /*Tempo definido no input*/
let alarme_ativado = false
let alarme_tocando = false

btnAtivar.addEventListener("click",()=>{
    time_atual = Date.now() /*Outra forma de pegar o tempo atual.*/
    time_do_alarme = time_atual+(inputNumber.value*1000)
    alarme_ativado = true
    const dataAlarme = new Date(time_do_alarme) /*A data futura sera retornada desta constante.*/

    let hora_do_toque = dataAlarme.getHours()
    let minuto_do_toque = dataAlarme.getMinutes()
    let segundo_do_toque = dataAlarme.getSeconds()

    hora_do_toque = (hora_do_toque < 10)?"0"+hora_do_toque:hora_do_toque
    minuto_do_toque = (minuto_do_toque < 10)?"0"+minuto_do_toque:minuto_do_toque
    segundo_do_toque = (segundo_do_toque < 10)?"0"+segundo_do_toque:segundo_do_toque

    lbHorario.innerHTML = "Horario do Alarme: "+hora_do_toque+":"+minuto_do_toque+":"+segundo_do_toque
})

btnParar.addEventListener("click",()=>{
    alarme_ativado = false
    alarme_tocando = false
    lbHorario.innerHTML = "Horario do Alarme:"
    inputNumber.value = 0
    divAlarme.classList.remove("divAlarmeTocando")
    audio_alarme.pause()
    audio_alarme.currentTime = 0 /*Rebobinado para o inicio.*/
})

function configTime(){
    const data = new Date()

    let horas = data.getHours()
    let minutos = data.getMinutes()
    let segundos = data.getSeconds()

    horas = (horas < 10)?"0"+horas:horas
    minutos = (minutos < 10)?"0"+minutos:minutos
    segundos = (segundos < 10)?"0"+segundos:segundos

    const horarioCompleto = horas+":"+minutos+":"+segundos
    div_time.innerHTML=horarioCompleto

    /*Saber se o alarme está ativado, mas não esteja tocando para tocar.*/
    if(alarme_ativado && !alarme_tocando){
        if(data.getTime() >= time_do_alarme){
            alarme_tocando = true
            audio_alarme.play()
            divAlarme.classList.add("divAlarmeTocando")
        }
    }

}
const reloadTime = setInterval(configTime,1000)
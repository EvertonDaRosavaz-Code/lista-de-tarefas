

//variavel globals 
let conteiner_tarefas = document.getElementById('tarefas');

let Taskinput = document.getElementById('tarefatxt');
let Tasktime = document.getElementById('time');
let Taskdate = document.getElementById('date');

/*Nomear o span dentro do Botão*/
let spanBtn = document.getElementById('valueBtn')

spanBtn.textContent = 'Criar tarefa';

//Quando a pagina carregar verificar se existe um valor em local storage
window.onload = () =>{
    if(localStorage.length > 0){
        for(let i = 0; i < localStorage.length; i++){
            let key = localStorage.key(i);
            let conteudo = JSON.parse(localStorage.getItem(key));
            createElement(conteudo.tarefa, conteudo.date, conteudo.time, key)
        }
    }

}




// Essa variavel vai reveber a chave vinda da função editar();
let newKey;
document.getElementById('inBtn').addEventListener('click', ()=>{
    if(spanBtn.textContent == 'Criar tarefa'){
        criarTarefa()
    }else{
        let newTask     = Taskinput.value;
        let newTakstime = Tasktime.value;
        let newTaksdate = Taskdate.value;

        let obj  = `{"tarefa":"${newTask}", "date":"${newTaksdate}", "time":"${newTakstime}"}`;
        localStorage.setItem(newKey, obj);

        //deletar(newKey);
        //createElement(newTask, newTaksdate, newTakstime, newKey)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Tarefa alterada com sucesso'
          })

          spanBtn.textContent = 'Criar tarefa';
    }

   
})



let chave = Number(); // variavel chave para ir ao localStorage

let key = Number(); // Para usar na função

//Função para gerar as chaves para cada tarefa
function genereteKey(){
   do{
    key ++

   }while(localStorage.getItem(key) !== null)

   return key;
}

function criarTarefa(){

    if(localStorage.length == 0){
        chave ++
        
    }else{
        chave = genereteKey()
    }
   
    createElement(Taskinput.value, Taskdate.value, Tasktime.value, chave);

    //Enviar o conteudo para o LocalStorage em objeto
    let obj  = `{"tarefa":"${ Taskinput.value}", "date":"${Taskdate.value}", "time":"${Tasktime.value}"}`;
    let tarefaObj = JSON.parse(obj);
    localStorage.setItem(chave, JSON.stringify(tarefaObj))

    //Valores dos inputs voltam a ser nulos || vazios
    Taskinput.value = null
    Taskdate.value = null
    Tasktime.value = null

}


// Esta função está criando o elemento que compoem a tarefa
function createElement(tarefa, data, tempo, chave){

    let div         = document.createElement('div');
    let divLeft     = document.createElement('div');
    let divRight    = document.createElement('div');

    let spanTask    = document.createElement('span');
    let spanDate    = document.createElement('span');
    let spanTime    = document.createElement('span');
    
    let imgX        = document.createElement('img');
    let imgPincel   = document.createElement('img');



    // Divs left e right serem filhos de div
    div.appendChild(divLeft);
    div.appendChild(divRight);
    /*=-=-=-=-=--=-=-=-=-=-=-*/
    divLeft.appendChild(spanTask);
    divLeft.appendChild(spanDate);
    divLeft.appendChild(spanTime); 
    /*-=-=-=-=--=-=-=-=-=-=-===*/
    divRight.appendChild(imgX);
    divRight.appendChild(imgPincel);


    conteiner_tarefas.appendChild(div);

    // Suas devidas classes para usar no CSS
    div.className       = 'tarefa';
    divLeft.className   = 'left';
    divRight.className  = 'right';
    imgX.className      = 'deletarImg';
    imgPincel.className = 'editarImg';
    /*Essa maneira de criar id sera usado para remover cada tarefa, e cada tarefa tera seu ud com sua chave*/
    div.id = `tarefa${chave}`
    /*=-=-=-=-=-=-=-=-=-=-=-=-=-==*/
    
    //Conteudos para por dentro de cada span
    let task    = document.createTextNode(tarefa);
    let date    = document.createTextNode(data);
    let time    = document.createTextNode(tempo);


    spanTask.appendChild(task);
    spanDate.appendChild(date);
    spanTime.appendChild(time);
    /*Id para os span*/
    spanTask.setAttribute('id', 'idTask');
    spanDate.setAttribute('id', 'idDate');
    spanTime.setAttribute('id', 'idTime');
    
    /*=-=-=-===-==-=-=-=-=-=-=-=-=-=-=*/
    //Por as imagens dentro dos elementros imgs
    imgX.src = 'lista-de-tarefas/img/cross.png';
    imgPincel.src = 'lista-de-tarefas/img/pencil.png';

    /*Adicionar onclick as imagens*/ 
    imgX.setAttribute('onclick', `deletar(${chave})`);
    imgPincel.setAttribute('onclick', `editar(${chave})`);
 
}

//Deletar do localStorage
function deletar(chave){
    localStorage.removeItem(chave);

    /*remover elemento pai, assim sendo removera os elementos filhos*/
    let elemen = document.getElementById(`tarefa${chave}`);
    elemen.remove();    
}


//Editar do localStorage
function editar(chave){
    /*Renomear*/
    let valueBtn = document.getElementById('valueBtn') 
    valueBtn.textContent = `Editar tarefa`;

    let  getItem = localStorage.getItem(chave);
    let {tarefa, date, time} = JSON.parse(getItem);

    Taskinput.value = tarefa;
    Taskdate.value  = date;
    Tasktime.value  = time;
    
    newKey = chave;

}

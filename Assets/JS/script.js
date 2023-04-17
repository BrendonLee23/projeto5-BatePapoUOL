const dados = axios.defaults.headers.common['Authorization'] = 'tZD8ryu6BwaQQL8MHbpwC9yF';

var nome;

adicionarUsuario()

// Função para enviar a requisição de status
function enviarStatus() {
    let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', { name: nome })
    promessa.then(() => {
        console.log("conectado com o servidor")
    })
    promessa.catch(() => {
        console.log("desconectado do servidor")
    })
}


// adicionar usuario e verificar se já existe
function adicionarUsuario() {
    let digitarNome = prompt("Digite seu nome")
    nome = digitarNome;
    let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', { name: nome })
    promessa.then(() => {
        criarMensagem()
        setInterval(() => {
            enviarStatus()
        }, 5000);
        setInterval(() => {
            criarMensagem()
        }, 3000);
        console.log("Cadastro realizado com Sucesso!")
    })
    promessa.catch(() => {
        window.alert("o nome de usuário ja está em uso")
        window.location.reload()
    })
}

var listaDeMensagem = document.getElementById("saguão");
const mensagemInput = document.querySelector("#mensagem");
const enviarMensagem = document.querySelector("[data-test='send-message']");

function criarMensagem() {
    // executar um post na API
    let promessa = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    // adicionar todas as mensagem em "li"
    
    promessa.then((Promessa) => {
        let mensagens = Promessa.data
        listaDeMensagem.innerHTML = ""
        for(let i = 0; i < mensagens.length; i++){
            if (mensagens[i].type === "status"){
                listaDeMensagem.innerHTML += `<li data-test="message"> <span class="span-time">(${mensagens[i].time})</span><span class="span-bold">${mensagens[i].from}</span> ${mensagens[i].text}</li>`
            }
            else if (mensagens[i].type === "message"){
                listaDeMensagem.innerHTML += `<li data-test="message"><span class="span-time">(${mensagens[i].time})</span><span class="span-bold">${mensagens[i].from}</span> para <span class="span-bold">${mensagens[i].to}</span> ${mensagens[i].text}</li>`
            }
        }
    })
}

// Adiciona um ouvinte de evento de clique no botão "Enviar mensagem"
function enviarMSG() {
    const message = mensagemInput.value;
    
    let objMensagem = {
        from: nome,
        to: "Todos",
        text: mensagemInput.value,
        type: "message"
    }
    console.log(objMensagem)
    
    // Envia a mensagem usando Axios
    axios.post("https://mock-api.driven.com.br/api/vm/uol/messages", objMensagem) 
    
        .then(response => {
            console.log(response)
            document.querySelector("#mensagem").value = ""
        })
        .catch(error => {
            console.error(error);
            window.alert("Erro ao enviar mensagem");
        });
}

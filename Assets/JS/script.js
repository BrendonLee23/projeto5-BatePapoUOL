const dados = axios.defaults.headers.common['Authorization'] = 'tZD8ryu6BwaQQL8MHbpwC9yF';

let digitarNome = prompt("Digite seu nome")
let nome = digitarNome;

const nomeUsuario = { nome: nome };
const statusUrl = 'https://mock-api.driven.com.br/api/vm/uol/status';

// Função para enviar a requisição de status
function enviarStatus() {
    axios.post(statusUrl, nomeUsuario, { headers: dados })
        .then(() => {
            console.log('Status enviado com sucesso');
        })
        .catch((error) => {
            console.log('Erro ao enviar status:', error);
        });
}

// Enviar a primeira requisição de status imediatamente
enviarStatus();

// Enviar a requisição de status a cada 5 segundos
setInterval(enviarStatus, 5000);

function buscarMensagens() {
    const url = "https://mock-api.driven.com.br/api/vm/uol/messages";
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw new Error("Erro ao buscar mensagens");
        });
    }

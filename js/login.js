// Seleciona o botão de login pelo ID e adiciona um evento de clique para chamar a função autenticar
const botaoLogin = document.querySelector('#login-form');
botaoLogin.addEventListener('submit', autenticar);

// Seleciona a área onde as mensagens de status serão exibidas
const areaMensagem = document.getElementById('msg');

// Função assíncrona responsável por autenticar o usuário
async function autenticar(e) {
    e.preventDefault(); // Impede que o formulário recarregue a página

    document.getElementById('msg').innerText = "Aguarde... ";

    const dados = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };

    const dados = {
    email: document.getElementById('id_do_input_do_email').value,
    senha: document.getElementById('id_do_input_do_senha').value
  };
    
    const url = "https://24-api-a-two.vercel.app/login";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error("Email/Senha incorretos!");
        }

        const data = await response.json();

        localStorage.setItem('jwt', data.token);

        areaMensagem.style = "color:green";
        areaMensagem.innerHTML = "Usuário Autenticado com Sucesso! <br> Token: " + data.token;

    } catch (error) {
        areaMensagem.style.color = "red";
        areaMensagem.innerText = error;
    }
}

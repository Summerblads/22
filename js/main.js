const botaoAutor = document.getElementById('botaoAutor');
const respAutor = document.getElementById('respAutor');

botaoAutor.addEventListener('click', pegarInformacao);

const urlBase = "https://24-api-a-two.vercel.app/autor"; // A URL da API de autor

async function pegarInformacao() {
    // Verifica se o token está presente no localStorage
    const token = localStorage.getItem('jwt');
    if (!token) {
        respAutor.innerText = "Você precisa estar autenticado para buscar o autor.";
        return; // Se não estiver autenticado, não faz a requisição
    }

    respAutor.innerText = "Aguarde... ";

    try {
        const response = await fetch(urlBase, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Passando o token no cabeçalho para autenticação
            }
        });

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        const data = await response.json();
        respAutor.innerText = data.nome || "Autor não encontrado"; // Exibe o nome do autor ou uma mensagem de erro
    } catch (error) {
        console.error("Erro:", error);
        respAutor.innerText = `Erro: ${error}`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const botaoAutor = document.getElementById('botaoAutor');
    const respAutor = document.getElementById('respAutor');

    const urlBase = "https://24-api-a-nu.vercel.app";

    // Exibe o botão "Buscar Autor" independentemente do token
    botaoAutor.classList.remove("hidden");

    botaoAutor.addEventListener('click', async function () {
        const token = localStorage.getItem('jwt');  // Verifica se há um token

        if (!token) {
            respAutor.innerText = "Você precisa estar autenticado para buscar o autor.";
            return;
        }

        respAutor.innerText = "Aguarde...";

        try {
            const response = await fetch(urlBase, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const data = await response.json();
            respAutor.innerText = data.nome || "Autor não encontrado";
        } catch (error) {
            console.error("Erro:", error);
            respAutor.innerText = `Erro: ${error.message}`;
        }
    });
});

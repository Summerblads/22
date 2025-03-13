async function autenticar(e) {
    e.preventDefault(); // Impede o formulário de recarregar a página

    document.getElementById('msg').innerText = "Aguarde... ";

    const dados = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };

    const url = "https://24-api-a-two.vercel.app/login";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error("Email/Senha incorretos!");
        }

        const data = await response.json();

        // Armazenar o token no localStorage
        localStorage.setItem('jwt', data.token);

        // Exibir a mensagem de sucesso
        const areaMensagem = document.getElementById('msg');
        areaMensagem.style.color = "green";
        areaMensagem.innerHTML = "Usuário autenticado com sucesso! <br> Token: " + data.token;

        // Redirecionar para a página index.html
        window.location.href = "index.html";  // Redireciona para a página inicial

    } catch (error) {
        const areaMensagem = document.getElementById('msg');
        areaMensagem.style.color = "red";
        areaMensagem.innerText = error;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const mensagem = document.getElementById("msg");

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        mensagem.innerText = "Aguarde...";
        mensagem.style.color = "black";

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if (!email || !senha) {
            mensagem.innerText = "Preencha todos os campos!";
            mensagem.style.color = "red";
            return;
        }

        const url = "https://24-api-a-two.vercel.app/login";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                throw new Error("Email ou senha incorretos!");
            }

            const data = await response.json();
            localStorage.setItem("jwt", data.token);

            mensagem.innerText = "Login bem-sucedido! Redirecionando...";
            mensagem.style.color = "green";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } catch (error) {
            mensagem.innerText = error.message;
            mensagem.style.color = "red";
        }
    });
});

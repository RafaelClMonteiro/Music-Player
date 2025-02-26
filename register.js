document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado, script iniciado!");
  const form = document.getElementById("register-form");

  if (!form) {
    console.error("Formulário com id 'register-form' não encontrado!");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Formulário submetido!");

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const errorMessage = document.getElementById("error-message");

    const API_URL = "/auth";

    errorMessage.innerText = "";

    if (!username || !password || !confirmPassword) {
      errorMessage.innerText = "Todos os campos são obrigatórios.";
      return;
    }

    if (password.length < 6) {
      errorMessage.innerText = "A senha deve ter pelo menos 6 caracteres.";
      return;
    }

    if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
      errorMessage.innerText = "A senha deve conter pelo menos uma letra maiúscula e um número.";
      return;
    }

    if (password !== confirmPassword) {
      errorMessage.innerText = "As senhas não coincidem.";
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao registrar.");
      }

      alert("Registro realizado com sucesso!");
      window.location.href = "login.html";
    } catch (error) {
      errorMessage.innerText = error.message;
    }
  });
});

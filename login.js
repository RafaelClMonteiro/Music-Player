document.addEventListener("DOMContentLoaded", () => {
    console.log("Login script carregado!");
  
    const form = document.getElementById("login-form");
  
    if (!form) {
      console.error("Formulário de login não encontrado!");
      errorMessage.classList.add("active");
      return;
    }
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); 
      console.log("Formulário submetido!");
  
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const errorMessage = document.getElementById("error-message");
  
      errorMessage.innerText = "";
  
      if (!username || !password) {
        errorMessage.innerText = "Todos os campos são obrigatórios.";
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || "Erro ao fazer login.");
        }
  
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
  
        alert("Login realizado com sucesso!");
        window.location.href = "musicPlayer.html"; 
      } catch (error) {
        errorMessage.innerText = error.message;
      }
    });
  });
  
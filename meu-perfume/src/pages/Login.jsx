import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
      alert("Email ou senha inválidos.");
      return;
    }

    // Salva usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-teal-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Entrar no Bento Parfum</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Ainda não tem uma conta? <a href="/register" className="text-teal-500 hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuariosExistentes = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const emailJaCadastrado = usuariosExistentes.some((u) => u.email === email);
    if (emailJaCadastrado) {
      alert("Esse e-mail já foi cadastrado.");
      return;
    }

    const novoUsuario = { nome, email, senha };
    const usuariosAtualizados = [...usuariosExistentes, novoUsuario];
    localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));

    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-rose-100 px-4 relative">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Criar Conta</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded-lg font-semibold hover:bg-rose-600 transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Já tem uma conta? <a href="/login" className="text-rose-500 hover:underline">Entrar</a>
        </p>
      </div>
    </div>
  );
}

export default Register;

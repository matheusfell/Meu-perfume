import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-rose-100 px-4 relative">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* <button
            onClick={() => navigate("/login")}
            className="top-6 left-6 text-rose-500 hover:text-rose-700 text-2xl font-bold"
            aria-label="Voltar para login"
        >
        ← 
        </button> */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Criar Conta</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nome</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Senha</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="••••••••"
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

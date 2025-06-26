import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [colecao, setColecao] = useState([]);
  const [notaMedia, setNotaMedia] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    setUsuario(user);

    const wl = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const col = JSON.parse(localStorage.getItem("colecao") || "[]");

    setWishlist(wl);
    setColecao(col);

    if (col.length > 0) {
      const soma = col.reduce((acc, cur) => acc + (cur.nota || 0), 0);
      setNotaMedia((soma / col.length).toFixed(1));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-10 px-4 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Olá, <span className="font-extrabold">{usuario?.nome}</span> <span className="text-2xl">👋</span>
          </h1>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 transition">
            Sair
          </button>
        </div>

        <p className="text-lg text-gray-600 mb-8">O que você gostaria de fazer hoje?</p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wishlist Card */}
          <div
            onClick={() => navigate("/wishlist")}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer text-center"
          >
            <div className="bg-rose-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl text-rose-500 mb-4">
              ★
            </div>
            <h2 className="font-semibold text-xl mb-1">Minha Wishlist</h2>
            <p className="text-gray-500 text-sm mb-4">
              Explore e adicione perfumes que você deseja à sua lista de desejos
            </p>
            <div className="bg-rose-50 text-rose-600 py-2 rounded-full font-medium">
              Ver lista de desejos
            </div>
          </div>

          {/* Coleção Card */}
          <div
            onClick={() => navigate("/collection")}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer text-center"
          >
            <div className="bg-green-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl text-green-500 mb-4">
              🎒
            </div>
            <h2 className="font-semibold text-xl mb-1">Minha Coleção</h2>
            <p className="text-gray-500 text-sm mb-4">
              Gerencie sua coleção pessoal com notas, avaliações e ocasiões
            </p>
            <div className="bg-green-50 text-green-600 py-2 rounded-full font-medium">
              Ver coleção
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 text-center">
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-xl font-bold text-gray-900">{wishlist.length}</p>
            <p className="text-sm text-gray-500">Na Wishlist</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-xl font-bold text-gray-900">{colecao.length}</p>
            <p className="text-sm text-gray-500">Na Coleção</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-xl font-bold text-gray-900">{notaMedia || "-"}</p>
            <p className="text-sm text-gray-500">Nota Média</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

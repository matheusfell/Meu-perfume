import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [colecaoCount, setColecaoCount] = useState(0);
  const [notaMedia, setNotaMedia] = useState(0);
  const [temaEscuro, setTemaEscuro] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    setUsuario(user);

    const temaSalvo = localStorage.getItem("tema") === "dark";
    setTemaEscuro(temaSalvo);
    document.documentElement.classList.toggle("dark", temaSalvo);

    const carregarDados = async () => {
      if (!user?.uid) return;

      const qWish = query(collection(db, "wishlist"), where("uid", "==", user.uid));
      const qColl = query(collection(db, "colecao"), where("userId", "==", user.uid));

      const wishSnap = await getDocs(qWish);
      const collSnap = await getDocs(qColl);

      setWishlistCount(wishSnap.size);
      setColecaoCount(collSnap.size);

      const perfumes = collSnap.docs.map(doc => doc.data());
      const notas = perfumes.map(p => parseFloat(p.nota)).filter(n => !isNaN(n));
      const media = notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1) : 0;
      setNotaMedia(media);
    };

    carregarDados();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  const alternarTema = () => {
    const novoTema = !temaEscuro;
    setTemaEscuro(novoTema);
    document.documentElement.classList.toggle("dark", novoTema);
    localStorage.setItem("tema", novoTema ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4 text-gray-800 dark:text-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Olá, <span className="font-extrabold">{usuario?.nome}</span> <span className="text-2xl">👋</span>
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={alternarTema}
              className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full"
            >
              {temaEscuro ? "🌞 Claro" : "🌙 Escuro"}
            </button>
            <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 transition">
              Sair
            </button>
          </div>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">O que você gostaria de fazer hoje?</p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wishlist Card */}
          <div
            onClick={() => navigate("/wishlist")}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer text-center"
          >
            <div className="bg-rose-100 dark:bg-rose-400 w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl text-rose-500 mb-4">
              ⭐
            </div>
            <h2 className="font-semibold text-xl mb-1">Minha Wishlist</h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
              Explore e adicione perfumes que você deseja à sua lista de desejos
            </p>
            <div className="bg-rose-50 dark:bg-rose-300 text-rose-600 py-2 rounded-full font-medium">
              Ver lista de desejos
            </div>
          </div>

          {/* Coleção Card */}
          <div
            onClick={() => navigate("/collection")}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer text-center"
          >
            <div className="bg-green-100 dark:bg-green-400 w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl text-green-500 mb-4">
              🎒
            </div>
            <h2 className="font-semibold text-xl mb-1">Minha Coleção</h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
              Gerencie sua coleção pessoal com notas, avaliações e ocasiões
            </p>
            <div className="bg-green-50 dark:bg-green-300 text-green-600 py-2 rounded-full font-medium">
              Ver coleção
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 text-center">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{wishlistCount}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">Na Wishlist</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{colecaoCount}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">Na Coleção</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{notaMedia || "-"}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">Nota Média</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

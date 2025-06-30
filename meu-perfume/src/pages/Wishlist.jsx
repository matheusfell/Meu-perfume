import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");

  useEffect(() => {
    const carregarWishlist = async () => {
      if (!usuario?.uid) return;

      const q = query(
        collection(db, "wishlist"),
        where("uid", "==", usuario.uid)
      );
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWishlist(lista);
    };

    carregarWishlist();
  }, [usuario]);

  const handleEditar = (perfume) => {
    navigate("/wishlist/add", { state: { perfume, editMode: true } });
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este perfume?");
    if (!confirmar) return;

    await deleteDoc(doc(db, "wishlist", id));
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAdicionar = async (perfume) => {
    navigate("/collection/add", { state: { perfume } });
    await deleteDoc(doc(db, "wishlist", perfume.id));
    setWishlist((prev) => prev.filter((p) => p.id !== perfume.id));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-rose-50 to-violet-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center text-pink-600 hover:text-pink-800 mb-4 transition font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-pink-400 text-3xl">★</span>
              Minha Wishlist
            </h1>
            <p className="text-sm text-gray-500">
              {wishlist.length} perfume{wishlist.length !== 1 && "s"} na sua lista de desejos
            </p>
          </div>

          <button
            onClick={() => navigate("/wishlist/add")}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>

        <div className="space-y-4">
          {wishlist.map((perfume) => (
            <div
              key={perfume.id}
              className="flex items-center justify-between bg-white rounded-xl shadow p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => handleEditar(perfume)}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden">
                  {perfume.imagem ? (
                    <img
                      src={perfume.imagem}
                      alt={perfume.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      sem foto
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{perfume.nome}</h3>
                  <p className="text-sm text-gray-500">{perfume.marca}</p>
                  {perfume.preco && (
                    <p className="text-sm font-medium text-violet-400 mt-1">
                      R$ {parseFloat(perfume.preco).toFixed(2).replace(".", ",")}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleAdicionar(perfume)}
                  className="bg-green-100 text-green-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition"
                >
                  Adicionar à Coleção
                </button>
                <button
                  onClick={() => handleExcluir(perfume.id)}
                  className="bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200"
                  title="Excluir"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;

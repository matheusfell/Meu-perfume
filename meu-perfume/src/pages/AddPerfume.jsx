import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Camera } from "lucide-react";

function AddPerfume() {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");

  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [imagem, setImagem] = useState("");
  const [preco, setPreco] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [perfumeId, setPerfumeId] = useState(null);
  const [temaEscuro, setTemaEscuro] = useState(false);

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema") === "dark";
    setTemaEscuro(temaSalvo);
    document.documentElement.classList.toggle("dark", temaSalvo);

    const perfume = location.state?.perfume;
    if (perfume) {
      setNome(perfume.nome || "");
      setMarca(perfume.marca || "");
      setImagem(perfume.imagem || "");
      setPreco(perfume.preco || "");
      setEditMode(location.state?.editMode || false);
      setPerfumeId(perfume.id || null);
    }
  }, [location]);

  const alternarTema = () => {
    const novoTema = !temaEscuro;
    setTemaEscuro(novoTema);
    document.documentElement.classList.toggle("dark", novoTema);
    localStorage.setItem("tema", novoTema ? "dark" : "light");
  };

  const handleSalvar = async () => {
    if (!nome || !marca || !usuario?.uid) return;

    const novoPerfume = {
      nome,
      marca,
      imagem,
      preco,
      uid: usuario.uid,
    };

    if (editMode && perfumeId) {
      const ref = doc(db, "wishlist", perfumeId);
      await updateDoc(ref, novoPerfume);
    } else {
      await addDoc(collection(db, "wishlist"), novoPerfume);
    }

    navigate("/wishlist");
  };

  const handleRemoverDaWishlist = async () => {
    if (!usuario?.uid || !perfumeId) return;
    try {
      await deleteDoc(doc(db, "wishlist", perfumeId));
    } catch (err) {
      console.error("Erro ao remover da wishlist:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-violet-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 px-4 py-6">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/wishlist")}
            className="text-sm text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ← Voltar
          </button>
          <button
            onClick={alternarTema}
            className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full"
          >
            {temaEscuro ? "🌞 Claro" : "🌙 Escuro"}
          </button>
        </div>

        <h1 className="text-center text-2xl font-bold mb-6">
          {editMode ? "Editar Perfume" : "Adicionar à Wishlist"}
        </h1>

        <div className="flex justify-center mb-4">
          <label className="h-24 w-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-600">
            {imagem ? (
              <img
                src={imagem}
                alt="Preview"
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center text-center">
                <Camera className="h-6 w-6 mb-1" />
                <span className="text-xs">Toque para adicionar foto</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagem(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Sauvage"
            className="border rounded-lg p-3 w-full dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Ex: Dior"
            className="border rounded-lg p-3 w-full dark:bg-gray-800 dark:text-white"
          />
        </div>

        <input
          type="number"
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Preço (opcional)"
          className="border rounded-lg p-3 w-full mb-6 dark:bg-gray-800 dark:text-white"
        />

        <button
          onClick={handleSalvar}
          className="bg-violet-500 hover:bg-violet-600 text-white w-full py-3 rounded-xl font-semibold transition mb-2"
        >
          {editMode ? "Salvar Alterações" : "Adicionar à Wishlist"}
        </button>

        {editMode && (
          <button
            onClick={() => {
              if (confirm("Tem certeza que deseja remover este perfume da wishlist?")) {
                handleRemoverDaWishlist();
                navigate("/wishlist");
              }
            }}
            className="bg-red-100 hover:bg-red-200 text-red-700 w-full py-3 rounded-xl font-semibold transition dark:bg-red-300 dark:text-red-800"
          >
            Remover da Wishlist
          </button>
        )}
      </div>
    </div>
  );
}

export default AddPerfume;

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function AddPerfume() {
  const navigate = useNavigate();
  const location = useLocation();

  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const perfume = location.state?.perfume;
    const isEditing = location.state?.editMode;
    if (perfume && isEditing) {
      setNome(perfume.nome || "");
      setMarca(perfume.marca || "");
      setPreco(perfume.preco || "");
      setImagem(perfume.imagem || "");
      setEditMode(true);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoPerfume = { nome, marca, preco, imagem };
    const listaAtual = JSON.parse(localStorage.getItem("wishlist") || "[]");

    let novaLista;
    if (editMode) {
      // Se for edição, substitui o perfume anterior com mesmo nome e marca
      const antigo = location.state?.perfume;
      novaLista = listaAtual.map((p) =>
        p.nome === antigo.nome && p.marca === antigo.marca ? novoPerfume : p
      );
    } else {
      // Se for novo, adiciona ao final
      novaLista = [...listaAtual, novoPerfume];
    }

    localStorage.setItem("wishlist", JSON.stringify(novaLista));
    navigate("/wishlist");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white p-6">
      {/* Top bar */}
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => navigate("/wishlist")}>
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            {editMode ? "Editar Perfume" : "Adicionar à Wishlist"}
          </h1>
          <p className="text-sm text-gray-500">
            {editMode
              ? "Atualize os dados do perfume na sua wishlist"
              : "Adicione um novo perfume à sua lista de desejos"}
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl px-8 py-10">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Detalhes do Perfume
        </h2>

        {/* Imagem */}
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="imageInput"
            className="cursor-pointer w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400"
          >
            {imagem ? (
              <img
                src={imagem}
                alt="preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-2xl">📷</span>
            )}
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setImagem(reader.result);
                reader.readAsDataURL(file);
              }
            }}
          />
          <p className="text-xs text-gray-400 mt-2">
            Toque para {imagem ? "alterar" : "adicionar"} foto
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Nome do Perfume *</label>
            <input
              type="text"
              placeholder="Ex: Sauvage"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Marca *</label>
            <input
              type="text"
              placeholder="Ex: Dior"
              required
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Preço *</label>
            <input
              type="text"
              placeholder="Ex: R$ 450,00"
              required
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-100 text-rose-500 py-2 rounded-lg font-semibold cursor-pointer disabled:opacity-50"
            disabled={!nome || !marca || !preco}
          >
            {editMode ? "Salvar Alterações" : "Adicionar à Wishlist"}
          </button>
        </form>

        <button
          onClick={() => navigate("/wishlist")}
          className="mt-4 text-gray-500 text-sm hover:underline w-full text-center"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default AddPerfume;

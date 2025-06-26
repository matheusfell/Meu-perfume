import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, Camera } from "lucide-react";

function AddToCollection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [imagem, setImagem] = useState("");
  const [nota, setNota] = useState(0);
  const [notas, setNotas] = useState("");
  const [ocasiões, setOcasiões] = useState([]);
  const [acordes, setAcordes] = useState([]);

  const opcoesOcasiões = [
    "Trabalho",
    "Casual",
    "Encontros",
    "Eventos",
    "Noite",
    "Dia",
    "Inverno",
    "Verão",
  ];

  const opcoesAcordes = [
    "Frutal",
    "Amadeirado",
    "Fresco",
    "Doce",
    "Floral",
    "Oriental",
    "Especiado",
    "Cítrico",
    "Aquático",
  ];

  useEffect(() => {
    const perfume = location.state?.perfume;
    if (perfume) {
      setNome(perfume.nome || "");
      setMarca(perfume.marca || "");
      setImagem(perfume.imagem || "");
    }
  }, [location]);

  const toggleItem = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleAdd = () => {
    if (!nome || !marca) return;

    const novoPerfume = {
      nome,
      marca,
      imagem,
      nota,
      notas,
      ocasiões,
      acordes,
    };

    const colecaoAtual = JSON.parse(localStorage.getItem("colecao") || "[]");
    colecaoAtual.push(novoPerfume);
    localStorage.setItem("colecao", JSON.stringify(colecaoAtual));

    const perfumeVindo = location.state?.perfume;
    if (perfumeVindo) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const novaWishlist = wishlist.filter(
        (p) => !(p.nome === perfumeVindo.nome && p.marca === perfumeVindo.marca)
      );
      localStorage.setItem("wishlist", JSON.stringify(novaWishlist));
    }

    localStorage.removeItem("perfumePrePreenchido");
    navigate("/collection");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-6">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate("/collection")}
          className="flex items-center text-sm text-gray-500 hover:text-black mb-4"
        >
          ← Voltar
        </button>

        <h1 className="text-center text-2xl font-bold mb-6">Detalhes do Perfume</h1>

        <div className="flex justify-center mb-4">
          <label className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-600">
            {imagem ? (
              <img src={imagem} alt="Preview" className="h-full w-full object-cover rounded-xl" />
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
            placeholder="Ex: Aventus"
            className="border rounded-lg p-3 w-full"
          />
          <input
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Ex: Creed"
            className="border rounded-lg p-3 w-full"
          />
        </div>

        <div className="flex items-center gap-1 justify-center mb-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={24}
              fill={nota >= n ? "#facc15" : "none"}
              stroke="#facc15"
              className="cursor-pointer"
              onClick={() => setNota(n)}
            />
          ))}
        </div>

        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          placeholder="Escreva suas impressões sobre este perfume..."
          className="border rounded-lg p-3 w-full mb-4"
        />

        <div className="mb-4">
          <p className="font-medium text-sm mb-2">Ocasiões</p>
          <div className="flex flex-wrap gap-2">
            {opcoesOcasiões.map((item) => (
              <span
                key={item}
                onClick={() => toggleItem(item, ocasiões, setOcasiões)}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer transition border
                  ${ocasiões.includes(item)
                    ? "bg-rose-100 text-rose-700 border-rose-200"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-medium text-sm mb-2">Acordes</p>
          <div className="flex flex-wrap gap-2">
            {opcoesAcordes.map((item) => (
              <span
                key={item}
                onClick={() => toggleItem(item, acordes, setAcordes)}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer transition border
                  ${acordes.includes(item)
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="bg-violet-200 hover:bg-violet-300 text-black w-full py-3 rounded-xl font-semibold transition"
        >
          Adicionar à Coleção
        </button>
      </div>
    </div>
  );
}

export default AddToCollection;
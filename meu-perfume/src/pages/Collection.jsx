import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, StarHalf, ArrowLeft, Trash } from "lucide-react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";

function Collection() {
  const [colecao, setColecao] = useState([]);
  const [temaEscuro, setTemaEscuro] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) return;

    const colecaoRef = collection(db, "colecao");
    const q = query(colecaoRef, where("userId", "==", usuarioLogado.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const perfumes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setColecao(perfumes);
    });

    const temaSalvo = localStorage.getItem("tema") === "dark";
    setTemaEscuro(temaSalvo);
    document.documentElement.classList.toggle("dark", temaSalvo);

    return () => unsubscribe();
  }, []);

  const alternarTema = () => {
    const novoTema = !temaEscuro;
    setTemaEscuro(novoTema);
    document.documentElement.classList.toggle("dark", novoTema);
    localStorage.setItem("tema", novoTema ? "dark" : "light");
  };

  const renderEstrelas = (nota) => {
    const estrelas = [];
    const notaInteira = Math.floor(nota);
    const temMeia = nota - notaInteira >= 0.5;

    for (let i = 0; i < notaInteira; i++) {
      estrelas.push(<Star key={"star-" + i} size={18} fill="#facc15" stroke="#facc15" />);
    }
    if (temMeia) estrelas.push(<StarHalf key="meia" size={18} fill="#facc15" stroke="#facc15" />);
    return estrelas;
  };

  const handleEditar = (perfume) => {
    navigate("/collection/add", { state: { perfume, editMode: true } });
  };

  const handleExcluir = async (e, id) => {
    e.stopPropagation();
    const confirmar = window.confirm("Deseja realmente remover este perfume da coleção?");
    if (!confirmar) return;
    await deleteDoc(doc(db, "colecao", id));
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center text-pink-600 hover:text-pink-800 transition font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          <button
            onClick={alternarTema}
            className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full"
          >
            {temaEscuro ? "🌞 Claro" : "🌙 Escuro"}
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span className="text-green-400 text-3xl">🎒</span>
              Minha Coleção
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {colecao.length} perfume{colecao.length !== 1 && "s"} na sua coleção
            </p>
          </div>

          <button
            onClick={() => navigate("/collection/add")}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
          >
            <span className="text-lg">＋</span> Adicionar
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {colecao.map((perfume) => (
            <div
              key={perfume.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-md cursor-pointer transition relative"
              onClick={() => handleEditar(perfume)}
            >
              <button
                onClick={(e) => handleExcluir(e, perfume.id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                title="Excluir"
              >
                <Trash size={18} />
              </button>

              <div className="flex justify-center mb-4">
                {perfume.imagem ? (
                  <img
                    src={perfume.imagem}
                    alt={perfume.nome}
                    className="h-20 w-20 object-cover rounded-xl"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-xl bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-400">
                    sem foto
                  </div>
                )}
              </div>

              <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white">
                {perfume.nome}
              </h3>
              <p className="text-center text-sm text-gray-500 dark:text-gray-300 mb-2">{perfume.marca}</p>

              <div className="flex justify-center mb-4">
                {renderEstrelas(perfume.nota || 0)}
              </div>

              {perfume.notas && (
                <div className="mb-3">
                  <p className="font-medium text-sm text-gray-700 dark:text-gray-300">Minhas Notas:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-200 mt-1">{perfume.notas}</p>
                </div>
              )}

              {perfume.ocasiões?.length > 0 && (
                <div className="mb-3">
                  <p className="font-medium text-sm text-gray-700 dark:text-gray-300">Ocasiões:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {perfume.ocasiões.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-rose-100 dark:bg-rose-300 text-rose-700 dark:text-rose-900 px-2 py-1 text-xs rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {perfume.acordes?.length > 0 && (
                <div className="mb-3">
                  <p className="font-medium text-sm text-gray-700 dark:text-gray-300">Acordes:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {perfume.acordes.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 dark:bg-green-300 text-green-700 dark:text-green-900 px-2 py-1 text-xs rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;

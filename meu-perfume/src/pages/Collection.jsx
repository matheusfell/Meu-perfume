import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, StarHalf, ArrowLeft } from "lucide-react";


function Collection() {
    const [colecao, setColecao] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const col = JSON.parse(localStorage.getItem("colecao") || "[]");
        setColecao(col);
    }, []);

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

    return (
        <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-green-50 to-white">
            <div className="max-w-4xl mx-auto px-4">

                {/* Botão de Voltar */}
                <div className="mb-4">
                    <button
                        onClick={() => navigate("/home")}
                        className="flex items-center text-pink-600 hover:text-pink-800 transition font-medium"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Voltar
                    </button>
                </div>

                {/* Título e botão de adicionar */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="text-green-400 text-3xl">🎒</span>
                            Minha Coleção
                        </h1>
                        <p className="text-sm text-gray-500">
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
                    {colecao.map((perfume, index) => (
                        <div key={index} className="bg-white rounded-xl shadow p-6">
                            <div className="flex justify-center mb-4">
                                {perfume.imagem ? (
                                    <img
                                        src={perfume.imagem}
                                        alt={perfume.nome}
                                        className="h-20 w-20 object-cover rounded-xl"
                                    />
                                ) : (
                                    <div className="h-20 w-20 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                                        sem foto
                                    </div>
                                )}
                            </div>
                            <h3 className="text-center text-lg font-semibold text-gray-800">
                                {perfume.nome}
                            </h3>
                            <p className="text-center text-sm text-gray-500 mb-2">{perfume.marca}</p>

                            {/* Avaliação */}
                            <div className="flex justify-center mb-4">
                                {renderEstrelas(perfume.nota || 0)}
                            </div>

                            {/* Notas */}
                            {perfume.notas && (
                                <div className="mb-3">
                                    <p className="font-medium text-sm text-gray-700">Minhas Notas:</p>
                                    <p className="text-sm text-gray-600 mt-1">{perfume.notas}</p>
                                </div>
                            )}

                            {/* Ocasiões */}
                            {perfume.ocasiões?.length > 0 && (
                                <div className="mb-3">
                                    <p className="font-medium text-sm text-gray-700">Ocasiões:</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {perfume.ocasiões.map((item, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-rose-100 text-rose-700 px-2 py-1 text-xs rounded-full"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Acordes */}
                            {perfume.acordes?.length > 0 && (
                                <div className="mb-3">
                                    <p className="font-medium text-sm text-gray-700">Acordes:</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {perfume.acordes.map((item, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full"
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

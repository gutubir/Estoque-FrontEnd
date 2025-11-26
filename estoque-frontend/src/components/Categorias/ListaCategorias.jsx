import { useState, useEffect } from 'react';
import { getCategorias, deletarCategoria } from '../../services/api';
import FormCategoria from './FormCategoria';
import '../Produtos/ListaProdutos.css';

function ListaCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function carregarCategorias() {
    try {
      setCarregando(true);
      const dados = await getCategorias();
      setCategorias(dados);
      setErro('');
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleDeletar(id) {
    if (!confirm('Tem certeza que deseja deletar esta categoria?')) return;
    
    try {
      await deletarCategoria(id);
      await carregarCategorias();
    } catch (e) {
      setErro(e.message);
    }
  }

  function handleNovo() {
    setCategoriaEditando(null);
    setMostrarForm(true);
  }

  function handleEditar(categoria) {
    setCategoriaEditando(categoria);
    setMostrarForm(true);
  }

  function handleFecharForm() {
    setMostrarForm(false);
    setCategoriaEditando(null);
    carregarCategorias();
  }

  if (carregando) {
    return <div className="container">Carregando categorias...</div>;
  }

  if (erro) {
    return <div className="container erro">Erro: {erro}</div>;
  }

  return (
    <div className="container">
      <div className="header-secao">
        <h2>Categorias</h2>
        <button className="btn-primary" onClick={handleNovo}>
          + Nova Categoria
        </button>
      </div>

      {mostrarForm && (
        <FormCategoria
          categoria={categoriaEditando}
          onClose={handleFecharForm}
        />
      )}

      {categorias.length === 0 ? (
        <p>Nenhuma categoria cadastrada.</p>
      ) : (
        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Tamanho</th> 
              <th>Embalagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nome}</td>
                <td>{c.descricao || '-'}</td>
                <td>{c.tamanho || '-'}</td>     {/* novo */}
                <td>{c.embalagem || '-'}</td>   {/* novo */}
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => handleEditar(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-deletar"
                    onClick={() => handleDeletar(c.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}

export default ListaCategorias;

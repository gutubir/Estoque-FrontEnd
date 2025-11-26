import { useState, useEffect } from 'react';
import { getProdutos, deletarProduto } from '../../services/api';
import FormProduto from './FormProduto';
import './ListaProdutos.css';

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      setCarregando(true);
      const dados = await getProdutos();
      setProdutos(dados);
      setErro('');
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleDeletar(id) {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    
    try {
      await deletarProduto(id);
      await carregarProdutos();
    } catch (e) {
      setErro(e.message);
    }
  }

  function handleNovo() {
    setProdutoEditando(null);
    setMostrarForm(true);
  }

  function handleEditar(produto) {
    setProdutoEditando(produto);
    setMostrarForm(true);
  }

  function handleFecharForm() {
    setMostrarForm(false);
    setProdutoEditando(null);
    carregarProdutos();
  }

  if (carregando) {
    return <div className="container">Carregando produtos...</div>;
  }

  if (erro) {
    return <div className="container erro">Erro: {erro}</div>;
  }

  return (
    <div className="container">
      <div className="header-secao">
        <h2>Produtos</h2>
        <button className="btn-primary" onClick={handleNovo}>
          + Novo Produto
        </button>
      </div>

      {mostrarForm && (
        <FormProduto
          produto={produtoEditando}
          onClose={handleFecharForm}
        />
      )}

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço Unitário</th>
              <th>Unidade</th>
              <th>Quantidade em Estoque</th>
              <th>Quantidade Mínima</th>
              <th>Quantidade Máxima</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length === 0 ? (
              <tr>
                <td colSpan="9">Nenhum produto cadastrado.</td>
              </tr>
            ) : (
              produtos.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nome}</td>
                  <td>R$ {p.precoUnitario}</td>
                  <td>{p.unidade}</td>
                  <td>{p.quantidadeEstoque}</td>
                  <td>{p.quantidadeMinima}</td>
                  <td>{p.quantidadeMaxima}</td>
                  <td>{p.categoriaNome ?? p.categoria?.nome ?? '-'}</td> {/* novo */}
                  <td>
                    <button className="btn-editar" onClick={() => handleEditar(p)}>
                      Editar
                    </button>
                    <button className="btn-deletar" onClick={() => handleDeletar(p.id)}>
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaProdutos;

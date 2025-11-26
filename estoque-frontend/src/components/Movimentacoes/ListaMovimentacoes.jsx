import { useState, useEffect } from 'react';
import { getMovimentacoes, getProdutos } from '../../services/api';
import FormMovimentacao from './FormMovimentacao';
import '../Produtos/ListaProdutos.css';

function ListaMovimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setCarregando(true);
      const [dadosMovimentacoes, dadosProdutos] = await Promise.all([
        getMovimentacoes(),
        getProdutos()
      ]);
      setMovimentacoes(dadosMovimentacoes);
      setProdutos(dadosProdutos);
      setErro('');
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  function handleNovo() {
    setMostrarForm(true);
  }

  function handleFecharForm() {
    setMostrarForm(false);
    carregarDados();
  }

  function getNomeProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    return produto?.nome || `Produto ${produtoId}`;
  }

  function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  }

  if (carregando) {
    return <div className="container">Carregando movimentações...</div>;
  }

  if (erro) {
    return <div className="container erro">Erro: {erro}</div>;
  }

  return (
    <div className="container">
      <div className="header-secao">
        <h2>Movimentações</h2>
        <button className="btn-primary" onClick={handleNovo}>
          + Nova Movimentação
        </button>
      </div>

      {mostrarForm && (
        <FormMovimentacao
          produtos={produtos}
          onClose={handleFecharForm}
        />
      )}

      {movimentacoes.length === 0 ? (
        <p>Nenhuma movimentação cadastrada.</p>
      ) : (
        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Tipo</th>
              <th>Quantidade</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{getNomeProduto(m.produtoId)}</td>
                <td>
                  <span className={`badge badge-${m.tipo.toLowerCase()}`}>
                    {m.tipo}
                  </span>
                </td>
                <td>{m.quantidade}</td>
                <td>{formatarData(m.data)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaMovimentacoes;

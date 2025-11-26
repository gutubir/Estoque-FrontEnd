import { useState, useEffect } from 'react';
import {
  getRelatorioPrecos,
  getBalancoFinanceiro,
  getProdutosAbaixoMinimo,
  getProdutosPorCategoria,
  getMovimentacoesTop,
} from '../../services/api';
import '../Produtos/ListaProdutos.css';
import './Relatorios.css';


function Relatorios() {
  const [produtos, setProdutos] = useState([]);
  const [balanco, setBalanco] = useState(null);
  const [abaixoMinimo, setAbaixoMinimo] = useState([]);
  const [porCategoria, setPorCategoria] = useState([]);
  const [topMovimentacoes, setTopMovimentacoes] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('precos');


  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setCarregando(true);
        const [
          dadosPrecos,
          dadosBalanco,
          dadosAbaixo,
          dadosPorCategoria,
          dadosTop,
        ] = await Promise.all([
          getRelatorioPrecos(),
          getBalancoFinanceiro(),
          getProdutosAbaixoMinimo(),
          getProdutosPorCategoria(),
          getMovimentacoesTop(),
        ]);

        setProdutos(dadosPrecos);
        setBalanco(dadosBalanco);
        setAbaixoMinimo(dadosAbaixo);
        setPorCategoria(dadosPorCategoria);
        setTopMovimentacoes(dadosTop);
        setErro('');
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }
  
  const totalItens = produtos.reduce(
    (sum, p) => sum + p.quantidadeEstoque,
    0
  );  


  if (carregando) {
    return <div className="container">Carregando relatórios...</div>;
  }

  if (erro) {
    return <div className="container erro">Erro: {erro}</div>;
  }

  return (
    <div className="container">
      <h2>Relatórios</h2>

      <div className="tabs">
        <button
          className={`tab ${abaAtiva === 'precos' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('precos')}
        >
          Lista de Preços
        </button>
        <button
          className={`tab ${abaAtiva === 'balanco' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('balanco')}
        >
          Balanço Financeiro
        </button>
        <button
          className={`tab ${abaAtiva === 'abaixo' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('abaixo')}
        >
          Abaixo da Quantidade Mínima
        </button>
        <button
          className={`tab ${abaAtiva === 'categorias' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('categorias')}
        >
          Produtos por Categoria
        </button>
        <button
          className={`tab ${abaAtiva === 'movimentos' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('movimentos')}
        >
          Maior Entrada/Saída
        </button>
      </div>

      {abaAtiva === 'precos' && (
        <div className="relatorio-section">
          <h3>Lista de Preços</h3>
          {produtos.length === 0 ? (
            <p>Nenhum produto cadastrado.</p>
          ) : (
            <table className="tabela-produtos">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Preço Unitário</th>
                  <th>Unidade</th>
                  <th>Quantidade em Estoque</th>
                  <th>Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => {
                  const valorTotal = Number(p.precoUnitario) * p.quantidadeEstoque;
                  return (
                    <tr key={p.id}>
                      <td>{p.nome}</td>
                      <td>{p.categoriaNome || '-'}</td>
                      <td>R$ {Number(p.precoUnitario).toFixed(2)}</td>
                      <td>{p.unidade}</td>
                      <td>{p.quantidadeEstoque}</td>
                      <td>R$ {valorTotal.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {abaAtiva === 'balanco' && (
        <div className="relatorio-section">
          <h3>Balanço Físico/Financeiro</h3>

          <p>
            Quantidade total de itens em estoque:{' '}
            <strong>{totalItens}</strong>
          </p>

          <p>
            Valor financeiro total do estoque:{' '}
            <strong>
              R$ {balanco?.valorTotal?.toFixed(2) || '0.00'}
            </strong>
          </p>

          <h4>Detalhamento por produto</h4>
          {produtos.length === 0 ? (
            <p>Nenhum produto cadastrado.</p>
          ) : (
            <table className="tabela-produtos">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Unidade</th>
                  <th>Quantidade em Estoque</th>
                  <th>Preço Unitário</th>
                  <th>Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => {
                  const valorProduto = Number(p.precoUnitario) * p.quantidadeEstoque;
                  return (
                    <tr key={p.id}>
                      <td>{p.nome}</td>
                      <td>{p.unidade}</td>
                      <td>{p.quantidadeEstoque}</td>
                      <td>R$ {Number(p.precoUnitario).toFixed(2)}</td>
                      <td>R$ {valorProduto.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}


      {abaAtiva === 'abaixo' && (
        <div className="relatorio-section">
          <h3>Produtos abaixo da quantidade mínima</h3>
          {abaixoMinimo.length === 0 ? (
            <p>Nenhum produto abaixo do mínimo.</p>
          ) : (
            <table className="tabela-produtos">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Qtd. Mínima</th>
                  <th>Qtd. em Estoque</th>
                </tr>
              </thead>
              <tbody>
                {abaixoMinimo.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nome}</td>
                    <td>{p.quantidadeMinima}</td>
                    <td>{p.quantidadeEstoque}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {abaAtiva === 'categorias' && (
        <div className="relatorio-section">
          <h3>Quantidade de produtos por categoria</h3>
          {porCategoria.length === 0 ? (
            <p>Nenhum dado.</p>
          ) : (
            <table className="tabela-produtos">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Quantidade de produtos</th>
                </tr>
              </thead>
              <tbody>
                {porCategoria.map((c) => (
                  <tr key={c.categoria}>
                    <td>{c.categoria}</td>
                    <td>{c.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {abaAtiva === 'movimentos' && (
        <div className="relatorio-section">
          <h3>Produto com maior entrada e maior saída</h3>
          {!topMovimentacoes ? (
            <p>Nenhuma movimentação encontrada.</p>
          ) : (
            <>
              <p>
                Maior <strong>entrada</strong>:{' '}
                {topMovimentacoes.maisEntrada?.nome || '-'} (
                {topMovimentacoes.maisEntrada?.quantidade || 0} unidades)
              </p>
              <p>
                Maior <strong>saída</strong>:{' '}
                {topMovimentacoes.maisSaida?.nome || '-'} (
                {topMovimentacoes.maisSaida?.quantidade || 0} unidades)
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Relatorios;

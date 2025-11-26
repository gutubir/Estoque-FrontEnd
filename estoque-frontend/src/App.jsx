import { useState } from 'react';
import Header from './components/Layout/Header';
import ListaProdutos from './components/Produtos/ListaProdutos';
import ListaCategorias from './components/Categorias/ListaCategorias';
import ListaMovimentacoes from './components/Movimentacoes/ListaMovimentacoes';
import Relatorios from './components/Relatorios/Relatorios';
import './App.css';

function App() {
  const [abaAtiva, setAbaAtiva] = useState('produtos');

  return (
    <div className="app">
      <Header abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
      
      <main>
        {abaAtiva === 'produtos' && <ListaProdutos />}
        {abaAtiva === 'categorias' && <ListaCategorias />}
        {abaAtiva === 'movimentacoes' && <ListaMovimentacoes />}
        {abaAtiva === 'relatorios' && <Relatorios />}
      </main>
    </div>
  );
}

export default App;

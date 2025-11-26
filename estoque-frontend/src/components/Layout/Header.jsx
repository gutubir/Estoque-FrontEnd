import './Header.css';

function Header({ abaAtiva, setAbaAtiva }) {
  return (
    <header className="header">
      <h1>Sistema de Estoque</h1>
      <nav className="nav">
        <button
          className={abaAtiva === 'produtos' ? 'active' : ''}
          onClick={() => setAbaAtiva('produtos')}
        >
          Produtos
        </button>
        <button
          className={abaAtiva === 'categorias' ? 'active' : ''}
          onClick={() => setAbaAtiva('categorias')}
        >
          Categorias
        </button>
        <button
          className={abaAtiva === 'movimentacoes' ? 'active' : ''}
          onClick={() => setAbaAtiva('movimentacoes')}
        >
          Movimentações
        </button>
        <button
          className={abaAtiva === 'relatorios' ? 'active' : ''}
          onClick={() => setAbaAtiva('relatorios')}
        >
          Relatórios
        </button>
      </nav>
    </header>
  );
}

export default Header;

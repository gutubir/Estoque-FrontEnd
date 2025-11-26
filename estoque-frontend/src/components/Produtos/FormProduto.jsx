import { useState, useEffect } from 'react';
import { criarProduto, atualizarProduto, getCategorias } from '../../services/api';
import './FormProduto.css';

function FormProduto({ produto, onClose }) {
  const [categorias, setCategorias] = useState([]);

  const [formData, setFormData] = useState({
    nome: produto?.nome || '',
    precoUnitario: produto?.precoUnitario || '',
    unidade: produto?.unidade || 'UN',
    quantidadeEstoque: produto?.quantidadeEstoque || 0,
    quantidadeMinima: produto?.quantidadeMinima || 0,
    quantidadeMaxima: produto?.quantidadeMaxima || 0,
    // novo campo: tentar pegar direto do produto, caindo para categoria.id
    categoriaId:
      produto?.categoriaId ??
      produto?.categoria?.id ??
      '',
  });
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const dados = await getCategorias();
        setCategorias(dados);
      } catch (e) {
        console.error(e);
      }
    }
    carregarCategorias();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSalvando(true);
    setErro('');

    try {
      if (produto?.id) {
        await atualizarProduto(produto.id, formData);
      } else {
        await criarProduto(formData);
      }
      onClose();
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{produto ? 'Editar Produto' : 'Novo Produto'}</h3>
        
        {erro && <div className="erro">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="precoUnitario">Preço Unitário *</label>
              <input
                type="number"
                id="precoUnitario"
                name="precoUnitario"
                step="0.01"
                value={formData.precoUnitario}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="unidade">Unidade *</label>
              <select
                id="unidade"
                name="unidade"
                value={formData.unidade}
                onChange={handleChange}
                required
              >
                <option value="UN">Unidade</option>
                <option value="KG">Quilograma</option>
                <option value="L">Litro</option>
                <option value="M">Metro</option>
                <option value="CX">Caixa</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantidadeEstoque">Quantidade em Estoque</label>
              <input
                type="number"
                id="quantidadeEstoque"
                name="quantidadeEstoque"
                value={formData.quantidadeEstoque}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantidadeMinima">Quantidade Mínima</label>
              <input
                type="number"
                id="quantidadeMinima"
                name="quantidadeMinima"
                value={formData.quantidadeMinima}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantidadeMaxima">Quantidade Máxima</label>
              <input
                type="number"
                id="quantidadeMaxima"
                name="quantidadeMaxima"
                value={formData.quantidadeMaxima}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancelar"
              onClick={onClose}
              disabled={salvando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={salvando}
            >
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormProduto;

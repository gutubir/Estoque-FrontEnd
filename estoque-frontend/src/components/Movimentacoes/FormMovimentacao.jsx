import { useState } from 'react';
import { criarMovimentacao } from '../../services/api';
import '../Produtos/FormProduto.css';

function FormMovimentacao({ produtos, onClose }) {
  const [formData, setFormData] = useState({
    produtoId: '',
    tipo: 'ENTRADA',
    quantidade: 0,
    data: new Date().toISOString().split('T')[0],
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

  async function handleSubmit(e) {
    e.preventDefault();
    setSalvando(true);
    setErro('');

    try {
      await criarMovimentacao({
        ...formData,
        produtoId: parseInt(formData.produtoId),
        quantidade: parseInt(formData.quantidade)
      });
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
        <h3>Nova Movimentação</h3>
        
        {erro && <div className="erro">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="produtoId">Produto *</label>
            <select
              id="produtoId"
              name="produtoId"
              value={formData.produtoId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um produto</option>
              {produtos.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipo">Tipo *</label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                <option value="ENTRADA">Entrada</option>
                <option value="SAIDA">Saída</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantidade">Quantidade *</label>
              <input
                type="number"
                id="quantidade"
                name="quantidade"
                min="1"
                value={formData.quantidade}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="data">Data *</label>
            <input
              type="date"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
            />
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

export default FormMovimentacao;

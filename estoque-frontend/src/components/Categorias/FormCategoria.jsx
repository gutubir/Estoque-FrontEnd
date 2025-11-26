import { useState } from 'react';
import { criarCategoria, atualizarCategoria } from '../../services/api';
import '../Produtos/FormProduto.css';

function FormCategoria({ categoria, onClose }) {
  const [formData, setFormData] = useState({
  nome: categoria?.nome || '',
  descricao: categoria?.descricao || '',
  tamanho: categoria?.tamanho || '',      // novo
  embalagem: categoria?.embalagem || '',  // novo
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
      if (categoria?.id) {
        await atualizarCategoria(categoria.id, formData);
      } else {
        await criarCategoria(formData);
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
        <h3>{categoria ? 'Editar Categoria' : 'Nova Categoria'}</h3>
        
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
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              rows="3"
              value={formData.descricao}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tamanho">Tamanho *</label>
            <select
              id="tamanho"
              name="tamanho"
              value={formData.tamanho}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="embalagem">Embalagem *</label>
            <select
              id="embalagem"
              name="embalagem"
              value={formData.embalagem}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="Lata">Lata</option>
              <option value="Vidro">Vidro</option>
              <option value="Plástico">Plástico</option>
            </select>
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

export default FormCategoria;

const API_URL = 'http://localhost:5000/api';

// Produtos
export async function getProdutos() {
  const response = await fetch(`${API_URL}/produtos`);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }
  return response.json();
}

export async function criarProduto(produto) {
  const response = await fetch(`${API_URL}/produtos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar produto');
  }
  return response.json();
}

export async function atualizarProduto(id, produto) {
  const response = await fetch(`${API_URL}/produtos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar produto');
  }
  return response.json();
}

export async function deletarProduto(id) {
  const response = await fetch(`${API_URL}/produtos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar produto');
  }
}

// Categorias (para depois implementar no backend)
export async function getCategorias() {
  const response = await fetch(`${API_URL}/categorias`);
  if (!response.ok) {
    throw new Error('Erro ao buscar categorias');
  }
  return response.json();
}

// Movimentações (para depois implementar no backend)
export async function getMovimentacoes() {
  const response = await fetch(`${API_URL}/movimentacoes`);
  if (!response.ok) {
    throw new Error('Erro ao buscar movimentações');
  }
  return response.json();
}

export async function criarMovimentacao(movimentacao) {
  const response = await fetch(`${API_URL}/movimentacoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movimentacao),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar movimentação');
  }
  return response.json();
}

// Relatórios (para depois implementar no backend)
export async function getRelatorioPrecos() {
  const response = await fetch(`${API_URL}/relatorios/precos`);
  if (!response.ok) {
    throw new Error('Erro ao buscar relatório de preços');
  }
  return response.json();
}

export async function getBalancoFinanceiro() {
  const response = await fetch(`${API_URL}/relatorios/balanco`);
  if (!response.ok) {
    throw new Error('Erro ao buscar balanço financeiro');
  }
  return response.json();
}

// Categorias
export async function criarCategoria(categoria) {
  const response = await fetch(`${API_URL}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar categoria');
  }
  return response.json();
}

export async function atualizarCategoria(id, categoria) {
  const response = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar categoria');
  }
  return response.json();
}

export async function deletarCategoria(id) {
  const response = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar categoria');
  }
}

// Relatórios adicionais

export async function getProdutosAbaixoMinimo() {
  const response = await fetch(`${API_URL}/relatorios/abaixo-minimo`);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos abaixo do mínimo');
  }
  return response.json();
}

export async function getProdutosPorCategoria() {
  const response = await fetch(`${API_URL}/relatorios/produtos-por-categoria`);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos por categoria');
  }
  return response.json();
}

export async function getMovimentacoesTop() {
  const response = await fetch(`${API_URL}/relatorios/movimentacoes-top`);
  if (!response.ok) {
    throw new Error('Erro ao buscar relatórios de movimentações');
  }
  return response.json();
}



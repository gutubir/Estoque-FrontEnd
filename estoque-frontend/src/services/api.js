const API_URL = 'http://localhost:5000/api';

export async function getProdutos() {
  const response = await fetch(`${API_URL}/produtos`);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }
  return response.json();
}

// ==========================================
// 1. MAPEAMENTO DOS ELEMENTOS DO HTML
// ==========================================
const inputConsulta = document.getElementById("consulta");
const btnBuscar = document.getElementById("btnBuscar");
// ATENÇÃO: Verifique se o ID da sua div de resultado no HTML é "container" mesmo
const container = document.getElementById("container");

// ==========================================
// 2. CARREGAMENTO DOS DADOS (JSON)
// ==========================================
let listaCnpj = [];

fetch("empresas.json")
  .then((response) => response.json())
  .then((dadosDoArquivo) => {
    listaCnpj = dadosDoArquivo;
  })
  .catch((erro) => console.error("Erro ao carregar as empresas:", erro));

// ==========================================
// 3. EVENTOS (Listeners)
// ==========================================

// Trava o input para aceitar APENAS números
inputConsulta.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "");
});

// Ação de clique no botão Consultar
btnBuscar.addEventListener("click", () => {
  const valorDigitado = inputConsulta.value;

  // Validação básica
  if (valorDigitado === "") {
    alert("Por favor, digite um CPF, CNPJ ou Código Econômico válido.");
    return;
  }

  // Chama a função que faz o trabalho pesado
  realizarConsulta(valorDigitado);
});

// ==========================================
// 4. LÓGICA DE BUSCA E EXIBIÇÃO
// ==========================================
function realizarConsulta(valorDigitado) {
  // Limpa o texto anterior de cara, para mostrar que atualizou
  container.innerHTML = "";

  // Busca a empresa na lista
  const empresaEncontrada = listaCnpj.find((empresa) => {
    return (
      empresa.cpf_cnpj === valorDigitado ||
      empresa.codigo_economico === valorDigitado
    );
  });

  // Se achou a empresa...
  if (empresaEncontrada) {
    let quaisRisco = [];

    // Verifica quais taxas ela tem isenção
    if (empresaEncontrada.tlfe_baixo_risco) quaisRisco.push("TLFE");
    if (empresaEncontrada.tcfam_baixo_risco) quaisRisco.push("TCFAM");
    if (empresaEncontrada.tfvs_baixo_risco) quaisRisco.push("TFVS");

    // Se ela tiver pelo menos uma isenção
    if (quaisRisco.length > 0) {
      container.innerHTML = `
        <p>Parabéns! 🎉<br><br>
        Com a Lei Complementar nº 626/2025, sua Classificação Nacional de Atividades Econômicas (CNAE) foi considerada como de baixo risco, garantindo isenção das seguintes taxas: <strong>${quaisRisco.join(", ")}</strong> mais incentivo para o seu negócio crescer.<br><br>
        Uma conquista que valoriza quem empreende e contribui para o crescimento de Criciúma. 🚀</p>
      `;
    } else {
      // Caso ela exista na base, mas todas as taxas deram 'false'
      container.innerHTML = `<p>Sua empresa foi encontrada, mas não possui isenção para as taxas analisadas.</p>`;
    }
  } else {
    // Se não achou de jeito nenhum
    container.innerHTML = `<p>Desculpe, sua empresa não foi encontrada na lista de contemplados de Baixo Risco.</p>`;
  }
}

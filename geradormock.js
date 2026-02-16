const totalLinhas = 30000;
const mockData = [];

console.log("Gerando 30.000 registros fictícios...");

for (let i = 0; i < totalLinhas; i++) {
  // Gera um CNPJ/CPF aleatório de 11 a 14 dígitos
  const randomCnpj = Math.floor(
    10000000000000 + Math.random() * 89999999999999,
  ).toString();

  // Gera um código econômico aleatório de 5 dígitos
  const randomCodigo = Math.floor(10000 + Math.random() * 90000).toString();

  mockData.push({
    cpf_cnpj: randomCnpj,
    codigo_economico: randomCodigo,
    tlfe_baixo_risco: Math.random() > 0.5, // 50% de chance de ser true ou false
    tcfam_baixo_risco: Math.random() > 0.5,
    tfvs_baixo_risco: Math.random() > 0.5,
  });
}

// Transforma o array num JSON bonito
const jsonString = JSON.stringify(mockData, null, 2); // O '2' deixa indentado e legível

// Cria um "arquivo virtual" e força o download na sua máquina
const blob = new Blob([jsonString], { type: "application/json" });
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "empresas_mock.json";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

console.log("✅ Download concluído!");

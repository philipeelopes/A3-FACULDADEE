function buscarCEP() {
  const cep = document.getElementById("cep").value.trim();
  const resultado = document.getElementById("resultado");

  if (cep.length !== 8 || isNaN(cep)) {
    resultado.innerHTML = "<p style='color:red;'>CEP inválido! Deve conter 8 números.</p>";
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        resultado.innerHTML = "<p style='color:red;'>CEP não encontrado.</p>";
      } else {
        resultado.innerHTML = `
          <p><strong>Logradouro:</strong> ${data.logradouro || 'Não disponível'}</p>
          <p><strong>Bairro:</strong> ${data.bairro || 'Não disponível'}</p>
          <p><strong>Localidade:</strong> ${data.localidade}</p>
          <p><strong>UF:</strong> ${data.uf}</p>
        `;
      }
    })
    .catch(error => {
      resultado.innerHTML = "<p style='color:red;'>Erro na requisição à API.</p>";
    });
}


const vagas = [
  { empresa: "Nubank", cargo: "Front-End Jr", requisitos: ["HTML", "CSS", "Javascript"] },
  { empresa: "Zup Innovation", cargo: "React JR", requisitos: ["JavaScript", "React", "TypeScript", "Git"] },
  { empresa: "Mercado Livre", cargo: "Web Jr", requisitos: ["HTML", "JavaScript", "CSS", "React"] }
]; // array das vagas com as informações de cada empresa

function buscarVagasDoServidor() {
  return new Promise((resolve, reject) => {
    console.log("Buscando vagas no servidor..."); // se a busca der certo mostra essa mensagem
    setTimeout(() => {
      if (vagas && vagas.length > 0) {
        resolve(vagas); // Retorna o array de vagas criado acima
      } else {
        reject("Erro: Não foi possível carregar as vagas do servidor."); // caso dê erro mostra essa mensagem
      }
    }, 2000);
  });
}

class Candidato {
  constructor(nome, idade, area, experiencia, habilidades) {
    this.nome = nome;
    this.idade = idade;
    this.area = area;
    this.experiencia = experiencia;
    this.habilidades = habilidades;
  }

  apresentar() {
    console.log(`Olá, sou ${this.nome}, tenho ${this.idade} anos e sou ${this.area}.`); // método que faz a apresentação do candidato
  }
}

class CandidatoFrontEnd extends Candidato {
  constructor(nome, idade, area, experiencia, habilidades, portfolio) {
    super(nome, idade, area, experiencia, habilidades);
    this.portfolio = portfolio;
  }

  // Método que aceita uma vaga e uma função de callback
  candidatarSe(vaga, callbackNotificacao) {
    console.log(`\nEnviando currículo para a empresa ${vaga.empresa}...`);
    
    // Executa o callback passando os dados da vaga
    callbackNotificacao(vaga.cargo, vaga.empresa);
  }

  // Método que analisa uma vaga específica recebida como parâmetro
  calcularCompatibilidade(requisitosDaVaga) {
    let porcentagemDoCandidato = 0; // cria contador que armazena a quantidade de requisitos preenchidos

    // Analisa cada requisito da vaga individualmente
    requisitosDaVaga.forEach(requisito => {
      if (this.habilidades.includes(requisito)) {
        porcentagemDoCandidato++; // Incrementa o contador em +1
      }
    });

    // Calcula a proporção em formato de percentual
    const porcentagem = (porcentagemDoCandidato / requisitosDaVaga.length) * 100;

    let mencao = "";
    if (porcentagem >= 80) {
      mencao = "Alta";
    } else if (porcentagem >= 50) {
      mencao = "Média";
    } else {
      mencao = "Baixa";
    }

    // Filtra os requisitos que o candidato NÃO possui para esta vaga
    const habilidadesFaltantes = requisitosDaVaga.filter(requisito => {
      return !this.habilidades.includes(requisito); // Queremos os requisitos que ele NÃO tem
    });

    // Retorna um objeto consolidado com todas as informações calculadas
    return {
      porcentagem: porcentagem,
      porcentagemFormatada: `${porcentagem.toFixed(0)}%`,
      classificacao: mencao,
      faltantes: habilidadesFaltantes
    };
  }
}

// Exemplos das sugestões de recursos para cada tecnologia
const sugestoesDeCursos = {
  "React": "Curso 'React Completo' na Origamid ou Documentação Oficial (react.dev)",
  "TypeScript": "Curso 'TypeScript do Zero' na Udemy ou Origamid",
  "Git": "Curso gratuito 'Git e GitHub para Iniciantes' no YouTube (Curso em Vídeo)",
  "CSS": "Formação CSS Grid e Flexbox da Alura"
};

// Função que gera a recomendação de estudos
function gerarRecomendacaoComCurso(habilidadesFaltantes) {
  if (habilidadesFaltantes.length === 0) {
    return "Você já possui todas as habilidades necessárias! Mantenha os estudos atualizados praticando projetos reais."; // mensagem dada caso o candidato tenha todas as habilidades necessárias
  }

  // Gera uma lista formatada indicando a tecnologia e o curso sugerido
  const listaRecomendacoes = habilidadesFaltantes.map(habilidade => {
    // Busca a indicação nos exemplos e usa um recurso padrão caso ela não seja cadastrada
    const cursoSugerido = sugestoesDeCursos[habilidade] || `Busque cursos de ${habilidade} na Alura ou Udemy`;
    return `- ${habilidade}: ${cursoSugerido}`;
  });

  return `Para se adequar 100% a esta vaga, recomendamos os seguintes caminhos de estudo:\n` + listaRecomendacoes.join("\n");
}

// Função externa que cria o Closure
function criarContadorDeCandidaturas() {
  let totalCandidaturas = 0; // Armazena a contagem total na memória

  // Retorna a função interna que acessa o contador
  return function(nomeDaVaga) {
    totalCandidaturas++;
    console.log(`Candidatura nº ${totalCandidaturas} registrada para a vaga: ${nomeDaVaga}`);
  };
}

// Função de Callback para mostrar a confirmação
function mostrarConfirmacao(cargo, empresa) {
  console.log(`[NOTIFICAÇÃO]: Candidatura para ${cargo} na ${empresa} foi enviada com sucesso!`); // exibe mensagem de sucesso da candidatura
}

const davi = new CandidatoFrontEnd(
  "Davi dos Reis",
  35,
  "desenvolvedor Front-end",
  "1 ano",
  ["Javascript", "HTML", "CSS"],
  "https://github.com/davidosreisdalcastagne"
); // nova instância da classe CandidatoFrontEnd com suas informações

davi.apresentar(); // Chama o método apresentar() da instância 'davi'

// Inicializa a função de Closure
const registrarCandidatura = criarContadorDeCandidaturas();

async function iniciarSimulador() {
  try {
    const vagasCarregadas = await buscarVagasDoServidor();
    console.log("\nVagas carregadas com sucesso! Total de vagas:", vagasCarregadas.length);

    // Mapeia cada vaga calculando sua análise individual
    const vagasAnalisadas = vagasCarregadas.map(vaga => {
      const analise = davi.calcularCompatibilidade(vaga.requisitos);
      const recomendacao = gerarRecomendacaoComCurso(analise.faltantes);

      // Registra a análise no contador do Closure
      registrarCandidatura(`${vaga.cargo} - ${vaga.empresa}`);

      return {
        empresa: vaga.empresa,
        cargo: vaga.cargo,
        porcentagem: analise.porcentagem,
        porcentagemFormatada: analise.porcentagemFormatada,
        classificacao: analise.classificacao,
        faltantes: analise.faltantes,
        recomendacaoEstudo: recomendacao
      };
    });

    console.log("\nAnálise Individual das Vagas para o candidato...");
    console.log(vagasAnalisadas);

    // Encontra a vaga com maior compatibilidade
    const empregoMaisCompativel = vagasAnalisadas.reduce((melhorAteAgora, vagaAtual) => {
      return (vagaAtual.porcentagem > melhorAteAgora.porcentagem) ? vagaAtual : melhorAteAgora;
    });

    console.log("\n Vaga Mais Compatível para o candidato:");
    console.log(empregoMaisCompativel);
    // Envia a candidatura da vaga campeã usando o Callback
    davi.candidatarSe(empregoMaisCompativel, mostrarConfirmacao);

  } catch (e) {
    console.error("Falha ao iniciar o sistema: " + e); // caso dê erro mostra essa mensagem
  }
}

// Executa a função assíncrona principal do simulador
iniciarSimulador();
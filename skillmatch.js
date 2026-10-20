
const vagas = [
  { empresa: "Nubank",
    cargo: "Front-End Jr",
    requisitos: ["HTML", "CSS", "Javascript"] },

  { empresa: "Zup Innovation",
    cargo: "React JR",
    requisitos: ["JavaScript", "React", "TypeScript","Git" ] },

  { empresa: "Mercado Livre",
    cargo: "Web Jr",
    requisitos: ["HTML", "JavaScript", "CSS", "React"] }
];//array das vagas com as informações de cada empresa
 
function buscarVagasDoServidor() {
  return new Promise((resolve, reject) => {
    console.log("Buscando vagas no servidor...");// se a busca der certo mostra essa mensagem
    setTimeout(() => {
      if (vagas && vagas.length > 0) {
        resolve(vagas); // Retorna o array de vagas criado acima
      } else {
        reject("Erro: Não foi possível carregar as vagas do servidor.");//caso dê erro mostra essa mensagem
      }
    }, 2000);
  });
}

async function iniciarSimulador() {
  try {
    const vagasCarregadas = await buscarVagasDoServidor();
    console.log("Vagas carregadas com sucesso! Total de vagas:", vagasCarregadas.length);
    console.log(vagasCarregadas);

  } catch (e) {
    console.error("Falha ao iniciar o sistema:" + e,);//caso dê erro mostra essa mensagem
  }
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
    console.log(`Olá, sou ${this.nome}, tenho ${this.idade} anos e sou ${this.area}.`);//método que faz a apresentação do candidato
  }
}

class CandidatoFrontEnd extends Candidato {
  constructor(nome, idade, area, experiencia, habilidades, portfolio) {
    super(nome, idade, area, experiencia, habilidades);
    this.portfolio = portfolio;
  }
}
const davi = new CandidatoFrontEnd(
  "Davi dos Reis",
  35,
  "desenvolvedor Front-end",
  "1 ano",
  ["Javascript", "HTML", "CSS"],
  "https://github.com/davidosreisdalcastagne"
);//nova instância da classe CandidatoFrontEnd comsuas informações
davi.apresentar(); // Chama o método apresentar() da instância 'davi'
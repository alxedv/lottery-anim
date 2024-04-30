import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

const mock = {
  "loteria": "megasena",
  "concurso": 2620,
  "data": "12/08/2023",
  "local": "ESPAÇO DA SORTE em SÃO PAULO, SP",
  "dezenasOrdemSorteio": [
    "003617",
    "003617",
    "003617",
    "003617",
    "003617"
  ],
  "dezenas": [
    "04",
    "06",
    "13",
    "21",
    "26",
    "28"
  ],
  "trevos": [

  ],
  "timeCoracao": null,
  "mesSorte": null,
  "premiacoes": [
    {
      "descricao": "6 acertos",
      "faixa": 1,
      "ganhadores": 4,
      "valorPremio": 29058128.28
    },
    {
      "descricao": "5 acertos",
      "faixa": 2,
      "ganhadores": 404,
      "valorPremio": 23042.04
    },
    {
      "descricao": "4 acertos",
      "faixa": 3,
      "ganhadores": 21667,
      "valorPremio": 613.76
    }
  ],
  "estadosPremiados": [

  ],
  "observacao": "",
  "acumulou": false,
  "proximoConcurso": 2621,
  "dataProximoConcurso": "16/08/2023",
  "localGanhadores": [
    {
      "ganhadores": 1,
      "municipio": "CANAL ELETRONICO",
      "nomeFatansiaUL": "",
      "serie": "",
      "posicao": 1,
      "uf": "--"
    },
    {
      "ganhadores": 1,
      "municipio": "UBERABA",
      "nomeFatansiaUL": "",
      "serie": "",
      "posicao": 1,
      "uf": "MG"
    },
    {
      "ganhadores": 2,
      "municipio": "SINOP",
      "nomeFatansiaUL": "",
      "serie": "",
      "posicao": 1,
      "uf": "MT"
    }
  ],
  "valorArrecadado": 161458740,
  "valorAcumuladoConcurso_0_5": 10778824.03,
  "valorAcumuladoConcursoEspecial": 72866210.44,
  "valorAcumuladoProximoConcurso": 0.0,
  "valorEstimadoProximoConcurso": 3500000.0
}

function jogoDoBicho(numero) {
  // Convertendo o número para inteiro
  const num = parseInt(numero);

  // Definindo os grupos e os intervalos de números associados a cada grupo
  const grupos = {
    "Avestruz": [1, 4],
    "Águia": [5, 8],
    "Burro": [9, 12],
    "Borboleta": [13, 16],
    "Cachorro": [17, 20],
    "Cabra": [21, 24],
    "Carneiro": [25, 28],
    "Camelo": [29, 32],
    "Cobra": [33, 36],
    "Coelho": [37, 40],
    "Cavalo": [41, 44],
    "Elefante": [45, 48],
    "Galo": [49, 52],
    "Gato": [53, 56],
    "Jacaré": [57, 60],
    "Leão": [61, 64],
    "Macaco": [65, 68],
    "Porco": [69, 72],
    "Pavão": [73, 76],
    "Peru": [77, 80],
    "Touro": [81, 84],
    "Tigre": [85, 88],
    "Urso": [89, 92],
    "Veado": [93, 96],
    "Vaca": [97, 100]
  };

  // Mapeando os emojis correspondentes a cada animal
  const emojis = {
    "Avestruz": "🐦",
    "Águia": "🦅",
    "Burro": "🐴",
    "Borboleta": "🦋",
    "Cachorro": "🐶",
    "Cabra": "🐐",
    "Carneiro": "🐏",
    "Camelo": "🐫",
    "Cobra": "🐍",
    "Coelho": "🐰",
    "Cavalo": "🐎",
    "Elefante": "🐘",
    "Galo": "🐓",
    "Gato": "🐱",
    "Jacaré": "🐊",
    "Leão": "🦁",
    "Macaco": "🐒",
    "Porco": "🐷",
    "Pavão": "🦚",
    "Peru": "🦃",
    "Touro": "🐮",
    "Tigre": "🐅",
    "Urso": "🐻",
    "Veado": "🦌",
    "Vaca": "🐄"
  };

  // Verificando a qual grupo o número pertence
  let numeroGrupo;
  for (const grupo in grupos) {
    const intervalo = grupos[grupo];
    if (num >= intervalo[0] && num <= intervalo[1]) {
      numeroGrupo = Object.keys(grupos).find(key => grupos[key] === intervalo);
      return `${grupo} ${emojis[grupo]} - Grupo: ${Object.keys(grupos).indexOf(grupo) + 1}`;
    }
  }

  // Se o número não estiver em nenhum intervalo, retorna "Grupo não encontrado"
  return "Grupo não encontrado";
}

// Exemplo de uso
console.log(jogoDoBicho("61")); // Saída esperada: Leão 🦁 - Grupo: 15
console.log(jogoDoBicho("28")); // Saída esperada: Jacaré 🐊 - Grupo: 7


function App() {
  const [lotteryResult, setLotteryResult] = useState(mock);


  /*useEffect(() => {
    const fetchLotteryResult = async () => {
      const result = await axios.get('https://loteriascaixa-api.herokuapp.com/api/federal/latest');
      setLotteryResult(result.data);
    }
    fetchLotteryResult();
  }, []);*/

  return (
    <div className='d-flex flex-column align-items-center justify-content-center mt-3'>
      <h2>Resultado Loteria Federal</h2>
      <h3>{lotteryResult.data}</h3>
      <Button className='mt-2'>Atualizar resultado</Button>
      <div className='d-flex flex-column mt-3'>
        <h5>Números sorteados:</h5>
        <div className='d-flex flex-column mt-2'>
          {lotteryResult.dezenasOrdemSorteio.map((item, index) => (
            <Card className='mt-2 p-2 d-flex flex-column'>
              <span className='h4' key={item}>{`${index + 1}° prêmio: ${item}`}</span>
              <span>{`${jogoDoBicho(item.slice(-2))}`}</span>
            </Card>

          ))}
        </div>
      </div>
    </div>
  )
}

export default App

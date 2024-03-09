const ingresarMonto = document.querySelector('#ingresarMonto')
const selection = document.querySelector('#monedas')
const btnBuscar = document.querySelector('#btnbuscar')
const resultados = document.querySelector('#resultados')



async function getSomething() { //funcion que cnvierte el monto peso ingrasado en la moneda de eleccion.
    try {
        const select = selection.value
        const urllMedidor = `https://mindicador.cl/api/${select}`

        const res = await fetch(urllMedidor);
        const data = await res.json();
        console.log(data);

    const monto = ingresarMonto.value;
    const tasaCambio = data.serie[0].valor
    const cambioDone = monto * tasaCambio
        
    resultados.textContent = `Resultados: ${cambioDone.toFixed(2)}`

}   catch (error) {
    alert(error.message);
    }    
   }   
   getSomething();

   btnBuscar.addEventListener('click' , getSomething) // Evento del button buscar que nos entregra los resulltados e grafico.
   btnBuscar.addEventListener('click' , getChart) // Evento del button buscar que nos entregra los resulltados e grafico.


async function  getgraphique(){

    const select = selection.value;
    const urllMedidor = `https://mindicador.cl/api/${select}`;
    const res = await fetch(urllMedidor);
    const data = await res.json();
    console.log(data);

    const series = data.serie.slice(0,10);
    const fechas = series.map((data) => {  //datos a mostrar en eje x
        return new Date(data.fecha).toLocaleDateString('en-gb');
    });
    const valores = series.map((data) => { //datos a mostrar en eje y
        return Number(data.valor);
    });

    const datasets = [ //set de datos a mostrar en graficos
    {
      label: `${select}`,
      borderColor: "rgba(0,0,255,0.1)",
      data: valores,
    }
  ];
  return { fechas, datasets };

} 

async function getChart() { //funcion que crea el grafico
    const data = await getgraphique();
    const config = {
      type: "line",
      data,
      data: {
        labels: data.fechas.reverse(),
        datasets: data.datasets.reverse()
        }
        };
        const myChart = document.getElementById("myChart");
        myChart.style.backgroundColor = "white";
        new Chart(myChart, config);
        }
        ;


getChart()

    



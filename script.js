const requisitosCultivos = {
    mora: { luminosidad: "6-8 horas", precipitacion: "800-1200 mm", humedad: "60-70%", temperatura: "15-25°C" },
    lulo: { luminosidad: "8-10 horas", precipitacion: "1000-1500 mm", humedad: "70-80%", temperatura: "15-20°C" },
    frijol: { luminosidad: "6-8 horas", precipitacion: "500-800 mm", humedad: "50-60%", temperatura: "20-30°C" },
    cafe: { luminosidad: "5-7 horas", precipitacion: "1000-1500 mm", humedad: "70-80%", temperatura: "18-24°C" },
    maiz: { luminosidad: "10-12 horas", precipitacion: "600-800 mm", humedad: "55-75%", temperatura: "20-30°C" },
    arveja: { luminosidad: "6-8 horas", precipitacion: "500-600 mm", humedad: "50-70%", temperatura: "15-20°C" },
    yuca: { luminosidad: "8-10 horas", precipitacion: "1000-1200 mm", humedad: "60-70%", temperatura: "25-30°C" },
    auyama: { luminosidad: "6-8 horas", precipitacion: "800-1000 mm", humedad: "60-70%", temperatura: "20-25°C" },
    papa: { luminosidad: "8-10 horas", precipitacion: "600-800 mm", humedad: "70-80%", temperatura: "15-20°C" },
    cebolla: { luminosidad: "10-12 horas", precipitacion: "500-600 mm", humedad: "60-70%", temperatura: "15-20°C" },
    tomate: { luminosidad: "8-10 horas", precipitacion: "600-800 mm", humedad: "60-70%", temperatura: "20-25°C" },
    naranjas: { luminosidad: "8-10 horas", precipitacion: "600-800 mm", humedad: "50-60%", temperatura: "25-30°C" },
};

let chart; // Variable global para manejar el gráfico

function analizarCultivo() {
    const cultivo = document.getElementById("cultivo").value;
    const resultadosDiv = document.getElementById("resultados");

    // Obtener requisitos del cultivo seleccionado
    const requisitos = requisitosCultivos[cultivo];

    resultadosDiv.innerHTML = `
        <h3>Requisitos para cultivar ${cultivo.charAt(0).toUpperCase() + cultivo.slice(1)}:</h3>
        <ul>
            <li><strong>Luminosidad:</strong> ${requisitos.luminosidad}</li>
            <li><strong>Precipitación:</strong> ${requisitos.precipitacion}</li>
            <li><strong>Humedad:</strong> ${requisitos.humedad}</li>
            <li><strong>Temperatura:</strong> ${requisitos.temperatura}</li>
        </ul>
        <p>¡Verifica si las condiciones de tu suelo son adecuadas!</p>
    `;

    mostrarGrafico(requisitos);
}

function mostrarGrafico(requisitos) {
    const container = document.getElementById('graficoContainer');

    // Eliminar el canvas anterior si existe
    const oldCanvas = document.getElementById('graficoCondiciones');
    if (oldCanvas) {
        oldCanvas.remove();
    }

    // Crear un nuevo canvas
    const nuevoCanvas = document.createElement('canvas');
    nuevoCanvas.id = 'graficoCondiciones';
    container.appendChild(nuevoCanvas);

    const ctx = nuevoCanvas.getContext('2d');

    // Destruir gráfico anterior si existe
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Luminosidad', 'Precipitación', 'Humedad', 'Temperatura'],
            datasets: [
                {
                    label: 'Requisitos óptimos',
                    data: [
                        parseFloat(requisitos.luminosidad.split('-')[0]),
                        parseFloat(requisitos.precipitacion.split('-')[0]),
                        parseFloat(requisitos.humedad.split('-')[0]),
                        parseFloat(requisitos.temperatura.split('-')[0])
                    ],
                    backgroundColor: 'rgba(76, 175, 80, 0.5)',
                    borderColor: 'rgba(76, 175, 80, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function monitorearCultivo() {
    document.getElementById("monitoreoResultados").innerHTML = "<p>Monitoreo en proceso...</p>";
}

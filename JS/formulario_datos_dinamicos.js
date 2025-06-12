document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch estadisticas-todo para gráficas que están ahí
    const data = await fetch("http://127.0.0.1:5000/api/estadisticas-todo").then(res => res.json());

    // Total por género
    const generoData = data.participacion_genero;
    new Chart(document.getElementById("totalGenero"), {
      type: "pie",
      data: {
        labels: ["Hombres", "Mujeres", "OSIGD"],
        datasets: [{
          data: [generoData.hombres, generoData.mujeres, generoData.osigd],
          backgroundColor: ["#007bff", "#dc3545", "#6c757d"]
        }]
      }
    });

    // Comparativa por región
    const comparativa = data.comparativa_genero_region || [];
    new Chart(document.getElementById("generoRegion"), {
      type: "bar",
      data: {
        labels: comparativa.map(r => r.region),
        datasets: [
          {
            label: "Hombres",
            data: comparativa.map(r => parseInt(r.hombres)),
            backgroundColor: "#007bff"
          },
          {
            label: "Mujeres",
            data: comparativa.map(r => parseInt(r.mujeres)),
            backgroundColor: "#dc3545"
          },
          {
            label: "OSIGD",
            data: comparativa.map(r => parseInt(r.osigd)),
            backgroundColor: "#6c757d"
          }
        ]
      },
      options: {
        responsive: true,
        scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } },
        plugins: { title: { display: true, text: "Comparativa por Región" } }
      }
    });

    // Participación femenina por actividad
    const actividades = data.participacion_femenina_por_actividad || [];
    new Chart(document.getElementById("participacionFemenina"), {
      type: "bar",
      data: {
        labels: actividades.map(a => a.actividad),
        datasets: [
          {
            label: "Hombres",
            data: actividades.map(a => parseInt(a.hombres)),
            backgroundColor: "#007bff"
          },
          {
            label: "Mujeres",
            data: actividades.map(a => parseInt(a.mujeres)),
            backgroundColor: "#dc3545"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: "Participación por Actividad" } }
      }
    });

    // Línea de tiempo
    const linea = data.linea_tiempo_participacion || [];
    new Chart(document.getElementById("lineaTiempo"), {
      type: "line",
      data: {
        labels: linea.map(p => p.mes),
        datasets: [
          {
            label: "Hombres",
            data: linea.map(p => parseInt(p.hombres)),
            borderColor: "#007bff",
            fill: false
          },
          {
            label: "Mujeres",
            data: linea.map(p => parseInt(p.mujeres)),
            borderColor: "#dc3545",
            fill: false
          },
          {
            label: "OSIGD",
            data: linea.map(p => parseInt(p.osigd)),
            borderColor: "#6c757d",
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: "Participación en el tiempo" } }
      }
    });

    // Frecuencia de retos
    const retos = data.frecuencia_retos || [];
    new Chart(document.getElementById("frecuenciaRetos"), {
      type: "bar",
      data: {
        labels: retos.map(r => r.reto),
        datasets: [{
          label: "Frecuencia",
          data: retos.map(r => r.frecuencia),
          backgroundColor: "#8e5ea2"
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: { title: { display: true, text: "Frecuencia de Retos" } }
      }
    });

    // Actores involucrados
const tablaActores = document.querySelector("#tablaActores tbody");
console.log("Actores involucrados:", data.actores_involucrados);
(data.actores_involucrados || []).forEach(a => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${a}</td><td></td><td></td>`; // Solo tienes el nombre, las otras columnas vacías
  tablaActores.appendChild(row);
});

// Actividades por región
const actividadesUbi = data.actividades_por_ubicacion || [];
const tablaUbicacion = document.querySelector("#tablaUbicacion tbody");
console.log("Actividades por ubicación:", actividadesUbi);
actividadesUbi.forEach(r => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${r.ubicacion}</td><td>${r.cantidad}</td>`;
  tablaUbicacion.appendChild(row);
});

// Duración promedio por actividad
const duracion = data.duracion_promedio_actividad || [];
const tablaDuracion = document.querySelector("#tablaDuracion tbody");
console.log("Duración promedio por actividad:", duracion);
duracion.forEach(r => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${r.actividad}</td><td>${r.minutos}</td>`;
  tablaDuracion.appendChild(row);
});


    // Progreso
    const progresoData = await fetch("http://127.0.0.1:5000/api/progreso-meta").then(res => res.json());
    const barraProgreso = document.getElementById("barraProgreso");
    const textoProgreso = document.getElementById("textoProgreso");
    barraProgreso.style.width = `${progresoData.porcentaje_cumplimiento}%`;
    textoProgreso.textContent = `Meta alcanzada: ${progresoData.finalizados}/${progresoData.meta_total} (${progresoData.porcentaje_cumplimiento}%)`;

  } catch (error) {
    console.error("Error al cargar estadísticas del dashboard:", error);
  }
});

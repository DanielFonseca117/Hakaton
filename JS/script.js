// Datos simulados (puedes luego pasar esto a localStorage o una API)
let actividades = JSON.parse(localStorage.getItem("actividades")) || [];

// Guardar actividad
const form = document.getElementById("form-actividad");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const actividad = {
      nombre: document.getElementById("nombre").value,
      fechaInicio: document.getElementById("fechaInicio").value,
      fechaFin: document.getElementById("fechaFin").value,
      ubicacion: document.getElementById("ubicacion").value,
      tipo: document.getElementById("tipo").value,
      indicador: document.getElementById("indicador").value,
      hombres: parseInt(document.getElementById("hombres").value || 0),
      mujeres: parseInt(document.getElementById("mujeres").value || 0),
      otres: parseInt(document.getElementById("otres").value || 0),
      resultado: document.getElementById("resultado").value,
      responsable: document.getElementById("responsable").value,
      estado: document.getElementById("estado").value,
    };

    actividades.push(actividad);
    localStorage.setItem("actividades", JSON.stringify(actividades));
    alert("Actividad guardada");
    form.reset();
  });
}

// Mostrar actividades en tabla
const tabla = document.getElementById("tabla-actividades");
if (tabla) {
  const cuerpo = tabla.querySelector("tbody");
  actividades.forEach((act) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${act.nombre}</td>
      <td>${act.fechaInicio} - ${act.fechaFin}</td>
      <td>${act.ubicacion}</td>
      <td>${act.tipo}</td>
      <td>${act.indicador}</td>
      <td>${act.responsable}</td>
      <td>${act.estado}</td>
    `;
    cuerpo.appendChild(fila);
  });
}

// Mostrar gráficas
if (document.getElementById("graficoGenero")) {
  const totalHombres = actividades.reduce((sum, a) => sum + a.hombres, 0);
  const totalMujeres = actividades.reduce((sum, a) => sum + a.mujeres, 0);
  const totalOtres = actividades.reduce((sum, a) => sum + a.otres, 0);

  new Chart(document.getElementById("graficoGenero"), {
    type: "pie",
    data: {
      labels: ["Hombres", "Mujeres", "Otres"],
      datasets: [
        {
          data: [totalHombres, totalMujeres, totalOtres],
          backgroundColor: ["#007bff", "#dc3545", "#6c757d"],
        },
      ],
    },
  });
}

if (document.getElementById("graficoIndicador")) {
  const indicadores = {};
  actividades.forEach((a) => {
    if (!indicadores[a.indicador]) indicadores[a.indicador] = 0;
    indicadores[a.indicador]++;
  });
  new Chart(document.getElementById("graficoIndicador"), {
    type: "bar",
    data: {
      labels: Object.keys(indicadores),
      datasets: [
        {
          label: "Actividades por Indicador",
          data: Object.values(indicadores),
          backgroundColor: "#17a2b8",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
    },
  });
}

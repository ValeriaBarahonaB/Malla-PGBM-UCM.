const ramos = {
  // semestre: [ { nombre, id, requisitos: [ids] } ]
  1: [
    { nombre: "Construcción del Ser Docente y Rol Pedagógico", id: "rol", requisitos: [] },
    { nombre: "Historia de la Educación en Chile y Políticas Públicas", id: "historia", requisitos: [] },
    { nombre: "Lenguaje y Comunicación", id: "lenguaje", requisitos: [] },
    { nombre: "Números y Operaciones en Primaria", id: "numeros", requisitos: [] },
    { nombre: "Fundamentos de la Historia Occidental", id: "hist_occi", requisitos: [] },
    { nombre: "Taller Pedagógico I", id: "tp1", requisitos: [] },
  ],
  2: [
    { nombre: "Diversidad y Convivencia Escolar", id: "diversidad", requisitos: ["historia"] },
    { nombre: "Psicología del Desarrollo Humano", id: "psico", requisitos: ["rol"] },
    { nombre: "Gramática y Ortografía para la Formación Escolar", id: "gramatica", requisitos: ["lenguaje"] },
    { nombre: "Elementos de Geometría y Medición", id: "geom", requisitos: ["numeros"] },
    { nombre: "Ciencias de la Vida", id: "vida", requisitos: [] },
    { nombre: "Taller Pedagógico II", id: "tp2", requisitos: ["tp1"] },
    { nombre: "Inglés I", id: "ingles1", requisitos: [] }
  ],
  // Agrega los demás semestres aquí usando el mismo formato...
};

let aprobados = new Set();

function crearMalla() {
  const malla = document.getElementById("malla");

  for (let i = 1; i <= 10; i++) {
    const sem = document.createElement("div");
    sem.className = "semestre";
    sem.innerHTML = `<h2>Semestre ${i}</h2>`;

    (ramos[i] || []).forEach(r => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.innerText = r.nombre;
      div.dataset.id = r.id;
      div.dataset.requisitos = JSON.stringify(r.requisitos);
      div.onclick = () => toggleRamo(div);
      if (r.requisitos.length > 0) {
        div.classList.add("bloqueado");
      }
      sem.appendChild(div);
    });

    malla.appendChild(sem);
  }

  actualizarBloqueos();
}

function toggleRamo(div) {
  const id = div.dataset.id;
  const requisitos = JSON.parse(div.dataset.requisitos);

  const requisitosCumplidos = requisitos.every(r => aprobados.has(r));

  if (!aprobados.has(id) && requisitosCumplidos) {
    aprobados.add(id);
    div.classList.add("aprobado");
  } else if (aprobados.has(id)) {
    aprobados.delete(id);
    div.classList.remove("aprobado");
  }

  actualizarBloqueos();
}

function actualizarBloqueos() {
  document.querySelectorAll(".ramo").forEach(div => {
    const requisitos = JSON.parse(div.dataset.requisitos);
    const id = div.dataset.id;

    if (aprobados.has(id)) {
      div.classList.remove("bloqueado");
      return;
    }

    const requisitosCumplidos = requisitos.every(r => aprobados.has(r));
    div.style.opacity = requisitosCumplidos ? "1" : "0.5";
    div.style.pointerEvents = requisitosCumplidos ? "auto" : "none";
  });
}

crearMalla();

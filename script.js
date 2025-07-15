const ramos = {
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
  3: [
    { nombre: "Teoría del Aprendizaje y su Relación con el Desarrollo Humano", id: "teoria", requisitos: ["psico"] },
    { nombre: "Literatura y Teatro para Niños", id: "lit_niños", requisitos: ["gramatica"] },
    { nombre: "Álgebra, Patrones y su Didáctica", id: "algebra", requisitos: ["geom"] },
    { nombre: "Historia de América y Chile", id: "h_am_chile", requisitos: ["hist_occi"] },
    { nombre: "Ciencias Físicas y Químicas", id: "fis_quim", requisitos: ["vida"] },
    { nombre: "Taller Pedagógico III", id: "tp3", requisitos: ["tp2"] }
  ],
  4: [
    { nombre: "Orientación Educacional", id: "orientacion", requisitos: ["diversidad"] },
    { nombre: "Lectura y Escritura Inicial", id: "lectura_inicial", requisitos: ["lit_niños"] },
    { nombre: "Enseñanza de Elementos de Estadística y Probabilidades", id: "estadistica", requisitos: ["algebra"] },
    { nombre: "Geografía y Formación Ciudadana", id: "geo", requisitos: ["h_am_chile"] },
    { nombre: "Ciencias de la Tierra y el Universo", id: "tierra", requisitos: ["fis_quim"] },
    { nombre: "Taller Pedagógico IV", id: "tp4", requisitos: ["tp3"] },
    { nombre: "Inglés II", id: "ingles2", requisitos: ["ingles1"] }
  ],
  5: [
    { nombre: "Diseño y Planificación Curricular para Educación Básica", id: "curriculum", requisitos: [] },
    { nombre: "Gestión Escolar", id: "gestion", requisitos: ["orientacion"] },
    { nombre: "Didáctica de la Lectura Comprensiva y la Escritura", id: "lectura", requisitos: ["lectura_inicial"] },
    { nombre: "Didáctica de los Números y la Geometría", id: "didactica_num", requisitos: ["numeros"] },
    { nombre: "Taller Pedagógico V", id: "tp5", requisitos: ["tp4"] },
    { nombre: "Introducción a la Fe", id: "fe", requisitos: [] }
  ],
  6: [
    { nombre: "Evaluación de los Aprendizajes en Educación Básica", id: "evaluacion", requisitos: ["curriculum"] },
    { nombre: "Metodologías de Investigación", id: "metodologia", requisitos: ["teoria"] },
    { nombre: "Didáctica de la Historia, la Geografía y Ciencias Sociales", id: "didactica_hist", requisitos: ["geo"] },
    { nombre: "Didáctica e Historia de las Ciencias Naturales", id: "didactica_nat", requisitos: ["tierra"] },
    { nombre: "Taller Pedagógico VI", id: "tp6", requisitos: ["tp5"] },
    { nombre: "Ética Cristiana", id: "etica", requisitos: ["fe"] }
  ],
  7: [
    { nombre: "Investigación Acción en la Escuela", id: "accion", requisitos: ["metodologia"] },
    { nombre: "Las Funciones en el Álgebra de Primaria", id: "funciones", requisitos: ["estadistica"] },
    { nombre: "Sistema Numéricos y sus Fundamentos Teóricos", id: "sist_num", requisitos: ["numeros"] },
    { nombre: "Taller Pedagógico VII", id: "tp7", requisitos: ["tp6"] },
    { nombre: "Certificación I", id: "cert1", requisitos: [] }
  ],
  8: [
    { nombre: "Síntesis de Grado en Educación", id: "sintesis", requisitos: ["accion"] },
    { nombre: "Profundización en Estadística y Probabilidad en Primaria", id: "prof_est", requisitos: ["didactica_num"] },
    { nombre: "Geometría Plana y del Espacio", id: "geo_plana", requisitos: ["didactica_num"] },
    { nombre: "Taller Pedagógico VIII", id: "tp8", requisitos: ["tp7"] },
    { nombre: "Certificación II", id: "cert2", requisitos: ["cert1"] }
  ],
  9: [
    { nombre: "Enseñanza del Álgebra y Sistemas Numéricos", id: "ens_alg", requisitos: ["sist_num"] },
    { nombre: "Enseñanza de la Geometría", id: "ens_geo", requisitos: ["geo_plana"] },
    { nombre: "Enseñanza de la Estadística y la Probabilidad", id: "ens_est", requisitos: ["prof_est"] },
    { nombre: "Las Artes como Estrategias Educativas", id: "artes", requisitos: ["didactica_hist"] },
    { nombre: "Taller Pedagógico IX", id: "tp9", requisitos: ["tp8"] },
    { nombre: "Certificación III", id: "cert3", requisitos: ["cert2"] }
  ],
  10: [
    { nombre: "Práctica Profesional", id: "practica", requisitos: ["tp9"] }
  ]
};

let aprobados = new Set(JSON.parse(localStorage.getItem("aprobados") || "[]"));

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

      if (aprobados.has(r.id)) {
        div.classList.add("aprobado");
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

  guardarProgreso();
  actualizarBloqueos();
}

function actualizarBloqueos() {
  document.querySelectorAll(".ramo").forEach(div => {
    const requisitos = JSON.parse(div.dataset.requisitos);
    const id = div.dataset.id;

    if (aprobados.has(id)) {
      div.style.opacity = "1";
      div.style.pointerEvents = "auto";
      return;
    }

    const requisitosCumplidos = requisitos.every(r => aprobados.has(r));
    div.style.opacity = requisitosCumplidos ? "1" : "0.5";
    div.style.pointerEvents = requisitosCumplidos ? "auto" : "none";
  });
}

function guardarProgreso() {
  localStorage.setItem("aprobados", JSON.stringify(Array.from(aprobados)));
}

crearMalla();


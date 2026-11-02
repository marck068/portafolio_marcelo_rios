// ===== 1. MENÚ HAMBURGUESA =====
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function () {
  menu.classList.toggle("abierto");
});

// Cierra el menú al hacer clic en un enlace
menu.querySelectorAll("a").forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    menu.classList.remove("abierto");
  });
});

// ===== 2. CAMBIO DE TEMA (se guarda en localStorage) =====
const btnTema = document.getElementById("btn-tema");

if (localStorage.getItem("tema") === "claro") {
  document.body.classList.add("claro");
  btnTema.textContent = "☀️";
}

btnTema.addEventListener("click", function () {
  document.body.classList.toggle("claro");
  const esClaro = document.body.classList.contains("claro");
  btnTema.textContent = esClaro ? "☀️" : "🌙";
  localStorage.setItem("tema", esClaro ? "claro" : "oscuro");
});

// ===== 3. EFECTO DE ESCRITURA =====
const roles = ["Full Stack Junior", "con HTML, CSS y JavaScript", "con Python y MySQL"];
const escritura = document.getElementById("escritura");
let rolActual = 0;
let letra = 0;
let borrando = false;

function escribir() {
  const texto = roles[rolActual];

  if (borrando) {
    letra--;
  } else {
    letra++;
  }
  escritura.textContent = texto.substring(0, letra);

  let espera = borrando ? 40 : 90;

  if (!borrando && letra === texto.length) {
    borrando = true;
    espera = 1500;
  } else if (borrando && letra === 0) {
    borrando = false;
    rolActual = (rolActual + 1) % roles.length;
    espera = 400;
  }
  setTimeout(escribir, espera);
}
escribir();

// ===== 4. FILTRO DE PROYECTOS =====
const filtros = document.querySelectorAll(".filtro");
const tarjetas = document.querySelectorAll(".tarjeta");

filtros.forEach(function (boton) {
  boton.addEventListener("click", function () {
    // Marca el botón activo
    filtros.forEach(function (b) { b.classList.remove("activo"); });
    boton.classList.add("activo");

    // Muestra u oculta las tarjetas
    const categoria = boton.dataset.filtro;
    tarjetas.forEach(function (tarjeta) {
      if (categoria === "todos" || tarjeta.dataset.categoria === categoria) {
        tarjeta.classList.remove("oculta");
      } else {
        tarjeta.classList.add("oculta");
      }
    });
  });
});

// ===== 5. MODAL DE PROYECTO =====
const modal = document.getElementById("modal");

document.querySelectorAll(".btn-ver").forEach(function (boton) {
  boton.addEventListener("click", function () {
    const tarjeta = boton.closest(".tarjeta");
    document.getElementById("modal-titulo").textContent = tarjeta.querySelector("h3").textContent;
    document.getElementById("modal-desc").textContent = tarjeta.querySelector(".desc").textContent;
    document.getElementById("modal-techs").innerHTML = tarjeta.querySelector(".techs").innerHTML;
    modal.classList.add("abierto");
  });
});

function cerrarModal() {
  modal.classList.remove("abierto");
}
document.getElementById("cerrar-modal").addEventListener("click", cerrarModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) cerrarModal(); // clic fuera de la caja
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") cerrarModal();
});

// ===== 6. ACORDEÓN DE EXTRAS =====
document.querySelectorAll(".acordeon").forEach(function (boton) {
  boton.addEventListener("click", function () {
    const panel = boton.nextElementSibling;
    boton.classList.toggle("abierto");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

// ===== 8. BOTÓN VOLVER ARRIBA =====
const btnSubir = document.getElementById("btn-subir");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    btnSubir.classList.add("visible");
  } else {
    btnSubir.classList.remove("visible");
  }
});
btnSubir.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== 9. EFECTOS AL HACER SCROLL (barras, contadores y títulos) =====
let contadoresIniciados = false;

function contar() {
  document.querySelectorAll(".contador").forEach(function (el) {
    const meta = Number(el.dataset.meta);
    let numero = 0;
    const intervalo = setInterval(function () {
      numero++;
      el.textContent = numero;
      if (numero >= meta) clearInterval(intervalo);
    }, 1500 / meta);
  });
}

const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (!entrada.isIntersecting) return;

    entrada.target.classList.add("visible");

    // Llena las barras de habilidades
    entrada.target.querySelectorAll(".relleno").forEach(function (barra) {
      barra.style.width = barra.dataset.nivel + "%";
    });

    // Inicia los contadores una sola vez
    if (entrada.target.id === "sobre-mi" && !contadoresIniciados) {
      contadoresIniciados = true;
      contar();
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll(".seccion").forEach(function (seccion) {
  observador.observe(seccion);
});

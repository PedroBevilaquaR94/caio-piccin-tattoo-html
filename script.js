const WHATSAPP_NUMBER = "5543988211083";

const portfolio = [
  {
    id: "delicadas",
    number: "01",
    label: "Tattoos delicadas",
    items: [
      { src: "assets/IMG_0210.PNG", title: "Traço autoral colorido", desc: "Pequenas composições com leitura leve e personalidade." },
      { src: "assets/6e0211f4-5554-4730-ae7d-f7e8ddab89cf.jpg", title: "Minimalista simbólica", desc: "Peixes em traço leve, com delicadeza e composição afetiva." },
      { src: "assets/IMG_0208.PNG", title: "Koi em preto e cinza", desc: "Linhas limpas, contraste controlado e composição simbólica." },
      { src: "assets/IMG_0207.PNG", title: "Minimal cartoon", desc: "Desenho delicado com acabamento firme e visual afetivo." },
      { src: "assets/IMG_0206.PNG", title: "Personagem delicado", desc: "Tatuagem pequena com contorno expressivo e sombra sutil." }
    ]
  },
  {
    id: "florais",
    number: "02",
    label: "Florais",
    items: [
      { src: "assets/389b469b-40c3-4729-adca-12cb06e83abe.jpg", title: "Floral em destaque", desc: "Composição botânica com presença elegante e leitura refinada." },
      { src: "assets/IMG_0211.PNG", title: "Floral ornamental", desc: "Flores, folhas e ornamentos em composição fluida no antebraço." },
      { src: "assets/IMG_0209.PNG", title: "Flores e borboletas", desc: "Contraste suave com encaixe orgânico e leitura elegante." }
    ]
  },
  {
    id: "realistas",
    number: "03",
    label: "Realistas",
    items: [
      { src: "assets/IMG_0215.PNG", title: "Realismo com relógio", desc: "Volume, perspectiva e textura em preto e cinza." },
      { src: "assets/IMG_0214.PNG", title: "Las Vegas black and grey", desc: "Elementos realistas com luz, sombra e narrativa visual." },
      { src: "assets/IMG_0213.PNG", title: "Águia em movimento", desc: "Contraste alto, penas marcadas e sensação de força." },
      { src: "assets/IMG_0212.PNG", title: "Caveira realista", desc: "Profundidade, textura óssea e acabamento de impacto." }
    ]
  }
];

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function createRail(category) {
  const rail = document.createElement("article");
  rail.className = "portfolio-rail reveal";
  rail.dataset.category = category.id;
  rail.innerHTML = `
    <div class="rail-copy">
      <div>
        <p class="rail-kicker">Portfólio / ${category.number}</p>
        <h3>${category.label}</h3>
        <p>Trabalhos selecionados para mostrar acabamento, encaixe no corpo e coerência de traço em cada proposta.</p>
      </div>
      <div>
        <div class="rail-controls">
          <button type="button" data-direction="previous" aria-label="Imagem anterior em ${category.label}">←</button>
          <button type="button" data-direction="next" aria-label="Próxima imagem em ${category.label}">→</button>
          <span class="rail-count"><b>01</b> / ${String(category.items.length).padStart(2, "0")}</span>
        </div>
        <a class="button button-primary rail-cta" href="${whatsappUrl(`Olá Caio! Vi seu portfólio de ${category.label} e gostaria de fazer um orçamento.`)}" target="_blank" rel="noreferrer">Orçar este estilo <span>→</span></a>
      </div>
    </div>
    <div class="rail-gallery">
      <div class="active-work">
        <img src="${category.items[0].src}" alt="${category.items[0].title} — trabalho de Caio Piccin" />
        <div class="work-info"><p>${category.label}</p><h4>${category.items[0].title}</h4><span>${category.items[0].desc}</span></div>
      </div>
      <div class="thumbs">${category.items.map((item, index) => `<button type="button" aria-current="${index === 0}" aria-label="Ver ${item.title}" data-index="${index}"><img src="${item.src}" alt="" /></button>`).join("")}</div>
    </div>`;

  let currentIndex = 0;
  const activeImage = rail.querySelector(".active-work img");
  const workTitle = rail.querySelector(".work-info h4");
  const workDescription = rail.querySelector(".work-info span");
  const count = rail.querySelector(".rail-count b");
  const thumbnails = [...rail.querySelectorAll(".thumbs button")];

  function render(index) {
    currentIndex = (index + category.items.length) % category.items.length;
    const item = category.items[currentIndex];
    activeImage.style.opacity = "0";
    window.setTimeout(() => {
      activeImage.src = item.src;
      activeImage.alt = `${item.title} — trabalho de Caio Piccin`;
      workTitle.textContent = item.title;
      workDescription.textContent = item.desc;
      activeImage.style.opacity = "0.96";
    }, 120);
    count.textContent = String(currentIndex + 1).padStart(2, "0");
    thumbnails.forEach((thumbnail, thumbnailIndex) => thumbnail.setAttribute("aria-current", String(thumbnailIndex === currentIndex)));
  }

  rail.querySelector("[data-direction='previous']").addEventListener("click", () => render(currentIndex - 1));
  rail.querySelector("[data-direction='next']").addEventListener("click", () => render(currentIndex + 1));
  thumbnails.forEach((thumbnail) => thumbnail.addEventListener("click", () => render(Number(thumbnail.dataset.index))));
  return rail;
}

document.getElementById("portfolio-rails").append(...portfolio.map(createRail));

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  link.href = whatsappUrl(link.dataset.message || "Olá Caio! Gostaria de falar sobre uma tatuagem.");
});

document.getElementById("budget-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Olá Caio! Vim pelo site e gostaria de fazer um orçamento.\n\nNome: ${data.get("nome")}\nTelefone: ${data.get("telefone")}\nEstilo desejado: ${data.get("estilo")}\nDescrição: ${data.get("descricao")}`;
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("[data-navigation]");
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

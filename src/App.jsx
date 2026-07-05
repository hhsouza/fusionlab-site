import { useEffect, useState } from "react";

const tiktokUrl = "https://www.tiktok.com/@fusionlab.impress";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [produto, setProduto] = useState("Chaveiro");
  const [cor, setCor] = useState("Azul");
  const [nome, setNome] = useState("");
  const [obs, setObs] = useState("");
  const [pedido, setPedido] = useState("");
  const [toast, setToast] = useState("");

  const cores = [
    { nome: "Azul", valor: "#00e5ff" },
    { nome: "Preto", valor: "#111827" },
    { nome: "Branco", valor: "#ffffff" },
    { nome: "Vermelho", valor: "#ef4444" },
    { nome: "Verde", valor: "#22c55e" },
    { nome: "Roxo", valor: "#8b5cf6" },
    { nome: "Rosa", valor: "#ec4899" },
  ];

  const corHex = cores.find((item) => item.nome === cor)?.valor || "#00e5ff";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2600);

    const glow = document.querySelector(".cursorGlow");

    function moveGlow(e) {
      if (!glow) return;
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }

    function tiltCard(e) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * -14;
      const rotateY = (x / rect.width - 0.5) * 14;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    }

    function resetTilt(e) {
      e.currentTarget.style.transform = "";
    }

    function navbarScroll() {
      const navbar = document.querySelector(".navbar");
      if (!navbar) return;

      if (window.scrollY > 60) {
        navbar.classList.add("navbarScrolled");
      } else {
        navbar.classList.remove("navbarScrolled");
      }
    }

    function heroScroll() {
      const heroText = document.querySelector(".heroText");
      const visual = document.querySelector(".visual");

      if (!heroText || !visual) return;

      const scroll = window.scrollY;
      const progress = Math.min(scroll / 450, 1);

      heroText.style.transform = `translateY(${progress * -60}px) scale(${
        1 - progress * 0.08
      })`;
      heroText.style.opacity = `${1 - progress * 0.55}`;

      visual.style.transform = `translateY(${progress * 80}px) scale(${
        1 + progress * 0.08
      })`;
    }

    function parallax(e) {
      const visual = document.querySelector(".visual");
      if (!visual) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      visual.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    }

    const cards = document.querySelectorAll(".tilt");

    cards.forEach((card) => {
      card.addEventListener("mousemove", tiltCard);
      card.addEventListener("mouseleave", resetTilt);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    window.addEventListener("mousemove", moveGlow);
    window.addEventListener("mousemove", parallax);
    window.addEventListener("scroll", navbarScroll);
    window.addEventListener("scroll", heroScroll);

    return () => {
      clearTimeout(timer);
      observer.disconnect();

      window.removeEventListener("mousemove", moveGlow);
      window.removeEventListener("mousemove", parallax);
      window.removeEventListener("scroll", navbarScroll);
      window.removeEventListener("scroll", heroScroll);

      cards.forEach((card) => {
        card.removeEventListener("mousemove", tiltCard);
        card.removeEventListener("mouseleave", resetTilt);
      });
    };
  }, []);

  function mostrarToast(mensagem) {
    setToast(mensagem);
    setTimeout(() => setToast(""), 2500);
  }

  function gerarPedido() {
    setPedido(`Olá FusionLab! Quero fazer uma encomenda personalizada.

Produto: ${produto}
Cor: ${cor}
Nome personalizado: ${nome || "Sem nome"}
Observações: ${obs || "Sem observações"}

Vi o site da FusionLab e quero saber mais detalhes.`);

    mostrarToast("Pedido gerado com sucesso!");
  }

  async function copiarPedido() {
    if (!pedido) {
      mostrarToast("Primeiro gera o pedido.");
      return;
    }

    await navigator.clipboard.writeText(pedido);
    mostrarToast("Pedido copiado com sucesso!");
  }

  return (
    <main className="page">
      {loading && (
        <div className="loader">
          <div className="loader-content">
            <h1>
              Fusion<span>Lab</span>
            </h1>
            <p>Initializing 3D experience</p>
            <div className="loader-bar">
              <div></div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast">
          <span>✓</span>
          <p>{toast}</p>
        </div>
      )}

      <div className="cursorGlow"></div>
      <div className="animatedGrid"></div>

      <div className="particles">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <nav className="navbar">
        <div className="logo">
          Fusion<span>Lab</span>
        </div>
        <a href="#personalizar">Criar pedido</a>
      </nav>

      <section className="hero reveal">
        <div className="heroText">
          <p className="tag">Impressão 3D personalizada</p>

          <h1 className="splitTitle">
            <span>Produtos</span>
            <span>3D</span>
            <span>únicos,</span>
            <span>feitos</span>
            <span>para</span>
            <span>ti.</span>
          </h1>

          <p>
            Chaveiros e bonecos personalizados com cor, nome e estilo escolhido
            por ti.
          </p>

          <div className="buttons">
            <a href="#personalizar" className="btn">
              Personalizar agora
            </a>
            <a href={tiktokUrl} target="_blank" className="btn ghost">
              TikTok
            </a>
          </div>
        </div>

        <div className="visual">
          <div className="cube">🧊</div>
          <div className="card card1">🔑 Chaveiros 3D</div>
          <div className="card card2">🧸 Bonecos 3D</div>
        </div>
      </section>

      <section className="stats reveal">
        <div className="statCard tilt reveal">
          <h2>100%</h2>
          <span>Personalizado</span>
        </div>

        <div className="statCard tilt reveal">
          <h2>3D</h2>
          <span>Impressão de alta qualidade</span>
        </div>

        <div className="statCard tilt reveal">
          <h2>∞</h2>
          <span>Possibilidades</span>
        </div>

        <div className="statCard tilt reveal">
          <h2>Rápido</h2>
          <span>Resposta simples pelo TikTok</span>
        </div>
      </section>

      <section className="products reveal">
        <h2>Produtos</h2>

        <div className="grid">
          <div
            className="product tilt reveal"
            onClick={() => setProduto("Chaveiro")}
          >
            <span>🔑</span>
            <h3>Chaveiro personalizado</h3>
            <p>Com nome, cor e estilo próprio.</p>
          </div>

          <div
            className="product tilt reveal"
            onClick={() => setProduto("Boneco")}
          >
            <span>🧸</span>
            <h3>Boneco personalizado</h3>
            <p>Bonecos criativos feitos em impressão 3D.</p>
          </div>
        </div>
      </section>

      <section className="process reveal">
        <p className="tag">Como funciona</p>
        <h2>Da ideia ao produto final</h2>

        <div className="processGrid">
          <div className="processCard tilt reveal">
            <span>01</span>
            <h3>Escolhe</h3>
            <p>Seleciona chaveiro ou boneco personalizado.</p>
          </div>

          <div className="processCard tilt reveal">
            <span>02</span>
            <h3>Personaliza</h3>
            <p>Define a cor, o nome e os detalhes do produto.</p>
          </div>

          <div className="processCard tilt reveal">
            <span>03</span>
            <h3>Copia</h3>
            <p>O site gera uma mensagem pronta para encomenda.</p>
          </div>

          <div className="processCard tilt reveal">
            <span>04</span>
            <h3>Envia</h3>
            <p>Manda o pedido no privado do TikTok da FusionLab.</p>
          </div>
        </div>
      </section>

      <section id="personalizar" className="customizer reveal">
        <div className="form tilt">
          <h2>Monta o teu pedido</h2>

          <label>Produto</label>
          <select value={produto} onChange={(e) => setProduto(e.target.value)}>
            <option>Chaveiro</option>
            <option>Boneco</option>
          </select>

          <label>Cor</label>
          <div className="colorPicker">
            {cores.map((item) => (
              <button
                key={item.nome}
                type="button"
                className={cor === item.nome ? "colorDot active" : "colorDot"}
                style={{ background: item.valor }}
                onClick={() => setCor(item.nome)}
                title={item.nome}
              />
            ))}
          </div>

          <label>Nome personalizado</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Lucas"
          />

          <label>Observações</label>
          <textarea
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            placeholder="Ex: estilo gamer..."
          />

          <button onClick={gerarPedido} className="btn full">
            Gerar pedido
          </button>
        </div>

        <div className="preview tilt">
          <div className="mock" style={{ "--productColor": corHex }}>
            <span>{produto === "Chaveiro" ? "🔑" : "🧸"}</span>
            <strong>{nome || "NOME"}</strong>
            <small>{cor}</small>
          </div>

          <pre>{pedido || "O pedido vai aparecer aqui..."}</pre>

          <button onClick={copiarPedido} className="btn ghost full">
            Copiar pedido
          </button>

          <a href={tiktokUrl} target="_blank" className="btn full">
            Abrir TikTok
          </a>
        </div>
      </section>

      <section className="gallery reveal">
        <p className="tag">Galeria</p>
        <h2>Alguns dos nossos trabalhos</h2>

        <div className="galleryGrid">
          <div className="galleryItem">Em breve</div>
          <div className="galleryItem">Em breve</div>
          <div className="galleryItem">Em breve</div>
          <div className="galleryItem">Em breve</div>
          <div className="galleryItem">Em breve</div>
          <div className="galleryItem">Em breve</div>
        </div>
      </section>

      <section className="trust reveal">
        <div className="trustContent">
          <p className="tag">Porquê escolher</p>
          <h2>Peças personalizadas, feitas com atenção ao detalhe.</h2>

          <div className="trustGrid">
            <div className="trustItem">
              <strong>01</strong>
              <span>Design personalizado</span>
            </div>

            <div className="trustItem">
              <strong>02</strong>
              <span>Produção em impressão 3D</span>
            </div>

            <div className="trustItem">
              <strong>03</strong>
              <span>Pedido simples pelo TikTok</span>
            </div>
          </div>
        </div>
      </section>

      <section className="finalCta reveal">
        <h2>Pronto para criar o teu produto?</h2>
        <p>
          Personaliza o teu chaveiro ou boneco e envia o pedido para a
          FusionLab.
        </p>
        <a href="#personalizar" className="btn">
          Começar agora
        </a>
      </section>

      <a href={tiktokUrl} target="_blank" className="floatingTikTok">
        TikTok
      </a>

      <footer className="footer">
        <div className="footerLogo">
          Fusion<span>Lab</span>
        </div>
        <p>Chaveiros e bonecos personalizados em impressão 3D.</p>
        <a href={tiktokUrl} target="_blank">
          @fusionlab.impress
        </a>
      </footer>
    </main>
  );
}
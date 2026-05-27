import { useState, useEffect } from "react";
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Layers, 
  Maximize2, 
  Phone, 
  Mail, 
  Globe, 
  Share2, 
  Facebook, 
  Instagram, 
  ArrowRight, 
  ChevronRight,
  ChevronLeft,
  X,
  Menu,
  CheckCircle2,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

// URLs das imagens geradas
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663171422751/Cg3HBhsnx9BeKdptTyQNxV/cartes_hills_hero-2fbEAEnXeiZKGTGuYYTkVC.webp";
const INTERIOR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663171422751/Cg3HBhsnx9BeKdptTyQNxV/cartes_hills_interior-5Q5kLpZiyafW3qqQ2RdSER.webp";
const AMENITIES_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663171422751/Cg3HBhsnx9BeKdptTyQNxV/cartes_hills_amenities-CyvUn8nt9bPipoXbUFS5t4.webp";

// Imagens rotativas para a galeria / destaque dinâmico
const GALLERY_IMAGES = [
  HERO_IMAGE,
  INTERIOR_IMAGE,
  AMENITIES_IMAGE
];

export default function Home() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Rotação dinâmica de imagens em destaque
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Adicionar Google Translator
  useEffect(() => {
    const addGoogleTranslate = () => {
      if (document.getElementById("google_translate_element")) return;
      
      const translateDiv = document.createElement("div");
      translateDiv.id = "google_translate_element";
      translateDiv.className = "fixed bottom-24 right-4 z-50 bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-lg border border-primary/20";
      document.body.appendChild(translateDiv);

      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'pt', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE },
          'google_translate_element'
        );
      };
    };

    addGoogleTranslate();
  }, []);

  const handleShare = (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = "Descubra o Cartes Hills - Apartamentos de Luxo no Porto!";
    
    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "instagram") {
      toast.success("Link copiado para partilhar no Instagram Stories!");
      navigator.clipboard.writeText(shareUrl);
    } else {
      if (navigator.share) {
        navigator.share({
          title: "Cartes Hills",
          text: shareText,
          url: shareUrl,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copiado para a área de transferência!");
      }
    }
  };

  const openPropertyWindow = (imgSrc: string) => {
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Cartes Hills - Visualização Premium</title>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@400;600&display=swap" rel="stylesheet">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #fbfbf9; }
              h1 { font-family: 'Playfair Display', serif; }
            </style>
          </head>
          <body class="flex flex-col items-center justify-center min-h-screen p-6 text-slate-800">
            <div class="max-w-4xl w-full bg-white p-8 rounded-2xl shadow-2xl border border-amber-100">
              <h1 class="text-3xl font-bold text-amber-700 mb-2">Cartes Hills | Empreendimento Premium</h1>
              <p class="text-sm text-slate-500 mb-6">Link partilhável: <span class="font-mono text-amber-600">${window.location.href}</span></p>
              
              <div class="relative rounded-xl overflow-hidden shadow-lg mb-6">
                <img src="${imgSrc}" alt="Cartes Hills" class="w-full h-auto object-cover max-h-[500px]">
              </div>

              <div class="space-y-4">
                <h2 class="text-xl font-semibold text-slate-800">Descrição do Consultor Imobiliário</h2>
                <p class="text-slate-600 leading-relaxed">
                  Apresentamos uma oportunidade única no centro do Porto. Este apartamento foi concebido sob os mais elevados padrões de qualidade, combinando a arquitetura curva icónica do Cartes Hills com interiores luminosos, acabamentos em tons claros e pormenores dourados que transmitem exclusividade e conforto. Usufrua de varandas generosas com excelente exposição solar a nascente e proximidade ao Parque Alameda de Cartes.
                </p>
                
                <div class="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span class="text-sm text-slate-500">DPS Imobiliária © 2026 | Licença AMI 26301</span>
                  <button onclick="window.close()" class="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200">
                    Fechar Janela
                  </button>
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/351925708456?text=Ol%C3%A1%2C+gostaria+de+obter+mais+informa%C3%A7%C3%B5es+sobre+o+empreendimento+Cartes+Hills.", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 w-full border-b border-primary/10 bg-white/80 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-md">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
              CARTES HILLS
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#arquitetura" className="text-sm font-medium hover:text-primary transition-colors">Arquitetura</a>
            <a href="#localizacao" className="text-sm font-medium hover:text-primary transition-colors">Localização</a>
            <a href="#lifestyle" className="text-sm font-medium hover:text-primary transition-colors">Estilo de Vida</a>
            <a href="#amenities" className="text-sm font-medium hover:text-primary transition-colors">Amenities</a>
            <a href="#projeto" className="text-sm font-medium hover:text-primary transition-colors">Projeto</a>
            <a href="#dps-imobiliaria" className="text-sm font-medium hover:text-primary transition-colors">DPS Imobiliária</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => handleShare("native")}
            >
              <Share2 className="mr-2 h-4 w-4" /> Partilhar
            </Button>
            <Button onClick={handleWhatsAppClick} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
              Contactar Já
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-primary/10 p-6 space-y-4 animate-in fade-in slide-in-from-top-5 duration-200">
            <nav className="flex flex-col gap-4">
              <a href="#arquitetura" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary">Arquitetura</a>
              <a href="#localizacao" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary">Localização</a>
              <a href="#lifestyle" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary">Estilo de Vida</a>
              <a href="#amenities" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary">Amenities</a>
              <a href="#projeto" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary">Projeto</a>
              <a href="#dps-imobiliaria" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary">DPS Imobiliária</a>
            </nav>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Button 
                variant="outline" 
                className="w-full border-primary text-primary"
                onClick={() => { handleShare("native"); setIsMobileMenuOpen(false); }}
              >
                <Share2 className="mr-2 h-4 w-4" /> Partilhar
              </Button>
              <Button onClick={() => { handleWhatsAppClick(); setIsMobileMenuOpen(false); }} className="w-full bg-primary text-primary-foreground">
                Contactar Já
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION with Dynamic Rotating Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                idx === activeImageIndex ? "opacity-30" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>

        <div className="container relative z-10 text-center max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold tracking-wider uppercase">Arquitetura de Assinatura no Porto</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
            Um Novo Ícone Urbano <br />
            <span className="font-serif italic text-primary">Cartes Hills</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto font-light leading-relaxed">
            Apartamentos T0, T1 e T2 concebidos para maximizar a luz natural, com varandas amplas, linhas curvas elegantes e acabamentos premium de elevada qualidade no centro do Porto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => document.getElementById("projeto")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explorar Projeto <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-slate-300 text-slate-700 hover:bg-white/50 px-8 py-6 text-base rounded-full backdrop-blur-sm"
              onClick={() => document.getElementById("localizacao")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Localização
            </Button>
          </div>

          {/* Dynamic Selector Indicators */}
          <div className="flex justify-center gap-3 pt-10">
            {GALLERY_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeImageIndex ? "w-8 bg-primary" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SHARING FLOATING BAR */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3 p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-primary/10">
        <button 
          onClick={() => handleShare("facebook")} 
          className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          title="Partilhar no Facebook"
        >
          <Facebook className="h-5 w-5" />
        </button>
        <button 
          onClick={() => handleShare("instagram")} 
          className="p-3 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
          title="Partilhar no Instagram"
        >
          <Instagram className="h-5 w-5" />
        </button>
        <button 
          onClick={() => handleShare("native")} 
          className="p-3 rounded-xl bg-amber-50 text-primary hover:bg-amber-100 transition-colors"
          title="Partilhar Link"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* WHATSAPP FLOATING BUTTON (WITH HORIZONTAL SCROLL ANIMATION HINT) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <div className="hidden md:flex bg-white/90 backdrop-blur-md border border-primary/20 px-4 py-2 rounded-full shadow-lg text-xs font-semibold text-slate-800 animate-bounce">
          Contacte já por WhatsApp! 👉
        </div>
        <button 
          onClick={handleWhatsAppClick}
          className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95"
          title="Contacte já por WhatsApp"
        >
          <MessageSquare className="h-7 w-7" />
        </button>
      </div>

      {/* SECTION 1: ARQUITETURA */}
      <section id="arquitetura" className="py-24 bg-white relative">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-primary font-serif italic text-lg font-semibold">01 / ARQUITETURA</div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Arquitetura de Assinatura, <br />
                <span className="font-serif italic text-primary">Um Novo Ícone</span>
              </h2>
              <div className="h-1 w-20 bg-primary rounded" />
              <p className="text-slate-600 leading-relaxed text-lg font-light">
                O Cartes Hills apresenta apartamentos T0, T1 e T2 com lugares de estacionamento privados e algumas unidades com espaços dedicados a escritório. O design curvo e em altura destaca-se pela sua identidade única, maximizando a luz natural, as vistas abertas a nascente e a privacidade.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg font-light">
                Varandas amplas, lines elegantes e acabamentos de elevada qualidade criam um ambiente sofisticado e exclusivo, resultando num ativo residencial premium no centro do Porto.
              </p>
              <div className="pt-4">
                <Button 
                  onClick={() => openPropertyWindow(HERO_IMAGE)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                >
                  Abrir Detalhes do Imóvel <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7 relative group cursor-pointer" onClick={() => openPropertyWindow(HERO_IMAGE)}>
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
                <img 
                  src={HERO_IMAGE} 
                  alt="Cartes Hills Fachada" 
                  className="w-full h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium flex items-center gap-2">
                    <Maximize2 className="h-5 w-5" /> Clique para ver em ecrã inteiro com link partilhável
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LOCALIZAÇÃO */}
      <section id="localizacao" className="py-24 bg-gradient-to-b from-white to-background relative">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="text-primary font-serif italic text-lg font-semibold">02 / LOCALIZAÇÃO</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Localização Estratégica, <span className="font-serif italic text-primary">Valor Natural</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded" />
            <p className="text-slate-600 text-lg font-light">
              Inserido numa das zonas mais estratégicas do Porto, rodeado por espaços verdes e com um parque diretamente sob o projeto, proporcionando equilíbrio entre cidade e natureza.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-primary/10 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Parques & Lazer</h3>
                <ul className="space-y-2 text-slate-600 text-sm font-light">
                  <li className="flex items-center justify-between">
                    <span>Parque Alameda de Cartes</span>
                    <span className="font-semibold text-primary">300m</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Praça da Corujeira</span>
                    <span className="font-semibold text-primary">550m</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Parque Oriental do Porto</span>
                    <span className="font-semibold text-primary">1.5km</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-primary/10 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Conetividade</h3>
                <ul className="space-y-2 text-slate-600 text-sm font-light">
                  <li className="flex items-center justify-between">
                    <span>Futura Estação Metro Cartes</span>
                    <span className="font-semibold text-primary">Próxima</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Estação Metro do Dragão</span>
                    <span className="font-semibold text-primary">1.0km</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Terminal Intermodal Campanhã</span>
                    <span className="font-semibold text-primary">1.3km</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-primary/10 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Pontos de Interesse</h3>
                <ul className="space-y-2 text-slate-600 text-sm font-light">
                  <li className="flex items-center justify-between">
                    <span>M-ODU Hub</span>
                    <span className="font-semibold text-primary">0.5km</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Estádio do Dragão</span>
                    <span className="font-semibold text-primary">1.0km</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Zona Comercial</span>
                    <span className="font-semibold text-primary">1.3km</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 3: ESTILO DE VIDA */}
      <section id="lifestyle" className="py-24 bg-white relative">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 relative group cursor-pointer" onClick={() => openPropertyWindow(INTERIOR_IMAGE)}>
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
                <img 
                  src={INTERIOR_IMAGE} 
                  alt="Cartes Hills Interior" 
                  className="w-full h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium flex items-center gap-2">
                    <Maximize2 className="h-5 w-5" /> Clique para ver em ecrã inteiro com link partilhável
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <div className="text-primary font-serif italic text-lg font-semibold">03 / ESTILO DE VIDA</div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Exclusividade <br />
                <span className="font-serif italic text-primary">No Centro do Porto</span>
              </h2>
              <div className="h-1 w-20 bg-primary rounded" />
              <p className="text-slate-600 leading-relaxed text-lg font-light">
                Uma vida pensada para quem procura mais. O Cartes Hills oferece um estilo de vida urbano com privacidade, onde espaços verdes, ambiente tranquilo e proximidade ao centro definem o quotidiano.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg font-light">
                A poucos minutos do Estádio do Dragão e com acessos rápidos, permite uma ligação fluida entre trabalho, lazer e casa, combinando exclusividade, conforto e conveniência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: AMENITIES */}
      <section id="amenities" className="py-24 bg-gradient-to-b from-white to-background relative">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-primary font-serif italic text-lg font-semibold">04 / AMENITIES</div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Amenities Essenciais para <br />
                <span className="font-serif italic text-primary">Um Conforto Privado</span>
              </h2>
              <div className="h-1 w-20 bg-primary rounded" />
              <p className="text-slate-600 leading-relaxed text-lg font-light">
                Desfrute de espaços partilhados exclusivos e funcionais que elevam a sua qualidade de vida diária sem sair do condomínio.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Ginásio</h4>
                    <p className="text-sm text-slate-500 font-light">Totalmente equipado</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Lavandaria</h4>
                    <p className="text-sm text-slate-500 font-light">Espaço prático e moderno</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative group cursor-pointer" onClick={() => openPropertyWindow(AMENITIES_IMAGE)}>
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
                <img 
                  src={AMENITIES_IMAGE} 
                  alt="Cartes Hills Amenities" 
                  className="w-full h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium flex items-center gap-2">
                    <Maximize2 className="h-5 w-5" /> Clique para ver em ecrã inteiro com link partilhável
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PROJETO / DETALHES */}
      <section id="projeto" className="py-24 bg-white relative">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="text-primary font-serif italic text-lg font-semibold">05 / PROJETO</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Vida Inteligente, <span className="font-serif italic text-primary">Valor Nítido</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded" />
            <p className="text-slate-600 text-lg font-light">
              O Cartes Hills redefine o conceito de viver no centro do Porto, combinando arquitetura icónica, conforto e exclusividade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Varandas Amplas", desc: "Vistas abertas e excelente exposição solar nascente para começar bem o dia." },
              { title: "Arquitetura Curva", desc: "Design icónico e moderno que se destaca e marca presença na linha do horizonte da cidade." },
              { title: "Grandes Vãos Envidraçados", desc: "Janelas amplas que elevam a luminosidade natural e a sofisticação de cada divisão." },
              { title: "Plantas Eficientes", desc: "Layouts inteligentes com opção de espaços de trabalho privados (home office)." },
              { title: "Tipologias T0, T1 e T2", desc: "Espaços perfeitamente adaptados ao estilo de vida urbano moderno." },
              { title: "Forte Procura", desc: "Ambiente residencial exclusivo com elevado potencial de valorização e investimento." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-background border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 space-y-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-bold text-sm">
                  {idx + 1}
                </div>
                <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                <p className="text-slate-600 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: DPS IMOBILIÁRIA (SUBSTITUINDO ALFA INVESTMENTS) */}
      <section id="dps-imobiliaria" className="py-24 bg-gradient-to-b from-white to-background relative">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-primary font-serif italic text-lg font-semibold">06 / DPS IMOBILIÁRIA</div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                DPS Imobiliária, <br />
                <span className="font-serif italic text-primary">Mediação de Excelência</span>
              </h2>
              <div className="h-1 w-20 bg-primary rounded" />
              <p className="text-slate-600 leading-relaxed text-lg font-light">
                A **DPS Imobiliária** (Licença AMI 26301) é a sua parceira de confiança no mercado imobiliário premium do Grande Porto. Destacamo-nos pela excelência na mediação e comercialização de empreendimentos sofisticados como o Cartes Hills.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg font-light">
                Oferecemos um serviço personalizado, focado no cliente e orientado para encontrar as melhores oportunidades de investimento e habitação com total segurança e profissionalismo.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white p-10 rounded-3xl border border-primary/15 shadow-xl space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 font-serif">Contacte-nos Diretamente</h3>
              <div className="h-0.5 w-12 bg-primary rounded" />
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase">Telefone / WhatsApp</div>
                    <div className="text-lg font-semibold text-slate-800">+351 925 708 456</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase">Licença Oficial</div>
                    <div className="text-lg font-semibold text-slate-800">AMI 26301</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase">Morada Sede</div>
                    <div className="text-sm text-slate-600 leading-relaxed">
                      Rua Manuel Francisco de Araújo 684<br />
                      4425-120 Águas Santas, Maia
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={handleWhatsAppClick} 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-6 text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <MessageSquare className="mr-2 h-5 w-5" /> Contactar já por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-primary/10">
        <div className="container grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <span className="font-serif text-2xl font-bold tracking-wider text-white">
              CARTES HILLS
            </span>
            <p className="text-sm font-light leading-relaxed">
              Empreendimento residencial premium no centro do Porto. Luxo, exclusividade e modernidade comercializados pela DPS Imobiliária.
            </p>
            <div className="flex gap-4 pt-2">
              <button onClick={() => handleShare("facebook")} className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button onClick={() => handleShare("instagram")} className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm font-light">
              <li><a href="#arquitetura" className="hover:text-white transition-colors">Arquitetura T0, T1, T2</a></li>
              <li><a href="#localizacao" className="hover:text-white transition-colors">Localização e Envolvência</a></li>
              <li><a href="#lifestyle" className="hover:text-white transition-colors">Estilo de Vida</a></li>
              <li><a href="#amenities" className="hover:text-white transition-colors">Amenities do Condomínio</a></li>
              <li><a href="#projeto" className="hover:text-white transition-colors">O Projeto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Informação Legal</h4>
            <p className="text-xs font-light leading-relaxed">
              Este documento é meramente informativo e não constitui proposta contratual. Todas as informações, imagens e descrições são indicativas e sujeitas a alteração.
            </p>
            <p className="text-xs font-light mt-2">
              DPS Imobiliária - Licença AMI 26301.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold">Contactos Oficiais</h4>
            <div className="space-y-2 text-sm font-light">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+351 925 708 456</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span>Licença AMI 26301</span>
              </div>
              <p className="text-xs pt-2 leading-relaxed">
                Rua Manuel Francisco de Araújo 684<br />
                4425-120 Águas Santas, Maia
              </p>
            </div>
          </div>
        </div>

        <div className="container mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          <p>Cartes Hills © 2026 | Comercializado por DPS Imobiliária. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

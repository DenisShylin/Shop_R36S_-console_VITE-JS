const imagePreloader = {
  init() {
    // Создаем link preload для критичных изображений
    const preloadLinks = [
      { href: "/assets/img/hero/herou1_1x_.png", media: "(max-width: 1x)" },
      {
        href: "/assets/img/hero/herou1_2x_.png",
        media: "(min-resolution: 2x)",
      },
    ];

    preloadLinks.forEach(({ href, media }) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      if (media) link.media = media;
      document.head.appendChild(link);
    });
  },
};

export const initHero = () => {
  // Получаем элементы
  const heroSection = document.getElementById("hero");

  if (!heroSection) {
    console.error("Hero section not found");
    return;
  }

  const titleRef = heroSection.querySelector(".hero__content");
  const heroDescription = heroSection.querySelector(".hero__description");
  const primaryButton = heroSection.querySelector(".hero__button--primary");
  const secondaryButton = heroSection.querySelector(".hero__button--secondary");
  const heroImage = heroSection.querySelector(".hero__console-img");

  // Состояние
  let isDesktop = window.innerWidth > 1280;

  // Тексты описаний
  const descriptions = {
    desktop:
      "R36S HANDHELD GAME CONSOLE opens the door to the exciting world of retro gaming, offering an impressive collection of over 15,000 legendary games from different eras and platforms. Dive into a universe of gaming nostalgia with the R36S HANDHELD CONSOLE!",
    mobile:
      "R36S HANDHELD GAME CONSOLE - Gaming legends in the palm of your hand",
  };

  // Обновление описания
  const updateDescription = () => {
    if (heroDescription) {
      heroDescription.textContent = isDesktop
        ? descriptions.desktop
        : descriptions.mobile;
    }
  };

  // Обработчики событий
  const handleResize = () => {
    const newIsDesktop = window.innerWidth > 1280;
    if (newIsDesktop !== isDesktop) {
      isDesktop = newIsDesktop;
      updateDescription();
    }
  };

  const handleBuyClick = () => {
    window.open(
      "https://www.aliexpress.com/item/1005007171465465.html",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleMoreDetailsClick = (e) => {
    e.preventDefault();
    const featuresSection = document.getElementById("features");
    const header = document.querySelector(".header");

    if (featuresSection && header) {
      const headerHeight = header.offsetHeight;
      const elementPosition = featuresSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}#features`
      );
    }
  };

  // Установка обработчиков
  window.addEventListener("resize", handleResize);
  if (primaryButton) primaryButton.addEventListener("click", handleBuyClick);
  if (secondaryButton)
    secondaryButton.addEventListener("click", handleMoreDetailsClick);

  // Начальная инициализация
  updateDescription();

  // Наблюдатель за появлением секции
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    },
    { threshold: 0.1 }
  );

  if (titleRef) observer.observe(titleRef);

  // Возвращаем функцию очистки
  return () => {
    window.removeEventListener("resize", handleResize);
    if (primaryButton)
      primaryButton.removeEventListener("click", handleBuyClick);
    if (secondaryButton)
      secondaryButton.removeEventListener("click", handleMoreDetailsClick);
    observer.disconnect();
  };
};
imagePreloader.init();

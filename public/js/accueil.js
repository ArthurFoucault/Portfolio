function scrollToTop() {
    // Obtenez la position actuelle de défilement
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  
    if (currentScroll > 0) {
      // Si nous ne sommes pas déjà en haut, faites défiler la page
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, currentScroll - (currentScroll / 10)); // Réglez la vitesse en modifiant le diviseur ici
    }
  }
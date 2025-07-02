document.addEventListener("DOMContentLoaded", function () {
  // ✅ הגדרת Swiper
  if (document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }

  // ✅ טופס שליחה לוואטסאפ
  window.sendToWhatsapp = function(event) {
    event.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const msg = document.getElementById('message').value.trim();

    const fullMsg = `שם: ${name}%0Aטלפון: ${phone}%0Aהודעה: ${msg}`;

    // 🟢 שליפת מספר מה-body באופן גנרי
    const whatsappNumber = document.body.dataset.whatsapp || "0532407762";

    const url = `https://wa.me/972${whatsappNumber.slice(1)}?text=${fullMsg}`;
    window.open(url, '_blank');
  };

  // ✅ אקורדיון כללי (ישן, לא חובה אם עברת ל־Elementor-Style בלבד)
  const toggles = document.querySelectorAll(".accordion-toggle");

  toggles.forEach((btn) => {
    btn.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isOpen = content.style.maxHeight;

      // סגירת כל שאר התכנים
      document.querySelectorAll(".accordion-content").forEach((el) => {
        el.style.maxHeight = null;
      });

      // פתיחה אם לא פתוח כבר
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // ✅ תמיכה באקורדיון בסגנון Elementor (כמו בדוגמה ששלחת)
  const tabToggles = document.querySelectorAll('.elementor-tab-title');

  tabToggles.forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const isActive = this.classList.contains('elementor-active');
      const tabContentId = this.getAttribute('aria-controls');
      const tabContent = document.getElementById(tabContentId);

      // סגור את כל הלשוניות
      document.querySelectorAll('.elementor-tab-title').forEach((el) => {
        el.classList.remove('elementor-active');
        el.setAttribute('aria-expanded', 'false');
        el.setAttribute('aria-selected', 'false');
      });

      document.querySelectorAll('.elementor-tab-content').forEach((el) => {
        el.setAttribute('hidden', true);
      });

      // פתח את הנבחר אם לא היה פתוח
      if (!isActive) {
        this.classList.add('elementor-active');
        this.setAttribute('aria-expanded', 'true');
        this.setAttribute('aria-selected', 'true');
        tabContent.removeAttribute('hidden');
      }
    });
  });

  // ✅ שיתוף דינמי של קישור העמוד
  const shareButtons = document.querySelectorAll('.share-buttons a');

  shareButtons.forEach(button => {
    button.addEventListener('click', function () {
      const type = this.dataset.type;
      const pageUrl = encodeURIComponent(window.location.href);
      const pageTitle = encodeURIComponent(document.title);

      let shareUrl = "#";

      switch (type) {
        case "whatsapp":
          shareUrl = `https://wa.me/?text=${pageTitle}%0A${pageUrl}`;
          break;
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
          break;
        case "email":
          shareUrl = `mailto:?subject=${pageTitle}&body=${pageUrl}`;
          break;
      }

      window.open(shareUrl, '_blank');
    });
  });

});


window.cardData = {
  fullName: "הילה לוי",
  jobTitle: "מטפלת רגשית ומדריכת הורים",
  phone: "0521234567",
  email: "hila@example.com",
  phoneDigits: "0521234567",
  logoSrc: "../assets/logo-ortopok.png",
  profileImage: "../assets/profile.jpg",
  facebookLink: "https://facebook.com/hila.page",
  youtubeLink: "https://www.youtube.com/embed/ysz5S6PUM-U",
  aboutParagraphs: "<p><strong>הילה לוי</strong> מומחית בליווי רגשי והדרכת הורים בגישה מותאמת אישית.</p>",
  parentingSection: "<p>העצמה רגשית וכלים לתקשורת אפקטיבית.</p>",
  approachText: "<p>הכלה, הקשבה וכלים פרקטיים.</p>",
  targetAudienceText: "<p>הורים, ילדים, מתבגרים עם אתגרים רגשיים.</p>",
  vcardLink: "#",
  recommendations: [
    { name: "נועה", text: "הילה עזרה לי להבין את הילד שלי מחדש." },
    { name: "רוני", text: "הגישה שלך שינתה לנו את הבית." }
  ]
};

window.addEventListener("DOMContentLoaded", function () {
  if (window.renderCard) renderCard();
});

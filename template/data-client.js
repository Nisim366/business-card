// ✅ הגדרת הנתונים הדינמיים
window.cardData = {
  fullName: "הילה לוי",
  jobTitle: "מטפלת רגשית ומדריכת הורים",
  pageTitle: "הילה לוי - מטפלת רגשית והדרכת הורים",
  phone: "0521234567",
  email: "hila@example.com",
  phoneDigits: "0521234567",
  logoSrc: "../assets/logo-ortopok.png",
  profileImage: "../assets/profile.jpg",
  facebookLink: "https://facebook.com/hila.page",
  youtubeLink: "https://www.youtube.com/embed/ysz5S6PUM-U",
  vcardLink: "#",
  
  // ✅ אודות
  aboutParagraphs: `
    <p><strong>בדיקת שינוי אודות</strong></p>
    <p><strong>מענה מיידי</strong> לתסמינים פיזיולוגיים...</p>
    <p>סיוע באמצעות כלים וטכניקות...</p>
    <p>אני מלווה אתכם באופן אישי...</p>
    <p>התכלית שלי שאני מאמינה ביכולת...</p>
    <p><strong>טור אישי בעיתון מוקד.</strong></p>
    <h4 class="subsection-title align-right">הנחיית הורים:</h4>
    <p class="align-right">אנחנו מוצאים את עצמנו עם אתגרים...</p>
    <p class="align-right">לפעמים שלא משנה כמה ננסה...</p>
    <p class="highlight align-right">הנחיית הורים בשילוב טיפול רגשי...</p>
  `,

  // ✅ טקסטים לאקורדיונים
  accordionTitle1: "הגישה שלי בטיפול הרגשי",
  accordionText1: `
    <p>אני משלבת כלים מעולמות ה־CBT וה־NLP לצד הקשבה פעילה ורגישה.</p>
    <p>הטיפול מותאם אישית לכל אחד, מתוך אמונה ביכולת של כל אדם לחולל שינוי אמיתי כשהוא מקבל ליווי בגובה העיניים.</p>
  `,
  accordionTitle2: "למי השירות מתאים?",
  accordionText2: `
    <p>הטיפול שלי מיועד להורים, ילדים, מתבגרים, נשים וגברים המתמודדים עם אתגר רגשי, לחץ נפשי או תקיעות רגשית.</p>
    <p>גם מי שמעוניין בהתפתחות אישית, חיזוק תקשורת זוגית או שיפור הורות – ימצא מקום מכיל, מדויק ומקדם.</p>
  `,

  // ✅ המלצות
  recommendations: [
  { name: "נועה", text: "הילה עזרה לי להבין את הילד שלי מחדש." },
  { name: "רוני", text: "הגישה שלך שינתה לנו את הבית." },
  { name: "אנונימי", text: "החוויה הייתה מדהימה. תודה רבה." }
]

};

// ⛔️ אין צורך לקרוא ל־renderCard() כאן
// הקריאה מבוצעת בתוך script-generic.js בזמן הנכון

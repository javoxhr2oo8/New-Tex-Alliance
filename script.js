const stickyNav = document.getElementById('stickyNav');
const scrollIndicator = document.getElementById('scrollIndicator');

window.addEventListener('scroll', () => {
  if (stickyNav) {
    if (window.scrollY > 300) stickyNav.classList.add('visible');
    else stickyNav.classList.remove('visible');
  }
  if (scrollIndicator) {
    if (window.scrollY > 60) scrollIndicator.classList.add('hidden');
    else scrollIndicator.classList.remove('hidden');
  }
}, { passive: true });

if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
  });
}

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function nextSlide() {
  if (slides.length === 0) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}
setInterval(nextSlide, 5000);

const fadeCards = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
fadeCards.forEach((card, index) => {
  card.style.transitionDelay = `${(index % 3) * 0.12}s`;
  observer.observe(card);
});

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (question && answer) {
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  }
});

// --- СЛОВАРЬ ФЛАГОВ ---
const flagUrls = {
  ru: "https://flagcdn.com/w40/ru.png",
  uz: "https://flagcdn.com/w40/uz.png",
  zh: "https://flagcdn.com/w40/cn.png"
};

const translations = {
  ru: {
    workDays: "ПОНЕДЕЛЬНИК - ПЯТНИЦА 09:00 - 18:00",
    saturday: "СУББОТА: 09:00 - 15:00",
    sunday: "ВОСКРЕСЕНЬЕ - ВЫХОДНОЙ",

    labelDiameter: "Диаметр: ",
    labelPressure: "Давление: ",
    labelLength: "Длина: ",
    labelFittings: "Комплектация: ",

    // Специфические значения для рукавов
    pressure_10: "1.0 бар",
    pressure_16: "1.6 бар",
    unitMeter: "метр",
    length_20: "20м",
    fittings_50: "ГР-50, РС-50 (с навязкой)",
    fittings_65: "ГР-65, РС-65 (с навязкой)",
    fittings_80_no: "ГР-80 (БЕЗ НАВЯЗКИ)",
    kg: "Кг",
    shortTitle: "OOO NEW TEX ALLIANCE",
    mainTitle: "New Tex Alliance",
    subtitle: "Ваш надежный поставщик противопожарного оборудования.",
    callBtn: "Позвонить",
    catalog: "Каталог",
    scrollHint: "Смотреть ниже",
    catExtinguishers: "Огнетушители",
    catHoses: "Пожарные рукава",
    catFittings: "Пожарные краны и фитинги",
    op3Title: "ОП-3", op4Title: "ОП-4", op5Title: "ОП-5", op8Title: "ОП-8", op10Title: "ОП-10", op25Title: "ОП-25 и ОП-50",
    specOp: "Огнетушитель порошковый",
    specOpLarge: "Огнетушитель порошковый",
    descOp: "Универсальный огнетушитель. Подходит для тушения твердых веществ, горючих жидкостей и электропроводки.",
    ou2Title: "ОУ-2", ou3Title: "ОУ-3", ou5Title: "ОУ-5", ou10Title: "ОУ-10",
    specOu: "Огнетушитель с углекислым газом",
    descOu: "Идеален для серверных, офисов с компьютерами и щитовых. Тушит газом, не оставляя грязи и порошка на дорогом оборудовании.",
    hoseTitle: "Пожарный рукав (шланг)",
    specHose50_10: "Диаметр: 50 | 1.0 бар | 20м | ГР-50, РС-50 (с навязкой)",
    specHose50_16: "D: 50 | 1.6 бар | 20м | ГР-50, РС-50 (с навязкой)",
    specHose65_10: "D: 65 | 1.0 бар | 20м | ГР-65, РС-65 (с навязкой)",
    specHose65_16: "D: 65 | 1.6 бар | 20м | ГР-65, РС-65 (с навязкой)",
    specHose80_16: "D: 80 | 1.6 бар | 20м | ГР-80 (БЕЗ НАВЯЗКИ)",
    descHose: "Гибкий трубопровод для подачи воды под высоким давлением от крана к месту пожара. Обязателен для пожарных шкафов в зданиях.",
    valveIronTitle: "Пожарный кран (чугун)",
    valveBrassTitle: "Пожарный кран (латунь)",
    specValve: "Модели ДУ-50 и ДУ-65",
    descValveIron: "Надежный чугунный вентиль для внутреннего пожарного водопровода. Открывает подачу воды в рукав. Отличается высокой прочностью.",
    descValveBrass: "Вентиль премиум-класса. Не подвержен коррозии, легко открывается даже после долгих лет простоя. Идеально для влажных сред.",
    fittingsTitle: "Фитинги пожарные",
    specFitting: "Из алюминия",
    descFitting: "Специальные соединительные головки. Позволяют за секунды герметично сцепить пожарные рукава между собой или подключить их к крану.",
    faqTitle: "Часто задаваемые вопросы",
    faq1q: "Какой срок годности у огнетушителя?",
    faq1a: "Срок службы огнетушителя составляет 10 лет. Однако техническое обслуживание и проверка давления требуются каждые 1–2 года. Не забывайте следить за показаниями манометра.",
    faq2q: "Нужна ли перезарядка огнетушителя?",
    faq2a: "Да. Даже если огнетушитель не использовался, перезарядка необходима раз в 5 лет. После каждого применения — обязательно. Мы предоставляем услугу перезарядки на месте.",
    faq3q: "Какой огнетушитель выбрать для автомобиля?",
    faq3a: "Для личного транспорта рекомендуется порошковый огнетушитель весом 1–2 кг. Он компактен, эффективен против возгораний класса A, B и C, и легко помещается в салоне или багажнике.",
    faq4q: "Есть ли доставка по Ташкенту?",
    faq4a: "Да, мы осуществляем доставку по всему Ташкенту. Свяжитесь с нами по телефону, и мы согласуем удобное время. Доставка в день обращения возможна при наличии товара на складе.",
    footerAbout: "Надежная защита для вашего дома и бизнеса. Качество, проверенное временем.",
    footerContacts: "Контакты",
    footerAddress: "г. Ташкент, ул. Безопасности, 1",
    footerHoursTitle: "Режим работы",
    footerHours: "24/7 Без выходных",
    footerReady: "Готовы помочь в любую минуту.",
    footerRights: "© 2026 ООО New Tex Alliance. Все права защищены.",
    heroText: "ОБОРУДОВАНИЕ ДЛЯ ПОЖАРНОЙ И ОХРАННОЙ БЕЗОПАСНОСТИ"
  },
  uz: {
    workDays: "DUSHANBA - JUMA 09:00 - 18:00",
    saturday: "SHANBA: 09:00 - 15:00",
    sunday: "YAKSHANBA - DAM OLISH KUNI",
    unitMeter: "metr",
    labelDiameter: "Diametri: ",
    labelPressure: "Bosimi: ",
    labelLength: "Uzunligi: ",
    labelFittings: "To'plami: ",

    pressure_10: "1.0 bar",
    pressure_16: "1.6 bar",
    length_20: "20m",
    fittings_50: "GR-50, RS-50 (boylangan)",
    fittings_65: "GR-65, RS-65 (boylangan)",
    fittings_80_no: "GR-80 (BOYLANMAGAN)",
    kg: "Kg",
    shortTitle: "OOO NEW TEX ALLIANCE",
    mainTitle: "New Tex Alliance",
    subtitle: "Yong'in xavfsizligi uskunalarining ishonchli yetkazib beruvchisi.",
    callBtn: "Qo'ng'iroq qilish",
    catalog: "Katalog",
    scrollHint: "Pastga qarash",
    catExtinguishers: "O't o'chirgichlar",
    catHoses: "Yong'in shlanglari",
    catFittings: "Jo'mrak va fitinglar",
    op3Title: "OP-3", op4Title: "OP-4", op5Title: "OP-5", op8Title: "OP-8", op10Title: "OP-10", op25Title: "OP-25 va OP-50",
    specOp: "Огнетушитель порошковый",
    specOpLarge: "Kukunli o't o'chirgich",
    descOp: "Universal o't o'chirgich. Qattiq moddalar, yonuvchan suyuqliklar va elektr simlarini o'chirish uchun mos keladi.",
    ou2Title: "OU-2", ou3Title: "OU-3", ou5Title: "OU-5", ou10Title: "OU-10",
    specOu: "Uglerod oksidli o't o'chirgich",
    descOu: "Server xonalari, kompyuterli ofislar va elektr qutilari uchun ideal. Qimmatbaho uskunalarda chang qoldirmasdan gaz bilan o'chiradi.",
    hoseTitle: "Yong'in shlangi",
    specHose50_10: "D: 50 | 1.0 bar | 20m | GR-50, RS-50 (boylangan)",
    specHose50_16: "D: 50 | 1.6 bar | 20m | GR-50, RS-50 (boylangan)",
    specHose65_10: "D: 65 | 1.0 bar | 20m | GR-65, RS-65 (boylangan)",
    specHose65_16: "D: 65 | 1.6 bar | 20m | GR-65, RS-65 (boylangan)",
    specHose80_16: "D: 80 | 1.6 bar | 20m | GR-80 (BOYLANMAGAN)",
    descHose: "Jo'mrakdan yong'in joyiga yuqori bosim ostida suv yetkazib berish uchun moslashuvchan quvur. Binolardagi yong'in shkaflari uchun majburiy.",
    valveIronTitle: "Yong'in jo'mraki (cho'yan)",
    valveBrassTitle: "Yong'in jo'mraki (jez/latun)",
    specValve: "DU-50 va DU-65 modellari",
    descValveIron: "Ichki yong'in suv quvurlari uchun ishonchli cho'yan jo'mrak. Yuqori mustahkamligi bilan ajralib turadi.",
    descValveBrass: "Premium darajadagi jez jo'mrak. Zanglamaydi, uzoq yillar ishlatilmaganda ham oson ochiladi. Nam muhitlar uchun ideal.",
    fittingsTitle: "Yong'in fitinglari",
    specFitting: "Alyuminiydan",
    descFitting: "Maxsus ulash qismlari. Yong'in shlanglarini bir-biriga yoki jo'mrakka soniyalar ichida zich ulash imkonini beradi.",
    faqTitle: "Ko'p so'raladigan savollar",
    faq1q: "O't o'chirgichning yaroqlilik muddati qancha?",
    faq1a: "O't o'chirgichning xizmat qilish muddati 10 yil. Biroq, har 1-2 yilda texnik xizmat ko'rsatish va bosimni tekshirish talab qilinadi. Manometr ko'rsatkichlarini kuzatishni unutmang.",
    faq2q: "O't o'chirgichni qayta zaryadlash kerakmi?",
    faq2a: "Ha. O't o'chirgich ishlatilmagan bo'lsa ham, har 5 yilda qayta zaryadlash zarur. Har bir foydalanishdan keyin - majburiy. Biz joyida qayta zaryadlash xizmatini taqdim etamiz.",
    faq3q: "Avtomobil uchun qanday o't o'chirgichni tanlash kerak?",
    faq3a: "Shaxsiy transport uchun og'irligi 1-2 kg bo'lgan kukunli o't o'chirgich tavsiya etiladi. U ixcham, A, B va C sinfidagi yong'inlarga qarshi samarali hamda salon yoki bagajga oson joylashadi.",
    faq4q: "Toshkent bo'ylab yetkazib berish bormi?",
    faq4a: "Ha, biz butun Toshkent bo'ylab yetkazib beramiz. Biz bilan telefon orqali bog'laning va biz qulay vaqtni kelishib olamiz. Tovar omborda mavjud bo'lsa, murojaat qilingan kunda yetkazib berish mumkin.",
    footerAbout: "Uyingiz va biznesingiz uchun ishonchli himoya. Vaqt sinovidan o'tgan sifat.",
    footerContacts: "Aloqa",
    footerAddress: "Toshkent sh., Xavfsizlik ko'chasi, 1",
    footerHoursTitle: "Ish vaqti",
    footerHours: "24/7 Dam olish kunlarisiz",
    footerReady: "Har qanday daqiqada yordam berishga tayyormiz.",
    footerRights: "© 2026 New Tex Alliance MChJ. Barcha huquqlar himoyalangan.",
    heroText: "YONG'IN VA QO'RIQLASH XAVFSIZLIK USKUNALARI"
  },
  zh: {
    workDays: "周一至周五 09:00 - 18:00",
    saturday: "周六: 09:00 - 15:00",
    sunday: "周日 - 休息",
    
    unitMeter: "米",
    labelDiameter: "直径: ",
    labelPressure: "压力: ",
    labelLength: "长度: ",
    labelFittings: "配件: ",

    pressure_10: "1.0 bar",
    pressure_16: "1.6 bar",
    length_20: "20米",
    fittings_50: "GR-50, RS-50 (已绑扎)",
    fittings_65: "GR-65, RS-65 (已绑扎)",
    fittings_80_no: "GR-80 (未绑扎)",
    kg: "千克(Qiānkè)",
    shortTitle: "OOO NEW TEX ALLIANCE",
    mainTitle: "New Tex Alliance",
    subtitle: "您值得信赖的消防设备供应商",
    callBtn: "呼叫",
    catalog: "产品目录",
    scrollHint: "向下滚动",
    catExtinguishers: "灭火器",
    catHoses: "消防水带",
    catFittings: "消防阀门和接头",
    op3Title: "OP-3", op4Title: "OP-4", op5Title: "OP-5", op8Title: "OP-8", op10Title: "OP-10", op25Title: "OP-25 / OP-50",
    specOp: "干粉灭火器",
    specOpLarge: "干粉灭火器",
    descOp: "万能灭火器。适用于扑灭固体物质、易燃液体和带电设备火灾。",
    ou2Title: "OU-2", ou3Title: "OU-3", ou5Title: "OU-5", ou10Title: "OU-10",
    specOu: "二氧化碳灭火器",
    descOu: "服务器机房、电脑办公室和配电盘的理想选择。使用气体灭火，不会在昂贵的设备上留下粉末和污垢。",
    hoseTitle: "消防水带",
    specHose50_10: "直径: 50 | 1.0 bar | 20米 | GR-50, RS-50 (已绑扎)",
    specHose50_16: "直径: 50 | 1.6 bar | 20米 | GR-50, RS-50 (已绑扎)",
    specHose65_10: "直径: 65 | 1.0 bar | 20米 | GR-65, RS-65 (已绑扎)",
    specHose65_16: "直径: 65 | 1.6 bar | 20米 | GR-65, RS-65 (已绑扎)",
    specHose80_16: "直径: 80 | 1.6 bar | 20米 | GR-80 (未绑扎)",
    descHose: "柔性管道，用于将高压水从阀门输送到火灾现场。建筑物内消防柜的必备品。",
    valveIronTitle: "消防阀门 (铸铁)",
    valveBrassTitle: "消防阀门 (黄铜)",
    specValve: "型号 DU-50 和 DU-65",
    descValveIron: "用于内部消防供水系统的可靠铸铁阀门。控制水流进入水带。具有高强度和耐用性。",
    descValveBrass: "优质黄铜阀门。防锈耐腐蚀，即使闲置多年也能轻松打开。潮湿环境的理想选择。",
    fittingsTitle: "消防接头",
    specFitting: "铝制",
    descFitting: "特殊的连接头。可让您在几秒钟内将消防水带相互密封连接或连接到阀门上。",
    faqTitle: "常见问题",
    faq1q: "灭火器的保质期是多久？",
    faq1a: "灭火器的使用寿命为10年。但每1-2年需要进行一次维护和压力测试。请务必关注压力表。",
    faq2q: "灭火器需要重新充装吗？",
    faq2a: "是的。即使未使用过，也需要每5年重新充装一次。每次使用后必须立即充装。我们提供现场充装服务。",
    faq3q: "汽车应选择哪种灭火器？",
    faq3a: "建议私家车使用1-2公斤的干粉灭火器。它体积小巧，可有效扑灭A、B、C类火灾，并且易于存放在车厢或后备箱中。",
    faq4q: "塔什干市内提供送货服务吗？",
    faq4a: "是的，我们提供全塔什干市的送货服务。请电话联系我们安排合适的时间。如果仓库有货，可以当天送货。",
    footerAbout: "为您的家庭和企业提供可靠的保护。经得起时间考验的质量。",
    footerContacts: "联系方式",
    footerAddress: "塔什干市，安全街 1 号",
    footerHoursTitle: "营业时间",
    footerHours: "24/7 全天候，无休息日",
    footerReady: "随时准备提供帮助。",
    footerRights: "© 2026 New Tex Alliance 有限责任公司. 保留所有权利。",
    heroText: "消防与安防安全设备"
  }
};

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
}

// --- ЛОГИКА DROPDOWN И ПЕРЕКЛЮЧЕНИЯ ЯЗЫКОВ ---
const dropdowns = document.querySelectorAll('.custom-dropdown');

// Открытие и закрытие меню
dropdowns.forEach(dropdown => {
  const selected = dropdown.querySelector('.dropdown-selected');
  selected.addEventListener('click', (e) => {
    e.stopPropagation(); // Остановка клика, чтобы меню не закрылось сразу
    // Закрываем другие дропдауны, если их несколько
    dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('active'); });
    dropdown.classList.toggle('active');
  });
});

// Закрываем меню при клике в любое другое место страницы
document.addEventListener('click', () => {
  dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
});

// Выбор языка из выпадающего списка
const options = document.querySelectorAll('.dropdown-option');
options.forEach(option => {
  option.addEventListener('click', () => {
    const lang = option.getAttribute('data-lang');
    const langText = option.innerText.trim();

    // Синхронизируем текст и флаг во всех меню (и в шапке, и на главном экране)
    dropdowns.forEach(dropdown => {
      dropdown.querySelector('.current-lang-text').innerText = langText;
      dropdown.querySelector('.current-flag').src = flagUrls[lang];
      dropdown.classList.remove('active'); // Закрываем меню
    });

    // Запускаем текстовый перевод
    applyTranslations(lang);
  });
});

// Инициализация при первой загрузке
applyTranslations('ru');
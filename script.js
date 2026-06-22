// =========================================
// MENU MOBILE E FAQ ACCORDION
// =========================================
const btnMobile = document.getElementById('btn-mobile');
const navMenu = document.getElementById('nav-menu');
btnMobile.addEventListener('click', () => navMenu.classList.toggle('active'));
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

const faqToggles = document.querySelectorAll('.faq-toggle');
faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const itemAtual = toggle.parentElement;
        const isOpen = itemAtual.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        if (!isOpen) itemAtual.classList.add('active');
    });
});

// =========================================
// CARROSSEL E LIGHTBOX DE FOTOS
// =========================================
const slides = document.querySelectorAll('.depoimento-slide');
const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
if(nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    setInterval(() => showSlide(currentSlide + 1), 6000);
}

const galeriaItems = document.querySelectorAll('.galeria-item');
const lightbox = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

galeriaItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightbox.classList.add('show');
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
    });
});
if(lightboxClose) lightboxClose.addEventListener('click', () => lightbox.classList.remove('show'));
if(lightbox) {
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('show'); });
}

// =========================================
// 1. FILTRO DINÂMICO DE MÉDICOS
// =========================================
const botoesFiltro = document.querySelectorAll('.btn-filtro');
const cardsMedicos = document.querySelectorAll('#medicos-grid .medico-card');

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach(b => b.classList.remove('active'));
        botao.classList.add('active');
        
        const categoriaFiltro = botao.getAttribute('data-filter');
        
        cardsMedicos.forEach(card => {
            const categoriaCard = card.getAttribute('data-category');
            if (categoriaFiltro === 'todos' || categoriaFiltro === categoriaCard) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// =========================================
// 2. VALIDAÇÃO INTELIGENTE (MÁSCARA CELULAR)
// =========================================
const telInput = document.getElementById('form-tel');
if(telInput) {
    telInput.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

// =========================================
// 3. EFEITO SCROLL REVEAL (Anti-Bug Seguro)
// =========================================
const revealElements = document.querySelectorAll('[data-reveal]');

function checkScrollReveal() {
    const triggerBottom = window.innerHeight * 0.95;
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom || window.scrollY > 100) {
            el.classList.add('activated');
        }
    });
}
window.addEventListener('scroll', checkScrollReveal);
window.addEventListener('load', () => {
    setTimeout(checkScrollReveal, 100);
});

// =========================================
// 4. SISTEMA DE AGENDA DE HORÁRIOS SIMULADA
// =========================================
const selectEspecialidade = document.getElementById('form-especialidade');
const inputData = document.getElementById('form-data');
const selectHorario = document.getElementById('form-horario');

if(inputData) {
    const hoje = new Date().toISOString().split('T')[0];
    inputData.min = hoje;
}

if(selectEspecialidade) {
    selectEspecialidade.addEventListener('change', () => {
        inputData.disabled = false;
    });
}

if(inputData) {
    inputData.addEventListener('change', () => {
        selectHorario.disabled = false;
        selectHorario.innerHTML = '<option value="" disabled selected>Selecione o Horário</option>';
        
        const diaSemana = new Date(inputData.value).getDay();
        let horariosDisponiveis = [];
        
        if (diaSemana === 5) { // Sábado
            horariosDisponiveis = ['08:30', '09:15', '10:00', '11:15'];
        } else if (diaSemana === 6) { // Domingo
            selectHorario.innerHTML = '<option value="" disabled selected>Clínica Fechada aos Domingos</option>';
            selectHorario.disabled = true;
            return;
        } else { // Dias de Semana
            horariosDisponiveis = ['08:00', '09:30', '10:45', '14:00', '15:30', '16:45'];
        }
        
        horariosDisponiveis.forEach(hora => {
            const option = document.createElement('option');
            option.value = hora;
            option.textContent = hora + ' hrs';
            selectHorario.appendChild(option);
        });
    });
}

// =========================================
// 5. BANNER DE COOKIES E MODAL LGPD
// =========================================
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');
const lgpdModal = document.getElementById('lgpd-modal');
const lgpdClose = document.querySelector('.lgpd-close');
const closeLgpdBtn = document.getElementById('close-lgpd-btn');

window.addEventListener('load', () => {
    if (cookieBanner && !localStorage.getItem('cookiesAceitos')) {
        setTimeout(() => cookieBanner.classList.add('show'), 1000);
    }
});

if(acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAceitos', 'true');
        cookieBanner.classList.remove('show');
    });
}

function abrirModalLGPD(e) {
    e.preventDefault();
    if(lgpdModal) lgpdModal.classList.add('show');
}
function fecharModalLGPD() {
    if(lgpdModal) lgpdModal.classList.remove('show');
}

const triggerLgpd1 = document.getElementById('open-lgpd');
const triggerLgpd2 = document.getElementById('open-lgpd-footer');
const triggerLgpd3 = document.getElementById('open-lgpd-cookie');

if(triggerLgpd1) triggerLgpd1.addEventListener('click', abrirModalLGPD);
if(triggerLgpd2) triggerLgpd2.addEventListener('click', abrirModalLGPD);
if(triggerLgpd3) triggerLgpd3.addEventListener('click', abrirModalLGPD);
if(lgpdClose) lgpdClose.addEventListener('click', fecharModalLGPD);
if(closeLgpdBtn) closeLgpdBtn.addEventListener('click', fecharModalLGPD);

// =========================================
// CONFIRMAÇÃO ANIMADA DO FORMULÁRIO
// =========================================
const clinicForm = document.getElementById('clinic-form');
const formBox = document.getElementById('agendamento-form-box');
const sucessoBox = document.getElementById('sucesso-box');
const sucessoNome = document.getElementById('sucesso-nome');
const sucessoData = document.getElementById('sucesso-data');
const sucessoHour = document.getElementById('sucesso-hora');
const inputNome = document.getElementById('form-nome');

if(clinicForm) {
    clinicForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const primeiroNome = inputNome.value.split(' ')[0];
        const dataFormatada = inputData.value.split('-').reverse().join('/');
        
        sucessoNome.textContent = primeiroNome;
        sucessoData.textContent = dataFormatada;
        sucessoHour.textContent = selectHorario.value + 'h';
        
        formBox.classList.add('hide');
        setTimeout(() => {
            formBox.style.display = 'none';
            sucessoBox.classList.add('show');
        }, 400);
    });
}
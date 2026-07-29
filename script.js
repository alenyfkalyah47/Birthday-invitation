// Дата мероприятия
const eventDate = new Date("August 28, 2026 17:00:00").getTime();

function updateTimer() {

    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {

        document.getElementById("countdown").innerHTML =
            "<h2>Мы уже празднуем! 🎉</h2>";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateTimer();
setInterval(updateTimer, 1000);

// ===========================
// Анимация появления блоков
// ===========================

const sections = document.querySelectorAll(
    ".card, .dress-item, .time, .rsvp, footer"
);

sections.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "1s";

});

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.2
});

sections.forEach(section => observer.observe(section));

// ===========================
// Эффект свечения кнопки
// ===========================

const button = document.querySelector(".telegram");

setInterval(() => {

    button.classList.toggle("glow");

}, 1200);

// ===========================
// Плавное увеличение карточек
// ===========================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0) scale(1)";

    });

});


// ===========================
// Отправка формы RSVP
// ===========================

const form = document.getElementById("rsvpForm");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const drinks = [];

        document
            .querySelectorAll(".drinks input[type='checkbox']:checked")
            .forEach(item => drinks.push(item.value));

        const data = {
    name: document.getElementById("name").value,
    attend: document.getElementById("attend").value,
    count: document.getElementById("count").value,
    drinks: drinks,
    otherDrink: document.getElementById("otherDrink").value,
    comment: document.getElementById("comment").value
};

        try {
            const response = await fetch(
                "https://birthday-bot-7qkq.onrender.com/submit",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (result.success) {

                document.getElementById("successMessage").style.display = "block";

                form.reset();

            } else {

                alert("Не удалось отправить ответ.");

            }

        } catch (error) {

            alert("Ошибка соединения с сервером.");

        }

    });
}

// Падающие лепестки

const petals = document.getElementById("petals");
console.log("Лепестки:", petals);

function createPetal(){

    const petal = document.createElement("div");

    petal.className = "petal";

    petal.style.left = Math.random()*100 + "vw";

    const size = 35 + Math.random()*35;

petal.style.width = size + "px";
petal.style.height = size*1.4 + "px";

    petal.style.opacity = 0.45 + Math.random()*0.55;

    petal.style.animation =
        `fall ${7 + Math.random()*7}s linear forwards`;

    petals.appendChild(petal);

    setTimeout(()=>{
        petal.remove();
    },15000);

}

setInterval(createPetal,500);

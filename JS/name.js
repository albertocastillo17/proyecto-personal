const header = document.querySelector(".header");
const menuToggle = document.querySelector(".header__menu-toggle");

const navLinks = document.querySelectorAll(".header__nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");

    menuToggle.setAttribute("aria-expanded", isOpen);
})

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        header.classList.remove("is-menu-open");
        menuToggle.setAttribute("aria-expanded", false);
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        header.classList.remove("is-menu-open");
        menuToggle.setAttribute("aria-expanded", false);
    }
});


// --------------------------------------------------x

const form = document.querySelector(".contact__form");
const formMessage = document.querySelector(".form__message");
const formSubmit = document.querySelector(".form__submit");






// ------------------------------------------------

function showMessage(text, isError) {
    formMessage.textContent = text;
    formMessage.classList.toggle("form__message-error", isError)
    formMessage.hidden = false;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    formSubmit.disabled = true;
    formSubmit.textContent = "Enviando..."




    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: {
                Accept: "application/json",
            }
        });

        if (response.ok) {
            showMessage("¡Gracias! Tu mensaje se envio correctamente. Te responderé pronto.",
                false,
            )
            form.reset();
        }
        else {
            showMessage("Ocurrio un error al enviar el mensaje. Porfavor inténtalo de nuevo.",
                true,
            )
            form.reset();
        }

    } catch (error) {
        showMessage("No se pudo conectar. Intentalo de nuevo más tarde.",
            true
        )
    }
    finally {
        formSubmit.disabled = false;
        formSubmit.textContent = "Enviar Mensaje";
    }
});

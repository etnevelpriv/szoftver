// Modal megjelenítése hiba esetén
function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    const modalClose = document.getElementById('close-button');
    modalClose.onclick = function () {
        modal.style.display = 'none';
    }
}

//Változók neveinek lekérése és prompt összeállítása
function userVariables() {
    const langInput = document.getElementById('lang-input');
    const timeInput = document.getElementById('time-input');
    const extraInput = document.getElementById('extra-input');
    const levelInput = document.querySelector('input[name="level"]:checked');
    const promptInput = document.getElementById('prompt-input');

    let prompt = `Készíts ${langInput.value} programozási nyelven, amelyet ${timeInput.value} idő alatt ellehet készíteni projektötletet a(z) ${levelInput.value} szintű fejlesztő számára.
    A projektötlet legyen egyedi és kreatív.
    A projektötlet legyen részletesen kifejtve, tartalmazzon egy rövid leírást, a szükséges technológiákat és eszközöket, valamint egy lépésről-lépésre útmutatót a megvalósításhoz.`;

    if (promptInput.value.trim() !== '') {
        prompt = promptInput.value;
    }

    if (extraInput.value.trim() !== '') {
        prompt += ` Emellett vedd figyelembe a következő kulcsszavakat is: ${extraInput.value}.`;
    }

    if (!levelInput || !langInput.value || !timeInput.value) {
        showModal();
        return;
    }

    return prompt;
}

//Gomb eseménykezelő, fetch kérés küldése
function init() {
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.onclick = function () {
        const prompt = userVariables();
        if (prompt) {
            console.log(prompt);
        }
    }
}

init();
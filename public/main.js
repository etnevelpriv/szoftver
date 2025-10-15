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

    if (!levelInput || !langInput.value || !timeInput.value) {
        showModal();
        return;
    }

    let prompt = `Készíts ${langInput.value} programozási nyelven egy preojektötletet, amelyet ${timeInput.value} idő alatt ellehet készíteni projektötletet a(z) ${levelInput.value} szintű fejlesztő számára.
    A projektötlet legyen egyedi és kreatív.
    A projektötlet legyen részletesen kifejtve, tartalmazzon egy rövid leírást, a szükséges technológiákat és eszközöket, valamint egy lépésről-lépésre útmutatót a megvalósításhoz.`;

    if (extraInput.value.trim() !== '') {
        prompt += ` Emellett vedd figyelembe a következő kulcsszavakat is: ${extraInput.value}.`;
    }

    return prompt;
}

//Gomb eseménykezelő
function eventListeners() {
    const loadingContainer = document.getElementById('loading-container');
    const generateBtn = document.getElementById('generate-btn');
    const outputContainer = document.getElementById('output-container');

    generateBtn.onclick = async function () {
        const prompt = userVariables();
        const outputBox = document.getElementById('output-box');
        loadingContainer.style.display = 'block';

        // A fetchben is a copilot segített, de itt is módosítottam a kódot, hogy működjön. Túl sok volt a hibakezelés
        const result = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        let data = {};
        data = await result.json();

        loadingContainer.style.display = 'none';
        outputContainer.style.display = 'block';
        outputBox.textContent = data.output_text;
    }
}

eventListeners();
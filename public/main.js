import OpenAI from "https://cdn.skypack.dev/openai";  // OpenAI könyvtár importálása, ezt az AI csinálta, mert helyileg nem foagadta el

function openaiInit() {
    const apiKey = "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";
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    eventListeners(openai);
}

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

    let prompt = `Készíts ${langInput.value} programozási nyelven egy preojektötletet, amelyet ${timeInput.value} idő alatt ellehet készíteni projektötletet a(z) ${levelInput.value} szintű fejlesztő számára.
    A projektötlet legyen egyedi és kreatív.
    A projektötlet legyen részletesen kifejtve, tartalmazzon egy rövid leírást, a szükséges technológiákat és eszközöket, valamint egy lépésről-lépésre útmutatót a megvalósításhoz.`;

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
function eventListeners(openai) {
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.onclick = async function () {
        const prompt = userVariables();
        if (prompt) {
            console.log(prompt);
            const result = await openai.responses.create({
                model: "gpt-5",
                input: prompt,
                reasoning: { effort: "low" },
                text: { verbosity: "low" },
            });

            console.log(result.output_text);
        }
    }
}

openaiInit();
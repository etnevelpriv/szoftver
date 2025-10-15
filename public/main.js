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

    const extras = extraInput.value.trim();

    return `Te egy tapasztalt szoftverfejlesztő mentor vagy, aki magyarul kommunikál.

Felhasználói paraméterek:
- Programozási nyelv: ${langInput.value}
- Fejlesztési időkeret: ${timeInput.value}
- Célzott felkészültségi szint: ${levelInput.value}
${extras ? `- Extra preferenciák vagy kulcsszavak: ${extras}
` : ''}

Komplexitási irányelvek, amelyeket követned kell:
- "Kezdő": Nagyon kis léptékű, minimális függőséggel, alapvető programozási fogalmak gyakorlására fókuszálva.
- "Amatőr": Kis projekt, kevés külső szolgáltatással, alap algoritmusok és egyszerű adatszerkezetek.
- "Középhaladó": Közepes komplexitás, több komponenssel, adatkezeléssel és legalább egy külső szolgáltatás használatával.
- "Haladó": Összetett architektúra, skálázhatósági szempontok, biztonsági és teljesítménybeli megfontolások.
- "Profi": Nagy léptékű rendszer, több alrendszerrel, DevOps, CI/CD és robusztus tesztelési stratégia.

Elvárások a kidolgozottságra vonatkozóan:
- Minden szöveges mező részletes, több mondatos magyarázatot tartalmazzon, kifejezve a döntések indokait.
- A "summary" mező legalább három bekezdésből álljon, mindegyik 2-3 mondattal, konkrét funkciókat és felhasználói forgatókönyveket bemutatva.
- Az "estimated_scope" mező tartalmazzon részletes ütemtervet (pl. szakaszokra bontva, óraszámokkal/hetekkel), a kulcs mérföldkövek és leszállítandók felsorolásával.
- A "why_this_level" mező legalább négy külön indokot soroljon fel, mindegyikben jelenjen meg erőforrás- és technológiai indoklás.
- A tömbök elemei legyenek összetett, legalább két mondatot tartalmazó pontok, amelyek világos célt és kimenetet írnak le.
- "tech_stack" minimum hat elem, "setup_steps" minimum hat elem, "build_steps" minimum nyolc elem, "testing_and_validation" minimum négy elem, "extra_challenges" minimum négy elem, "learning_outcomes" minimum öt elem.
- Kerüld az ismétlést: minden elem más aspektust emeljen ki.

Feladatod:
1. A paraméterek alapján tervezz egy egyedi és kreatív projektötletet.
2. Győződj meg róla, hogy a projekt valóban megfelel a megadott szintnek: indokold meg, hogyan illeszkedik.
3. Adj részletes megvalósítási lépéseket, amelyek figyelembe veszik az időkeretet és jelzik az erőforrásigényt.
4. Emelj ki olyan tanulási eredményeket, amelyek a szintnek megfelelő fejlődést támogatják, és magyarázd, hogyan mérhető a fejlődés.

Válaszként kizárólag érvényes JSON objektumot küldj, minden kulcsot dupla idézőjelben használva. A JSON pontosan a következő kulcsokat tartalmazza:
{
    "title": "Projekt név",
    "summary": "Rövid összefoglaló",
    "estimated_scope": "Becsült időkeret és terjedelem",
    "why_this_level": "Részletes indoklás a szinthez illeszkedésről",
    "tech_stack": ["technológia1", "technológia2", "technológia3", "technológia4", "technológia5", "stb...],
    "setup_steps": ["lépés1", "lépés2", "lépés3", "lépés4", "lépés5", stb...],
    "build_steps": ["lépés1", "lépés2", "lépés3", "lépés4", "lépés5", stb...],
    "testing_and_validation": ["módszer1", "módszer2", "módszer3", "módszer4", "módszer5", "stb..."],
    "extra_challenges": ["kihívás1", "kihívás2", "kihívás3", "kihívás4", "stb..."],
    "learning_outcomes": ["eredmény1", "eredmény2", "eredmény3", "eredmény4", "eredmény5"]
}

Tartsd tiszteletben, hogy a felsorolt tömbök legalább a megadott elemszámot tartalmazzák. De inkább többet.

Ne adj hozzá szöveges magyarázatot, Markdown-t vagy kódblokk jelölőt a JSON köré. Mindegyik szöveges érték legyen magyarul.`;
}

function renderProjectIdea(projectIdea) {
    const outputBox = document.getElementById('output-box');
    outputBox.innerHTML = '';

    const heading = document.createElement('h3');
    heading.textContent = `Projektötlet: ${projectIdea.title}`;
    outputBox.appendChild(heading);

    const scope = document.createElement('p');
    scope.textContent = `Becsült időkeret: ${projectIdea.estimated_scope}`;
    outputBox.appendChild(scope);

    const summaryTitle = document.createElement('h4');
    summaryTitle.textContent = 'Összefoglaló';
    outputBox.appendChild(summaryTitle);

    const summary = document.createElement('p');
    summary.textContent = projectIdea.summary;
    outputBox.appendChild(summary);

    const levelTitle = document.createElement('h4');
    levelTitle.textContent = 'Miért illik a szinthez';
    outputBox.appendChild(levelTitle);

    const levelReason = document.createElement('p');
    levelReason.textContent = projectIdea.why_this_level;
    outputBox.appendChild(levelReason);

    const sectionDefinitions = [
        { key: 'tech_stack', title: 'Kulcstechnológiák' },
        { key: 'setup_steps', title: 'Előkészületi lépések' },
        { key: 'build_steps', title: 'Megvalósítási lépések' },
        { key: 'testing_and_validation', title: 'Tesztelés és validáció' },
        { key: 'extra_challenges', title: 'További kihívások' },
        { key: 'learning_outcomes', title: 'Tanulási eredmények' }
    ];

    sectionDefinitions.forEach(({ key, title }) => {
        if (!Array.isArray(projectIdea[key]) || projectIdea[key].length === 0) {
            return;
        }

        const sectionTitle = document.createElement('h4');
        sectionTitle.textContent = title;
        outputBox.appendChild(sectionTitle);

        const list = document.createElement('ul');
        projectIdea[key].forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });
        outputBox.appendChild(list);
    });
}

function renderTutorial() {
    const tutorialContainer = document.createElement('div');
    tutorialContainer.id = 'tutorial-container';
    tutorialContainer.className = 'tutorial-container';
    tutorialContainer.style.display = 'block';

    const tutorialButton = document.getElementById('show-tutorial-btn');
    tutorialButton.disabled = true;

    const outputContainer = document.getElementById('output-container'); 
    outputContainer.appendChild(tutorialContainer);

    const tutorialContent = document.createElement('div');
    tutorialContent.className = 'tutorial-content';
    tutorialContent.innerHTML = 'Teszt';
    tutorialContainer.appendChild(tutorialContent);
}

//Gomb eseménykezelő
function eventListeners() {
    const loadingContainer = document.getElementById('loading-container');
    const generateBtn = document.getElementById('generate-btn');
    const outputContainer = document.getElementById('output-container');

    generateBtn.onclick = async function () {
        const prompt = userVariables();
        outputContainer.style.display = 'none';
        loadingContainer.style.display = 'block';
        generateBtn.disabled = true;

        // A fetchben is a copilot segített, de itt is módosítottam a kódot, hogy működjön. Túl sok volt a hibakezelés
        const result = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        let data = {};
        data = await result.json();
        await renderProjectIdea(JSON.parse(data.output_text));

        loadingContainer.style.display = 'none';

        const tutorialButton = document.createElement('button');
        tutorialButton.id = 'show-tutorial-btn';
        tutorialButton.textContent = 'Kezdő kód generálása';
        outputContainer.appendChild(tutorialButton);
        tutorialButton.onclick = function () {
            renderTutorial();
        }

        outputContainer.style.display = 'block';
    }
}

eventListeners();
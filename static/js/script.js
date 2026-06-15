// Mega Database: 21 High-Quality Snippets with Structural Logic
const snippetsPool = {
    python: [
        {
            code: `print("Welcome to CodeType 2026")\nname = input("Enter name: ")\nprint(f"Hello, {name}")`,
            logic: "Python basic input/output string interpolation structure using f-strings."
        },
        {
            code: `num = int(input("Enter number: "))\nif num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")`,
            logic: "Basic conditional branching setup utilizing the arithmetic modulo (%) operators."
        },
        {
            code: `def factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    return n * factorial(n - 1)`,
            logic: "Core mathematical execution using explicit functional stack frames recursion manipulation."
        },
        {
            code: `def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True`,
            logic: "Intermediate prime verification engine optimized using square-root mathematical constraints loop distribution."
        },
        {
            code: `squares = [x**2 for x in range(1, 11) if x % 2 == 0]\nprint(squares)`,
            logic: "Intermediate functional list comprehension framework deploying conditional runtime array filtration flags."
        },
        {
            code: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]`,
            logic: "Advanced sorting state tracking array optimization engine executing cyclic sequential element swapping."
        },
        {
            code: `fib = lambda n: n if n <= 1 else fib(n-1) + fib(n-2)\nprint([fib(i) for i in range(10)])`,
            logic: "Advanced anonymous mathematical Lambda expression executing parallel branch tree dynamic recursive callbacks."
        }
    ],
    javascript: [
        {
            code: `let colors = ["cyan", "neon", "dark"];\ncolors.forEach(color => {\n    console.log("Theme: " + color);\n});`,
            logic: "Basic array elements pointer traversal using the high-performance forEach functional callback architecture."
        },
        {
            code: `const greet = (user) => \`Access Granted: \${user}\`;\nconsole.log(greet("Admin_2026"));`,
            logic: "Basic ES6 arrow syntax layout utilizing modern declarative dynamic template literals string interpolation handles."
        },
        {
            code: `const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);`,
            logic: "Intermediate functional immutability pipeline transforming elements using abstract pure mapping filters."
        },
        {
            code: `const delay = ms => new Promise(res => setTimeout(res, ms));\nasync function init() {\n    await delay(1000);\n    console.log("System Ready");\n}`,
            logic: "Intermediate asynchronous event scheduling pipeline utilizing native browser Promises and structural async/await scopes."
        },
        {
            code: `const user = { id: 101, bio: { tech: "NodeJS" } };\nconst { bio: { tech } } = user;\nconsole.log(tech ?? "Unavailable");`,
            logic: "Advanced shallow nested structural object destructuring assignments fused with fallback Nullish Coalescing operators."
        },
        {
            code: `function debounce(func, delay) {\n    let timer;\n    return function(...args) {\n        clearTimeout(timer);\n        timer = setTimeout(() => func.apply(this, args), delay);\n    };\n}`,
            logic: "Advanced closure memory lexical state context encapsulation mapping high-frequency macro event throttling architectures."
        },
        {
            code: `const items = [1, 2, 2, 3, 4, 4, 5];\nconst uniqueItems = [...new Set(items)];\nconsole.log(uniqueItems);`,
            logic: "Advanced collection engineering leveraging memory reference optimization via explicit hashing Set structures and spread arrays."
        }
    ],
    cpp: [
        {
            code: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Cyberpunk Grid Activated" << endl;\n    return 0;\n}`,
            logic: "Standard layout boilerplate configuration setting up the hardware interface buffer data output channel streaming pipelines."
        },
        {
            code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a = 5, b = 10;\n    swap(a, b);\n    return 0;\n}`,
            logic: "Basic local stack variable data context values mutations through optimal built-in swap compilers functions."
        },
        {
            code: `int arr[] = {10, 20, 30};\nint* ptr = arr;\nfor(int i=0; i<3; i++) {\n    cout << *(ptr + i) << " ";\n}`,
            logic: "Intermediate raw explicit virtual memory indexing parsing absolute addresses sequentially through structural pointer arithmetic calculations."
        },
        {
            code: `struct Node {\n    int data;\n    Node* next;\n};\nNode* head = new Node{1, nullptr};`,
            logic: "Intermediate compound structured data node reference initialization laying out native heap-allocated singly linked-lists constructs."
        },
        {
            code: `template <typename T>\nT getMax(T a, T b) {\n    return (a > b) ? a : b;\n}\n// Call: getMax<int>(5, 10);`,
            logic: "Advanced generic polymorphic abstraction macro engineering generating variable compile-time structural execution logic maps."
        },
        {
            code: `class Car {\npublic:\n    string brand;\n    Car(string x) { brand = x; }\n};\nCar myObj("Tesla");`,
            logic: "Advanced object-oriented encapsulation setting up public constructor memory frame bindings on explicit runtime abstraction entities."
        },
        {
            code: `#include <vector>\n#include <algorithm>\nvector<int> v = {4, 1, 3};\nsort(v.begin(), v.end());`,
            logic: "Advanced execution optimization calling optimized high-performance intro-sort algorithms directly via native STL vector adapters."
        }
    ]
};

let currentLanguage = 'python';
let currentMode = '60'; 
let timerInterval = null;
let timeElapsed = 0;
let maxTime = 60; 
let isTestRunning = false;
let totalErrors = 0;
let selectedSnippet = "";

const codeDisplay = document.getElementById('code-display');
const codeInput = document.getElementById('code-input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accElement = document.getElementById('accuracy');
const langSelect = document.getElementById('lang-select');
const modeSelect = document.getElementById('mode-select');
const restartBtn = document.getElementById('restart-btn');
const logicText = document.getElementById('logic-text');

function initTest() {
    clearInterval(timerInterval);
    timeElapsed = 0;
    totalErrors = 0;
    isTestRunning = false;
    
    currentMode = modeSelect.value;
    
    if (currentMode !== 'notimer') {
        maxTime = parseInt(currentMode); 
        timerElement.innerText = maxTime + "s";
    } else {
        timerElement.innerText = '0s'; 
    }
    
    wpmElement.innerText = '0';
    accElement.innerText = '100';
    codeInput.value = '';
    codeInput.disabled = false;
    
    currentLanguage = langSelect.value;
    
    // Pick random code snippet from current collection pool
    const pool = snippetsPool[currentLanguage];
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selectedBlock = pool[randomIndex];
    
    selectedSnippet = selectedBlock.code;
    logicText.innerText = selectedBlock.logic; 
    
    // Display renderer engine logic mapping tokens to HTML nodes
    codeDisplay.innerHTML = selectedSnippet.split('').map((char, index) => {
        if(char === '\n') return `<span id="char-${index}">\n</span><br>`;
        return `<span id="char-${index}">${char}</span>`;
    }).join('');
    
    document.getElementById('char-0').classList.add('char-current');
}

function startTimer() {
    isTestRunning = true;
    timerInterval = setInterval(() => {
        timeElapsed++;
        
        if (currentMode !== 'notimer') {
            let timeLeft = maxTime - timeElapsed;
            timerElement.innerText = timeLeft + "s";
            if (timeLeft <= 0) {
                endTest();
                return;
            }
        } else {
            timerElement.innerText = timeElapsed + 's'; 
        }
        
        const typedText = codeInput.value;
        const words = typedText.length / 5;
        if (timeElapsed > 0) {
            wpmElement.innerText = Math.round((words / timeElapsed) * 60);
        }
    }, 1000);
}

codeInput.addEventListener('input', () => {
    if (!isTestRunning && codeInput.value.length > 0) {
        startTimer();
    }

    const typedText = codeInput.value;
    totalErrors = 0;

    for (let i = 0; i < selectedSnippet.length; i++) {
        const charSpan = document.getElementById(`char-${i}`);
        if (!charSpan) continue;

        charSpan.classList.remove('char-correct', 'char-incorrect', 'char-current');

        if (i < typedText.length) {
            if (typedText[i] === selectedSnippet[i]) {
                charSpan.classList.add('char-correct');
            } else {
                charSpan.classList.add('char-incorrect');
                totalErrors++;
            }
        } else if (i === typedText.length) {
            charSpan.classList.add('char-current');
        }
    }

    if(typedText.length > 0) {
        let acc = ((typedText.length - totalErrors) / typedText.length) * 100;
        accElement.innerText = Math.max(0, Math.round(acc));
    }
    
    if (typedText.length >= selectedSnippet.length) {
        endTest();
    }
});

function endTest() {
    clearInterval(timerInterval);
    codeInput.disabled = true;
    
    const finalWpm = parseInt(wpmElement.innerText);
    const finalAccuracy = parseFloat(accElement.innerText);
    
    fetch('/api/save-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            wpm: finalWpm,
            accuracy: finalAccuracy,
            errors: totalErrors,
            language: currentLanguage
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("✨ Test Complete! Speed performance tracking metric captured safely.");
        window.location.href = '/dashboard';
    })
    .catch(err => console.error("Error operational network loop sync sync:", err));
}

langSelect.addEventListener('change', initTest);
modeSelect.addEventListener('change', initTest); 
restartBtn.addEventListener('click', initTest);

window.onload = initTest;
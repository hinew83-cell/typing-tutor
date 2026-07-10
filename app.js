// Hangul Constants for Jamo decomposition
const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const JUNG = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
const JONG = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

const splitJung = {
  "ㅘ": ["ㅗ", "ㅏ"],
  "ㅙ": ["ㅗ", "ㅐ"],
  "ㅚ": ["ㅗ", "ㅣ"],
  "ㅝ": ["ㅜ", "ㅓ"],
  "ㅞ": ["ㅜ", "ㅔ"],
  "ㅟ": ["ㅜ", "ㅣ"],
  "ㅢ": ["ㅡ", "ㅣ"]
};

const splitJong = {
  "ㄳ": ["ㄱ", "ㅅ"],
  "ㄵ": ["ㄴ", "ㅈ"],
  "ㄶ": ["ㄴ", "ㅎ"],
  "ㄺ": ["ㄹ", "ㄱ"],
  "ㄻ": ["ㄹ", "ㅁ"],
  "ㄼ": ["ㄹ", "ㅂ"],
  "ㄽ": ["ㄹ", "ㅅ"],
  "ㄾ": ["ㄹ", "ㅌ"],
  "ㄿ": ["ㄹ", "ㅍ"],
  "ㅀ": ["ㄹ", "ㅎ"],
  "ㅄ": ["ㅂ", "ㅅ"]
};

// Keyboard Mappings (Physical Key -> Korean Character)
const krKeyMap = {
  'q': 'ㅂ', 'Q': 'ㅃ', 'w': 'ㅈ', 'W': 'ㅉ', 'e': 'ㄷ', 'E': 'ㄸ', 'r': 'ㄱ', 'R': 'ㄲ', 't': 'ㅅ', 'T': 'ㅆ',
  'y': 'ㅛ', 'u': 'ㅕ', 'i': 'ㅑ', 'o': 'ㅐ', 'O': 'ㅒ', 'p': 'ㅔ', 'P': 'ㅖ', 'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ',
  'f': 'ㄹ', 'g': 'ㅎ', 'h': 'ㅗ', 'j': 'ㅓ', 'k': 'ㅏ', 'l': 'ㅣ', 'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ',
  'b': 'ㅠ', 'n': 'ㅜ', 'm': 'ㅡ'
};

const krKeyReverseMap = {};
Object.entries(krKeyMap).forEach(([k, v]) => {
  krKeyReverseMap[v] = k;
});

// Decompose single Hangul character into array of Jamo
function decomposeHangul(char) {
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) {
    return [char];
  }
  const offset = code - 0xAC00;
  const choIdx = Math.floor(offset / 588);
  const jungIdx = Math.floor((offset % 588) / 28);
  const jongIdx = offset % 28;
  
  let result = [CHO[choIdx]];
  
  // Handle compound vowels
  const jung = JUNG[jungIdx];
  if (splitJung[jung]) {
    result.push(...splitJung[jung]);
  } else {
    result.push(jung);
  }
  
  // Handle final consonants
  if (JONG[jongIdx] !== "") {
    const jong = JONG[jongIdx];
    if (splitJong[jong]) {
      result.push(...splitJong[jong]);
    } else {
      result.push(jong);
    }
  }
  
  return result;
}

// Preset Materials
const PRESETS = {
  ko: {
    key: [
      { name: "기본 자리 (Home Row)", data: "ㅁㄴㅇㄹㅎㅗㅓㅏㅣ;" },
      { name: "왼손 자리 (Left Hand)", data: "ㅂㅈㄷㄱㅅㅁㄴㅇㄹㅋㅌㅊㅍ" },
      { name: "오른손 자리 (Right Hand)", data: "ㅛㅕㅑㅐㅔㅗㅓㅏㅣㅠㅜㅡ" },
      { name: "숫자 및 기호", data: "1234567890-=[]\\;',./" }
    ],
    word: [
      { name: "기초 단어", data: ["하늘", "바다", "나무", "구름", "바람", "햇살", "노래", "사랑", "행복", "미소", "도전", "열정", "지혜", "용기", "믿음", "배움"] },
      { name: "컴퓨터 IT 용어", data: ["컴퓨터", "인터넷", "마우스", "키보드", "모니터", "데이터", "네트워크", "프로그램", "서버", "코드", "화면", "디자인"] }
    ],
    sentence: [
      { name: "짧은 문장", data: [
        "동해물과 백두산이 마르고 닳도록",
        "일하러 가야 할 시간입니다",
        "오늘 하루도 즐거운 시간 되세요",
        "천 리 길도 한 걸음부터 시작합니다",
        "아름다운 한글을 소중히 가꿉시다"
      ]},
      { name: "명언 & 명구", data: [
        "실패는 성공의 어머니이다",
        "시간은 금이다",
        "어제와 똑같이 살면서 다른 미래를 기대하지 말라",
        "행복은 습관이다, 그것을 몸에 익혀라",
        "가장 훌륭한 예술가는 자연이다"
      ]}
    ]
  },
  en: {
    key: [
      { name: "Home Row", data: "asdfghjkl;" },
      { name: "Top Row", data: "qwertyuiop" },
      { name: "Bottom Row", data: "zxcvbnm,./" },
      { name: "Numbers & Symbols", data: "1234567890-=[]\\;',./" }
    ],
    word: [
      { name: "Common Words", data: ["apple", "banana", "window", "desktop", "keyboard", "success", "future", "nature", "science", "library", "orange", "picture", "office", "garden", "market"] },
      { name: "Coding Keywords", data: ["function", "const", "let", "return", "document", "window", "import", "class", "export", "interface", "promise", "async", "await", "console"] }
    ],
    sentence: [
      { name: "Short Sentences", data: [
        "The quick brown fox jumps over the lazy dog.",
        "Practice makes perfect in everything you do.",
        "A journey of a thousand miles begins with a single step.",
        "Actions speak louder than words.",
        "All that glitters is not gold."
      ]},
      { name: "Programming Quotes", data: [
        "Talk is cheap. Show me the code.",
        "Programs must be written for people to read.",
        "First, solve the problem. Then, write the code.",
        "Make it work, make it right, make it fast.",
        "Simplicity is the soul of efficiency."
      ]}
    ]
  }
};

// Finger Mapping for touch typing guides (QWERTY layout and Hangul QWERTY overlay)
const FINGER_MAP = {
  // Left Pinky
  '1': 'l-pinky', '!': 'l-pinky', 'q': 'l-pinky', 'ㅂ': 'l-pinky', 'ㅃ': 'l-pinky', 'a': 'l-pinky', 'ㅁ': 'l-pinky', 'z': 'l-pinky', 'ㅋ': 'l-pinky',
  // Left Ring
  '2': 'l-ring', '@': 'l-ring', 'w': 'l-ring', 'ㅈ': 'l-ring', 'ㅉ': 'l-ring', 's': 'l-ring', 'ㄴ': 'l-ring', 'x': 'l-ring', 'ㅌ': 'l-ring',
  // Left Middle
  '3': 'l-middle', '#': 'l-middle', 'e': 'l-middle', 'ㄷ': 'l-middle', 'ㄸ': 'l-middle', 'd': 'l-middle', 'ㅇ': 'l-middle', 'c': 'l-middle', 'ㅊ': 'l-middle',
  // Left Index
  '4': 'l-index', '$': 'l-index', '5': 'l-index', '%': 'l-index', 'r': 'l-index', 'ㄱ': 'l-index', 'ㄲ': 'l-index', 't': 'l-index', 'ㅅ': 'l-index', 'ㅆ': 'l-index', 'f': 'l-index', 'ㄹ': 'l-index', 'g': 'l-index', 'ㅎ': 'l-index', 'v': 'l-index', 'ㅍ': 'l-index', 'b': 'l-index', 'ㅠ': 'l-index',
  // Thumb
  ' ': 'thumb', 'space': 'thumb',
  // Right Index
  '6': 'r-index', '^': 'r-index', '7': 'r-index', '&': 'r-index', 'y': 'r-index', 'ㅛ': 'r-index', 'u': 'r-index', 'ㅕ': 'r-index', 'h': 'r-index', 'ㅗ': 'r-index', 'j': 'r-index', 'ㅓ': 'r-index', 'n': 'r-index', 'ㅜ': 'r-index', 'm': 'r-index', 'ㅡ': 'r-index',
  // Right Middle
  '8': 'r-middle', '*': 'r-middle', 'i': 'r-middle', 'ㅑ': 'r-middle', 'k': 'r-middle', 'ㅏ': 'r-middle', ',': 'r-middle', '<': 'r-middle',
  // Right Ring
  '9': 'r-ring', '(': 'r-ring', 'o': 'r-ring', 'ㅐ': 'r-ring', 'ㅒ': 'r-ring', 'l': 'r-ring', 'ㅣ': 'r-ring', '.': 'r-ring', '>': 'r-ring',
  // Right Pinky
  '0': 'r-pinky', ')': 'r-pinky', '-': 'r-pinky', '_': 'r-pinky', '=': 'r-pinky', '+': 'r-pinky', 'p': 'r-pinky', 'ㅔ': 'r-pinky', 'ㅖ': 'r-pinky', '[': 'r-pinky', '{': 'r-pinky', ']': 'r-pinky', '}': 'r-pinky', '\\': 'r-pinky', '|': 'r-pinky', ';': 'r-pinky', ':': 'r-pinky', "'": 'r-pinky', '"': 'r-pinky', '/': 'r-pinky', '?': 'r-pinky'
};

// Keyboard Layout Configuration
const KEYBOARD_LAYOUT = {
  ko: [
    [
      { key: "1", sub: "!" }, { key: "2", sub: "@" }, { key: "3", sub: "#" }, { key: "4", sub: "$" }, { key: "5", sub: "%" },
      { key: "6", sub: "^" }, { key: "7", sub: "&" }, { key: "8", sub: "*" }, { key: "9", sub: "(" }, { key: "0", sub: ")" },
      { key: "-", sub: "_" }, { key: "=", sub: "+" }, { key: "Backspace", class: "backspace" }
    ],
    [
      { key: "Tab", class: "tab" }, { key: "ㅂ", eng: "q", sub: "ㅃ" }, { key: "ㅈ", eng: "w", sub: "ㅉ" }, { key: "ㄷ", eng: "e", sub: "ㄸ" },
      { key: "ㄱ", eng: "r", sub: "ㄲ" }, { key: "ㅅ", eng: "t", sub: "ㅆ" }, { key: "ㅛ", eng: "y" }, { key: "ㅕ", eng: "u" },
      { key: "ㅑ", eng: "i" }, { key: "ㅐ", eng: "o", sub: "ㅒ" }, { key: "ㅔ", eng: "p", sub: "ㅖ" }, { key: "[", sub: "{" },
      { key: "]", sub: "}" }, { key: "\\", sub: "|" }
    ],
    [
      { key: "Caps", class: "caps" }, { key: "ㅁ", eng: "a" }, { key: "ㄴ", eng: "s" }, { key: "ㅇ", eng: "d" },
      { key: "ㄹ", eng: "f" }, { key: "ㅎ", eng: "g" }, { key: "ㅗ", eng: "h" }, { key: "ㅓ", eng: "j" },
      { key: "ㅏ", eng: "k" }, { key: "ㅣ", eng: "l" }, { key: ";", sub: ":" }, { key: "'", sub: "\"" },
      { key: "Enter", class: "enter" }
    ],
    [
      { key: "Shift", class: "left-shift" }, { key: "ㅋ", eng: "z" }, { key: "ㅌ", eng: "x" }, { key: "ㅊ", eng: "c" },
      { key: "ㅍ", eng: "v" }, { key: "ㅠ", eng: "b" }, { key: "ㅜ", eng: "n" }, { key: "ㅡ", eng: "m" },
      { key: ",", sub: "<" }, { key: ".", sub: ">" }, { key: "/", sub: "?" }, { key: "Shift", class: "right-shift" }
    ],
    [
      { key: "Ctrl", class: "modifier" }, { key: "Alt", class: "modifier" }, { key: " ", class: "space" },
      { key: "Alt", class: "modifier" }, { key: "Ctrl", class: "modifier" }
    ]
  ],
  en: [
    [
      { key: "1", sub: "!" }, { key: "2", sub: "@" }, { key: "3", sub: "#" }, { key: "4", sub: "$" }, { key: "5", sub: "%" },
      { key: "6", sub: "^" }, { key: "7", sub: "&" }, { key: "8", sub: "*" }, { key: "9", sub: "(" }, { key: "0", sub: ")" },
      { key: "-", sub: "_" }, { key: "=", sub: "+" }, { key: "Backspace", class: "backspace" }
    ],
    [
      { key: "Tab", class: "tab" }, { key: "q", sub: "Q" }, { key: "w", sub: "W" }, { key: "e", sub: "E" },
      { key: "r", sub: "R" }, { key: "t", sub: "T" }, { key: "y", sub: "Y" }, { key: "u", sub: "U" },
      { key: "i", sub: "I" }, { key: "o", sub: "O" }, { key: "p", sub: "P" }, { key: "[", sub: "{" },
      { key: "]", sub: "}" }, { key: "\\", sub: "|" }
    ],
    [
      { key: "Caps", class: "caps" }, { key: "a", sub: "A" }, { key: "s", sub: "S" }, { key: "d", sub: "D" },
      { key: "f", sub: "F" }, { key: "g", sub: "G" }, { key: "h", sub: "H" }, { key: "j", sub: "J" },
      { key: "k", sub: "K" }, { key: "l", sub: "L" }, { key: ";", sub: ":" }, { key: "'", sub: "\"" },
      { key: "Enter", class: "enter" }
    ],
    [
      { key: "Shift", class: "left-shift" }, { key: "z", sub: "Z" }, { key: "x", sub: "X" }, { key: "c", sub: "C" },
      { key: "v", sub: "V" }, { key: "b", sub: "B" }, { key: "n", sub: "N" }, { key: "m", sub: "M" },
      { key: ",", sub: "<" }, { key: ".", sub: ">" }, { key: "/", sub: "?" }, { key: "Shift", class: "right-shift" }
    ],
    [
      { key: "Ctrl", class: "modifier" }, { key: "Alt", class: "modifier" }, { key: " ", class: "space" },
      { key: "Alt", class: "modifier" }, { key: "Ctrl", class: "modifier" }
    ]
  ]
};

// Web Audio Synthesis for mechanical keyboard sounds
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playKeySound(type) {
  if (type === 'mute' || !audioCtx) return;
  
  initAudio();
  
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  
  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;
  
  if (type === 'clicky') {
    // High-pitched click (Blue Switch)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
    
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(800, now);
    
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    
    osc.start(now);
    osc.stop(now + 0.06);
    
    // Add bottom-out low frequency thud
    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(120, now);
    subOsc.connect(subGain);
    subGain.connect(audioCtx.destination);
    subGain.gain.setValueAtTime(0.12, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    subOsc.start(now);
    subOsc.stop(now + 0.08);
    
  } else if (type === 'tactile') {
    // Warm tactile bump click (Brown Switch)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, now);
    
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    
    osc.start(now);
    osc.stop(now + 0.07);
    
  } else if (type === 'linear') {
    // Muted low-frequency clack (Red Switch)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);
    
    gainNode.gain.setValueAtTime(0.25, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    
    osc.start(now);
    osc.stop(now + 0.09);
  }
}

// App State Manager
class TypingApp {
  constructor() {
    this.currentLang = 'ko';
    this.currentMode = 'key'; // key, word, sentence, custom
    this.subModeIndex = 0;
    
    // Typing Practice state variables
    this.targetText = "";
    this.targetSentences = []; // List of text strings to type
    this.currentSentenceIndex = 0;
    this.targetCharCount = 0;
    this.correctCharCount = 0;
    this.wrongCharCount = 0;
    this.totalStrokes = 0;
    this.wrongStrokes = 0;
    
    this.startTime = null;
    this.timerInterval = null;
    this.isStarted = false;
    this.wrongKeysMap = {}; // Tracks wrong key hits
    
    this.soundType = 'tactile';
    this.showFingerGuide = false;
    
    // UI Elements cache
    this.elements = {
      langKo: document.querySelector('[data-lang="ko"]'),
      langEn: document.querySelector('[data-lang="en"]'),
      soundSelect: document.getElementById('soundSelect'),
      fingerGuideToggleBtn: document.getElementById('fingerGuideToggleBtn'),
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      modeTabs: document.querySelectorAll('.tab-btn'),
      subNavContainer: document.getElementById('subNavContainer'),
      progressBar: document.getElementById('progressBar'),
      progressVal: document.getElementById('progressVal'),
      currentSpeed: document.getElementById('currentSpeed'),
      speedLabel: document.getElementById('speedLabel'),
      accuracy: document.getElementById('accuracy'),
      textContainer: document.getElementById('textContainer'),
      inputDisplay: document.getElementById('inputDisplay'),
      hiddenInput: document.getElementById('hiddenInput'),
      focusOverlay: document.getElementById('focusOverlay'),
      typingDisplayBox: document.getElementById('typingDisplayBox'),
      customConfigArea: document.getElementById('customConfigArea'),
      customTextArea: document.getElementById('customTextArea'),
      startCustomBtn: document.getElementById('startCustomBtn'),
      keyboardContainer: document.getElementById('keyboardContainer'),
      fingerLegend: document.getElementById('fingerLegend'),
      resultModal: document.getElementById('resultModal'),
      resultSpeed: document.getElementById('resultSpeed'),
      resultAccuracy: document.getElementById('resultAccuracy'),
      resultTime: document.getElementById('resultTime'),
      errorKeysContainer: document.getElementById('errorKeysContainer'),
      modalRetryBtn: document.getElementById('modalRetryBtn'),
      modalNextBtn: document.getElementById('modalNextBtn'),
      closeResultBtn: document.getElementById('closeResultBtn')
    };

    this.init();
  }

  init() {
    this.initTheme();
    this.initEventListeners();
    this.renderKeyboard();
    this.loadPracticeMaterials();
    this.resetPractice();
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  initEventListeners() {
    // Theme toggle
    this.elements.themeToggleBtn.addEventListener('click', () => this.toggleTheme());

    // Finger Guide toggle
    this.elements.fingerGuideToggleBtn.addEventListener('click', () => {
      this.showFingerGuide = !this.showFingerGuide;
      this.elements.fingerGuideToggleBtn.classList.toggle('active', this.showFingerGuide);
      this.elements.keyboardContainer.classList.toggle('finger-guide-active', this.showFingerGuide);
      this.elements.fingerLegend.style.display = this.showFingerGuide ? 'flex' : 'none';
      this.updateFingerGuideClasses();
      playKeySound(this.soundType);
    });

    // Language toggle
    const handleLangChange = (lang) => {
      this.currentLang = lang;
      this.elements.langKo.classList.toggle('active', lang === 'ko');
      this.elements.langEn.classList.toggle('active', lang === 'en');
      this.renderKeyboard();
      this.loadPracticeMaterials();
      this.resetPractice();
    };
    
    this.elements.langKo.addEventListener('click', () => handleLangChange('ko'));
    this.elements.langEn.addEventListener('click', () => handleLangChange('en'));

    // Sound toggle
    this.elements.soundSelect.addEventListener('change', (e) => {
      this.soundType = e.target.value;
      initAudio();
    });

    // Mode tab buttons
    this.elements.modeTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        this.elements.modeTabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        this.currentMode = btn.dataset.mode;
        
        if (this.currentMode === 'custom') {
          this.elements.customConfigArea.style.display = 'flex';
          this.elements.typingDisplayBox.style.display = 'none';
          this.elements.subNavContainer.style.display = 'none';
        } else {
          this.elements.customConfigArea.style.display = 'none';
          this.elements.typingDisplayBox.style.display = 'flex';
          this.elements.subNavContainer.style.display = 'flex';
        }
        
        this.subModeIndex = 0;
        this.loadPracticeMaterials();
        this.resetPractice();
      });
    });

    // Custom practice start
    this.elements.startCustomBtn.addEventListener('click', () => {
      const text = this.elements.customTextArea.value.trim();
      if (text.length > 0) {
        this.elements.customConfigArea.style.display = 'none';
        this.elements.typingDisplayBox.style.display = 'flex';
        
        // Split text by lines
        this.targetSentences = text.split('\n').map(s => s.trim()).filter(s => s.length > 0);
        this.currentSentenceIndex = 0;
        this.resetPractice();
      } else {
        alert("연습할 텍스트를 입력해 주세요.");
      }
    });

    // Input events
    this.elements.typingDisplayBox.addEventListener('click', () => {
      this.elements.hiddenInput.focus();
      initAudio();
    });

    this.elements.hiddenInput.addEventListener('focus', () => {
      this.elements.typingDisplayBox.classList.remove('needs-focus');
    });

    this.elements.hiddenInput.addEventListener('blur', () => {
      this.elements.typingDisplayBox.classList.add('needs-focus');
    });

    this.elements.hiddenInput.addEventListener('input', (e) => this.handleInput(e));
    this.elements.hiddenInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
    this.elements.hiddenInput.addEventListener('keyup', (e) => this.handleKeyUp(e));

    // Modal controls
    this.elements.closeResultBtn.addEventListener('click', () => {
      this.elements.resultModal.classList.remove('open');
    });

    this.elements.modalRetryBtn.addEventListener('click', () => {
      this.elements.resultModal.classList.remove('open');
      this.resetPractice();
    });

    this.elements.modalNextBtn.addEventListener('click', () => {
      this.elements.resultModal.classList.remove('open');
      this.advancePracticeLevel();
    });

    // Handle ESC and Tab globally
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.elements.resultModal.classList.remove('open');
        this.resetPractice();
      } else if (e.key === 'Tab' && this.elements.resultModal.classList.contains('open')) {
        e.preventDefault();
        this.elements.resultModal.classList.remove('open');
        this.advancePracticeLevel();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.advancePracticeLevel();
      }
    });
  }

  loadPracticeMaterials() {
    this.elements.subNavContainer.innerHTML = "";
    if (this.currentMode === 'custom') return;

    const list = PRESETS[this.currentLang][this.currentMode];
    list.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.className = `sub-tab-btn ${index === this.subModeIndex ? 'active' : ''}`;
      btn.textContent = item.name;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.subModeIndex = index;
        this.resetPractice();
      });
      this.elements.subNavContainer.appendChild(btn);
    });
  }

  renderKeyboard() {
    this.elements.keyboardContainer.innerHTML = "";
    const layout = KEYBOARD_LAYOUT[this.currentLang];
    
    layout.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'keyboard-row';
      
      row.forEach(keyInfo => {
        const keyDiv = document.createElement('div');
        // Map key ID for highlighting
        let keyId = keyInfo.key.toLowerCase();
        if (keyInfo.eng) keyId = keyInfo.eng.toLowerCase();
        if (keyInfo.key === ' ') keyId = 'space';
        
        // Add finger guide category class
        const getFingerClass = (kInfo, kId) => {
          if (kInfo.class === 'left-shift') return 'finger-l-pinky';
          if (kInfo.class === 'right-shift') return 'finger-r-pinky';
          if (kInfo.class === 'backspace') return 'finger-r-pinky';
          if (kInfo.class === 'tab') return 'finger-l-pinky';
          if (kInfo.class === 'caps') return 'finger-l-pinky';
          if (kInfo.class === 'enter') return 'finger-r-pinky';
          if (kInfo.class === 'space') return 'finger-thumb';
          if (kInfo.class === 'modifier') {
            return kId === 'ctrl' ? 'finger-l-pinky' : 'finger-r-pinky';
          }
          const finger = FINGER_MAP[kId] || FINGER_MAP[kInfo.key];
          return finger ? `finger-${finger}` : '';
        };
        
        const fingerClass = getFingerClass(keyInfo, keyId);
        let keyClass = 'key';
        if (keyInfo.class) keyClass += ` ${keyInfo.class}`;
        if (fingerClass) keyClass += ` ${fingerClass}`;
        
        keyDiv.className = keyClass;
        keyDiv.dataset.key = keyId;
        
        if (keyInfo.sub) {
          const subSpan = document.createElement('span');
          subSpan.className = 'sub-char';
          subSpan.textContent = keyInfo.sub;
          keyDiv.appendChild(subSpan);
        }
        
        const mainSpan = document.createElement('span');
        mainSpan.textContent = keyInfo.key;
        keyDiv.appendChild(mainSpan);
        
        rowDiv.appendChild(keyDiv);
      });
      
      this.elements.keyboardContainer.appendChild(rowDiv);
    });
  }

  resetPractice() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.isStarted = false;
    this.startTime = null;
    
    this.correctCharCount = 0;
    this.wrongCharCount = 0;
    this.totalStrokes = 0;
    this.wrongStrokes = 0;
    this.wrongKeysMap = {};
    
    this.elements.currentSpeed.innerHTML = `0 <span class="unit">${this.currentLang === 'ko' ? '타' : 'WPM'}</span>`;
    this.elements.speedLabel.textContent = this.currentLang === 'ko' ? '현재 타수' : 'Speed';
    this.elements.accuracy.innerHTML = `100<span class="unit">%</span>`;
    
    this.elements.hiddenInput.value = "";
    
    // Fetch target text based on selected level
    if (this.currentMode !== 'custom') {
      const activePreset = PRESETS[this.currentLang][this.currentMode][this.subModeIndex];
      if (this.currentMode === 'key') {
        // Build random sequences of keys
        const keys = activePreset.data;
        let randomDrills = "";
        for (let i = 0; i < 40; i++) {
          randomDrills += keys[Math.floor(Math.random() * keys.length)];
          if (i > 0 && i % 8 === 7 && i < 39) randomDrills += " ";
        }
        this.targetSentences = [randomDrills];
        this.currentSentenceIndex = 0;
      } else if (this.currentMode === 'word') {
        // Pick random words
        const words = activePreset.data;
        const shuffled = [...words].sort(() => 0.5 - Math.random()).slice(0, 10);
        this.targetSentences = [shuffled.join(" ")];
        this.currentSentenceIndex = 0;
      } else if (this.currentMode === 'sentence') {
        // Use sentences
        this.targetSentences = [...activePreset.data];
        this.currentSentenceIndex = 0;
      }
    }
    
    this.targetText = this.targetSentences[this.currentSentenceIndex] || "";
    this.targetCharCount = this.targetText.length;
    
    this.renderTargetText();
    this.updateInputDisplay("");
    this.updateProgressBar();
    this.updateHighlights();
    this.updateFingerGuideClasses();
    
    this.elements.hiddenInput.focus();
  }

  advancePracticeLevel() {
    if (this.currentMode === 'custom') {
      this.resetPractice();
      return;
    }
    
    const list = PRESETS[this.currentLang][this.currentMode];
    if (this.subModeIndex < list.length - 1) {
      this.subModeIndex++;
    } else {
      this.subModeIndex = 0; // wrap around
    }
    this.loadPracticeMaterials();
    this.resetPractice();
  }

  renderTargetText() {
    this.elements.textContainer.innerHTML = "";
    for (let i = 0; i < this.targetText.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.textContent = this.targetText[i];
      charSpan.id = `char-${i}`;
      this.elements.textContainer.appendChild(charSpan);
    }
  }

  handleInput(e) {
    const inputVal = this.elements.hiddenInput.value;
    
    if (!this.isStarted && inputVal.length > 0) {
      this.isStarted = true;
      this.startTime = Date.now();
      this.timerInterval = setInterval(() => this.updateStats(), 200);
    }
    
    this.totalStrokes++;
    this.compareInput(inputVal);
    this.updateInputDisplay(inputVal);
    this.updateHighlights();
  }

  compareInput(inputValue) {
    // Real-time matching logic
    const totalLength = this.targetText.length;
    
    for (let i = 0; i < totalLength; i++) {
      const span = document.getElementById(`char-${i}`);
      if (!span) continue;
      
      span.className = "";
      
      if (i < inputValue.length) {
        if (inputValue[i] === this.targetText[i]) {
          span.classList.add('char-correct');
        } else {
          span.classList.add('char-wrong');
          // Track incorrect typing keystroke
          const targetChar = this.targetText[i];
          this.wrongKeysMap[targetChar] = (this.wrongKeysMap[targetChar] || 0) + 1;
        }
      } else if (i === inputValue.length) {
        span.classList.add('char-current');
      }
    }

    // Success condition: completed target text
    if (inputValue.length >= totalLength) {
      this.completeSentence();
    }
  }

  updateInputDisplay(inputValue) {
    const display = this.elements.inputDisplay;
    if (!display) return;
    display.innerHTML = "";
    
    for (let i = 0; i < inputValue.length; i++) {
      const span = document.createElement('span');
      span.textContent = inputValue[i];
      
      if (inputValue[i] === this.targetText[i]) {
        span.className = "typed-char-correct";
      } else {
        span.className = "typed-char-wrong";
      }
      display.appendChild(span);
    }
    
    // Add blinking cursor bar if not completed
    if (inputValue.length < this.targetText.length) {
      const cursor = document.createElement('span');
      cursor.className = "typing-cursor";
      display.appendChild(cursor);
    }
  }

  updateFingerGuideClasses() {
    const container = this.elements.keyboardContainer;
    const legend = this.elements.fingerLegend;
    if (!container || !legend) return;
    
    // Remove existing classes
    container.classList.remove('finger-guide-left-only', 'finger-guide-right-only');
    legend.classList.remove('finger-guide-left-only', 'finger-guide-right-only');
    
    if (this.showFingerGuide && this.currentMode === 'key') {
      const activePreset = PRESETS[this.currentLang][this.currentMode][this.subModeIndex];
      if (activePreset) {
        const name = activePreset.name;
        if (name.includes("왼손") || name.includes("Left Hand")) {
          container.classList.add('finger-guide-left-only');
          legend.classList.add('finger-guide-left-only');
        } else if (name.includes("오른손") || name.includes("Right Hand")) {
          container.classList.add('finger-guide-right-only');
          legend.classList.add('finger-guide-right-only');
        }
      }
    }
  }

  completeSentence() {
    clearInterval(this.timerInterval);
    
    // Check if there are more sentences in sentence practice mode
    if (this.currentMode === 'sentence' || this.currentMode === 'custom') {
      if (this.currentSentenceIndex < this.targetSentences.length - 1) {
        // Keep counting stats from previous lines
        this.correctCharCount += this.targetText.length;
        
        // Go to next sentence
        this.currentSentenceIndex++;
        this.targetText = this.targetSentences[this.currentSentenceIndex];
        this.targetCharCount = this.targetText.length;
        this.elements.hiddenInput.value = "";
        
        this.renderTargetText();
        this.updateInputDisplay("");
        this.updateProgressBar();
        this.updateHighlights();
        
        // Resume timer
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => this.updateStats(), 200);
        return;
      }
    }
    
    // Finish practice entirely - open modal
    this.showResults();
  }

  updateStats() {
    if (!this.startTime) return;
    
    const timeElapsed = (Date.now() - this.startTime) / 1000; // in seconds
    const inputValue = this.elements.hiddenInput.value;
    
    // Total typed so far
    let totalTyped = this.correctCharCount + inputValue.length;
    
    // Calculate speed
    let speed = 0;
    if (timeElapsed > 0.5) {
      if (this.currentLang === 'ko') {
        // Korean CPM: Count Korean characters and approximate total keystrokes (average 2.5 keystrokes per hangul char)
        let strokes = 0;
        const fullComposedText = this.getCompletedInputText() + inputValue;
        for (let char of fullComposedText) {
          strokes += decomposeHangul(char).length;
        }
        speed = Math.round((strokes / timeElapsed) * 60);
      } else {
        // English WPM: (characters / 5) / minutes
        speed = Math.round(((totalTyped / 5) / timeElapsed) * 60);
      }
    }
    
    // Calculate accuracy
    let correctCount = 0;
    const currentInput = inputValue;
    for (let i = 0; i < currentInput.length; i++) {
      if (currentInput[i] === this.targetText[i]) {
        correctCount++;
      }
    }
    const combinedCorrect = this.correctCharCount + correctCount;
    const combinedTotal = this.correctCharCount + currentInput.length;
    
    let accuracy = 100;
    if (combinedTotal > 0) {
      accuracy = Math.round((combinedCorrect / combinedTotal) * 100);
    }
    
    // Update UI
    this.elements.currentSpeed.innerHTML = `${speed} <span class="unit">${this.currentLang === 'ko' ? '타' : 'WPM'}</span>`;
    this.elements.accuracy.innerHTML = `${accuracy}<span class="unit">%</span>`;
    
    this.updateProgressBar();
  }

  getCompletedInputText() {
    let text = "";
    for (let i = 0; i < this.currentSentenceIndex; i++) {
      text += this.targetSentences[i] + " ";
    }
    return text;
  }

  updateProgressBar() {
    let progress = 0;
    if (this.currentMode === 'sentence' || this.currentMode === 'custom') {
      const totalSentences = this.targetSentences.length;
      const progressFromSentences = (this.currentSentenceIndex / totalSentences) * 100;
      
      const currentInputLen = this.elements.hiddenInput.value.length;
      const progressInCurrent = (currentInputLen / this.targetCharCount) * (100 / totalSentences);
      
      progress = Math.round(progressFromSentences + progressInCurrent);
    } else {
      const inputLen = this.elements.hiddenInput.value.length;
      progress = Math.round((inputLen / this.targetCharCount) * 100);
    }
    
    progress = Math.min(100, Math.max(0, progress));
    this.elements.progressBar.style.width = `${progress}%`;
    this.elements.progressVal.textContent = `${progress}%`;
  }

  updateHighlights() {
    // Remove previous highlights
    document.querySelectorAll('.key.highlight-next').forEach(k => {
      k.classList.remove('highlight-next');
    });
    
    const currentIndex = this.elements.hiddenInput.value.length;
    if (currentIndex >= this.targetText.length) return;
    
    const targetChar = this.targetText[currentIndex];
    
    // Determine the exact physical keys to highlight
    if (targetChar === " ") {
      const spaceKey = document.querySelector('[data-key="space"]');
      if (spaceKey) spaceKey.classList.add('highlight-next');
      return;
    }
    
    if (this.currentLang === 'ko') {
      // Find Jamo strokes for the target Hangul character
      const targetJamos = decomposeHangul(targetChar);
      
      // Look at the composition in the current input at the cursor
      // (If user already typed something that is building the syllable, we can highlight the next jamo)
      // Standard input elements don't easily reveal intermediate composition states via simple properties.
      // So we fallback to highlighting the primary key matching the Korean layout:
      let nextJamo = targetJamos[0];
      
      // Let's check the keys that correspond to this Jamo
      let keyToHighlight = krKeyReverseMap[nextJamo];
      if (keyToHighlight) {
        // If it's a double consonant/vowel requiring shift (ㅃ, ㅉ, ㄸ, ㄲ, ㅆ, ㅒ, ㅖ)
        const needsShift = ['ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅒ', 'ㅖ'].includes(nextJamo);
        
        if (needsShift) {
          // Highlight Shift key
          const shiftKey = document.querySelector('.key.right-shift');
          if (shiftKey) shiftKey.classList.add('highlight-next');
          
          // Map to base key (e.g. ㅃ -> ㅂ -> q)
          const baseJamoMap = { 'ㅃ':'ㅂ', 'ㅉ':'ㅈ', 'ㄸ':'ㄷ', 'ㄲ':'ㄱ', 'ㅆ':'ㅅ', 'ㅒ':'ㅐ', 'ㅖ':'ㅔ' };
          const baseKey = krKeyReverseMap[baseJamoMap[nextJamo]];
          const keyEl = document.querySelector(`[data-key="${baseKey}"]`);
          if (keyEl) keyEl.classList.add('highlight-next');
        } else {
          const keyEl = document.querySelector(`[data-key="${keyToHighlight}"]`);
          if (keyEl) keyEl.classList.add('highlight-next');
        }
      }
    } else {
      // English Layout highlighting
      const charToFind = targetChar.toLowerCase();
      
      // Detect if shift is required (uppercase letters or top-row symbol keys)
      const isUppercase = targetChar !== charToFind && /[A-Z]/.test(targetChar);
      const symbolShiftMap = {
        '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
        '_': '-', '+': '=', '{': '[', '}': ']', '|': '\\', ':': ';', '"': '\'', '<': ',', '>': '.', '?': '/'
      };
      
      let keyToHighlight = charToFind;
      let needsShift = isUppercase;
      
      if (symbolShiftMap[targetChar]) {
        keyToHighlight = symbolShiftMap[targetChar];
        needsShift = true;
      }
      
      if (needsShift) {
        const shiftKey = document.querySelector('.key.right-shift');
        if (shiftKey) shiftKey.classList.add('highlight-next');
      }
      
      const keyEl = document.querySelector(`[data-key="${keyToHighlight}"]`);
      if (keyEl) keyEl.classList.add('highlight-next');
    }
  }

  handleKeyDown(e) {
    let keyId = e.key.toLowerCase();
    if (e.key === ' ') keyId = 'space';
    
    // Physical layout translation to map pressed keys on virtual keyboard
    // Especially for Korean layout, we match the QWERTY key pressed.
    const keyEl = document.querySelector(`[data-key="${keyId}"]`) || document.querySelector(`[data-key="${e.code.toLowerCase().replace('key', '')}"]`);
    
    if (keyEl) {
      keyEl.classList.add('pressed');
    }
    
    // Play switch sounds
    if (e.key !== 'Process' && !['Shift', 'Control', 'Alt', 'CapsLock', 'Tab'].includes(e.key)) {
      playKeySound(this.soundType);
    }
  }

  handleKeyUp(e) {
    let keyId = e.key.toLowerCase();
    if (e.key === ' ') keyId = 'space';
    
    const keyEl = document.querySelector(`[data-key="${keyId}"]`) || document.querySelector(`[data-key="${e.code.toLowerCase().replace('key', '')}"]`);
    if (keyEl) {
      keyEl.classList.remove('pressed');
    }
  }

  showResults() {
    const timeElapsed = (Date.now() - this.startTime) / 1000;
    
    let totalTyped = 0;
    this.targetSentences.forEach(s => totalTyped += s.length);
    
    // Calculate final speed
    let finalSpeed = 0;
    if (this.currentLang === 'ko') {
      let strokes = 0;
      this.targetSentences.forEach(sentence => {
        for (let char of sentence) {
          strokes += decomposeHangul(char).length;
        }
      });
      finalSpeed = Math.round((strokes / timeElapsed) * 60);
    } else {
      finalSpeed = Math.round(((totalTyped / 5) / timeElapsed) * 60);
    }
    
    // Calculate final accuracy
    let accuracy = 100;
    const errorCount = Object.values(this.wrongKeysMap).reduce((a, b) => a + b, 0);
    if (totalTyped > 0) {
      accuracy = Math.round(((totalTyped - Math.min(totalTyped, errorCount)) / totalTyped) * 100);
    }
    
    // Setup modal results
    this.elements.resultSpeed.innerHTML = `${finalSpeed} <span class="unit">${this.currentLang === 'ko' ? '타' : 'WPM'}</span>`;
    this.elements.resultAccuracy.innerHTML = `${accuracy}<span class="unit">%</span>`;
    this.elements.resultTime.innerHTML = `${Math.round(timeElapsed)}<span class="unit">초</span>`;
    
    // Populate bad keys
    this.elements.errorKeysContainer.innerHTML = "";
    const sortedBadKeys = Object.entries(this.wrongKeysMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
      
    if (sortedBadKeys.length > 0) {
      sortedBadKeys.forEach(([key, count]) => {
        const pill = document.createElement('div');
        pill.className = 'error-key-pill';
        pill.innerHTML = `<span>'${key}'</span> <span class="count">${count}회</span>`;
        this.elements.errorKeysContainer.appendChild(pill);
      });
    } else {
      this.elements.errorKeysContainer.innerHTML = "<p style='color: var(--text-muted); font-size: 13px;'>오타가 없습니다! 완벽합니다. 👏</p>";
    }
    
    this.elements.resultModal.classList.add('open');
  }
}

// Instantiate App on window load
window.addEventListener('DOMContentLoaded', () => {
  window.typingApp = new TypingApp();
});

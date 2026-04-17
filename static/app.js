// Initialize Feather Icons
feather.replace();

// ==========================================
// STATE & DATA
// ==========================================

const levelsData = [
  { levelNumber: 1, name: "The Basics (0/1)", capacity: 15, items: [
      { id: '1', name: 'Iron Block', weight: 6, value: 30, icon: '🧱' },
      { id: '2', name: 'Silver Pot', weight: 5, value: 25, icon: '🥘' },
      { id: '3', name: 'Laptop', weight: 3, value: 120, icon: '💻' }
  ]},
  { levelNumber: 2, name: "Density Match (0/1)", capacity: 20, items: [
      { id: '1', name: 'Gold Bar', weight: 10, value: 60, icon: '📀' },
      { id: '2', name: 'Strange Potion', weight: 4, value: 20, icon: '🧪' },
      { id: '3', name: 'Silver Weight', weight: 5, value: 15, icon: '⚖️' },
      { id: '4', name: 'Diamond Ring', weight: 1, value: 100, icon: '💍' }
  ]},
  { levelNumber: 3, name: "Heavy Choices (0/1)", capacity: 30, items: [
      { id: '1', name: 'Safe Box', weight: 25, value: 200, icon: '🧰' },
      { id: '2', name: 'Ancient Scroll', weight: 6, value: 45, icon: '📜' },
      { id: '3', name: 'Ruby', weight: 5, value: 35, icon: '♦️' },
      { id: '4', name: 'Silver Bar', weight: 10, value: 50, icon: '📏' }
  ]},
  { levelNumber: 4, name: "The Vault (0/1)", capacity: 40, items: [
      { id: '1', name: 'Crown Jewels', weight: 10, value: 500, icon: '👑' },
      { id: '2', name: 'Golden Scepter', weight: 8, value: 300, icon: '🔱' },
      { id: '3', name: 'Royal Robe', weight: 15, value: 200, icon: '👘' },
      { id: '4', name: 'Antique Map', weight: 5, value: 150, icon: '🗺️' }
  ]},
  { levelNumber: 5, name: "Secret Cache (0/1)", capacity: 25, items: [
      { id: '1', name: 'Jade Statue', weight: 12, value: 400, icon: '🐉' },
      { id: '2', name: 'Opal Stone', weight: 4, value: 180, icon: '💎' },
      { id: '3', name: 'Silver Flute', weight: 3, value: 120, icon: '🪈' },
      { id: '4', name: 'Ebony Box', weight: 7, value: 210, icon: '📦' }
  ]},
  { levelNumber: 6, name: "Gallery Theft (0/1)", capacity: 18, items: [
      { id: '1', name: 'Abstract Painting', weight: 10, value: 80, icon: '🖼️' },
      { id: '2', name: 'Statue Plinth', weight: 6, value: 60, icon: '🗿' },
      { id: '3', name: 'Security Camera', weight: 5, value: 20, icon: '📹' }
  ]},
  { levelNumber: 7, name: "High Stakes (0/1)", capacity: 35, items: [
      { id: '1', name: 'Giant Ruby', weight: 20, value: 150, icon: '🏮' },
      { id: '2', name: 'Golden Idol', weight: 15, value: 120, icon: '🛕' },
      { id: '3', name: 'Jeweled Poniard', weight: 5, value: 30, icon: '🗡️' },
      { id: '4', name: 'Crystal Skull', weight: 10, value: 90, icon: '💀' }
  ]},
  { levelNumber: 8, name: "Time Crunch (0/1)", capacity: 30, timeLimit: 60, items: [
      { id: '1', name: 'Server Blade', weight: 8, value: 90, icon: '📟' },
      { id: '2', name: 'Power Cell', weight: 12, value: 100, icon: '🔋' },
      { id: '3', name: 'Memory Module', weight: 10, value: 85, icon: '💾' },
      { id: '4', name: 'Cooling Tank', weight: 15, value: 75, icon: '❄️' }
  ]},
  { levelNumber: 9, name: "Rush Job (0/1)", capacity: 45, timeLimit: 30, items: [
      { id: '1', name: 'Prototype Chip', weight: 15, value: 200, icon: '💾' },
      { id: '2', name: 'Logic Board', weight: 20, value: 250, icon: '📠' },
      { id: '3', name: 'Hard Drive', weight: 10, value: 120, icon: '💽' },
      { id: '4', name: 'Encrypted Key', weight: 5, value: 160, icon: '🔑' }
  ]},
  { levelNumber: 10, name: "Master Thief (0/1)", capacity: 60, timeLimit: 45, items: [
      { id: '1', name: 'Mona Lisa', weight: 25, value: 300, icon: '🎨' },
      { id: '2', name: 'Golden Throne', weight: 30, value: 360, icon: '🪑' },
      { id: '3', name: 'Ancient Sword', weight: 12, value: 150, icon: '🗡️' },
      { id: '4', name: 'Imperial Seal', weight: 18, value: 270, icon: '🧧' },
      { id: '5', name: 'Emerald Mask', weight: 8, value: 80, icon: '🎭' }
  ]}
];


let gameState = {
  activeView: 'view-main',
  completedLevels: [],
  customRows: [],
  sessionCapacity: 0,
  sessionItems: [], 
  bagItems: {}, // { "id": fraction_float }
  sessionTitle: '',
  sessionTimeLimit: null,
  optimalData: null,
  timerInterval: null,
  currentTime: 0
};



// UI Elements
const views = {
  main: document.getElementById('view-main'),
  level: document.getElementById('view-level'),
  setup: document.getElementById('view-setup'),
  result: document.getElementById('view-result')
};

const overlayAbout = document.getElementById('overlay-about');
const overlayFailed = document.getElementById('overlay-failed');
const overlaySuccess = document.getElementById('overlay-success');


const levelsGrid = document.getElementById('levels-grid');
const rowsContainer = document.getElementById('rows-container');
const availableContainer = document.getElementById('available-items');
const bagContainer = document.getElementById('bag-items');

// ==========================================
// ROUTING
// ==========================================

function switchView(viewId) {
  Object.values(views).forEach(v => v.classList.add('hidden'));
  views[viewId.replace('view-', '')].classList.remove('hidden');
  gameState.activeView = viewId;
  feather.replace();
}

function hideAllOverlays() {
  overlayAbout.classList.add('hidden');
  overlayFailed.classList.add('hidden');
  overlaySuccess.classList.add('hidden');
  document.getElementById('overlay-timeout').classList.add('hidden');
}



document.querySelectorAll('.btn-to-menu').forEach(btn => {
  btn.addEventListener('click', () => {
    hideAllOverlays();
    stopTimer();
    if (gameState.sessionTitle && !gameState.sessionTitle.startsWith("Level")) {
        switchView('view-setup');
    } else {
        renderLevelsMenu();
        switchView('view-main');
    }
  });
});


// ==========================================
// MAIN MENU
// ==========================================

document.getElementById('btn-show-about').addEventListener('click', () => overlayAbout.classList.remove('hidden'));
document.getElementById('btn-close-about').addEventListener('click', () => overlayAbout.classList.add('hidden'));
document.getElementById('btn-about-gotit').addEventListener('click', () => overlayAbout.classList.add('hidden'));

document.getElementById('btn-open-custom').addEventListener('click', () => {
  gameState.customRows = [];
  renderSetupRows();
  switchView('view-setup');
});

function renderLevelsMenu() {
  levelsGrid.innerHTML = '';
  levelsData.forEach((lvl) => {
    const isCompleted = gameState.completedLevels.includes(lvl.levelNumber);
    const btn = document.createElement('button');
    btn.style.padding = '16px 8px';
    btn.style.background = isCompleted ? 'linear-gradient(135deg, #065f46, #064e3b)' : 'rgba(255,255,255,0.04)';
    btn.style.border = isCompleted ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.12)';
    btn.style.borderRadius = '12px';
    btn.style.color = isCompleted ? '#ecfdf5' : 'var(--text-main)';
    btn.style.display = 'flex';
    btn.style.flexDirection = 'column';
    btn.style.alignItems = 'center';
    btn.style.gap = '4px';
    btn.style.cursor = 'pointer';

    btn.innerHTML = `
      <span style="font-size: 1.3rem; font-weight: 800;">${lvl.levelNumber}</span>
      <span style="font-size: 0.65rem; color: ${isCompleted ? '#a7f3d0' : 'var(--text-muted)'}; text-align: center; max-width: 100px;">
        ${isCompleted ? '✓ Completed' : lvl.name}
      </span>
      ${lvl.timeLimit ? `<span style="font-size: 0.55rem; color: #f87171;">⏱️ ${lvl.timeLimit}s</span>` : ''}
    `;

    btn.addEventListener('click', () => {
      startSession(`Level ${lvl.levelNumber}: ${lvl.name}`, lvl.capacity, JSON.parse(JSON.stringify(lvl.items)), lvl.timeLimit);
    });

    levelsGrid.appendChild(btn);
  });
}

// ==========================================
// TIMER SYSTEM
// ==========================================

function startTimer(seconds) {
  stopTimer();
  gameState.currentTime = seconds;
  const timerEl = document.getElementById('timer-display');
  timerEl.style.display = 'block';
  timerEl.innerText = `00:${seconds.toString().padStart(2, '0')}`;
  
  gameState.timerInterval = setInterval(() => {
    gameState.currentTime--;
    timerEl.innerText = `00:${gameState.currentTime.toString().padStart(2, '0')}`;
    
    if (gameState.currentTime <= 0) {
      stopTimer();
      document.getElementById('overlay-timeout').classList.remove('hidden');
    }
  }, 1000);
}


function stopTimer() {
  if (gameState.timerInterval) clearInterval(gameState.timerInterval);
  document.getElementById('timer-display').style.display = 'none';
}

// ==========================================
// PLAYGROUND SESSION (Game / Own Solver)
// ==========================================

function startSession(title, capacity, items, timeLimit = null) {
  gameState.sessionTitle = title;
  gameState.sessionCapacity = capacity;
  gameState.sessionItems = items;
  gameState.sessionTimeLimit = timeLimit;
  gameState.optimalData = null;
  gameState.bagItems = {};


  
  document.getElementById('level-title').innerText = title;
  document.getElementById('max-weight').innerText = capacity;
  
  if (timeLimit) {
      startTimer(timeLimit);
  } else {
      stopTimer();
  }
  
  const backBtn = document.getElementById('btn-level-back');
  const levelHomeBtn = document.getElementById('btn-level-home');
  const overlayMenuBtns = document.querySelectorAll('.btn-to-menu');
  
  if (title.startsWith("Level")) {
      backBtn.innerHTML = `<i data-feather="home" style="width:14px;height:14px;"></i> Menu`;
      levelHomeBtn.classList.add('hidden');
      overlayMenuBtns.forEach(btn => btn.innerHTML = `<i data-feather="home" style="width:16px;height:16px;"></i> Menu`);
  } else {
      backBtn.innerHTML = `<i data-feather="rotate-ccw" style="width:14px;height:14px;"></i> New Problem`;
      levelHomeBtn.classList.remove('hidden');
      overlayMenuBtns.forEach(btn => btn.innerHTML = `<i data-feather="rotate-ccw" style="width:16px;height:16px;"></i> New Problem`);
  }



  renderPlayground();
  switchView('view-level');
}


function renderPlayground() {
  availableContainer.innerHTML = '';
  bagContainer.innerHTML = '';

  let currentWeight = 0;
  let currentScore = 0;

  // Calculate Bag
  Object.keys(gameState.bagItems).forEach(id => {
      const item = gameState.sessionItems.find(i => i.id === id);
      const frac = gameState.bagItems[id];
      currentWeight += (item.weight * frac);
      currentScore += (item.value * frac);
  });

  // Render Available Items
  gameState.sessionItems.forEach(item => {
    const fractionInBag = gameState.bagItems[item.id] || 0;
    const fullyInBag = fractionInBag === 1.0;
    const isFixed = item.type !== 'fractional';
    
    // Can still slice if not fully in bag
    const disableButton = (isFixed && fractionInBag > 0) || fullyInBag;

    const div = document.createElement('div');
    div.className = "glass-panel";
    div.style.padding = "16px";
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.filter = fullyInBag ? 'grayscale(1) opacity(0.5)' : 'none';

    div.innerHTML = `
      <div style="display:flex; gap:12px; align-items:center;">
        <span style="font-size: 1.5rem;">${item.icon || '📦'}</span>
        <div>
          <div style="font-weight: 800; display:flex; gap:8px;">
            ${item.name}
          </div>
          <div style="font-size: 0.85rem; opacity: 0.7;">${item.weight}kg | $${item.value}</div>
        </div>
      </div>
      <button ${disableButton ? 'disabled' : ''} class="btn-add-bag btn-secondary" data-id="${item.id}" style="padding: 6px 12px; font-size: 0.85rem;">
        Add
      </button>
    `;
    availableContainer.appendChild(div);
  });

  // Render Bag Items
  if (Object.keys(gameState.bagItems).length === 0) {
    bagContainer.innerHTML = `<div style="opacity: 0.5; text-align: center; padding: 40px;">Your bag is empty</div>`;
  } else {
    Object.keys(gameState.bagItems).forEach(id => {
      const item = gameState.sessionItems.find(i => i.id === id);
      const w = item.weight;
      const v = item.value;

      const div = document.createElement('div');
      div.className = "glass-panel";
      div.style.padding = "12px";
      div.style.display = "flex";
      div.style.justifyContent = "space-between";
      div.style.alignItems = "center";
      div.style.borderLeft = `4px solid #38bdf8`;

      div.innerHTML = `
        <div>
          <div style="font-size: 0.9rem; font-weight: 800;">${item.name}</div>
          <div style="font-size: 0.8rem; opacity: 0.7;">${w}kg | $${v}</div>
        </div>
        <button class="btn-remove-bag" data-id="${item.id}" style="background: transparent; color: var(--danger); padding:4px;">
          <i data-feather="trash-2" style="width:16px;height:16px;"></i>
        </button>
      `;
      bagContainer.appendChild(div);
    });
  }

  // Update HUD
  document.getElementById('current-weight').innerText = currentWeight;
  document.getElementById('current-score').innerText = currentScore;

  const currentWeightEl = document.getElementById('current-weight').parentElement;
  const weightWarningEl = document.getElementById('weight-warning');

  if (currentWeight > gameState.sessionCapacity) {
    currentWeightEl.style.color = "var(--danger)";
    currentWeightEl.style.fontWeight = "900";
    weightWarningEl.classList.remove('hidden');
  } else {
    currentWeightEl.style.color = "";
    currentWeightEl.style.fontWeight = "";
    weightWarningEl.classList.add('hidden');
  }


  // Events
  document.querySelectorAll('.btn-add-bag').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      gameState.bagItems[id] = 1.0;
      renderPlayground();
    });
  });

  document.querySelectorAll('.btn-remove-bag').forEach(btn => {

    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      delete gameState.bagItems[id];
      renderPlayground();
    });
  });

  feather.replace();
}

// ==========================================
// HINT SYSTEM
// ==========================================

async function fetchOptimal() {
    if (gameState.optimalData) return gameState.optimalData;
    try {
        const response = await fetch('/api/solve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ capacity: gameState.sessionCapacity, items: gameState.sessionItems })
        });
        gameState.optimalData = await response.json();
        return gameState.optimalData;
    } catch (err) {
        console.error("Failed to fetch optimal solution for hint.");
        return null;
    }
}

async function provideHint() {
    const hintText = document.getElementById('hint-text');
    const hintPanel = document.getElementById('hint-panel');
    const btnHint = document.getElementById('btn-hint');
    
    btnHint.disabled = true;
    hintText.innerText = "Thinking...";
    hintPanel.classList.remove('hidden');

    const optimal = await fetchOptimal();
    if (!optimal) {
        hintText.innerText = "I can't think of a hint right now. Maybe try checking your capacity?";
        btnHint.disabled = false;
        return;
    }

    const optimalIds = optimal.items.map(i => i.id);
    const bagIds = Object.keys(gameState.bagItems);

    // 1. Suggest removal if user has non-optimal items
    const nonOptimalId = bagIds.find(id => !optimalIds.includes(id));
    if (nonOptimalId) {
        const item = gameState.sessionItems.find(i => i.id === nonOptimalId);
        hintText.innerText = `💡 Tip: The ${item.name} might not be the best choice. Try removing it!`;
    } 
    // 2. Suggest addition if user is missing optimal items
    else {
        const missingId = optimalIds.find(id => !bagIds.includes(id));
        if (missingId) {
            const item = gameState.sessionItems.find(i => i.id === missingId);
            hintText.innerText = `💡 Tip: You should try adding the ${item.name} to your bag!`;
        } else {
            hintText.innerText = "💡 Tip: You've found the perfect combination! Time to Submit!";
        }
    }

    btnHint.disabled = false;
}

document.getElementById('btn-hint').addEventListener('click', provideHint);
document.getElementById('btn-close-hint').addEventListener('click', () => {
    document.getElementById('hint-panel').classList.add('hidden');
});




document.getElementById('btn-level-back').addEventListener('click', () => {
  stopTimer();
  if (gameState.sessionTitle.startsWith("Level")) {
      renderLevelsMenu();
      switchView('view-main');
  } else {
      switchView('view-setup');
  }
});


// SUBMIT LOGIC
async function submitCurrentBag() {
    stopTimer();
    let totalWeight = 0;
    let totalScore = 0;
    Object.keys(gameState.bagItems).forEach(id => {
      const item = gameState.sessionItems.find(i => i.id === id);
      totalWeight += item.weight;
      totalScore += item.value;
    });


    if (totalWeight > gameState.sessionCapacity + 0.001) {
        document.getElementById('fail-your-score').innerText = "$" + totalScore.toFixed(2);
        document.getElementById('fail-target-score').innerText = "Exceeded Capacity!";
        overlayFailed.classList.remove('hidden');
        return;
    }

    const btn = document.getElementById('btn-submit-solution');
    btn.innerHTML = `Validating...`;

    try {
        const response = await fetch('/api/solve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ capacity: gameState.sessionCapacity, items: gameState.sessionItems })
        });
        const optimalData = await response.json();
        gameState.optimalData = optimalData;
        
        // Small epsilon for floating point comparison fixes
        const optVal = parseFloat(optimalData.maxValue);
        if (totalScore >= optVal - 0.01) {
            document.getElementById('success-score').innerText = "$" + totalScore.toFixed(2);
            overlaySuccess.classList.remove('hidden');

            const match = gameState.sessionTitle.match(/Level (\d+):/);
            if (match) {
                const lvlNum = parseInt(match[1]);
                if (!gameState.completedLevels.includes(lvlNum)) gameState.completedLevels.push(lvlNum);
            }
        } else {
            document.getElementById('fail-your-score').innerText = "$" + totalScore.toFixed(2);
            document.getElementById('fail-target-score').innerText = "$" + optimalData.maxValue;
            overlayFailed.classList.remove('hidden');
        }


    } catch (err) {
        alert("Failed to validate with backend.");
    } finally {
        btn.innerHTML = `<i data-feather="check-circle" style="width:20px;height:20px;"></i> Submit`;
        feather.replace();
    }
}

document.getElementById('btn-submit-solution').addEventListener('click', submitCurrentBag);

document.getElementById('btn-retry').addEventListener('click', () => {
    gameState.bagItems = {};
    hideAllOverlays();
    if(gameState.sessionTimeLimit) startTimer(gameState.sessionTimeLimit);
    renderPlayground();
});

document.getElementById('btn-timeout-retry').addEventListener('click', () => {
    gameState.bagItems = {};
    hideAllOverlays();
    if(gameState.sessionTimeLimit) startTimer(gameState.sessionTimeLimit);
    renderPlayground();
});



// ==========================================
// CUSTOM SETUP BUILDER (Auto Solver / Own Solver)
// ==========================================

function createRowObject(index) {
  return { id: `custom-${index}`, name: `Product ${index + 1}`, type: 'fixed', weight: null, value: null };
}

function isSetupValid() {
    const capacity = parseInt(document.getElementById('input-capacity').value);
    if (isNaN(capacity) || capacity <= 0) {
        alert("Valid Knapsack Capacity required!");
        return false;
    }
    if (gameState.customRows.length === 0) {
        alert("Please generate or add at least one product!");
        return false;
    }
    for (const row of gameState.customRows) {
        if (row.weight === null || row.weight === "" || row.weight === 0) {
             alert(`Product "${row.name}" must have a valid weight!`);
             return false;
        }
        if (row.value === null || row.value === "" || row.value === 0) {
             alert(`Product "${row.name}" must have a valid cost/profit!`);
             return false;
        }
    }
    return true;
}


function renderSetupRows() {
  rowsContainer.innerHTML = '';
  if (gameState.customRows.length === 0) {
    rowsContainer.innerHTML = `<div style="padding: 40px; text-align: center; border: 2px dashed rgba(255,255,255,0.1); border-radius: 12px; color: var(--text-muted);">Enter products above to begin.</div>`;
    return;
  }

  gameState.customRows.forEach((row, i) => {
    const rowDiv = document.createElement('div');
    rowDiv.style.display = 'flex';
    rowDiv.style.gap = '10px';
    rowDiv.style.alignItems = 'center';

    rowDiv.innerHTML = `
      <input type="text" placeholder="Name" value="${row.name}" data-idx="${i}" data-field="name" style="flex: 2;" />
      <input type="number" placeholder="Weight" value="${(row.weight === null || row.weight === 0) ? '' : row.weight}" min="1" data-idx="${i}" data-field="weight" style="flex: 1;" />
      <input type="number" placeholder="Cost" value="${(row.value === null || row.value === 0) ? '' : row.value}" min="0" data-idx="${i}" data-field="value" style="flex: 1;" />
      <button class="btn-remove" data-idx="${i}" style="background: transparent; color: var(--danger); padding: 4px;">
        <i data-feather="trash-2" style="width:18px;height:18px;"></i>
      </button>
    `;


    rowsContainer.appendChild(rowDiv);
  });
  
  feather.replace();

  rowsContainer.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.getAttribute('data-idx');
      const field = e.target.getAttribute('data-field');
      let val = e.target.value;
      if (field === 'weight' || field === 'value') {
        val = val === '' ? null : Number(val);
      }
      gameState.customRows[idx][field] = val;

    });
  });

  rowsContainer.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.getAttribute('data-idx');
      gameState.customRows.splice(idx, 1);
      renderSetupRows();
    });
  });
}

document.getElementById('btn-generate').addEventListener('click', () => {
  const count = parseInt(document.getElementById('input-count').value);
  if (isNaN(count) || count <= 0) return;
  gameState.customRows = [];
  for (let i = 0; i < count; i++) {
    gameState.customRows.push(createRowObject(i));
  }
  renderSetupRows();
});

document.getElementById('btn-add-row').addEventListener('click', () => {
  gameState.customRows.push(createRowObject(gameState.customRows.length));
  renderSetupRows();
});

document.getElementById('btn-own-solve').addEventListener('click', () => {
    if (!isSetupValid()) return;
    
    const capacity = parseInt(document.getElementById('input-capacity').value);
    const timerVal = parseInt(document.getElementById('input-timer').value);
    const limit = isNaN(timerVal) ? null : timerVal;
    
    startSession("Custom Problem", capacity, JSON.parse(JSON.stringify(gameState.customRows)), limit);
});

document.getElementById('btn-auto-solve').addEventListener('click', async () => {
  if (!isSetupValid()) return;
  const capacity = parseInt(document.getElementById('input-capacity').value);


  const btn = document.getElementById('btn-auto-solve');
  btn.innerHTML = `<div style="font-weight: 800;">Solving...</div>`;

  try {

    const response = await fetch('/api/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ capacity, items: gameState.customRows })
    });

    document.getElementById('result-title').innerText = "Auto-Solver Results";
    document.getElementById('user-result-panel').classList.add('hidden');
    document.getElementById('optimal-result-header').innerText = "Optimal Found";

    const data = await response.json();
    switchView('view-result');


    document.getElementById('result-max-value').innerText = `$${data.maxValue}`;
    
    // Calculate total weight
    const totalWeight = data.items.reduce((acc, item) => acc + item.weight, 0);
    document.getElementById('result-stats').innerText = `Capacity: ${capacity}kg | Selected Weight: ${totalWeight}kg`;


    renderOptimalResultsList(data);

  } catch (err) {
    alert("An error occurred while solving.");
    console.error(err);
  } finally {
    btn.innerHTML = `
        <i data-feather="cpu" style="width:24px;height:24px;color:var(--primary);"></i>
        <div style="font-weight: 800;">Auto Solver</div>
        <div style="font-size: 0.75rem; opacity: 0.7;">Instant mathematical optimal solution</div>
    `;
    feather.replace();
  }

});


async function openComparison() {
    hideAllOverlays();
    stopTimer();
    
    // Set view to result
    switchView('view-result');
    document.getElementById('result-title').innerText = "Strategy Comparison";
    document.getElementById('optimal-result-header').innerText = "Mathematical Optimal";
    document.getElementById('user-result-panel').classList.remove('hidden');

    const optimal = await fetchOptimal();
    if (!optimal) {
        alert("Could not load optimal solution.");
        return;
    }

    // Calc user stats
    let userScore = 0;
    Object.keys(gameState.bagItems).forEach(id => {
        const item = gameState.sessionItems.find(i => i.id == id);
        if (item) {
            userScore += item.value;
        }
    });


    document.getElementById('user-max-value').innerText = `$${userScore}`;
    const efficiency = optimal.maxValue > 0 ? Math.round((userScore / optimal.maxValue) * 100) : 100;
    document.getElementById('user-score-efficiency').innerText = `Efficiency: ${efficiency}%`;

    // Global result stats
    document.getElementById('result-max-value').innerText = `$${optimal.maxValue}`;
    const optWeight = optimal.items.reduce((a,b)=>a+b.weight, 0);
    document.getElementById('result-stats').innerText = `Capacity: ${gameState.sessionCapacity}kg | Optimal Weight: ${optWeight}kg`;

    renderOptimalResultsList(optimal);
}

function renderOptimalResultsList(data) {
    const optimalItemsContainer = document.getElementById('optimal-items-container');
    const unselectedContainer = document.getElementById('unselected-container');
    
    optimalItemsContainer.innerHTML = '';
    unselectedContainer.innerHTML = '';

    const includedIds = data.items.map(i => i.id.toString());
    const userBagIds = Object.keys(gameState.bagItems);


    // Show Items Packed (Optimal)
    if (data.items.length === 0) {
        optimalItemsContainer.innerHTML = `<div style="text-align: center; opacity: 0.5; padding: 20px;">No items could fit!</div>`;
    }

    data.items.forEach(item => {
        const div = document.createElement('div');
        div.className = "item-card";
        
        const isPickedByUser = userBagIds.includes(item.id.toString());

        // Is comparison mode active? (Check if user result panel is visible)
        const isComparison = !document.getElementById('user-result-panel').classList.contains('hidden');
        
        const borderColor = isComparison ? (isPickedByUser ? 'var(--success)' : 'var(--warning)') : 'var(--primary)';
        div.style.borderLeft = `4px solid ${borderColor}`;

        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                ${isComparison && isPickedByUser ? '<i data-feather="check-circle" style="width:16px;height:16px;color:var(--success);"></i>' : ''}
                ${isComparison && !isPickedByUser ? '<i data-feather="alert-circle" style="width:16px;height:16px;color:var(--warning);"></i>' : ''}
                <div>
                    <div style="font-size: 0.95rem; font-weight: 800;">${item.name}</div>
                    <div style="font-size: 0.8rem; opacity: 0.7;">${item.weight}kg | $${item.value}</div>
                </div>
            </div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--success);">$${item.value}</div>
        `;
        optimalItemsContainer.appendChild(div);
    });

    // Show Unselected
    gameState.sessionItems.forEach(row => {
        if (!includedIds.includes(row.id.toString())) {

            const isUserMistake = userBagIds.includes(row.id.toString());

            const isComparison = !document.getElementById('user-result-panel').classList.contains('hidden');

            const div = document.createElement('div');
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.padding = "10px";
            div.style.background = (isComparison && isUserMistake) ? "rgba(248,113,113,0.1)" : "rgba(255,255,255,0.05)";
            div.style.borderRadius = "8px";
            div.style.opacity = (isComparison && isUserMistake) ? "1" : "0.6";
            if (isComparison && isUserMistake) div.style.border = "1px solid var(--danger)";

            div.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px;">
                    ${(isComparison && isUserMistake) ? '<i data-feather="x-circle" style="width:14px;height:14px;color:var(--danger);"></i>' : ''}
                    <div>
                        <div style="font-size: 0.85rem; font-weight: 700;">${row.name}</div>
                        <div style="font-size: 0.75rem; opacity: 0.7;">${row.weight}kg | $${row.value}</div>
                    </div>
                </div>
                ${(isComparison && isUserMistake) ? '<div style="font-size: 0.7rem; color: var(--danger); font-weight:700;">WRONG PICK</div>' : ''}
            `;
            unselectedContainer.appendChild(div);
        }
    });

    feather.replace();
}

document.querySelectorAll('.btn-open-comparison').forEach(btn => {
    btn.addEventListener('click', openComparison);
});

document.getElementById('btn-result-back').addEventListener('click', () => {
    if (gameState.sessionTitle && !gameState.sessionTitle.startsWith("Level")) {
        switchView('view-setup');
    } else {
        renderLevelsMenu();
        switchView('view-main');
    }
});

document.getElementById('btn-result-home').addEventListener('click', () => {
    hideAllOverlays();
    stopTimer();
    renderLevelsMenu();
    switchView('view-main');
});

document.getElementById('btn-level-home').addEventListener('click', () => {
    stopTimer();
    renderLevelsMenu();
    switchView('view-main');
});


// INITIALIZE
renderLevelsMenu();
switchView('view-main');


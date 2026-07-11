class NeuFitApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }
    init() {
        this.loadApp();
        this.setupEventListeners();
        if (!db.getUser().name) this.navigate('profile');
    }
    loadApp() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <header>
                <div class="container">
                    <div class="header-content">
                        <div class="logo">💪 Neufit</div>
                        <div id="user-name">Bem-vindo!</div>
                    </div>
                </div>
            </header>
            <nav>
                <ul class="container">
                    <li><a href="#" class="nav-link active" data-page="dashboard">📊 Dashboard</a></li>
                    <li><a href="#" class="nav-link" data-page="weight">⚖️ Peso</a></li>
                    <li><a href="#" class="nav-link" data-page="workout">🏋️ Treino</a></li>
                    <li><a href="#" class="nav-link" data-page="nutrition">🍎 Nutrição</a></li>
                    <li><a href="#" class="nav-link" data-page="water">💧 Água</a></li>
                    <li><a href="#" class="nav-link" data-page="profile">👤 Perfil</a></li>
                    <li><a href="#" class="nav-link" data-page="settings">⚙️ Config</a></li>
                </ul>
            </nav>
            <main class="container" id="content"></main>
            <footer><p>💪 Neufit - Sua evolução todos os dias</p></footer>
        `;
        this.updateUserName();
        this.loadPage(this.currentPage);
    }
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                e.preventDefault();
                this.navigate(navLink.dataset.page);
            }
        });
    }
    navigate(page) {
        this.currentPage = page;
        this.setActiveNavLink(page);
        this.loadPage(page);
    }
    setActiveNavLink(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) link.classList.add('active');
        });
    }
    loadPage(page) {
        const content = document.getElementById('content');
        content.innerHTML = '';
        switch (page) {
            case 'dashboard': this.loadDashboard(); break;
            case 'weight': this.loadWeight(); break;
            case 'workout': this.loadWorkout(); break;
            case 'nutrition': this.loadNutrition(); break;
            case 'water': this.loadWater(); break;
            case 'profile': this.loadProfile(); break;
            case 'settings': this.loadSettings(); break;
            default: this.loadDashboard();
        }
    }
    loadDashboard() {
        const stats = db.getStats();
        const user = db.getUser();
        const water = db.getWaterToday();
        document.getElementById('content').innerHTML = `
            <div class="grid">
                <div class="stat-card">
                    <div class="stat-value">${stats.imc}</div>
                    <div class="stat-label">IMC</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stats.currentWeight}kg</div>
                    <div class="stat-label">Peso</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${water}ml</div>
                    <div class="stat-label">Água</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stats.level}</div>
                    <div class="stat-label">Nível</div>
                </div>
            </div>
            <div class="card">
                <h3>📈 Próximos Passos</h3>
                <p>✅ Dashboard ativo</p>
            </div>
        `;
    }
    loadWeight() {
        const weights = db.getWeights();
        document.getElementById('content').innerHTML = `
            <div class="card">
                <h3>⚖️ Controle de Peso</h3>
                <div class="form-group">
                    <input type="number" id="weight-input" placeholder="Peso (kg)" step="0.1">
                </div>
                <button class="btn btn-primary" onclick="app.addWeight()">Adicionar</button>
            </div>
            <div class="card">
                <h3>Histórico</h3>
                <div id="weight-list">${weights.map(w => `<p>${w.value}kg - ${Utils.formatDate(w.date)}</p>`).join('')}</div>
            </div>
        `;
    }
    addWeight() {
        const weight = document.getElementById('weight-input').value;
        if (!weight) { Utils.showAlert('Digite um peso válido!', 'warning'); return; }
        db.addWeight(weight);
        Utils.showAlert('✅ Peso registrado!', 'success');
        this.loadWeight();
    }
    loadWorkout() {
        const workouts = db.getWorkouts();
        document.getElementById('content').innerHTML = `
            <div class="card">
                <h3>🏋️ Registrar Treino</h3>
                <div class="form-group">
                    <input type="text" id="exercise-type" placeholder="Tipo (ex: corrida)">
                </div>
                <div class="form-group">
                    <input type="number" id="exercise-duration" placeholder="Duração (min)">
                </div>
                <button class="btn btn-success" onclick="app.addWorkout()">Registrar</button>
            </div>
            <div class="card">
                <h3>Treinos</h3>
                <div>${workouts.map(w => `<p>🏋️ ${w.type} - ${w.duration}min</p>`).join('')}</div>
            </div>
        `;
    }
    addWorkout() {
        const type = document.getElementById('exercise-type').value;
        const duration = document.getElementById('exercise-duration').value;
        if (!type || !duration) { Utils.showAlert('Preencha todos os campos!', 'warning'); return; }
        db.addWorkout({ type, duration: parseInt(duration) });
        Utils.showAlert('✅ Treino registrado! +50 XP', 'success');
        this.loadWorkout();
    }
    loadNutrition() {
        const meals = db.getMeals();
        document.getElementById('content').innerHTML = `
            <div class="card">
                <h3>🍎 Registrar Refeição</h3>
                <div class="form-group">
                    <input type="text" id="meal-description" placeholder="Descrição">
                </div>
                <div class="form-group">
                    <input type="number" id="meal-calories" placeholder="Calorias">
                </div>
                <button class="btn btn-primary" onclick="app.addMeal()">Adicionar</button>
            </div>
            <div class="card">
                <h3>Refeições</h3>
                <div>${meals.map(m => `<p>🍎 ${m.description} - ${m.calories}kcal</p>`).join('')}</div>
            </div>
        `;
    }
    addMeal() {
        const description = document.getElementById('meal-description').value;
        const calories = document.getElementById('meal-calories').value;
        if (!description || !calories) { Utils.showAlert('Preencha todos os campos!', 'warning'); return; }
        db.addMeal({ description, calories: parseInt(calories) });
        Utils.showAlert('✅ Refeição registrada! +20 XP', 'success');
        this.loadNutrition();
    }
    loadWater() {
        const water = db.getWaterToday();
        document.getElementById('content').innerHTML = `
            <div class="card">
                <h3>💧 Controle de Água</h3>
                <div class="stat-card"><div class="stat-value">${water}ml</div></div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <button class="btn btn-primary" onclick="app.addWater(250)">250ml</button>
                    <button class="btn btn-primary" onclick="app.addWater(500)">500ml</button>
                    <button class="btn btn-primary" onclick="app.addWater(750)">750ml</button>
                    <button class="btn btn-primary" onclick="app.addWater(1000)">1L</button>
                </div>
            </div>
        `;
    }
    addWater(amount) {
        db.addWaterIntake(amount);
        Utils.showAlert(`✅ ${amount}ml adicionado! +5 XP`, 'success');
        this.loadWater();
    }
    loadProfile() {
        const user = db.getUser();
        document.getElementById('content').innerHTML = `
            <div class="card">
                <h3>👤 Meu Perfil</h3>
                <div class="form-group">
                    <input type="text" id="profile-name" value="${user.name}" placeholder="Nome">
                </div>
                <div class="form-group">
                    <input type="email" id="profile-email" value="${user.email}" placeholder="Email">
                </div>
                <div class="form-group">
                    <input type="number" id="profile-age" value="${user.age}" placeholder="Idade">
                </div>
                <div class="form-group">
                    <input type="number" id="profile-height" value="${user.height}" step="0.01" placeholder="Altura (m)">
                </div>
                <div class="form-group">
                    <input type="number" id="profile-weight" value="${user.weight}" step="0.1" placeholder="Peso (kg)">
                </div>
                <button class="btn btn-success" onclick="app.saveProfile()">Salvar</button>
            </div>
        `;
    }
    saveProfile() {
        const profile = {
            name: document.getElementById('profile-name').value,
            email: document.getElementById('profile-email').value,
            age: parseInt(document.getElementById('profile-age').value),
            height: parseFloat(document.getElementById('profile-height').value),
            weight: parseFloat(document.getElementById('profile-weight').value)
        };
        if (!profile.name || profile.age < 10) { Utils.showAlert('Preencha corretamente!', 'warning'); return; }
        db.setUser(profile);
        Utils.showAlert('✅ Perfil salvo!', 'success');
        this.updateUserName();
    }
    loadSettings() {
        document.getElementById('content').innerHTML = `
            <div class="card">
                <h3>⚙️ Configurações</h3>
                <button class="btn btn-primary" onclick="app.enableNotifications()">🔔 Notificações</button>
                <button class="btn btn-secondary" onclick="app.downloadBackup()">📥 Backup</button>
                <button class="btn btn-danger" onclick="app.clearAllData()">🗑️ Limpar Dados</button>
            </div>
        `;
    }
    enableNotifications() {
        NotificationManager.requestPermission();
        Utils.showAlert('✅ Notificações ativadas!', 'success');
    }
    downloadBackup() {
        const data = db.exportData();
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', `neufit-backup-${Date.now()}.json`);
        element.click();
        Utils.showAlert('✅ Backup baixado!', 'success');
    }
    clearAllData() {
        if (confirm('Tem certeza? Isso não pode ser desfeito!')) {
            db.clearData();
            Utils.showAlert('✅ Dados limpos!', 'success');
            this.loadApp();
        }
    }
    updateUserName() {
        const user = db.getUser();
        const elem = document.getElementById('user-name');
        if (elem) elem.textContent = user.name ? `Olá, ${user.name}!` : 'Bem-vindo!';
    }
}
let app;
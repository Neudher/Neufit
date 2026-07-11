class Database {
    constructor() {
        this.dbName = 'neufit_db';
        this.initDB();
    }
    initDB() {
        if (!localStorage.getItem(this.dbName)) {
            const initialData = {
                user: { name: '', email: '', age: 0, height: 0, weight: 0, goal: 'perder_peso' },
                weights: [],
                workouts: [],
                meals: [],
                water_intake: [],
                xp: 0,
                level: 1,
                medals: []
            };
            localStorage.setItem(this.dbName, JSON.stringify(initialData));
        }
    }
    getData() {
        return JSON.parse(localStorage.getItem(this.dbName));
    }
    setData(data) {
        localStorage.setItem(this.dbName, JSON.stringify(data));
    }
    getUser() {
        return this.getData().user;
    }
    setUser(user) {
        const data = this.getData();
        data.user = { ...data.user, ...user };
        this.setData(data);
    }
    addWeight(weight) {
        const data = this.getData();
        data.weights.push({ value: parseFloat(weight), date: new Date().toISOString(), timestamp: Date.now() });
        this.setData(data);
        this.addXP(10);
    }
    getWeights() {
        return this.getData().weights.sort((a, b) => b.timestamp - a.timestamp);
    }
    addWorkout(workout) {
        const data = this.getData();
        data.workouts.push({ ...workout, date: new Date().toISOString(), timestamp: Date.now() });
        this.setData(data);
        this.addXP(50);
    }
    getWorkouts() {
        return this.getData().workouts.sort((a, b) => b.timestamp - a.timestamp);
    }
    addMeal(meal) {
        const data = this.getData();
        data.meals.push({ ...meal, date: new Date().toISOString(), timestamp: Date.now() });
        this.setData(data);
        this.addXP(20);
    }
    getMeals() {
        return this.getData().meals.sort((a, b) => b.timestamp - a.timestamp);
    }
    addWaterIntake(amount) {
        const data = this.getData();
        data.water_intake.push({ amount: parseInt(amount), date: new Date().toISOString(), timestamp: Date.now() });
        this.setData(data);
        this.addXP(5);
    }
    getWaterToday() {
        const today = new Date().toDateString();
        return this.getData().water_intake.filter(w => new Date(w.date).toDateString() === today).reduce((sum, w) => sum + w.amount, 0);
    }
    addXP(amount) {
        const data = this.getData();
        data.xp += amount;
        const newLevel = Math.floor(data.xp / 100) + 1;
        if (newLevel > data.level) data.level = newLevel;
        this.setData(data);
    }
    getStats() {
        const data = this.getData();
        const weights = data.weights;
        const currentWeight = weights.length > 0 ? weights[0].value : 0;
        const user = data.user;
        const imc = user.height > 0 ? (user.weight / (user.height * user.height)).toFixed(2) : 0;
        return { currentWeight, level: data.level, xp: data.xp, imc, workouts: data.workouts.length };
    }
    exportData() {
        return JSON.stringify(this.getData(), null, 2);
    }
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            localStorage.setItem(this.dbName, JSON.stringify(data));
            return true;
        } catch (e) {
            return false;
        }
    }
    clearData() {
        localStorage.removeItem(this.dbName);
        this.initDB();
    }
}
const db = new Database();
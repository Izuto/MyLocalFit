const StorageUtils = {
    keys: {
        STATS: 'fitlocal_stats',
        THEME: 'fitlocal_theme'
    },
    
    getStats() {
        const defaultStats = {
            completedWorkouts: 0,
            totalTimeInSeconds: 0,
            streakCounter: 0,
            lastWorkoutDate: null
        };
        try {
            const raw = localStorage.getItem(this.keys.STATS);
            return raw ? JSON.parse(raw) : defaultStats;
        } catch(e) {
            return defaultStats;
        }
    },
    
    saveStats(stats) {
        localStorage.setItem(this.keys.STATS, JSON.stringify(stats));
    },

    updateProgress(durationInSeconds) {
        const stats = this.getStats();
        
        stats.completedWorkouts += 1;
        stats.totalTimeInSeconds += durationInSeconds;

        const today = new Date();
        const todayStr = today.toDateString();

        if (stats.lastWorkoutDate) {
            // Compare calendar dates explicitly to avoid time-of-day issues.
            const lastDateStr = new Date(stats.lastWorkoutDate).toDateString();

            // Build yesterday's date string for exact previous-day comparison.
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();

            if (lastDateStr === yesterdayStr) {
                // Last workout was exactly yesterday -> increase streak
                stats.streakCounter += 1;
            } else if (lastDateStr === todayStr) {
                // Already recorded a workout today -> do not change streak
            } else {
                // Missed one or more days -> reset streak to 1 (today counts)
                stats.streakCounter = 1;
            }
        } else {
            // First recorded workout -> start streak at 1
            stats.streakCounter = 1;
        }

        stats.lastWorkoutDate = todayStr;
        this.saveStats(stats);
    },

    getTheme() {
        return localStorage.getItem(this.keys.THEME) || 'dark';
    },

    setTheme(theme) {
        localStorage.setItem(this.keys.THEME, theme);
    },

    getMuted() {
        return localStorage.getItem('fitlocal_muted') === 'true';
    },

    setMuted(val) {
        localStorage.setItem('fitlocal_muted', val ? 'true' : 'false');
    },

    getCustomRoutines() {
        try {
            const raw = localStorage.getItem('fitlocal_custom_routines');
            return raw ? JSON.parse(raw) : [];
        } catch(e) { return []; }
    },

    saveCustomRoutine(routine) {
        const routines = this.getCustomRoutines();
        routines.push(routine);
        localStorage.setItem('fitlocal_custom_routines', JSON.stringify(routines));
    },

    deleteCustomRoutine(id) {
        const routines = this.getCustomRoutines().filter(r => r.id !== id);
        localStorage.setItem('fitlocal_custom_routines', JSON.stringify(routines));
    }
};

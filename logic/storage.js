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

        const today = new Date().toDateString();
        if (stats.lastWorkoutDate) {
            const lastDate = new Date(stats.lastWorkoutDate);
            const diffTime = Math.abs(new Date() - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays === 1) {
                stats.streakCounter += 1;
            } else if (diffDays > 1) {
                stats.streakCounter = 0;
            }
        } else {
            stats.streakCounter = 1;
        }

        stats.lastWorkoutDate = today;
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

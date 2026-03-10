class App {
    constructor() {
        this.mainContent = document.getElementById('main-content');
        this.navBtns = document.querySelectorAll('.nav-btn');
        this.themeBtn = document.getElementById('theme-toggle');
        this.muteBtn = document.getElementById('mute-toggle');
        this.isMuted = false;
        
        this.currentView = 'dashboard';
        this.activeTimer = null;
        this.selectedExercises = [];
        this.editingRoutineId = null; // when editing an existing custom routine
        this.workoutState = {
            routine: null,
            currentIndex: 0,
            isPaused: false,
            totalSessionDuration: 0,
            remaining: 0
        };

        this.initTheme();
        this.initMute();
        this.bindEvents();
        this.renderView('dashboard');

        // Position bottom nav to align with #app container
        this.positionBottomNav();
        window.addEventListener('resize', () => this.positionBottomNav());
    }

    // Align the fixed bottom nav to the centered #app container
    positionBottomNav() {
        const appEl = document.getElementById('app');
        const nav = document.getElementById('bottom-nav');
        if (!appEl || !nav) return;
        const rect = appEl.getBoundingClientRect();
        // Place nav's left at container left and match its width
        nav.style.left = rect.left + 'px';
        nav.style.width = rect.width + 'px';
        // Remove transform centering (we set exact left)
        nav.style.transform = 'none';
    }

    initTheme() {
        const savedTheme = StorageUtils.getTheme();
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        StorageUtils.setTheme(newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        this.themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }

    initMute() {
        this.isMuted = StorageUtils.getMuted();
        this.updateMuteIcon();
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        StorageUtils.setMuted(this.isMuted);
        this.updateMuteIcon();
    }

    updateMuteIcon() {
        this.muteBtn.innerHTML = this.isMuted ? '🔇' : '🔊';
    }

    bindEvents() {
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        this.muteBtn.addEventListener('click', () => this.toggleMute());
        
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                if (this.currentView === 'workout') {
                    if(!confirm("Leave current workout? Progress won't be saved for this session.")) return;
                    if(this.activeTimer) this.activeTimer.stop();
                }
                this.renderView(target);
                this.navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        this.mainContent.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            if (btn.classList.contains('start-routine-btn')) {
                const idx = parseInt(btn.getAttribute('data-routine-index'));
                const all = this.getAllRoutines();
                this.startWorkout(all[idx]);
            } else if (btn.classList.contains('btn-add-exercise')) {
                const exId = btn.getAttribute('data-ex-id');
                this.selectedExercises.push(exId);
                this.updateSelectedUI();
                this.updateSaveButton();
            } else if (btn.classList.contains('btn-edit-ex')) {
                const exId = btn.getAttribute('data-ex-id');
                this.openEditExerciseModal(exId);
            } else if (btn.id === 'btn-open-add-ex') {
                this.openAddExerciseModal();
            } else if (btn.id === 'btn-save-ex') {
                this.saveExerciseEdits();
            } else if (btn.id === 'btn-cancel-ex') {
                this.closeEditExerciseModal();
            } else if (btn.classList.contains('btn-edit-routine')) {
                const rid = btn.getAttribute('data-routine-id');
                this.openEditRoutine(rid);
            } else if (btn.classList.contains('btn-remove-selected')) {
                const rmIdx = parseInt(btn.getAttribute('data-idx'));
                this.selectedExercises.splice(rmIdx, 1);
                this.updateSelectedUI();
                this.updateSaveButton();
            } else if (btn.id === 'btn-save-custom') {
                this.saveCustomRoutine();
            } else if (btn.classList.contains('btn-delete-routine')) {
                const rid = btn.getAttribute('data-routine-id');
                StorageUtils.deleteCustomRoutine(rid);
                this.renderView('library');
            } else if (btn.id === 'btn-pause') {
                this.pauseWorkout();
            } else if (btn.id === 'btn-resume') {
                this.resumeWorkout();
            } else if (btn.id === 'btn-redo') {
                // Reset the current exercise to its full duration and restart the timer
                const exId = this.workoutState.routine.exercises[this.workoutState.currentIndex];
                const exercise = this.getMergedExercises().find(e => e.id === exId);
                if (!exercise) return;

                // Reset state
                this.workoutState.remaining = exercise.duration;

                if (this.activeTimer && typeof this.activeTimer.reset === 'function') {
                    // If currently paused, reset but keep paused
                    const keepPaused = !!this.workoutState.isPaused;
                    this.activeTimer.reset(!keepPaused);
                    if (keepPaused) this.activeTimer.pause();
                } else {
                    // Fallback: stop and reload exercise
                    if (this.activeTimer) this.activeTimer.stop();
                    this.loadExercise();
                }

                // Update UI immediately
                this.updateWorkoutUI();
            } else if (btn.id === 'btn-skip') {
                this.nextExercise();
            } else if (btn.id === 'btn-quit') {
                if(confirm("Are you sure you want to end? Progress won't be saved for this session.")) {
                    if(this.activeTimer) this.activeTimer.stop();
                    this.renderView('dashboard');
                }
            } else if (btn.id === 'btn-finish') {
                this.renderView('dashboard');
            }
        });
    }

    // Open modal for creating a new exercise (re-uses edit modal)
    openAddExerciseModal() {
        const modal = document.getElementById('edit-ex-modal');
        if (!modal) return;
        document.getElementById('edit-ex-id').value = '';
        document.getElementById('edit-ex-name').value = '';
        document.getElementById('edit-ex-duration').value = 30;
        document.getElementById('edit-ex-muscles').value = '';
        document.getElementById('edit-ex-desc').value = '';
        modal.style.display = 'block';
        setTimeout(() => {
            const nameEl = document.getElementById('edit-ex-name');
            if (nameEl) { nameEl.focus(); }
        }, 40);
    }

    renderView(view) {
        this.currentView = view;
        const nav = document.getElementById('bottom-nav');
        nav.style.transform = view === 'workout' || view === 'workout_complete' ? 'translateY(100px)' : 'translateY(0)';
        setTimeout(() => {
             nav.style.display = view === 'workout' || view === 'workout_complete' ? 'none' : 'flex';
        }, 300);
        
        if (view === 'dashboard') {
            const stats = StorageUtils.getStats();
            this.mainContent.innerHTML = UI.getDashboardHTML(stats, this.getAllRoutines());
        } else if (view === 'library') {
            this.selectedExercises = [];
            this.editingRoutineId = null;
            const customRoutines = StorageUtils.getCustomRoutines();
            const exercises = this.getMergedExercises();
            this.mainContent.innerHTML = UI.getLibraryHTML(exercises, customRoutines);
        } else if (view === 'workout_complete') {
            this.mainContent.innerHTML = UI.getWorkoutCompleteHTML();
        }
    }

    // Return merged exercises: base exercisesDB with any custom overrides from storage
    getMergedExercises() {
        const base = exercisesDB.map(e => ({...e}));
        const custom = StorageUtils.getCustomExercises();
        const map = new Map();
        base.forEach(e => map.set(e.id, e));
        custom.forEach(e => {
            const existing = map.get(e.id) || {};
            map.set(e.id, {...existing, ...e});
        });
        return Array.from(map.values());
    }

    startWorkout(routine) {
        this.currentView = 'workout';
        this.workoutState = {
            routine: routine,
            currentIndex: 0,
            isPaused: false,
            totalSessionDuration: 0,
            remaining: 0
        };
        const nav = document.getElementById('bottom-nav');
        nav.style.transform = 'translateY(100px)';
        setTimeout(() => nav.style.display = 'none', 300);
        this.loadExercise();
    }

    loadExercise() {
        const exId = this.workoutState.routine.exercises[this.workoutState.currentIndex];
        const exercise = this.getMergedExercises().find(e => e.id === exId);
        
        if (!exercise) {
            this.finishWorkout();
            return;
        }

        this.workoutState.remaining = exercise.duration;
        this.workoutState.totalSessionDuration += exercise.duration;

        this.updateWorkoutUI();

        if (this.activeTimer) {
            this.activeTimer.stop();
        }

        const halfMark = Math.floor(exercise.duration / 2);
        this.activeTimer = new ExerciseTimer(
            exercise.duration,
            (rem) => {
                this.workoutState.remaining = rem;
                this.updateTimerOnly(exercise);
                if (rem === halfMark) this.playClick();
            },
            () => {
                this.playGong();
                this.nextExercise();
            }
        );
        this.activeTimer.start();

        // If we were paused when we skipped, keep paused on the new exercise
        if (this.workoutState.isPaused) {
            this.activeTimer.pause();
            this.updateWorkoutUI();
        }
    }

    updateWorkoutUI() {
        const exId = this.workoutState.routine.exercises[this.workoutState.currentIndex];
        const exercise = this.getMergedExercises().find(e => e.id === exId);
        const totalEx = this.workoutState.routine.exercises.length;
        
        this.mainContent.innerHTML = UI.getWorkoutSessionHTML(
            exercise, 
            this.workoutState.isPaused, 
            this.workoutState.remaining, 
            totalEx, 
            this.workoutState.currentIndex
        );
    }

    // Lightweight update — only patches timer text + SVG ring (no DOM rebuild)
    updateTimerOnly(exercise) {
        const timerText = this.mainContent.querySelector('.timer-text');
        const progressCircle = this.mainContent.querySelector('.timer-svg .progress');
        if (timerText) {
            timerText.textContent = this.workoutState.remaining;
        }
        if (progressCircle) {
            const dashoffset = (1 - this.workoutState.remaining / exercise.duration) * 283;
            progressCircle.style.strokeDashoffset = dashoffset;
        }
    }

    pauseWorkout() {
        if (this.activeTimer) {
            this.activeTimer.pause();
            this.workoutState.isPaused = true;
            this.updateWorkoutUI();
        }
    }

    resumeWorkout() {
        if (this.activeTimer) {
            this.activeTimer.resume();
            this.workoutState.isPaused = false;
            this.updateWorkoutUI();
        }
    }

    nextExercise() {
        // Subtract un-spent time when skipping
        this.workoutState.totalSessionDuration -= this.workoutState.remaining;

        // Prevent double skipping if timer ends right when skipping
        if (this.activeTimer) this.activeTimer.stop();
        
        this.workoutState.currentIndex++;
        if (this.workoutState.currentIndex >= this.workoutState.routine.exercises.length) {
            this.finishWorkout();
        } else {
            this.loadExercise();
        }
    }

    finishWorkout() {
        StorageUtils.updateProgress(this.workoutState.totalSessionDuration);
        this.currentView = 'workout_complete';
        this.renderView('workout_complete');
    }

    getAllRoutines() {
        return [...workoutRoutines, ...StorageUtils.getCustomRoutines()];
    }

    updateSelectedUI() {
        const container = document.getElementById('selected-exercises');
        if (!container) return;
        if (this.selectedExercises.length === 0) {
            container.innerHTML = '<p class="empty-msg" style="color:var(--text-secondary); font-size:0.82rem;">No exercises added yet. Tap + below to add.</p>';
            return;
        }
        const dur = calcRoutineDuration(this.selectedExercises);
        const mins = Math.floor(dur / 60);
        const secs = dur % 60;
        let html = `<p style="font-size:0.78rem; color:var(--text-secondary); margin-bottom:6px;">${this.selectedExercises.length} exercises • ${mins}m ${secs}s</p>`;
        this.selectedExercises.forEach((id, i) => {
            const ex = this.getMergedExercises().find(e => e.id === id);
            if (!ex) return;
            html += `<div class="selected-tag">
                <span>${ex.name} (${ex.duration}s)</span>
                <button class="btn-remove-selected" data-idx="${i}">✕</button>
            </div>`;
        });
        container.innerHTML = html;
    }

    updateSaveButton() {
        const btn = document.getElementById('btn-save-custom');
        if (btn) btn.disabled = this.selectedExercises.length === 0;
    }

    saveCustomRoutine() {
        const nameInput = document.getElementById('custom-routine-name');
        const name = (nameInput && nameInput.value.trim()) || 'My Routine';
        let routine = {
            id: 'custom_' + Date.now(),
            name: name,
            category: 'Custom',
            exercises: [...this.selectedExercises]
        };
        if (this.editingRoutineId) {
            // preserve original id when editing
            routine.id = this.editingRoutineId;
            StorageUtils.saveOrUpdateCustomRoutine(routine);
        } else {
            StorageUtils.saveCustomRoutine(routine);
        }
        this.selectedExercises = [];
        this.renderView('library');
    }

    // Opens the exercise edit modal and populates fields
    openEditExerciseModal(exId) {
        const exercises = this.getMergedExercises();
        const ex = exercises.find(e => e.id === exId);
        if (!ex) return;
        const modal = document.getElementById('edit-ex-modal');
        if (!modal) return;
        document.getElementById('edit-ex-id').value = ex.id;
        document.getElementById('edit-ex-name').value = ex.name || '';
        document.getElementById('edit-ex-duration').value = ex.duration || 30;
        document.getElementById('edit-ex-muscles').value = (ex.muscles || []).join(', ');
        document.getElementById('edit-ex-desc').value = ex.description || '';
        modal.style.display = 'block';
        setTimeout(() => {
            const nameEl = document.getElementById('edit-ex-name');
            const durEl = document.getElementById('edit-ex-duration');
            if (nameEl) { nameEl.focus(); nameEl.select(); }
            if (durEl) durEl.focus();
        }, 40);
    }

    closeEditExerciseModal() {
        const modal = document.getElementById('edit-ex-modal');
        if (!modal) return;
        modal.style.display = 'none';
    }

    // Save edits to an exercise (stored as custom override)
    saveExerciseEdits() {
        let id = document.getElementById('edit-ex-id').value;
        if (!id) {
            id = 'custom_ex_' + Date.now();
        }
        const name = document.getElementById('edit-ex-name').value.trim();
        const duration = parseInt(document.getElementById('edit-ex-duration').value, 10) || 30;
        const muscles = document.getElementById('edit-ex-muscles').value.split(',').map(s => s.trim()).filter(Boolean);
        const description = document.getElementById('edit-ex-desc').value.trim();

        const updated = { id, name, duration, muscles, description };
        StorageUtils.saveOrUpdateCustomExercise(updated);
        this.closeEditExerciseModal();
        this.renderView('library');
    }

    // Load a custom routine into the builder for editing
    openEditRoutine(routineId) {
        const routines = StorageUtils.getCustomRoutines();
        const r = routines.find(x => x.id === routineId);
        if (!r) return;
        this.selectedExercises = [...r.exercises];
        this.editingRoutineId = r.id;
        // render library and populate builder fields after DOM updates
        this.renderView('library');
        setTimeout(() => {
            const nameInput = document.getElementById('custom-routine-name');
            if (nameInput) nameInput.value = r.name;
            this.updateSelectedUI();
            this.updateSaveButton();
        }, 40);
    }

    // Sharp double-beep — plays at halftime
    playClick() {
        if (this.isMuted) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const t = ctx.currentTime;

            // First beep
            const osc1 = ctx.createOscillator();
            osc1.type = 'square';
            osc1.frequency.value = 1000;
            const g1 = ctx.createGain();
            g1.gain.setValueAtTime(0.4, t);
            g1.gain.setValueAtTime(0, t + 0.08);
            osc1.connect(g1).connect(ctx.destination);

            // Second beep
            const osc2 = ctx.createOscillator();
            osc2.type = 'square';
            osc2.frequency.value = 1000;
            const g2 = ctx.createGain();
            g2.gain.setValueAtTime(0, t);
            g2.gain.setValueAtTime(0.4, t + 0.14);
            g2.gain.setValueAtTime(0, t + 0.22);
            osc2.connect(g2).connect(ctx.destination);

            osc1.start(t); osc1.stop(t + 0.08);
            osc2.start(t + 0.14); osc2.stop(t + 0.22);

            setTimeout(() => ctx.close(), 500);
        } catch(e) { }
    }

    // Deep gong — plays when exercise finishes
    playGong() {
        if (this.isMuted) return;
        try {
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const t = ctx.currentTime;

            // Fundamental tone
            const osc1 = ctx.createOscillator();
            osc1.type = 'sine';
            osc1.frequency.value = 150;
            const g1 = ctx.createGain();
            g1.gain.setValueAtTime(0.6, t);
            g1.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
            osc1.connect(g1).connect(ctx.destination);

            // Harmonic overtone
            const osc2 = ctx.createOscillator();
            osc2.type = 'sine';
            osc2.frequency.value = 370;
            const g2 = ctx.createGain();
            g2.gain.setValueAtTime(0.3, t);
            g2.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
            osc2.connect(g2).connect(ctx.destination);

            // Shimmer
            const osc3 = ctx.createOscillator();
            osc3.type = 'sine';
            osc3.frequency.value = 590;
            const g3 = ctx.createGain();
            g3.gain.setValueAtTime(0.12, t);
            g3.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
            osc3.connect(g3).connect(ctx.destination);

            osc1.start(t); osc2.start(t); osc3.start(t);
            osc1.stop(t + 2.5); osc2.stop(t + 1.5); osc3.stop(t + 1.0);

            setTimeout(() => ctx.close(), 3000);
        } catch(e) { }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.fitApp = new App();
});

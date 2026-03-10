const UI = {
    getDashboardHTML(stats, routines) {
        const timeFormatted = Math.floor(stats.totalTimeInSeconds / 60) + "m";
        const progressPct = Math.min(100, Math.max(0, (stats.completedWorkouts / 10) * 100));
        
        let routineCards = '';
        routines.forEach((r, i) => {
            const dur = calcRoutineDuration(r.exercises);
            const mins = Math.floor(dur / 60);
            routineCards += `
                <div class="routine-card hover-scale" style="margin-bottom:12px;">
                    <div class="routine-header">
                        <h3>${r.name}</h3>
                        <span class="routine-badge">${r.category}</span>
                    </div>
                    <p>${r.exercises.length} Exercises • ~${mins} min</p>
                    <button class="btn btn-primary lg w-100 mt-2 start-routine-btn" data-routine-index="${i}">Start Session</button>
                </div>
            `;
        });

        return `
            <div class="dashboard fadeIn">
                <section class="stats-grid">
                    <div class="stat-card hover-glow" id="stat-workouts">
                        <span class="stat-value">${stats.completedWorkouts}</span>
                        <span class="stat-label">Workouts</span>
                    </div>
                    <div class="stat-card hover-glow" id="stat-time">
                        <span class="stat-value">${timeFormatted}</span>
                        <span class="stat-label">Total Time</span>
                    </div>
                    <div class="stat-card hover-glow" id="stat-streak">
                        <span class="stat-value">${stats.streakCounter} <span class="emoji">🔥</span></span>
                        <span class="stat-label">Day Streak</span>
                    </div>
                </section>

                <section class="goal-section mt-4">
                    <div class="routine-card hover-scale">
                        <h3>Weekly Goal</h3>
                        <div class="progress-bar-container mt-2" style="background:var(--border-color); height:8px; border-radius:4px;">
                            <div class="progress-bar" style="width: ${progressPct}%; background:var(--secondary-color);"></div>
                        </div>
                        <p class="mt-2" style="font-size:0.8rem; color:var(--text-secondary);">${stats.completedWorkouts} / 10 Workouts completed</p>
                    </div>
                </section>

                <section class="routine-section mt-4">
                    <h2 class="section-title">Choose Your Workout</h2>
                    ${routineCards}
                </section>
            </div>
        `;
    },

    getLibraryHTML(exercises, customRoutines) {
        // Custom routine builder
        let builderExercises = '';
        exercises.forEach(ex => {
            builderExercises += `
                <div class="builder-exercise" data-ex-id="${ex.id}">
                    <div class="builder-ex-info">
                        <span class="builder-ex-name">${ex.name}</span>
                        <span class="builder-ex-dur">${ex.duration}s</span>
                    </div>
                    <button class="btn-add-exercise icon-btn" data-ex-id="${ex.id}" aria-label="Add ${ex.name}">+</button>
                </div>
            `;
        });

        // Saved custom routines
        let savedHtml = '';
        if (customRoutines.length > 0) {
            savedHtml = `<div class="custom-routines-list mt-3">
                <h3 style="margin-bottom:12px;">Your Custom Routines</h3>`;
            customRoutines.forEach(r => {
                const dur = calcRoutineDuration(r.exercises);
                const mins = Math.floor(dur / 60);
                savedHtml += `
                    <div class="routine-card" style="margin-bottom:10px;">
                        <div class="routine-header">
                            <h3>🛠️ ${r.name}</h3>
                            <div style="display:flex; gap:8px; align-items:center;">
                                <button class="btn btn-secondary btn-edit-routine" data-routine-id="${r.id}" aria-label="Edit ${r.name}" style="font-size:0.9rem; padding:6px 10px;">✏️ Edit</button>
                                <button class="btn btn-danger" data-routine-id="${r.id}" aria-label="Delete ${r.name}" style="font-size:0.9rem; padding:6px 10px;">🗑️ Delete</button>
                            </div>
                        </div>
                        <p>${r.exercises.length} Exercises • ~${mins} min</p>
                    </div>
                `;
            });
            savedHtml += `</div>`;
        }

        // Exercise library cards
        let cardsHtml = '';
        exercises.forEach(ex => {
            cardsHtml += `
                <div class="exercise-card">
                    <div class="ex-info">
                        <h3>${ex.name}</h3>
                        <p class="muscles">${ex.muscles.join(', ')}</p>
                        <p class="desc">${ex.description}</p>
                    </div>
                    <div class="ex-meta">
                        <span class="duration">${ex.duration}s</span>
                            <div style="display:flex; gap:8px; margin-top:8px;">
                            <button class="btn btn-secondary btn-edit-ex" data-ex-id="${ex.id}" aria-label="Edit ${ex.name}">✏️ Edit</button>
                        </div>
                    </div>
                </div>
            `;
        });

        return `<div class="library fadeIn">
            <section class="builder-section">
                <h2 class="section-title">Create Custom Routine</h2>
                <div class="routine-card">
                    <input type="text" id="custom-routine-name" class="input-field" placeholder="Routine name (e.g. My Morning Burn)" maxlength="40">
                    
                    <div id="selected-exercises" class="selected-exercises mt-2">
                        <p class="empty-msg" style="color:var(--text-secondary); font-size:0.82rem;">No exercises added yet. Tap + below to add.</p>
                    </div>

                    <div class="builder-picker mt-2">
                        <p style="color:var(--text-secondary); font-size:0.8rem; margin-bottom:8px; font-weight:600;">Tap + to add exercises:</p>
                        <div class="builder-exercise-list">${builderExercises}</div>
                    </div>

                    <button id="btn-save-custom" class="btn btn-primary w-100 mt-3" disabled>Save Routine</button>
                </div>
            </section>

            ${savedHtml}

            <section class="mt-4">
                <div style="display:flex; align-items:center; justify-content:space-between;">
                    <h2 class="section-title">Exercise Library</h2>
                    <button id="btn-open-add-ex" class="btn btn-primary" style="padding:8px 12px; font-size:0.9rem;">＋ Add Exercise</button>
                </div>
                <div class="exercise-list">${cardsHtml}</div>
            </section>
            
            <!-- Edit Exercise Modal -->
            <div id="edit-ex-modal" class="modal" style="display:none;">
                <div class="modal-inner">
                    <h3>Edit Exercise</h3>
                    <form id="edit-ex-form">
                        <input type="hidden" id="edit-ex-id">
                        <label>Name</label>
                        <input type="text" id="edit-ex-name" class="input-field" maxlength="60">
                        <label>Duration (seconds)</label>
                        <input type="number" id="edit-ex-duration" class="input-field" min="5" max="600">
                        <label>Muscles (comma separated)</label>
                        <input type="text" id="edit-ex-muscles" class="input-field">
                        <label>Description</label>
                        <textarea id="edit-ex-desc" class="input-field" rows="4"></textarea>
                        <div style="display:flex; gap:8px; margin-top:12px;">
                            <button type="button" id="btn-save-ex" class="btn btn-primary">Save</button>
                            <button type="button" id="btn-cancel-ex" class="btn btn-outline">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>`;
    },

    getWorkoutSessionHTML(exercise, isPaused, remaining, totalEx, currentIndex) {
        const progressPct = ((currentIndex + 1) / totalEx) * 100;
        const dashoffset = (1 - remaining / exercise.duration) * 283;
        
        return `
            <div class="workout-session fadeIn">
                <div class="workout-header">
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${progressPct}%"></div>
                    </div>
                    <p class="sequence-indicator">Exercise ${currentIndex + 1} of ${totalEx}</p>
                </div>
                
                <div class="exercise-display">
                    <h2 class="ex-title">${exercise.name}</h2>
                    <p class="ex-muscles">${exercise.muscles.join(', ')}</p>
                    
                    <div class="timer-circle ${isPaused ? 'paused' : ''}">
                        <svg viewBox="0 0 100 100" class="timer-svg">
                           <circle class="bg" cx="50" cy="50" r="45"></circle>
                           <circle class="progress" cx="50" cy="50" r="45" 
                                   style="stroke-dashoffset: ${dashoffset}"></circle>
                        </svg>
                        <div class="timer-text">${remaining}</div>
                    </div>
                    
                    ${isPaused ? '<div class="paused-indicator pulse">WORKOUT PAUSED</div>' : '<div style="height:44px;"></div>'}
                </div>

                <div class="controls mt-2">
                    <div style="display:flex; gap:12px; margin-bottom:12px;">
                        ${isPaused 
                            ? `<button id="btn-resume" class="btn btn-primary lg" style="flex:1;"><span class="icon">▶️</span> Resume</button>`
                            : `<button id="btn-pause" class="btn btn-secondary lg" style="flex:1;"><span class="icon">⏸️</span> Pause</button>`
                        }
                        <button id="btn-skip" class="btn btn-outline lg" style="flex:1;" aria-label="Skip Exercise">⏭️ Skip</button>
                    </div>
                    
                    ${isPaused ? `
                        <button id="btn-quit" class="btn btn-danger w-100" style="margin-top:12px;">End Workout Without Saving</button>
                    ` : ''}
                </div>
                
                <div class="ex-description mt-3">
                    <p>${exercise.description}</p>
                </div>
            </div>
        `;
    },

    getWorkoutCompleteHTML() {
        return `
            <div class="workout-complete fadeIn">
                <div class="celebration">🎉</div>
                <h1 style="color:var(--text-primary); margin-bottom:8px;">Workout Complete!</h1>
                <p style="color:var(--text-secondary); margin-bottom:32px;">Great job! You've crushed another session. Your progress has been saved locally.</p>
                <div class="routine-card" style="margin-bottom:24px; text-align:left;">
                    <h3>Session Summary</h3>
                    <p>✓ All exercises completed</p>
                    <p>✓ Stats updated</p>
                </div>
                <button id="btn-finish" class="btn btn-primary lg w-100">Back to Dashboard</button>
            </div>
        `;
    }
};

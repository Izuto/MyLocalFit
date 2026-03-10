class ExerciseTimer {
    constructor(duration, onTick, onComplete) {
        this.duration = duration;
        this.remaining = duration;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.timerId = null;
        this.isPaused = false;
        
        // Use performance.now for more accurate timing than simple setInterval
        this.expected = performance.now() + 1000;
    }

    start() {
        if (this.timerId) return;
        this.isPaused = false;
        
        const tick = () => {
            if (!this.isPaused) {
                const now = performance.now();
                if (now >= this.expected) {
                    this.remaining -= 1;
                    this.onTick(this.remaining);
                    
                    if (this.remaining <= 0) {
                        this.stop();
                        this.onComplete();
                        return;
                    }
                    this.expected += 1000;
                }
            } else {
                // Keep pushing expected forward while paused
                this.expected = performance.now() + 1000;
            }
            this.timerId = requestAnimationFrame(tick);
        };
        
        this.expected = performance.now() + 1000;
        this.timerId = requestAnimationFrame(tick);
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
        this.expected = performance.now() + 1000;
    }

    stop() {
        if (this.timerId) {
            cancelAnimationFrame(this.timerId);
            this.timerId = null;
        }
    }

    // Reset the timer to the original duration. If `startNow` is true (default)
    // the timer will begin running immediately; otherwise it will remain paused.
    reset(startNow = true) {
        // stop any running loop
        this.stop();
        this.remaining = this.duration;
        // inform UI immediately
        if (typeof this.onTick === 'function') this.onTick(this.remaining);
        this.expected = performance.now() + 1000;
        this.isPaused = !startNow;
        if (startNow) this.start();
    }
}

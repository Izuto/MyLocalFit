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
}

interface TakeoffSequenceOptions {
    onComplete: () => void; // Called once the sequence has fully finished
    durationMs?: number; // Total duration (ms), defaults to 5000ms.
}

/**
 * Controls the /welcome page's takeoff sequence: holds the loading window
 * open for the given duration before firing onComplete (which triggers
 * navigation to /flight-details).
 *
 */
export function useTakeoffSequence(options: TakeoffSequenceOptions) {
    const { onComplete, durationMs = 5000 } = options;

    const isPlaying = ref(false);
    let timer: ReturnType<typeof setTimeout> | null = null;

    const play = () => {
        isPlaying.value = true;
        timer = setTimeout(() => {
            isPlaying.value = false;
            onComplete();
        }, durationMs);
    };

    const skip = () => {
        if (timer) clearTimeout(timer);
        isPlaying.value = false;
        onComplete();
    };

    onBeforeUnmount(() => {
        if (timer) clearTimeout(timer);
    });

    return { isPlaying, play, skip };
}

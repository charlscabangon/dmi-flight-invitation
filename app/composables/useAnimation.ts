export function useAnimation(unlockDelayMs = 700) {
    const visible = ref(false);
    const done = ref(false);

    onMounted(() => {
        requestAnimationFrame(() => {
            visible.value = true;
        });

        setTimeout(() => {
            done.value = true;
        }, unlockDelayMs);
    });

    return { visible, done };
}

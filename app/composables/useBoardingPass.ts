import { toPng } from 'html-to-image';

export function useBoardingPass() {
    // Renders the last confirmed booking as boarding-pass data.
    const { confirmedBooking } = useBooking();
    const isDownloading = ref(false);
    const downloadError = ref<string | null>(null);

    const boardingPass = computed(() => ({
        passengerName: confirmedBooking.value?.passengerName ?? '',
        companions: confirmedBooking.value?.companions ?? [],
    }));

    // Captures the given element and triggers a PNG download.
    const downloadBoardingPass = async (element: HTMLElement | null) => {
        if (!element) return;

        isDownloading.value = true;
        downloadError.value = null;

        try {
            /**
             * Ensure the custom web fonts are fully loaded and embedded
             * before html-to-image snapshots the node, or text can export
             * with fallback glyphs (or nothing) inside the PNG.
             */
            await document.fonts?.ready;

            const dataUrl = await toPng(element, {
                pixelRatio: 2,
                backgroundColor: '#ffffff',
            });

            const link = document.createElement('a');
            link.download = 'dmi-boarding-pass.png';
            link.href = dataUrl;
            link.click();
        } catch (error) {
            downloadError.value = 'Could not generate your boarding pass image. Please try again.';
            console.error('Boarding pass export failed', error);
        } finally {
            isDownloading.value = false;
        }
    };

    return {
        boardingPass,
        isDownloading,
        downloadError,
        downloadBoardingPass,
    };
};
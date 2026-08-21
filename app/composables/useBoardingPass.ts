import { toBlob } from 'html-to-image';

type DownloadOutcome = 'shared' | 'downloaded' | 'opened-new-tab' | null;

export function useBoardingPass() {
    const FILENAME = 'dmi001-boarding-pass.png';
    
    // Renders the last confirmed booking as boarding-pass data.
    const { confirmedBooking } = useBooking();
    const isDownloading = ref(false);
    const downloadError = ref<string | null>(null);

    // Tells the UI which flow completed, so it can show the right
    // follow-up instruction (e.g. "tap Save Image" vs "check Downloads").
    const downloadOutcome = ref<DownloadOutcome>(null);

    const boardingPass = computed(() => ({
        passengerName: confirmedBooking.value?.passengerName ?? '',
        companions: confirmedBooking.value?.companions ?? [],
    }));

    // Anchor-based blob download. Requires the element to be attached to
    // the DOM for click() to reliably fire on mobile browsers/webviews.
    const downloadBlobViaAnchor = (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = FILENAME;
        link.rel = 'noopener';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    /**
     *  Last-resort fallback: open the image in a new tab so the user can
     *  long-press / tap-and-hold to save it manually (works even in
     *  restrictive in-app browsers that block both Share and downloads).
     */
    const openBlobInNewTab = (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const opened = window.open(url, '_blank');
        if (!opened) {
            window.location.href = url;
        }
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
    };

    // Captures the given element and triggers a PNG download.
    const downloadBoardingPass = async (element: HTMLElement | null) => {
        if (!element || isDownloading.value) return;

        isDownloading.value = true;
        downloadError.value = null;
        downloadOutcome.value = null;

        try {
            /**
             * Ensure the custom web fonts are fully loaded and embedded
             * before html-to-image snapshots the node, or text can export
             * with fallback glyphs (or nothing) inside the PNG.
             */
            await document.fonts?.ready;

            const blob = await toBlob(element, {
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                cacheBust: true,
            });

            if (!blob) {
                throw new Error('html-to-image returned an empty blob');
            }

            const file = new File([blob], FILENAME, { type: 'image/png' });

            /**
             * Web Share API is the only reliable way to reach Photos/Gallery
             * on iOS and most Android browsers — the download attribute
             * never touches the gallery on iOS regardless of approach.
             */
            if (
                typeof navigator.share === 'function' &&
                typeof navigator.canShare === 'function' &&
                navigator.canShare({ files: [file] })
            ) {
                try {
                    await navigator.share({
                        files: [file],
                        title: 'Boarding Pass',
                    });
                    downloadOutcome.value = 'shared';
                    return;
                } catch (shareError) {
                    // AbortError = user cancelled the share sheet, not a failure.
                    if ((shareError as DOMException)?.name === 'AbortError') {
                        return;
                    }
                    // Any other share failure: fall through to anchor download.
                }
            }

            if ('download' in HTMLAnchorElement.prototype) {
                downloadBlobViaAnchor(blob);
                downloadOutcome.value = 'downloaded';
            } else {
                openBlobInNewTab(blob);
                downloadOutcome.value = 'opened-new-tab';
            }
        } catch (error) {
            downloadError.value = 'Could not generate your boarding pass image. Please try again.';
            console.error('Boarding pass export failed', error);
        } finally {
            isDownloading.value = false;
        }
    };

    // Human-readable follow-up instruction matching downloadOutcome, for
    // display right after a successful export.
    const downloadHint = computed(() => {
        switch (downloadOutcome.value) {
            case 'shared':
                return 'Tap "Save Image" in the share sheet to add it to your Photos.';
            case 'downloaded':
                return 'Saved to your Downloads folder!';
            case 'opened-new-tab':
                return 'Press and hold the image, then choose "Save to Photos" or "Download Image".';
            default:
                return null;
        }
    });

    return {
        boardingPass,
        isDownloading,
        downloadError,
        downloadOutcome,
        downloadHint,
        downloadBoardingPass,
    };
}
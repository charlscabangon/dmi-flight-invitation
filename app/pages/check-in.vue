<script setup lang="ts">
definePageMeta({
    layout: false,
});

const errorMessage = ref<string | null>(null);
const isSubmitting = ref(false);

const router = useRouter();
const { 
    passengerName,
    companions,
    companionCount,
    maxCompanion,
    addCompanion,
    removeCompanion,
    submitBooking 
} = useBooking();

const canAddMore = computed(() => companionCount.value < maxCompanion);

const handleSubmit = () => {
    errorMessage.value = null;
    const result = submitBooking();

    if (!result.success) {
        errorMessage.value = result.error.issues[0]?.message ?? 'Please check your details.';
        return;
    }

    isSubmitting.value = true;

    // Wired to the admin page: this insert is what /admin's guest list reads.
    $fetch('/api/guests', {
        method: 'POST',
        body: {
            passengerName: result.data.passengerName,
            companions: result.data.companions.map((c) => c.trim()).filter(Boolean),
        },
    }).catch((error) => {
        console.error('Could not save RSVP to the guest list', error);
    });

    router.push('/boarding');
}

// One companion field visible from the start ("1/3").
onMounted(() => {
    if (companions.value.length === 0) {
        companions.value.push('');
    }
});
</script>

<template>
    <info-layout>
        <template #header>
            <div class="flex flex-col justify-center items-center gap-2">
                <reel-number value="Passenger" />
                <reel-number value="Info" />
                <div>
                    <p>Dmi needs to know who's coming</p>
                    <p>along for the journey</p>
                </div>
            </div>
        </template>

        <template #content>
            <div class="h-full w-full max-w-xs flex flex-col justify-between gap-8 py-6">
                <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
                    <ui-input
                        id="passengerName"
                        v-model="passengerName"
                        label="Full Name"
                        placeholder="Your name"
                        autocomplete="name"
                        :error="errorMessage"
                    />

                    <div class="w-full flex flex-col gap-3">
                        <div class="flex items-center justify-between">
                            <p class="text-xs font-semibold uppercase">Who's flying with you?</p>
                            <p class="text-xs font-semibold text-primary-fg">
                                {{ companions.length }}/3
                            </p>
                        </div>

                        <div
                            v-for="(_, index) in companions"
                            :key="index"
                            class="flex items-center gap-2"
                        >
                            <ui-input
                                v-model="companions[index]"
                                class="flex-1"
                                :aria-label="`Companion ${index + 1} name`"
                                placeholder="Companion's name"
                            >
                                <template #trailing>
                                    <button
                                        type="button"
                                        :aria-label="`Remove companion ${index + 1}`"
                                        class="font-bold text-primary-fg pr-2 cursor-pointer"
                                        @click="removeCompanion(index)"
                                    >
                                        &minus;
                                    </button>
                                </template>
                            </ui-input>
                        </div>

                        <button
                            v-if="canAddMore"
                            type="button"
                            :class="[
                                'bg-primary-fg size-10 flex items-center justify-center',
                                'text-2xl text-white rounded-full cursor-pointer mx-auto',
                            ]"
                            @click="addCompanion"
                        >
                            +
                        </button>
                    </div>

                    <ui-button type="submit" :loading="isSubmitting">
                        Get boarding pass
                    </ui-button>
                </form>
            </div>
        </template>
    </info-layout>
</template>

<template>
    <main class="bg-white w-full">
        <section
            :class="[
                'h-70 flex flex-col justify-center items-center text-center',
                'bg-primary-bg rounded-b-full overflow-hidden'
            ]"
        >
            <slot name="header" />
        </section>

        <section class="place-items-center">
            <slot name="content" />
        </section>
    </main>
</template>

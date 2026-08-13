<script setup lang="ts">
const props = defineProps<{ number: any }>()
const { t, local } = useLocale()
const remain = computed(() => Math.max(0, Math.ceil((new Date(props.number.expiresAt).getTime() - Date.now()) / 60000)))
</script>
<template><article class="number-card"><div class="number-top"><span :class="['status',number.status]">● {{number.status==='active'?t.active:t.busy}}</span><small>{{t.expires}} {{remain}} min</small></div><h3>{{number.phone}}</h3><p>{{number.messages.length}} SMS · {{number.messages[0]?.serviceName}}</p><NuxtLink :to="local(`/numbers/${number.id}`)" class="text-link">{{t.open}} →</NuxtLink></article></template>

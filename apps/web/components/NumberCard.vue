<script setup lang="ts">
const props = defineProps<{ number: any }>()
const { t, local } = useLocale()
const remain = computed(() => Math.max(0, Math.ceil((new Date(props.number.expiresAt).getTime() - Date.now()) / 60000)))

const idx = ref(0)
const count = ref(props.number.messages.length)
const current = computed(() => props.number.messages[idx.value % props.number.messages.length])
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (props.number.messages?.length) {
    const seed = String(props.number.id).split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0)
    setTimeout(() => {
      timer = setInterval(() => { idx.value++; count.value++ }, 2200 + (seed % 800))
    }, seed % 1400)
  }
})
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>
<template><article class="number-card"><div class="number-top"><span :class="['status',number.status]">● {{number.status==='active'?t.active:t.busy}}</span><small>{{t.expires}} {{remain}} min</small></div><h3>{{number.phone}}</h3><p class="number-live"><Transition name="fade-swap" mode="out-in"><span :key="current?.id">{{count}} SMS · {{current?.serviceName}}</span></Transition></p><NuxtLink :to="local(`/numbers/${number.id}`)" class="text-link">{{t.open}} →</NuxtLink></article></template>

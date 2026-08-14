<script setup lang="ts">const route=useRoute(),{lang}=useLocale(); const {data:number,error}=await useFetch<any>(`/api/numbers/${route.params.id}`); if(error.value) throw createError({statusCode:error.value.statusCode||410,statusMessage:lang.value==='ru'?'Номер больше не доступен':'Number is no longer available'}); usePageSeo(computed(()=>lang.value==='ru'?'Входящие SMS публичного номера':'Incoming SMS for a public number'),computed(()=>lang.value==='ru'?'Обновляемая демонстрационная лента сообщений публичного номера.':'A refreshed simulated message feed for a public number.'),{noindex:true});

const feed = ref<any[]>(number.value?.messages ? number.value.messages.slice() : [])
let feedTimer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  const pool = (number.value?.messages || []).map((m: any) => ({ serviceCode: m.serviceCode, serviceName: m.serviceName }))
  if (!pool.length) return
  feedTimer = setInterval(() => {
    const svc = pool[Math.floor(Math.random() * pool.length)]
    const code = String(100000 + Math.floor(Math.random() * 900000))
    feed.value = [{
      id: `live-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      serviceCode: svc.serviceCode,
      serviceName: svc.serviceName,
      text: `${svc.serviceName}: verification code ${code}. Do not share this code.`,
      receivedAt: new Date().toISOString()
    }, ...feed.value].slice(0, 40)
  }, 2200 + Math.random() * 800)
})
onUnmounted(() => { if (feedTimer) clearInterval(feedTimer) })
</script>
<template><div class="shell page narrow"><span class="kicker">Public feed / noindex</span><h1>{{number.phone}}</h1><p class="lead">{{lang==='ru'?'Публичная демонстрационная лента. Никому не сообщайте личные данные и не используйте номер для важных аккаунтов.':'A public simulated feed. Never share personal information or use this number for important accounts.'}}</p><TransitionGroup tag="div" name="msg-feed" class="message-list"><article v-for="m in feed" :key="m.id"><img :src="`/images/services/${m.serviceCode}.webp`"><div><b>{{m.serviceName}}</b><p>{{m.text}}</p><small>{{new Date(m.receivedAt).toLocaleString(lang)}}</small></div></article></TransitionGroup><PremiumBanner medium="sms_timeout"/></div></template>

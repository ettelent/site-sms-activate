<script setup lang="ts">
const { lang } = useLocale()
const { data: services } = await useFetch<any[]>('/api/catalog/services')
const q = ref('')
const page = ref(1)
const filtered = computed(() => services.value?.filter(service =>
  `${service.nameRu} ${service.nameEn} ${service.code}`.toLowerCase().includes(q.value.toLowerCase())
) || [])
const visible = computed(() => filtered.value.slice(0, page.value * 60))

usePageSeo(
  computed(() => lang.value === 'ru' ? 'Временные номера для Telegram, WhatsApp и других сервисов' : 'Temporary numbers for apps and services'),
  computed(() => lang.value === 'ru'
    ? 'Каталог виртуальных номеров для Telegram, WhatsApp, Google и 800+ сервисов. Выберите приложение и страну для SMS-кода подтверждения.'
    : 'Virtual number catalog for Telegram, WhatsApp, Google, and 800+ services. Choose an app and country for an SMS verification code.')
)

const config = useRuntimeConfig()
useHead({ script: [{ type: 'application/ld+json', innerHTML: computed(() => JSON.stringify({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: lang.value === 'ru' ? 'Главная' : 'Home', item: config.public.siteUrl },
    { '@type': 'ListItem', position: 2, name: lang.value === 'ru' ? 'Сервисы' : 'Services', item: `${config.public.siteUrl}/services` }
  ]
})) }] })
</script>

<template>
  <div class="shell page">
    <span class="kicker">Catalog / 800+</span>
    <h1>{{ lang === 'ru' ? 'Временные номера для сервисов и приложений' : 'Temporary numbers for services and apps' }}</h1>
    <p class="lead">{{ lang === 'ru'
      ? 'Выберите Telegram, WhatsApp, Google, социальную сеть или другое приложение, чтобы посмотреть доступные страны и формат SMS-кода подтверждения.'
      : 'Choose Telegram, WhatsApp, Google, a social network, or another app to explore available countries and verification-code formats.' }}</p>
    <input v-model="q" class="search" placeholder="Telegram, WhatsApp, Google…">
    <div class="card-grid"><ServiceCard v-for="service in visible" :key="service.code" :service="service" /></div>
    <button v-if="visible.length < filtered.length" class="button more" @click="page++">{{ lang === 'ru' ? 'Показать ещё сервисы' : 'Show more services' }}</button>
    <section class="catalog-seo">
      <h2>{{ lang === 'ru' ? 'SMS-верификация для мессенджеров и онлайн-сервисов' : 'SMS verification for messengers and online services' }}</h2>
      <template v-if="lang === 'ru'">
        <p>Одноразовый SMS-код используется для подтверждения номера телефона при регистрации, входе или восстановлении доступа. В каталоге собраны мессенджеры, социальные сети, почтовые платформы, маркетплейсы и другие приложения. Поиск помогает быстро найти нужный сервис и перейти к списку стран.</p>
        <p>Доступность направления зависит от правил конкретного приложения. Telegram, WhatsApp, Google и другие платформы могут отклонять отдельные регионы, ограничивать повторную отправку кода или предлагать альтернативную проверку через звонок, электронную почту либо приложение-аутентификатор.</p>
        <p>Лента Signal SMS является симуляцией и показывает типовой формат сообщения с кодом верификации. Она не гарантирует получение реального SMS. Для аккаунта, который должен оставаться вашим, используйте личный телефон или отдельный приватный номер.</p>
      </template>
      <template v-else>
        <p>A one-time SMS code can confirm a phone number during registration, sign-in, or account recovery. Browse messengers, social networks, email platforms, marketplaces, and other applications.</p>
        <p>Availability depends on each app’s policies. Platforms may reject certain regions, limit repeated code requests, or offer verification by call, email, or authenticator.</p>
        <p>The Signal SMS feed is simulated and shows typical verification message formats. It does not guarantee real SMS delivery.</p>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
const { lang } = useLocale()

usePageSeo(
  computed(() => lang.value === 'ru' ? 'API для работы с виртуальными номерами' : 'Virtual number API'),
  computed(() => lang.value === 'ru'
    ? 'Возможности API, автоматизация, лимиты и порядок получения доступа.'
    : 'API capabilities, automation, limits, and access instructions.')
)

const capabilities = computed(() => lang.value === 'ru' ? [
  { icon: '01', title: 'Каталог стран', text: 'Получайте актуальный список направлений, телефонные коды и локализованные названия стран.' },
  { icon: '02', title: 'Каталог сервисов', text: 'Работайте с единым справочником приложений и платформ без ручного обновления данных.' },
  { icon: '03', title: 'Автоматизация', text: 'Подключайте каталог к панели управления, внутреннему приложению или собственному интерфейсу.' },
  { icon: '04', title: 'JSON-формат', text: 'Используйте предсказуемые структурированные ответы, которые удобно обрабатывать на любом стеке.' }
] : [
  { icon: '01', title: 'Country catalog', text: 'Retrieve destinations, calling codes, and localized country names.' },
  { icon: '02', title: 'Service catalog', text: 'Use a single directory of apps and platforms without manual data maintenance.' },
  { icon: '03', title: 'Automation', text: 'Connect the catalog to a dashboard, internal application, or custom interface.' },
  { icon: '04', title: 'JSON format', text: 'Work with predictable structured responses on any technology stack.' }
])

const steps = computed(() => lang.value === 'ru' ? [
  ['Оставьте заявку', 'Перейдите к форме партнёра и укажите предполагаемый сценарий использования API.'],
  ['Получите параметры доступа', 'После согласования вам будут предоставлены адрес API, ключ и доступные лимиты.'],
  ['Подключите интеграцию', 'Храните ключ только на сервере и отправляйте его в заголовке каждого запроса.'],
  ['Перейдите в рабочий режим', 'Проверьте обработку ошибок и лимитов перед запуском автоматизации.']
] : [
  ['Submit a request', 'Open the partner form and describe your intended API use case.'],
  ['Receive credentials', 'Once approved, you will receive the API address, key, and available limits.'],
  ['Build the integration', 'Keep the key on your server and send it in the request header.'],
  ['Go live', 'Test error and rate-limit handling before enabling automation.']
])
</script>

<template>
  <div class="api-product">
    <section class="api-hero shell">
      <div>
        <span class="eyebrow"><i></i>Signal API / B2B</span>
        <h1>{{ lang === 'ru' ? 'Виртуальные номера в вашем продукте' : 'Virtual numbers in your product' }}</h1>
        <p>{{ lang === 'ru'
          ? 'API помогает автоматизировать работу с каталогом стран и сервисов, сократить ручные операции и встроить необходимые данные в собственный интерфейс.'
          : 'The API automates country and service catalog workflows, reduces manual work, and brings the required data into your own interface.' }}</p>
        <div class="hero-actions">
          <a :href="`/api/go/api_access?lang=${lang}`" rel="nofollow sponsored noopener" class="button">
            {{ lang === 'ru' ? 'Получить доступ к API' : 'Request API access' }} →
          </a>
          <a href="#how-to" class="api-anchor">{{ lang === 'ru' ? 'Как это работает' : 'How it works' }} ↓</a>
        </div>
      </div>
      <div class="api-visual" aria-hidden="true">
        <div class="api-visual-head"><span></span><span></span><span></span><b>api.signal</b></div>
        <code><em>GET</em> /v1/catalog/countries</code>
        <pre>{
  "status": "ok",
  "data": [
    { "country": "GB", "code": "+44" },
    { "country": "CA", "code": "+1" }
  ]
}</pre>
      </div>
    </section>

    <section class="shell section">
      <span class="kicker">01 / {{ lang === 'ru' ? 'Возможности' : 'Capabilities' }}</span>
      <h2>{{ lang === 'ru' ? 'Что даёт подключение' : 'What the API provides' }}</h2>
      <div class="api-capabilities">
        <article v-for="item in capabilities" :key="item.icon">
          <span>{{ item.icon }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section id="how-to" class="api-how">
      <div class="shell">
        <span class="kicker">02 / Access</span>
        <h2>{{ lang === 'ru' ? 'Как получить доступ' : 'How to get access' }}</h2>
        <div class="api-steps">
          <article v-for="([title, text], index) in steps" :key="title">
            <b>0{{ index + 1 }}</b><div><h3>{{ title }}</h3><p>{{ text }}</p></div>
          </article>
        </div>
      </div>
    </section>

    <section class="shell section api-use-cases">
      <div>
        <span class="kicker">03 / Use cases</span>
        <h2>{{ lang === 'ru' ? 'Кому подойдёт API' : 'Who the API is for' }}</h2>
      </div>
      <ul v-if="lang === 'ru'">
        <li>Разработчикам личных кабинетов и внутренних панелей</li>
        <li>Командам, которым нужен единый каталог стран и сервисов</li>
        <li>Проектам с регулярным обновлением доступных направлений</li>
        <li>Сервисам, автоматизирующим повторяющиеся операции</li>
      </ul>
      <ul v-else>
        <li>Developers building dashboards and internal tools</li>
        <li>Teams that need a unified country and service directory</li>
        <li>Products that regularly refresh available destinations</li>
        <li>Services automating repetitive catalog operations</li>
      </ul>
    </section>

    <section class="shell api-final-cta">
      <div><span class="kicker">API access</span><h2>{{ lang === 'ru' ? 'Готовы подключиться?' : 'Ready to integrate?' }}</h2><p>{{ lang === 'ru' ? 'Условия, доступные методы и лимиты определяются после рассмотрения заявки.' : 'Terms, available methods, and limits are provided after your request is reviewed.' }}</p></div>
      <a :href="`/api/go/api_access?lang=${lang}`" rel="nofollow sponsored noopener" class="button">{{ lang === 'ru' ? 'Запросить доступ' : 'Request access' }} →</a>
    </section>
  </div>
</template>

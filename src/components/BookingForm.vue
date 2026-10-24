<script setup lang="ts">
import { ref } from 'vue';
const form = ref({ name: '', phone: '', service: '', date: '', message: '' });
const status = ref<'idle' | 'sending' | 'ok' | 'error'>('idle');
const errorText = ref('');
const services = [
  'Аренда падел-корта',
  'Индивидуальная тренировка по паделу',
  'Аренда теннисного корта',
  'Индивидуальная тренировка по теннису',
  'Клубная лига',
  'Пробная встреча',
  'Прокат ракеток и мячей',
  'Детские и подростковые группы',
  'Другое',
];
async function submit() {
  status.value = 'sending';
  errorText.value = '';
  try {
    const response = await fetch('/__forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formKey: 'booking',
        schemaRef: 'v1_7f85b5bcea06',
        payload: {
          name: form.value.name,
          phone: form.value.phone,
          service: form.value.service,
          date: form.value.date,
          message: form.value.message,
        },
      }),
    });
    if (!response.ok) throw new Error('request failed');
    status.value = 'ok';
    form.value = { name: '', phone: '', service: '', date: '', message: '' };
  } catch {
    status.value = 'error';
    errorText.value = 'Не удалось отправить заявку. Позвоните нам: +7 (918) 275-76-66';
  }
}
</script>
<template>
  <section id="booking" class="border-b border-bone/10">
    <div class="wrap grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
      <div>
        <p class="eyebrow">Запись</p>
        <h2 class="mt-3 text-3xl font-bold sm:text-4xl">Забронировать корт или тренировку</h2>
        <p class="mt-4 max-w-md text-mist">
          Оставьте заявку — администратор перезвонит и подберёт удобное время. Работаем ежедневно
          с 08:00 до 22:00.
        </p>
        <ul class="mt-8 space-y-3 text-sm">
          <li><a href="tel:+79182757666" class="font-bold text-lime hover:underline">+7 (918) 275-76-66</a></li>
          <li><a href="https://t.me/na_kortah_krd" class="font-bold text-lime hover:underline">Telegram @na_kortah_krd</a></li>
          <li class="text-mist">Краснодар, Венецианская ул., 12/1</li>
        </ul>
      </div>
      <form class="card p-6 sm:p-8" novalidate @submit.prevent="submit">
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block text-sm font-semibold">
            Имя
            <input v-model="form.name" type="text" required minlength="2" maxlength="100" placeholder="Как к вам обращаться" class="mt-2 w-full rounded-xl border border-bone/15 bg-night/60 px-4 py-3 text-bone outline-none focus:border-lime" />
          </label>
          <label class="block text-sm font-semibold">
            Телефон
            <input v-model="form.phone" type="tel" required placeholder="+7 900 000-00-00" class="mt-2 w-full rounded-xl border border-bone/15 bg-night/60 px-4 py-3 text-bone outline-none focus:border-lime" />
          </label>
          <label class="block text-sm font-semibold">
            Услуга
            <select v-model="form.service" class="mt-2 w-full rounded-xl border border-bone/15 bg-night/60 px-4 py-3 text-bone outline-none focus:border-lime">
              <option value="">Не выбрано</option>
              <option v-for="option in services" :key="option" :value="option">{{ option }}</option>
            </select>
          </label>
          <label class="block text-sm font-semibold">
            Дата
            <input v-model="form.date" type="date" class="mt-2 w-full rounded-xl border border-bone/15 bg-night/60 px-4 py-3 text-bone outline-none focus:border-lime" />
          </label>
        </div>
        <label class="mt-4 block text-sm font-semibold">
          Комментарий
          <textarea v-model="form.message" rows="4" maxlength="1000" placeholder="Время, корт, количество игроков" class="mt-2 w-full rounded-xl border border-bone/15 bg-night/60 px-4 py-3 text-bone outline-none focus:border-lime"></textarea>
        </label>
        <button type="submit" class="btn btn-primary mt-6 w-full" :disabled="status === 'sending'">
          {{ status === 'sending' ? 'Отправляем…' : 'Отправить заявку' }}
        </button>
        <p v-if="status === 'ok'" class="mt-4 rounded-xl bg-lime/10 px-4 py-3 text-sm text-lime">
          Заявка отправлена. Мы перезвоним и подтвердим запись.
        </p>
        <p v-if="status === 'error'" class="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {{ errorText }}
        </p>
      </form>
    </div>
  </section>
</template>

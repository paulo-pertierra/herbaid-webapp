<script>
import { ref, watch, onMounted } from 'vue';
import { useDoctorStore } from '@/store/app';

const store = useDoctorStore()
store.getDoctors()

const loading = ref(store.loading)
watch((store), ()=> {
  console.log(store.doctors)
})
console.log(store.doctors)
const doctors = ref(store.doctors)
</script>
<template>
  <h1 class="text-center my-5">Doctors Directory</h1>
  <div v-if="loading"></div>

</template>


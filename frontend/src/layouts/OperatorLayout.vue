<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <!-- Header -->
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar>
          <q-btn flat @click="toggleDrawer" round dense icon="menu" />
          <q-toolbar-title>Operator Portal</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <!-- Drawer -->
      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
          <q-list padding>
            <!-- Profil -->
            <q-item clickable v-ripple @click="selectPage('Operatorprofil')">
              <q-item-section avatar>
                <q-icon name="account_box" />
              </q-item-section>
              <q-item-section>
                Profil
              </q-item-section>
            </q-item>

            <!-- Operatörler -->
            <q-item clickable v-ripple @click="selectPage('OperatorCamera')">
              <q-item-section avatar>
                <q-icon name="camera" />
              </q-item-section>
              <q-item-section>
                Camera
              </q-item-section>
            </q-item>

              <!-- Map -->
              <q-item clickable v-ripple @click="selectPage('OperatorMap')">
              <q-item-section avatar>
                <q-icon name="map" />
              </q-item-section>
              <q-item-section>
                Map
              </q-item-section>
            </q-item>

              <!-- Warnings -->
              <q-item clickable v-ripple @click="selectPage('OperatorWarnings')">
              <q-item-section avatar>
                <q-icon name="warning" />
              </q-item-section>
              <q-item-section>
                Warnings
              </q-item-section>
            </q-item>

            <!-- Çıkış Yap -->
            <q-separator />
            <q-item clickable v-ripple @click="logout">
              <q-item-section avatar>
                <q-icon name="exit_to_app" />
              </q-item-section>
              <q-item-section>
                Log Out
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <!-- Page Content -->
      <q-page-container>
        <q-page padding>
          <!-- İçerikler -->
          <div v-if="selectedPage === 'Operatorprofil'">
            <router-view></router-view>
            <!-- Profil içeriği -->
          </div>
          <div v-else-if="selectedPage === 'OperatorCamera'">
          <!-- Camera içeriği -->
            <router-view></router-view>
          </div>
          <div v-if="selectedPage === 'OperatorMap'">
            <router-view></router-view>
            <!-- Map içeriği -->
          </div>

          <div v-if="selectedPage === 'OperatorWarnings'">
            <router-view></router-view>
            <!-- Warnings içeriği -->
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'

export default {
setup() {
  const drawer = ref(false);
  const miniState = ref(true);
  const router = useRouter();
  const selectedPage = ref('Operatorprofil'); // Default olarak profil sayfası seçili

  const selectPage = (page) => {
    selectedPage.value = page;
    if (page === 'Operatorprofil') {
      router.push({ name: 'Operatorprofil' });
    } else if (page === 'OperatorCamera') {
      router.push({ name: 'OperatorCamera' });
    }else if (page === 'OperatorMap') {
      router.push({ name: 'OperatorMap' });
    }
    else if (page === 'OperatorWarnings') {
      router.push({ name: 'OperatorWarnings' });
    }
  };

  const toggleDrawer = () => {
    drawer.value = !drawer.value;
  };

  const logout = () => {
    axios.post('http://127.0.0.1:5000/api/logout')
      .then((response) => {
        window.location.href = '/';

      })
      .catch((error) => {
        console.error('Çıkış yapma hatası:', error);
      });
    };


  return {
    drawer,
    miniState,
    selectedPage,
    selectPage,
    toggleDrawer,
    logout
  };
}
};

</script>


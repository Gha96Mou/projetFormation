<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
            aria-label="Menu"
            dense
            flat
            icon="menu"
            round
            @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Iorga - Formation Nest.js, Quasar, Prisma
        </q-toolbar-title>

        <div>v0.0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        bordered
        show-if-above
    >
      <q-list>

        <q-expansion-item
            caption="Nest.js, Quasar, Prisma"
            default-opened
            group="menu"
            icon="tablet"
            label="Iorga - Formation"
        >
         <!-- Add your menu links here -->
         <q-item
              v-for="page in pages"
              :key="page.path"
              clickable
              v-ripple
              @click="navigateToPage(page.path)"
          >
            <q-item-section avatar>
              <q-icon :name="page.icon" />
            </q-item-section>
            <q-item-section>
              {{ page.label }}
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>




      <!-- Footer -->
      <q-footer elevated class="q-pt-md bg-primary text-white">
      <div class="row justify-center items-center">
        <div class="row justify-end">
          <q-btn
              v-for="page in pages"
              :key="page.path"
              dense
              flat
              class="q-mx-sm"
              color="black"
              text-color="white"
              :label="page.label"
              icon="home"
              @click="navigateToPage(page.path)"
          />




        </div>
      </div>
    </q-footer>
  </q-layout>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const router = useRouter();
    const leftDrawerOpen = ref(false);

    const pages = [
      { path: '/', label: 'Home', icon: 'home' },
      { path: '/products', label: 'Products', icon: 'shopping_cart' },
      { path: '/customers', label: 'Customers', icon: 'people' },

      // Add more pages as needed
    ];

    const navigateToPage = async (path: string) => {
    try {
    await router.push(path);
    leftDrawerOpen.value = false; // Close the drawer after navigating
  } catch (error) {
    console.error('Error navigating to page:', error);
    // Handle the error as needed
  }
};

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      leftDrawerOpen,
      pages,
      navigateToPage,
      toggleLeftDrawer,
    };
  },
});
</script>

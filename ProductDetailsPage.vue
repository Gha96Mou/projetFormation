<template>
  <div class="product-details-container">
    <div class="product-details-title">Détails du produit</div>

    <q-card class="product-details-card">
      <div class="product-info-container">
        <div class="product-info" v-if="product">
          <p><strong>Code:</strong> {{ product.code }}</p>
          <p><strong>Libelle:</strong> {{ product.libelle }}</p>
          <p><strong>Commentaires:</strong> {{ product.commentaires }}</p>
        </div>
      </div>
    </q-card>

    <div class="action-buttons">
      <q-btn flat label="Retour" @click="goBack" />
      <DeleteProductComponent :selectedProduct="product" @show-confirm-dialog="showConfirmDialog" />
    </div>

    <q-notification type="positive" position="top" v-model="successNotification" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ProductSearchResultDto } from '@formation/shared-lib';
import { productsApiService } from '../boot/api';
import DeleteProductComponent from '../components/modificationsProducts/DeleteProductComponent.vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ProductDetailsPage',
  components: {
    DeleteProductComponent,
  },
  setup() {
    const router = useRouter();
    const product = ref<ProductSearchResultDto>();
    const successNotification = ref(false);
    const $q = useQuasar();

    onMounted(async () => {
      const code = router.currentRoute.value.params.code;
      if (code) {
        const response = await productsApiService.getProductByCode(Array.isArray(code) ? code[0] : code);
        if (response.isOk && response.data) {
          product.value = response.data;
        } else {
          console.error('Failed to fetch product:', response.error);
        }
      }
    });

    const goBack = () => {
      router.back();
    };

    const showConfirmDialog = () => {
      $q.dialog({
        title: 'Supprimer un produit',
        message: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
        cancel: true,
        persistent: true,
        ok: {
          label: 'Supprimer',
          color: 'primary',
          handler: handleDeleteConfirmed,
        },
      });
    };

    const handleDeleteConfirmed = async () => {
      try {
        const response = await productsApiService.deleteProduct(product.value!.code);
        if (response.isOk) {
          successNotification.value = true;
          goBack();
        } else {
          console.error('Failed to delete product:', response.error);
          $q.notify({ type: 'negative', message: 'Erreur lors de la suppression du produit' });
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        $q.notify({ type: 'negative', message: 'Une erreur est survenue lors de la suppression du produit' });
      }
    };

    return {
      product,
      goBack,
      showConfirmDialog,
      successNotification,
    };
  },
});
</script>

<style scoped>


.product-details-container {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center horizontally */
  min-height: 100vh;
}

.product-details-title {
  position:absolute;
  font-size: 24px; /* Increase title font size */
  font-weight: bold; /* Make title bold */
  margin-top: 80px; /* Add margin above the title */
  text-align: center; /* Center title text */
  /* New styles for positioning at mid-width */
  width: fit-content; /* Shrink title to content width */
  margin: 0 auto; /* Center horizontally within container */
}

.product-details-card {
  /* Increase card size */
  width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  margin-top: 80px; /* Add margin below the title */
}

.product-info-container {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center horizontally */
  margin-top: 50px; /* Add margin below the card */
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px; /* Add margin below the card */
  gap: 40px;
}


</style>

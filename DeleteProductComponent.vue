<template>
  <div class="delete-product-container">
    <q-icon name="delete" size="" class="delete-icon" @click="emitShowConfirmDialog" />

    <q-dialog v-model="confirmationDialog" class="delete-product-dialog no-blur">
      <q-card>
        <q-card-header class="confirmation-header">
          <q-card-title>Confirmer la suppression</q-card-title>
        </q-card-header>

        <q-card-main>
          </q-card-main>

        <q-card-actions class="q-dialog__actions">
          <q-btn flat label="Cancel" color="negative" @click="confirmationDialog = false" />
          <q-btn flat label="Supprimer" color="primary" @click="handleDeleteProduct" :loading="loading" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { ProductSearchResultDto } from '@formation/shared-lib';
import { productsApiService } from 'src/boot/api';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'DeleteProductComponent',
  props: {
    selectedProduct: {
      type: Object as () => ProductSearchResultDto | undefined,
      required: true,
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const loading = ref(false);
    const confirmationDialog = ref(false);
    const router = useRouter();

    const emitShowConfirmDialog = () => {
      //emit('show-confirm-dialog');
      confirmationDialog.value = true;
    };
    const handleDeleteProduct = async () => {
  loading.value = true;
  try {
    const response = await productsApiService.deleteProduct(props.selectedProduct!.code);
    console.log('Delete product response:', response);
    if (response.isOk) {
      confirmationDialog.value = false;
      $q.notify({ type: 'positive', message: 'Le produit a été supprimé avec succès' });

      // Display success message for 2 seconds
      setTimeout(() => {
        // Emit delete confirmed event after the message
        emit('delete-confirmed');
      }, 6000);

      // Refresh the page and navigate back after 3 seconds (adjust delay as needed)
      //setTimeout(() => {
        //window.location.reload();
      //}, 9000);
      router.go(-1);

    } else {
      console.error('Failed to delete product:', response.error);
      $q.notify({ type: 'negative', message: 'Erreur lors de la suppression du produit' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    $q.notify({ type: 'negative', message: 'Une erreur est survenue lors de la suppression du produit' });
  } finally {
    loading.value = false;
  }
};


    return {
      loading,
      confirmationDialog,
      emitShowConfirmDialog,
      handleDeleteProduct,

    };
  },
});
</script>

<style scoped>
.delete-icon {
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer hover;
  color: red;
  box-shadow: blue
;
}

.delete-product-dialog {
  max-width: 800px; /* Adjust width as needed */
  max-height: 800px; /* Adjust height as needed */
  /* Remove default Quasar dialog blur */
  backdrop-filter: none; /* Disable Quasar's default blur */
}

.no-blur {
  /* Additional styles for the dialog without blur (optional) */
  box-shadow: 0px 3px 5px grey
}

.confirmation-header {
  background-color: #f2f2f2; /* Set header background color */
  padding: 10px; /* Adjust header padding */
}
</style>

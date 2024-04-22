<template>

  <q-page class=" items-center justify-evenly">
    <product-search-component
        active
        title="Recherche de produits"

    ></product-search-component>


    <create-product
    v-if="showForm === 'create'"
    :title="CreateformTitle"
      @closeForm="closeForm"
    >
    </create-product>

    <update-product
    v-if="showForm === 'update'"
    :title="UpdateformTitle"
      @closeForm="closeForm"
    >
    </update-product>


   <!-- Boutons d'icône pour ajouter et éditer -->
   <q-btn icon="add" @click="showForm = 'create'; CreateformTitle = 'Create a product'" class="q-mt-md" />
    <q-btn icon="edit" @click="showForm = 'update'; UpdateformTitle = 'Update a product'" class="q-mt-md" />
  </q-page>
</template>



<script lang="ts">
import { defineComponent, ref} from 'vue'
import ProductSearchComponent from '../components/productSearchComponent/ProductSearchComponent.vue';
import CreateProduct from '../components/modificationsProducts/CreateProduct.vue';
import UpdateProduct from '../components/modificationsProducts/UpdateProduct.vue';


export default defineComponent({
  name: 'ProductPage',
  components: {
    ProductSearchComponent,
    CreateProduct,
    UpdateProduct

  },
  setup() {
    const showForm = ref('none'); // Initially set neither form to be shown
    const CreateformTitle = ref('');
    const UpdateformTitle = ref('');

    const closeForm = () => {
      showForm.value = 'none'; // Close both forms when either closes
    };

    return {
      showForm,
      CreateformTitle,
      closeForm,
      UpdateformTitle,
    };
  },
});
</script>




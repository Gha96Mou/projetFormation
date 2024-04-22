import { defineComponent, reactive, ref, onMounted, onBeforeMount } from 'vue';
import { productsApiService } from '../../boot/api';
import { ProductSearchResultDto } from '@formation/shared-lib';
import { QTableColumn } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ProductSearchComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup: (props, { emit }) => {
    const router = useRouter();

    // Initial state
    const InitialFormProductState = reactive({
      code: '',
      libelle: '',
      commentaires: '',
      Offres : 0,
    });

    const formPro = reactive <ProductSearchResultDto>({
      ...InitialFormProductState,
    });

    const columns = [
      {
        name: 'code',
        required: true,
        label: 'Code',
        align: 'left',
        field: (row: ProductSearchResultDto) => row.code,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'libelle',
        required: true,
        label: 'Libelle',
        align: 'left',
        field: (row: ProductSearchResultDto) => row.libelle,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'commentaires',
        required: false,
        label: 'Commentaires',
        align: 'left',
        field: (row: ProductSearchResultDto) => row.commentaires,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name : 'nombreOffres',
        required: false,
        label: 'Nombre d\'offres',
        align: 'left',
        field: (row: ProductSearchResultDto) => row.Offres,
        format: (val: number) => `${val}`,
        sortable: true,
      },
    ]  as QTableColumn<ProductSearchResultDto>[]; // Ideally, type should be inferred

    const allProducts = ref<ProductSearchResultDto[]>([]);
    const loading = ref(false);


    onBeforeMount(async () => {
      loading.value = true;

      try {
        const wd = await productsApiService.getProducts();
        if (wd.isOk && wd.data) {
          allProducts.value = wd.data;
        } else {
          console.error('Failed to fetch products:', wd.error);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        loading.value = false;
      }
    });
    const onRowClick = (evt: Event, row: ProductSearchResultDto, index: number) => {
      // Emit the event with row data (access row properties here)
      emit('row-click', row);
      router.push({ name: 'product-details', params: { code: row.code , libelle: row.libelle, commentaires: row.commentaires, Offres: row.Offres} })
        .catch(error => {
          console.error('Error navigating:', error);
        });
    };


    async function searchProductByLibelle(libelle: string, code: string) {
      const wd = await productsApiService.searchProductByLibelle(libelle, code);
      if (wd.isOk && wd.data) {
        allProducts.value = wd.data; // Assign wd.data to the value property of allProducts ref
        console.log('Products fetched:', wd.data);
      } else {
        console.error('Failed to fetch products:', wd.error);
      }
    }

    function resetForm() {
      // Reset each property of formProd to the initial state
      formPro.code = InitialFormProductState.code;
      formPro.libelle = InitialFormProductState.libelle;
      formPro.commentaires = InitialFormProductState.commentaires;
      formPro.Offres = InitialFormProductState.Offres;

      // Reload the current route
      router.go(0);
    }


    return {
      formPro,
      columns,
      allProducts,
      loading,
      onRowClick,
      searchProductByLibelle,
      resetForm,


      //doSearch,
    };
  },
});

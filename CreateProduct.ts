import { defineComponent, reactive, ref } from 'vue';
import { useQuasar } from 'quasar';
import { ProductSearchResultDto, textValidatorToFixed3 } from '@formation/shared-lib';
import { productsApiService } from 'src/boot/api';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CreateProduct',

  props: {
    title: {
      type: String,
      required: true,
    },

  },
  setup: (props: any, { emit }: any) => {
    const $q = useQuasar();

    const initialCreateProductFormState: {
      code: string;
      libelle: string;
      commentaires?: string;
      Offres : number;
    } = {
      code: '',
      libelle: '',
      commentaires: '',
      Offres : 0,
    };

    const formData = reactive<ProductSearchResultDto>({
      ...initialCreateProductFormState,
    });

    const codeMaxLength = 5; // Set the maximum length of the code field
    const libelleMaxLength = 50; // Set the maximum length of the libelle field

    const resetForm = () => {
      formData.code = '';
      formData.libelle = '';
      formData.commentaires = '';
      formData.Offres = 0;

      codeIsValid.value = true;
      libelleIsValid.value = true;
    };

    const products = ref<ProductSearchResultDto[]>([]);
    const loading = ref(false);
    const successDialog = ref(false);
    const resultMessage = ref('');
    const showForm = ref(false);

    const codeIsValid = ref(true);
    const libelleIsValid = ref(true);

    const validateInput = (field: string, maxLength: number) => {
      const value = formData[field as keyof typeof formData] as string; // Add nullish coalescing operator to provide a default value
      codeIsValid.value = value.length <= maxLength && value.trim() !== '';
      libelleIsValid.value = value.length <= maxLength && value.trim() !== '';
    };

    const confirmationDialog = ref(false);
    const router = useRouter();

    const showConfirmDialog = () => {
      confirmationDialog.value = true;
    };

    const submitFormInDialog = async () => {
      confirmationDialog.value = false; // Close confirmation dialog
      await submitForm(); // Call original submitForm function
    };

    const addProduct = async (newProduct: ProductSearchResultDto) => {
      loading.value = true;
      try {
        const existingProduct = products.value.find(
          (product) => product.code === newProduct.code
        );
        if (existingProduct) {
          resultMessage.value = 'Ce produit existe déjà.';
          console.log('Product already exists:', existingProduct);
          showSuccessDialog();
        } else {
          const createProd = await productsApiService.createProduct(newProduct);
          if (createProd.isOk && createProd.data) {
            products.value.push(createProd.data);
            console.log('Product created:', createProd.data);
            resultMessage.value = 'Le produit a été créé avec succès.';
            showSuccessDialog();
            resetForm();
            window.location.reload();
          } else {
            resultMessage.value = createProd.error?.message || 'Une erreur est survenue lors de la création du produit.';
            showSuccessDialog(); // Use the same dialog for both success and error
          }
        }
      } catch (error) {
        console.error('Error creating product:', error);
        resultMessage.value = 'Une erreur est survenue lors de la création du produit.';
        showSuccessDialog();
      } finally {
        loading.value = false;
      }
    };







    const submitForm = async () => {
      if (!codeIsValid?.value || !libelleIsValid?.value) {
        return; // Prevent submission if validation fails
      }

      try {
        loading.value = true;
        await addProduct(formData);
        console.log('Form submitted:', formData);
        resetForm();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        loading.value = false;
      }
    };



    /*    modify with he computed const, ... to make it work
    const isFormValid = () => {
      return codeIsValid?.value && libelleIsValid?.value;
    };
*/
    const showSuccessDialog = () => {
      $q.dialog({
        title: 'Information',
        message: resultMessage.value,
        cancel: false, // Disable cancel button as it's just informative
      }).onOk(() => {
        // No action needed on OK, dialog closes automatically
      });
    };

    return {
      formData,
      loading,
      //isFormValid,
      successDialog,
      resultMessage,
      addProduct,
      resetForm,
      submitForm,
      showForm,
      products,
      initialCreateProductFormState,
      codeIsValid,
      libelleIsValid,
      codeMaxLength,
      libelleMaxLength,
      confirmationDialog,
      submitFormInDialog,
      validateInput,
      textValidatorToFixed3,
      showConfirmDialog,
      showSuccessDialog,

    };
  },
});


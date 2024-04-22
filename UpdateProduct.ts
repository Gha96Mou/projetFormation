import { ProductSearchResultDto } from "@formation/shared-lib";
import { useQuasar } from "quasar";
import { productsApiService } from "src/boot/api";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";


export default defineComponent({

  name: 'UpdateProduct',
  props: {
    title: {
      type: String,
      required: true,
    },
  },

  setup: (props: any, { emit }: any) => {
    const $q = useQuasar();

    const initialUpdateProductFormState: {
      code: string;
      libelle: string;
      commentaires?: string;
      Offres : number;
      } = {
      code: '',
      libelle: '',
      commentaires: '',
      Offres : 0
    };

/*
    const productExists = ref(false);
    const submitCode = async () => {
      try {
        const existingProduct = await productsApiService.getProductByCode(formData.value.code) as unknown as ProductSearchResultDto;
        if (existingProduct) {
          productExists.value = true;
          formData.value.libelle = existingProduct.libelle;
          formData.value.commentaires = existingProduct.commentaires;
        } else {
          productExists.value = false;
          // Handle case where product does not exist
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
*/


    const formData = reactive<ProductSearchResultDto>({
      ...initialUpdateProductFormState,
    });

    const codeMaxLength = 5; // Set the maximum length of the code field
    const libelleMaxLength = 50; // Set the maximum length of the libelle field

    const resetForm = () => {
      formData.code = '';
      formData.libelle = '';
      formData.commentaires = '';


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


    const updateProduct = async (updatedProduct: ProductSearchResultDto) => {
      loading.value = true;
      try {
        // Check if product exists before updating
        const existingProduct = await productsApiService.getProductByCode(updatedProduct.code);
        if (!existingProduct) {
          resultMessage.value = 'Ce produit n\'existe pas dans la base de données.';
          //showErrorDialog(); // Use separate dialog for errors
          return; // Exit the function if product doesn't exist
        }

        // Update using service, handle potential errors
        const updateResponse = await productsApiService.updateProduct(updatedProduct.code, updatedProduct);
        if (updateResponse.isOk) {
          resultMessage.value = 'Le produit a été mis à jour avec succès.';
          showSuccessDialog();
        } else {
          resultMessage.value = updateResponse.error?.message || 'Une erreur est survenue lors de la mise à jour du produit.';
          //showErrorDialog();
        }
      } catch (error) {
        console.error('Error updating product:', error);
        resultMessage.value = 'Une erreur interne est survenue. Veuillez réessayer.';
        //showErrorDialog();
      } finally {
        loading.value = false;
      }
    };


  const submitForm = async () => {
    if (!codeIsValid.value || !libelleIsValid.value) {
      return; // Prevent submission if validation fails
    }

    try {
      loading.value = true;
      await updateProduct(formData);
      console.log('Form submitted:', formData);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      loading.value = false;
    }
  };


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
    codeMaxLength,
    libelleMaxLength,
    resetForm,
    products,
    loading,
    successDialog,
    resultMessage,
    showForm,
    codeIsValid,
    libelleIsValid,
    showConfirmDialog,
    confirmationDialog,
    submitForm,
    submitFormInDialog,
    showSuccessDialog,
    updateProduct,
    validateInput

  };
},

  });




















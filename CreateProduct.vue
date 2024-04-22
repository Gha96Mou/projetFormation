<template>
  <div class="product-form-container">
    <h2>{{ title }}</h2>
    <form @submit.prevent="submitForm">



      <div class="form-group">
  <label :class="{ 'disabled-label': !formData.code }" for="code">Code:</label>
        <input
          type="text"
          id="code"
          v-model="formData.code"
          required
          :maxlength="codeMaxLength"
          :rules="[textValidatorToFixed3]"
          class="form-input"
          :class="{ 'is-invalid': !codeIsValid }"
        />
        <div v-if="!codeIsValid" class="error-message">
          Code exceeds maximum length or is empty.
        </div>
      </div>

      <div class="form-group">
  <label :class="{ 'disabled-label': !formData.libelle }" for="libelle">Libellé:</label>
        <input
          type="text"
          id="libelle"
          v-model="formData.libelle"
          :maxlength="libelleMaxLength"
          required
          :rules="[textValidatorToFixed3]"
          class="form-input"
          :class="{ 'is-invalid': !libelleIsValid }"
        />
        <div v-if="!libelleIsValid" class="error-message">
          Libellé exceeds maximum length or is empty.
        </div>
      </div>

      <div class="form-group">
        <label for="commentaires">Commentaires:</label>
        <textarea id="commentaires" v-model="formData.commentaires"></textarea>
      </div>

      <div class="form-actions">
        <!--<button
  class="CreateProductButton"
  type="button"
  @click="showConfirmDialog"
  :disabled="loading || !isFormValid"
>
  <template v-if="!loading && isFormValid()"> <q-icon name="check" size="sm" color="white" />
  </template>
  <q-spinner size="sm" color="white" v-else /> Create
</button>-->

       <!-- <button class="CreateProductButton" type="button" @click="showConfirmDialog" :disabled="loading">Create</button>-->






        <button class="ResetProductButton" type="button" @click="resetForm" :disabled="loading">
          Reset
        </button>
      </div>
    </form>

    <q-dialog v-model="confirmationDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmation of create</div>
        </q-card-section>
        <q-card-section class="text-body">
          Are you sure you want to create this product?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" v-close-popup color="negative" />
          <q-btn flat label="Créer" color="primary" @click="submitFormInDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <notification-dialog
      v-model="successDialog"
      :message="resultMessage"
      @close="successDialog = false"
    ></notification-dialog>
  </div>
</template>

<script lang="ts" src="./CreateProduct.ts"></script>
<style lang="scss" src="./CreateProduct.scss"></style>



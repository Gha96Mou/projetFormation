<template>
  <div class="update-form-container">
    <h2>{{ title }}</h2>
    <form @submit.prevent="submitCode">
      <div class="form-group">
        <label for="code">Code:</label>
        <input
          type="text"
          id="code"
          v-model="formData.code"
          required
          :maxlength="codeMaxLength"
        />
        <div v-if="!codeIsValid" class="error-message">
          Code exceeds maximum length or is empty.
        </div>
      </div>

      <div v-if="productExists">
        <div class="form-group">
          <label for="libelle">Libellé:</label>
          <input
            type="text"
            id="libelle"
            v-model="formData.libelle"
            :maxlength="libelleMaxLength"
            required
          />
          <div v-if="!libelleIsValid" class="error-message">
            Libellé exceeds maximum length or is empty.
          </div>
        </div>

        <div class="form-group">
          <label for="commentaires">Commentaires:</label>
          <textarea id="commentaires" v-model="formData.commentaires"></textarea>
        </div>
      </div>

      <div v-if="productExists" class="form-actions">
        <button class="UpdateProductButton" type="button" @click="showConfirmDialog" :disabled="loading">Update</button>
        <button class="ResetProductButton" type="button" @click="resetForm" :disabled="loading">
          Reset
        </button>
      </div>
    </form>


    <q-dialog v-model="confirmationDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmation of update</div>
        </q-card-section>
        <q-card-section class="text-body">
         Are you sure you want to update this product?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" v-close-popup color="negative" />
          <q-btn flat label="Update" color="primary" @click="submitForm" />
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

<script lang = "ts " src = "./UpdateProduct.ts"></script>
<style lang = "scss " src = "./UpdateProduct.scss"></style>


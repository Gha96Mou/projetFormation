<template>
  <div>
    <div class="q-pa-sm q-pa-md-md">
      <h4>{{ title }}</h4>
      <q-form @submit.prevent="() => searchProductByLibelle(formPro.libelle, formPro.code)">
        <div class="q-pa-md">
          <div class="row q-col-gutter-xs q-col-gutter-md-md">
            <q-input
              v-model="formPro.code"
              :options="allProducts"
              option-label="code"
              option-value="code"
              class="col-12 col-md-4"
              emit-value
              hint="Recherche possible (contient)"
              input-debounce="0"
              label="Produit *"
              stack-label
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Aucun produit trouvé
                  </q-item-section>
                </q-item>
              </template>
            </q-input>

            <q-input
              v-model="formPro.libelle"
               :lazy-rules="true"
              class="col-12 col-md-4"
              hint="Commence par (min: 3)"
              label="Libelle"
              stack-label
            />

          </div>





          <div class="row justify-end">
            <q-btn color="primary" label="Rechercher" type="submit" @click="(evt) => searchProductByLibelle(formPro.libelle, formPro.code)"/>
            <q-btn class="q-ml-sm" color="primary" flat label="Reset" type="reset" @click="resetForm" />
          </div>
        </div>
      </q-form>
    </div>




    <div class="q-px-sm q-px-md-md">
      <q-table
      class = "ProductsTable"
      flat
      bordered
      title="Liste des produits"
      :rows="allProducts.filter((product) => product.code.includes(formPro.code) && product.libelle.startsWith(formPro.libelle))"
      :columns="columns"
      row-key="code"
      :loading="loading"
      style="width: 100%"
      @row-click="onRowClick"
     >
     </q-table>



    </div>
  </div>
</template>

<script lang="ts" src="./ProductSearchComponent.ts"></script>

<style lang="scss" src="./ProductSearchComponent.scss"></style>

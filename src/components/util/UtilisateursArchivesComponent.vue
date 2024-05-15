<template>
  <div class="row mt-5">
    <h1>Liste des utilisateurs archivés</h1>

    <v-card class="mt-5">
      <v-card-title class="d-flex justify-center pe-2 mb-3">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-text-field
            v-model="search"
            density="compact"
            label="Recherche"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            hide-details
            single-line
        ></v-text-field>
      </v-card-title>

      <v-data-table-virtual
          height="525"
          fixed-header
          :headers="headers"
          :items="users"
          :search="search"
      >

        <template v-slot:item.manager="{ item }">
          <v-checkbox
              v-model="item.manager"
              readonly
          ></v-checkbox>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              class="me-2"
              size="small"
              @click="editItem(item)"
              title="Modifier"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              size="small"
              @click="deleteItem(item)"
              title="Supprimer"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table-virtual>

      <v-dialog v-model="dialog" max-width="1200px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Modifier l'utilisateur</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                >
                  <v-text-field
                      v-model="editedItem.lastName"
                      label="Nom"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                >
                  <v-text-field
                      v-model="editedItem.firstName"
                      label="Prénom"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                >
                  <v-text-field
                      v-model="editedItem.username"
                      label="Nom d'utilisateur"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                >
                  <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                >
                  <v-text-field
                      v-model="editedItem.password"
                      label="Mot de passe"
                      :type="'password'"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Confirmer la suppression ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#b6057a" variant="text" @click="closeDelete">Annuler</v-btn>
            <v-btn color="#b6057a" variant="text" @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import UserApiService from "@/services/api/userApiService.js";

export default {
  name: 'UtilisateursArchivésComponent',

  data() {
    return {
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        { align: 'start', key: 'lastName', sortable: false, title: 'Nom' },
        { key: 'firstName', title: 'Prénom' },
        { key: 'username', title: "Nom d'utilisateur" },
        { key: 'email', title: 'Email' },
        { key: 'manager', title: 'Manager' },
      ],
      users: [],
      editedItem: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
      },
      defaultItem: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
      },
    };
  },

  async created() {
    try {
      this.users = await UserApiService.getAllArchived();
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs archivés :", error);
    }
  },
}

</script>

<style scoped>

</style>
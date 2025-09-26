<template>
  <div>
    <v-btn color="primary">
      Filtros
      <v-menu activator="parent">
        <v-list>
          <v-list-item v-for="i in 5" :key="i" link>
            <v-list-item-title>Item {{ i }}</v-list-item-title>
            <template v-slot:append>
              <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
            </template>

            <v-menu
              :open-on-focus="false"
              activator="parent"
              open-on-hover
              submenu
            >
              <v-list>
                <v-list-item v-for="j in 5" :key="j" link>
                  <v-list-item-title>Item {{ i }} - {{ j }}</v-list-item-title>
                 
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>
</template>
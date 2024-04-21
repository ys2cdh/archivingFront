

<script>
//import vClickOutside from 'click-outside-vue3'
import clickOutSide from "@mahdikhashan/vue3-click-outside";
  export default {
    directives: {
//      clickOutside: vClickOutside.directive
      clickOutSide,
    },
    methods: {
      onClickOutside (event) {
        if (event.target.classList.contains('included')) {
          console.log('Clicked include. Event: ', event)
        }else{
          console.log('Clicked outside. Event: ', event);
        }
        
      },
      include () {
        return [document.querySelector('.included')]
      },
    }
  };
</script>

<template>
  <div v-click-outside="{
      handler: onClickOutside,
      include
    }">ssss</div>
  <v-card
      class="ma-2 included"
      rounded="lg"
    >
      <v-card-text class="text-h6 included">
        This element is included
      </v-card-text>
    </v-card>

</template>
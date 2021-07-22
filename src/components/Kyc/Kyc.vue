<template>
    <div class="kfc-page">
      <div id='getid-component'>
        <h2 style="color:white">Loding...</h2>
      </div>
    </div>  
</template>
<script>

import { init } from 'getid-launcher';
  var Cookies = require('vue-cookies')
 const config = {
     mode:'inline',
    flowName: 'LdxKycFlow',
    apiUrl: 'https://ldx.sb.getid.dev',
    sdkKey: 'd4de391ede7610c045d20d2a46bd86b0ef9ae2a530f92fc5dbbdb0642afd28f1',
    metadata: {},
    containerId: 'getid-component',
    locale: 'en',
    profile: [{
        value: Cookies.get('firstName'),
        category: 'First name',
    }, 
    {
        value: Cookies.get('lastName'),
        category: 'Last name',
    }
    
    ],
    onComplete() {
       console.log('Success')
    },
    onFail({ code, message }) {
        console.log(code, message);
        console.log('Fail')
    },

};
export default {
name:'Kyc',
 mounted(){
   init(config);
  // window.location.reload()

  if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
 
 }
}
</script>

<style>

</style>
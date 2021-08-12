<template>
  <div class="clr">

    <div v-if="showContentOne">
      <h2>Content 1</h2>
       <button  @click="nextOneToTwo">Next</button>

    </div>
    
    <div v-if="showContentTwo && !showContentOne && !showContentThree">
      <h2>Content 2</h2>
      <button @click="previousTwoToOne">Previous</button>
      <button @click="nextTwoToThree">Next</button>
    </div>

     <div v-if="showContentThree && !showContentFour">
      <h2>Content 3</h2>
       <button  @click="previousThreeToTwo">Previous</button>
       <button @click="nextThreeToFour">Next</button> 
    </div>


     <div v-if="showContentFour">
      <h2>Content 4</h2>
       <button  @click="previousFourToThree">Previous</button>
       <button @click="submit">Next</button> 
     </div>

  
  
  </div>
</template>

<script>



export default {
  name: "Test",
  data() {
    return {
      showContentOne: true,
      
      showContentThree: false,
      showContentFour: false,
    //  showContentFive: false,
    };
  },


  methods: {

    
    nextOneToTwo() {
    
      this.showContentOne = false;
      this.showContentTwo=true;
    },
    previousTwoToOne() {
      this.showContentOne=true;
     
    },
   nextTwoToThree() {
    
      this.showContentThree = true;
     
    },
     previousThreeToTwo() {
     this.showContentTwo=true;
     this.showContentOne=false;
     this.showContentThree=false
     
    },

     nextThreeToFour() {
    
      this.showContentFour = true;
      
     
    },
     previousFourToThree() {
     this.showContentThree=true;
     this.showContentFour=false;
    
     
    },
    submit(){
      alert('Success')
    }
  
  },
};
</script>

<style>
.clr {
  background-color: azure;
}
</style>
<template>
      <div class="row">
        <div class="col-md-3" v-for="marketprice in coindata" :key="marketprice.coin">
            <div class="market-box">
              <div class="row mb-4">
                  <div class="col-md-6">
                    <img :src="marketprice.image"/>
                    <h5 v-bind:class="[change_24h < 0 ? 'minus' : 'plus']">{{ marketprice.pair_name }}</h5>
                  </div>
                  <div class="col-md-6">
                    <apexchart
                    height="40"
                        :options="chartOptions"
                        :series="series">
                    </apexchart>                        
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-9">
                      <h4  >${{ parseFloat(marketprice.price).toFixed(2) }}</h4><span class="span-sub">${{ parseFloat(marketprice.price).toFixed(2) }}</span>
                  </div>
                  <div class="col-md-3">
                      <div class="change-status" v-bind:class="[change_24h < 0 ? 'minus' : 'plus']">{{ marketprice.change_24h }}</div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <h3>$ {{ marketprice.price }}</h3>
                      <b>Volume</b>
                  </div>
              </div>
              
            </div>
        </div>                     
    </div>
    <Carousel :settings="settings" :breakpoints="breakpoints">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item"> <h2>Hello {{ slide }}</h2></div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>

import axios from 'axios';
//import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

export default {
  props: {
  },
   components: {
    Carousel,
    Slide,
    Navigation,
  },
 
    data() {
        return{
                // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: 'center',
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'start',
      },
    },
            coindata: [],
              series: [{
           // name: "STOCK ABC",
            data: [10,20,3,26,86,36]
          }],
      chartOptions: {
            chart: {
              type: 'area',
              parentHeightOffset: 0,
                sparkline: {
                    enabled: true
                },              
            toolbar: {
            show: false
            },
              zoom: {
                enabled: false,
                
              }
            },
            stroke: {
             // curve: 'straight'
            },
            
            title: {
            //  text: 'Fundamental Analysis of Stocks',
              align: 'left'
            },
            subtitle: {
            //  text: 'Price Movements',
              align: 'left'
            },
            //labels:['Dec 07','Dec 08','Dec 09','Dec 10','Dec 11'],
            tooltip: {
                enabled: false             
            },
            fill: {
            type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.0,
                    stops: [0, 100]
                },
            },            
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },           
            grid: {
                show: false,      // you can either change hear to disable all grids
                padding: {
                    left: 0,
                  right: 0
                },                
                xaxis: {
                    lines: {
                        show: false  //or just here to disable only x axis grids
                    },
                    labels: {
                    show: false,
                },                    
                },  
                yaxis: {
                    lines: { 
                        show: false  //or just here to disable only y axis
                    },
                    labels: {
                        show: false,
                    },                    
                },   
            },            
            xaxis: {
                labels: {
                    show: false
                },
                lines: {
                    show: false  //or just here to disable only x axis grids
                }                
            },   
            yaxis: {
                y: 0,
                offsetX: 0,
                offsetY: 0,
                padding: {
                    left: 0,
                    right: 0
                },                
                labels: {
                    show: false
                },
                lines: {
                    show: false  //or just here to disable only x axis grids
                }                
            },        
             axisTicks: {
             show: false
            },
            axisBorder: {
              show: false
            },
  
          },
        }
    },

    methods: {
        async getMarketDropdown() {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
            "X-LDX-Inspira-Access-Token"
            )}`,
        };           
        axios.get("https://dapi.exus.live/api/mobile/v1/dashboard/summary/GBP?volume_24h=desc", {headers: headers})
            .then((res) => {
            this.coindata =  res.data;
            console.log(this.coindata); 

            for (let i = 0; i < this.coindata.length; i++) {
                this.coin = this.coindata[i].pair_name.toLowerCase();
                this.lastprice = this.coindata[i].price;
                this.priceChanege = this.coindata[i].change_24h;
            }
        })
            .catch(function (error) {
            console.log(error);
            })
        },       
    },
    mounted() {
        this.getMarketDropdown();
    }

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Market/Market";
</style>
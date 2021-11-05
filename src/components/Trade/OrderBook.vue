<template>
  <div>
    <div class="trade-box order-book-box">
      <div class="trade-header">
        Order Book
        <select class="form-control sel-val" @change="onChange($event)">
          <option value="0.01">0.01</option>
          <option value="0.1">0.1</option>
          <option value="0">1</option>
        </select>
        <div
          class="sw-b"
          @click="activebuy"
          v-bind:class="[buytab ? 'active' : '']"
          title="Buy"
        >
          <div class="box-sm">
            <div class="half">
              <div class="eql green-bg"></div>
            </div>
            <div class="half">
              <div class="eql blue-bg"></div>
            </div>
          </div>
        </div>
        <div
          class="sw-b"
          @click="activesell"
          v-bind:class="[selltab ? 'active' : '']"
          title="Sell"
        >
          <div class="box-sm">
            <div class="half">
              <div class="eql red-bg"></div>
            </div>
            <div class="half">
              <div class="eql blue-bg"></div>
            </div>
          </div>
        </div>
        <div
          class="sw-b"
          @click="activebuysell"
          v-bind:class="[buyselltab ? 'active' : '']"
          title="Buy and Sell"
        >
          <div class="box-sm">
            <div class="half">
              <div class="eq red-bg"></div>
              <div class="eq green-bg"></div>
            </div>
            <div class="half">
              <div class="eql blue-bg"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-title">
        <div class="trade-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col" width="35%">Price({{ pairName }})</th>
                <th scope="col" width="30%">Amount({{ SelectedSymbol }})</th>
                <th scope="col" class="text-right">Total</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="top-order-book" v-bind:class="[showsell || showbuy ? 'full-data' : 'limited-data']">      
        <div
          class="trade-body sell-body"
          v-if="showbuyandsell == true || showsell == true"
          v-bind:class="[showsell ? 'sell-full' : 'sell-default']"
        >
          <table class="table table-hover">
            <tbody v-if="limitRows">
              <tr @mouseover="removeoverflow" @mouseleave="resetoverflow"
                v-for="sell in priceSellBind.slice(priceSellBind.length-11, priceSellBind.length)"
                :key="sell"
                v-show="deci == '0.01'"
              >
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="35%">
                  {{ parseFloat(sell[0]).toFixed(2) }} 
                </td>
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="30%">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}
                  <transition name="fade">
                    <div class="tooltip2">
                      <div class="tool-row">
                        <div class="tool-title">Avg Price:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[0]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[3]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ pairName }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[4]).toFixed(5) }}
                        </div>
                      </div>
                    </div>
                  </transition>
                </td>
              </tr>
              <tr @mouseover="removeoverflow" @mouseleave="resetoverflow"
                v-for="sell in priceSellBind.slice(priceSellBind.length-11, priceSellBind.length)"
                :key="sell"
                v-show="deci == '0.1'"
              >
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="35%">
                  {{ parseFloat(sell[0]).toFixed(1) }}
                </td>
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="30%">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}
                   <transition name="fade">
                    <div class="tooltip2">
                      <div class="tool-row">
                        <div class="tool-title">Avg Price:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[0]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[3]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ pairName }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[4]).toFixed(5) }}
                        </div>
                      </div>
                    </div>
                  </transition>
                </td>
              </tr>
              <tr @mouseover="removeoverflow" @mouseleave="resetoverflow"
               v-for="sell in priceSellBind.slice(priceSellBind.length-11, priceSellBind.length)"
                :key="sell"
                v-show="deci == '0'"
              >
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="35%">
                  {{ parseFloat(sell[0]).toFixed(0) }}
                </td>
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="30%">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}
                   <transition name="fade">
                    <div class="tooltip2">
                      <div class="tool-row">
                        <div class="tool-title">Avg Price:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[0]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[3]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ pairName }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[4]).toFixed(5) }}
                        </div>
                      </div>
                    </div>
                  </transition>
                </td>
              </tr>
            </tbody>

            <!-- Sells Only -->
             <tbody v-else>
              <tr @mouseover="removeoverflow" @mouseleave="resetoverflow"
                v-for="sell in onlySell"
                :key="sell"
                v-show="deci == '0.01'"
              >
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="35%">
                  {{ parseFloat(sell[0]).toFixed(2) }}
                </td>
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="30%">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}

                  <transition name="fade">
                      <div class="tooltip3">
                        <div class="tool-row">
                          <div class="tool-title">Avg Price:</div>
                          <div class="tool-val">
                            {{ parseFloat(sell[0]).toFixed(5) }}
                          </div>
                        </div>
                        <div class="tool-row">
                          <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                          <div class="tool-val">
                            {{ parseFloat(sell[5]).toFixed(5) }}
                          </div>
                        </div>
                        <div class="tool-row">
                          <div class="tool-title">Sum {{ pairName }}:</div>
                          <div class="tool-val">
                            {{ parseFloat(sell[6]).toFixed(5) }}
                          </div>
                        </div>
                      </div> 
                  </transition>
                </td>
              </tr>
              <tr @mouseover="removeoverflow" @mouseleave="resetoverflow"
                v-for="sell in onlySell"
                :key="sell"
                v-show="deci == '0.1'"
              >
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="35%">
                  {{ parseFloat(sell[0]).toFixed(1) }}
                </td>
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="30%">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}

                  <transition name="fade">
                    <div class="tooltip3">
                      <div class="tool-row">
                        <div class="tool-title">Avg Price:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[0]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[5]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ pairName }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[6]).toFixed(5) }}
                        </div>
                      </div>
                    </div>
                  </transition>
                </td>
              </tr>

              <tr @mouseover="removeoverflow" @mouseleave="resetoverflow"
                v-for="sell in onlySell"
                :key="sell"
                v-show="deci == '0'"
              >
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="35%">
                  {{ parseFloat(sell[0]).toFixed(0) }}
                </td>
                <td @click="sellPriceOrderBook(sell[0], sell[1])" width="30%">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}
                  <transition name="fade">
                    <div class="tooltip3">
                      <div class="tool-row">
                        <div class="tool-title">Avg Price:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[0]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[5]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ pairName }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[6]).toFixed(5) }}
                        </div>
                      </div>
                    </div>
                  </transition>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="trade-body middle-bdy"> 
          <table class="table table-hover special">
            <tbody>
              <!-- <tr v-show="price ==''">
                <td v-bind:class="[matchFill == 'buy' ? 'buy' : 'sell']" width="35%">
                  {{ matchPriceMATCH }}
                </td>
                <td class="mid" width="30%">${{ matchPriceMATCH }}</td>
                <td class="text-right">
                  <div class="read-more">
                    <router-link to="/buy-sell-list">More</router-link>
                  </div>
                </td>
              </tr> -->
              <tr >
                <td v-bind:class="[matchFill == 'buy' ? 'buy' : 'sell']" width="35%">
                  {{ price }}
                </td>
                <td class="mid" width="30%">${{ price }}</td>
                <td class="text-right">
                  <div class="read-more">
                    <router-link to="/buy-sell-list">More</router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="trade-body buy-body" 
          v-if="showbuyandsell == true || showbuy == true"
          v-bind:class="[showbuy ? 'buy-full' : 'buy-default']"
        >
          <table lass="table table-hover" style="width: 100% !important" v-if="limitRows">
            <tr @mouseover="removeoverflow" @mouseleave="resetoverflow"
              class="plus"
              v-for="buy in priceBuyBind.slice(0, 11)"
              :key="buy"
              v-show="deci == '0.01'"
            >
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="35%">
                {{ parseFloat(buy[0]).toFixed(2) }}
              </td>
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="30%">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}

                <transition name="fade">
                  <div class="tooltip2">
                    <div class="tool-row">
                      <div class="tool-title">Avg Price:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[0]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[3]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ pairName }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[4]).toFixed(5) }}
                      </div>
                    </div>
                  </div>
                </transition>
              </td>
            </tr>

            <tr @mouseover="removeoverflow" @mouseleave="resetoverflow"
              class="plus"
              v-for="buy in priceBuyBind.slice(0, 11)"
              :key="buy"
              v-show="deci == '0.1'"
            >
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="35%">
                {{ parseFloat(buy[0]).toFixed(1) }}
              </td>
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="30%">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}
                 <transition name="fade">
                  <div class="tooltip2">
                    <div class="tool-row">
                      <div class="tool-title">Avg Price:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[0]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[3]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ pairName }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[4]).toFixed(5) }}
                      </div>
                    </div>
                  </div>
                </transition>
              </td>
            </tr>

            <tr @mouseover="removeoverflow" @mouseleave="resetoverflow"
              class="plus"
              v-for="buy in priceBuyBind.slice(0, 11)"
              :key="buy"
              v-show="deci == '0'"
            >
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="35%">
                {{ parseFloat(buy[0]).toFixed(0) }}
              </td>
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="30%">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}
                 <transition name="fade">
                  <div class="tooltip2">
                    <div class="tool-row">
                      <div class="tool-title">Avg Price:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[0]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[3]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ pairName }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[4]).toFixed(5) }}
                      </div>
                    </div>
                  </div>
                </transition>
              </td>
            </tr>
          </table>

          <table lass="table table-hover" style="width: 100% !important" v-else>
            <tr @mouseover="removeoverflow" @mouseleave="resetoverflow"
              class="plus"
              v-for="buy in priceBuyBind"
              :key="buy"
              v-show="deci == '0.01'"
            >
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="35%">
                {{ parseFloat(buy[0]).toFixed(2) }}
              </td>
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="30%">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}

                <transition name="fade">
                  <div class="tooltip3">
                    <div class="tool-row">
                      <div class="tool-title">Avg Price:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[0]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[3]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ pairName }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[4]).toFixed(5) }}
                      </div>
                    </div>
                  </div>
                </transition>
              </td>
            </tr>

            <tr
              class="plus"
              v-for="buy in priceBuyBind"
              :key="buy"
              v-show="deci == '0.1'"
            >
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="35%">
                {{ parseFloat(buy[0]).toFixed(1) }}
              </td>
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="30%">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}
                <transition name="fade">
                  <div class="tooltip3">
                    <div class="tool-row">
                      <div class="tool-title">Avg Price:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[0]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[3]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ pairName }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[4]).toFixed(5) }}
                      </div>
                    </div>
                  </div>
                </transition>
              </td>
            </tr>

            <tr
              class="plus"
              v-for="buy in priceBuyBind"
              :key="buy"
              v-show="deci == '0'"
            >
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="35%">
                {{ parseFloat(buy[0]).toFixed(0) }}
              </td>
              <td @click="sellPriceOrderBook(buy[0], buy[1])" width="30%">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}
                <transition name="fade">
                  <div class="tooltip3">
                    <div class="tool-row">
                      <div class="tool-title">Avg Price:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[0]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[3]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ pairName }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[4]).toFixed(5) }}
                      </div>
                    </div>
                  </div>
                </transition>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="trade-box">
      <div class="trade-header">Recent Trades</div>
      <div class="top-title">
        <div class="trade-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col" width="35%">Price({{ pairName }})</th>
                <th scope="col" width="30%">Amount({{ SelectedSymbol }})</th>
                <th scope="col" class="text-right">Total</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="top-order-book recent">
        <div class="trade-body recent-body">
          <table lass="table table-hover" style="width: 100% !important">
            <tr
              v-for="recent in recentData"
              :key="recent"
              v-show="deci == '0.01'"
            >
              <td width="35%"
                v-bind:class="[recent.side == 'buy' ? 'buy' : 'sell']"
              >
                {{ parseFloat(recent.price).toFixed(2) }}
              </td>
              <td width="30%">
                {{ parseFloat(recent.size).toFixed(5) }}
              </td>
              <td class="text-right">
                {{recent.time.slice(10, 19)}}
              </td>
            </tr>

            <tr
              v-for="recent in recentData"
              :key="recent"
              v-show="deci == '0.1'"
            >
              <td width="35%"
                v-bind:class="[recent.side == 'buy' ? 'buy' : 'sell']"
              >
                {{ parseFloat(recent.price).toFixed(1) }}
              </td>
              <td width="30%">
                {{ parseFloat(recent.size).toFixed(5) }}
              </td>
              <td class="text-right">
                 {{recent.time.substring(0, recent.time.lastIndexOf('T'))}}
              </td>
            </tr>

            <tr v-for="recent in recentData" :key="recent" v-show="deci == '0'">
              <td width="35%"
                v-bind:class="[recent.side == 'buy' ? 'buy' : 'sell']"
              >
                {{ parseFloat(recent.price).toFixed(0) }}
              </td>
              <td width="30%">
                {{ parseFloat(recent.size).toFixed(5) }}
              </td>
              <td class="text-right">
                {{recent.time.substring(0, recent.time.lastIndexOf('T'))}}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  emits: ["sellPriceOrderBookPass", "sellAmountOrderBookPass"],
  name: "orderbook",
  components: {},
  props: ["SelectedSymbol", "pairName","fullPairName"],

  data() {
    return {
      buyselltab: true,
      selltab: false,
      buytab: false,
      showbuyandsell: true,
      showbuy: false,
      showsell: false,
      socketUrl: process.env.VUE_APP_SOCKET_URL,

      connection: null,
      priceSell: [],
      priceSellOnlySell:[],
      priceBuy: [],

      dataAl: [],

      priceSellBind: [],
      priceBuyBind: [],

      priceBool: false,
      recentDataLoop: [],
      recentData: [],

      priceBuyUpdate: [],
      fill: "",
      price: "",
      deci: "0.01",
      reentDataOnLoad: [],

      buyTotal: 0,
      sellTotal: 0,

      buyAmount: 0,
      avgBuy: "",
      sumAmount: 0,
      sumTotal: "",

      selAmount: 0,
      matchFill: "",
      matchPriceMATCH: "",

      sellTest:false,
    

     limitRows:true,
     onlyBuy:[],
     onlySell:[],
     onlyBuyAmount:0,
     onlyBuyTotal:0,

     pairNameSelected:"",
     setCoinValue:"",
     chanelType:"",
     productIdTemp:"",
     priValue:"",
     fullPairNameLocalStorage:""

    };
  },
 watch: {
     fullPairName: function(valueSelected) {
       this.pairNameSelected=valueSelected
       
       this.sendMessage()
         const headers = {
        "Content-Type": "application/json",
      };
    let ts =this
        axios
        .get(`https://tradeapi.exus.live/api/products/trades?productId=${valueSelected}`, {
          headers: headers,
        })
        .then((response) => {
       
          if (ts.recentData.length != 0) {
            ts.recentData = [];
           
          }
          for (let b = 0; b < response.data.length; b++) {
            ts.recentData.push({
              side: response.data[b].side,
              size: response.data[b].size,
              price: response.data[b].price,
              time:response.data[b].time
            });
          }

        
        })
        .catch(function (error) {
          console.log(error);
        });


        axios
        .get(
          `https://tradeapi.exus.live/api/ticker?productId=${valueSelected}`,
          {
            headers: headers,
          }
        )
        .then((response) => {
         
            
            if(response.data==null){
                 this.price='-'
            }else{
              this.price=response.data.Open //Price..
            }
           
        })
        .catch(function (error) {
          console.log(error);
        //  alert("Err")
        });
       
 }, 
  },
 
  methods: {
    async onChange(event) {
      this.deci = event.target.value;
    },
    async selectedSymbol(SelectedSymbol) {
      this.symbol = SelectedSymbol;
    },
    async sellPriceOrderBook(value,value2) {
      this.$emit("sellPriceOrderBookPass", value);
      this.$emit("sellAmountOrderBookPass", value2);
    },
    // async amountOrderBook(amount) {
    //   this.$emit("sellAmountOrderBookPass", amount);
    // },

    async closeModalDetail() {
      this.$refs.roedetails.closeModal();
    },

    async sendMessage() {
    
     if(this.productIdTemp !=''){
        this.priValue=this.productIdTemp
      }
    
    
      this.productIdTemp=this.pairNameSelected
    try { 
    
        this.connection.send(
          JSON.stringify({
            type: "subscribe",
            product_ids: [this.pairNameSelected],
            currency_ids: [],
            channels: ["ticker", "match", "level2", "funds", "order"],
           
         })
        );
      } catch (error) {
        console.log(error);
      }

    if(this.priValue!=this.pairNameSelected){
   
      try { 
        this.connection.send(
          JSON.stringify({
            type: "unsubscribe",
            product_ids: [this.priValue],
            currency_ids: [],
            channels: ["ticker", "match", "level2", "funds", "order"],
            
         })
        );
      } catch (error) {
        console.log(error);
      }
  }

 if(this.priValue!=this.pairNameSelected){
    try { 
    
        this.connection.send(
          JSON.stringify({
            type: "subscribe",
            product_ids: [this.pairNameSelected],
            currency_ids: [],
            channels: ["ticker", "match", "level2", "funds", "order"],
           
         })
        );
      } catch (error) {
        console.log(error);
      }
  }
   
    },
    async setData(dataSellArray, dataBuyArray, fillPrice,sellarray) {
          this.fullPairNameLocalStorage= localStorage.getItem("selectedmainCoin");
              if (dataSellArray != undefined) {
                   this.priceSellBind = dataSellArray;
                   this.priceSellBind.sort((a, b) => {return b[0] - a[0]
                    });
    
              
                 for (let z = this.priceSellBind.length-1; z>=0; z--) {
                        this.buyAmount += parseFloat(this.priceSellBind[z][1]);
                        this.priceSellBind[z][3] = this.buyAmount;
                        this.buyTotal += parseFloat(this.priceSellBind[z][0]) * parseFloat(this.priceSellBind[z][1]);
                        this.priceSellBind[z][4] = this.buyTotal;
                      }
        
                    if (this.priceSellBind.length > 11)
                    {
                          this.priceSellBind.shift();
                    }
                }
         
                if (dataBuyArray != undefined) {
                  
                  this.priceBuyBind = dataBuyArray;
                  this.priceBuyBind.sort((a, b) => {
                      return b[0] - a[0];
                  });

              for (let a = 0; a<=this.priceBuyBind.length-1; a++) {
                this.selAmount += parseFloat(this.priceBuyBind[a][1]);
                this.priceBuyBind[a][3] = this.selAmount;
                this.sellTotal += parseFloat(this.priceBuyBind[a][0]) * parseFloat(this.priceBuyBind[a][1]);
                this.priceBuyBind[a][4] = this.sellTotal;
              }
     
                }

                if(sellarray != undefined){
                  this.onlySell=sellarray
                    for (let z = this.onlySell.length-1; z>=0; z--) {
                      this.onlyBuyAmount += parseFloat(this.onlySell[z][1])
                      this.onlySell[z][5] = this.onlyBuyAmount;
                      this.onlyBuyTotal += parseFloat(this.onlySell[z][0]) * parseFloat(this.onlySell[z][1]);
                      this.onlySell[z][6] = this.onlyBuyTotal;
                    }
                    this.onlySell.sort((a, b) => {
                      return b[0] - a[0];
                    });
                
                }
                this.price = fillPrice;
                if(this.price==undefined || this.price==''){
                  this.getPrice()
                }
                 
                
     
    },
    async activebuysell() {
      this.buyselltab = true;
      this.selltab = false;
      this.buytab = false;

      this.showbuyandsell = true;
      this.showbuy = false;
      this.showsell = false;

      this.limitRows=true
      
              
        
    },
    async activesell() {
      this.selltab = true;
      this.buyselltab = false;
      this.buytab = false;

     this.showbuyandsell = false;
      this.showbuy = false;
      this.showsell = true;

      this.sellTest=true
      this.limitRows=false
   
    },
    async activebuy() {
      this.buytab = true;
      this.buyselltab = false;
      this.selltab = false;

      this.showbuyandsell = false;
      this.showbuy = true;
      this.showsell = false;

      this.limitRows=false
    },
    async removeoverflow() {
      document.querySelector("body").classList.add("remove-overflow");
    },  
    async resetoverflow() {
      document.querySelector("body").classList.remove("remove-overflow");
    },

    async getPrice(){
       
       const headers = {
        "Content-Type": "application/json",
      };
      axios
        .get(
          `https://tradeapi.exus.live/api/ticker?productId=${this.fullPairNameLocalStorage}`,
          {
            headers: headers,
          }
        )
        .then((response) => {
            if(response.data==null){
                 this.price='-'
            }else{
              this.price=response.data.Open //Price..
            }
        
         
        })
        .catch(function (error) {
          console.log(error);
         // alert("err")
         // this.price=="0"
        });
    }
   

  },


  
mounted() {
    this.activebuysell()
    this.matchPriceMATCH = localStorage.getItem("matchPriceMATCH");
    this.fullPairNameLocalStorage= localStorage.getItem("selectedmainCoin");
  
  },
  
 created: function () {
    
    let ts = this;
    this.connection = new WebSocket("wss://stream.exus.live/ws");
   
    this.connection.onmessage = function (event) {
      console.log(JSON.parse(event.data))
     
      ts.dataAl=[]
      console.log(ts.dataAl)
      ts.dataAl = JSON.parse(event.data);
       console.log(ts.dataAl)
     
     
      if ( JSON.parse(event.data).type == "snapshot") {
        ts.priceSell =  JSON.parse(event.data).asks;
        ts.priceBuy =  JSON.parse(event.data).bids;
        ts.priceSellOnlySell= JSON.parse(event.data).asks;
       
       

                
      }
 
      if (JSON.parse(event.data).type == "l2update") {
        ts.priceSell = [];
        ts.priceBuy = [];
        ts.priceSellOnlySell=[];
       

        ts.priceSell =  JSON.parse(event.data).asks;
        ts.priceBuy =  JSON.parse(event.data).bids;
        ts.priceSellOnlySell= JSON.parse(event.data).asks;
     
     console.log(ts.priceSell)

                  // for (let z = ts.priceSell.length-1; z>=0; z--) {
                  //       ts.buyAmount += parseFloat(ts.priceSell[z][1]);
                  //       ts.priceSell[z][3] = ts.buyAmount;
                  //       ts.buyTotal += parseFloat(ts.priceSell[z][0]) * parseFloat(ts.priceSell[z][1]);
                  //       ts.priceSell[z][4] = ts.buyTotal;
                  //     }

                  // for (let a = 0; a<=ts.priceBuy.length-1; a++) {
                  //   ts.selAmount += parseFloat(ts.priceBuy[a][1]);
                  //   ts.priceBuy[a][3] = ts.selAmount;
                  //   ts.sellTotal += parseFloat(ts.priceBuy[a][0]) * parseFloat(ts.priceBuy[a][1]);
                  //   ts.priceBuy[a][4] = ts.sellTotal;
                  // }
    
      } else {
        // Recent Trades //ts.dataAl.type == "order" || ts.dataAl.type == "match" || ***************To Do****************

        if (ts.dataAl.type == "match") {
          ts.fill = ts.dataAl.price;
          ts.matchFill = ts.dataAl.side;
          localStorage.setItem("matchPriceMATCH", ts.dataAl.price);
         

           ts.recentData.push({
              side: ts.dataAl.side,
              size: ts.dataAl.size,
              price: ts.dataAl.price,
              time:ts.dataAl.time
            });
         ts.recentData.reverse()
        }
      }
    ts.setData(ts.priceSell, ts.priceBuy, ts.fill,ts.priceSellOnlySell);
   
    };

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
      ts.sendMessage();
     
    };
  },

 
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Trade/Trade";

.read-more {
  padding: 0;
  float: left;
  width: 100%;
  text-align: right;
  a {
    color: white;
    text-decoration: underline;
  }
}
.buy {
  color: #18e140 !important;
}
.sell {
  color: red !important;
}

.table.table-hover.special tr td {
    font-size: 1.2rem !important;
    font-weight: 900;
    padding-top: 6px;
    padding-bottom: 7px;
}
.table.table-hover.special tr td.sm {
    font-size: 0.8rem !important;
    font-weight: 900;
}
.mid {
  color: #878787 !important;
}
.success-tst {
  color: #18e140 !important;
}
.td-al {
  margin-left: "30px";
}
</style>
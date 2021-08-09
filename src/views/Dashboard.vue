<template>
  <default-layout>
      <div class="container-area">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="row" style="margin-top: 15px;">
                <div class="col-md-12 no-padding">
                  <div class="content">
                    <div class="row">
                      <div class="col-md-8">
                        <div class="card">
                          <div class="card-header">
                            <h2>Wallet Balances</h2>
                          </div>
                          <div class="card-body">
                            <div class="row">
                              <div class="col-md-6">
                                <div class="block">
                                  <p>Account Balance</p>
                                  <h4>0.37,434.74</h4>
                                </div>
                                <div class="block">
                                  <p>Account Balance</p>
                                  <h4>0.37,434.74</h4>
                                </div>                          
                              </div>
                              <div class="col-md-6">
                                <highcharts :options="chartOptions"></highcharts>
                              </div>
                            </div>
                          </div>                    
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="card">
                          <div class="card-header">
                            <h2>Wallet Balances</h2>
                          </div>
                          <div class="card-body no-padding no-padding-all">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="list-group">
                                  <a href="#" class="list-group-item list-group-item-action">Sample announcements goes <br>here</a>
                                  <a href="#" class="list-group-item list-group-item-action">Sample announcements goes <br>here</a>
                                  <a href="#" class="list-group-item list-group-item-action">Sample announcements goes <br>here</a>
                                  <a href="#" class="list-group-item list-group-item-action">Sample announcements goes <br>here</a>
                                  <a href="#" class="list-group-item list-group-item-action">Sample announcements goes <br>here</a>
                                </div>                         
                              </div>
                            </div>
                          </div>                    
                        </div>                  
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-8">
                        <div class="card table-card">
                          <div class="card-header">
                            <h2>Login History</h2>
                          </div>
                          <div class="card-body no-padding no-padding-all ">
                            <div class="row">
                              <div class="col-md-12">
                                <table class="table table-hover">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">First</th>
                                      <th scope="col">Last</th>
                                      <th scope="col">Handle</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>1</td>
                                      <td>Mark</td>
                                      <td>Otto</td>
                                      <td>@mdo</td>
                                    </tr>
                                    <tr>
                                      <td>2</td>
                                      <td>Jacob</td>
                                      <td>Thornton</td>
                                      <td>@fat</td>
                                    </tr>
                                    <tr>
                                      <td>2</td>
                                      <td>Jacob</td>
                                      <td>Thornton</td>
                                      <td>@fat</td>
                                    </tr>                              
                                  </tbody>
                                </table>                         
                              </div>
                            </div>
                          </div>                    
                        </div>
                      </div>
                      <div class="col-md-4">                 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </default-layout>
</template>

<script>
import {Chart} from 'highcharts-vue'
import DefaultLayout from '../layout/DefaultLayout.vue';

export default {
    name:'dashboard',
    components: { 
      DefaultLayout,
      highcharts: Chart
    },
    data() {
      return {
        chartOptions: {
            chart: {           
                margin: [0, 0, 0, 0],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0,
                type: 'pie',
                backgroundColor: null,
            },
            plotOptions: {
                pie: {
                    size:300,
                    borderWidth: 30,
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: 'Browsers',
                data: [["LDXI",6],["BTC",4], ["ETH",10],["HNT",5]],
                size: '20%',
                innerSize: '85%',
                color:['red','red'],
                showInLegend:true,
                dataLabels: {
                    enabled: false
                }
            }]
        }
      }
    }    
}
</script>

<style scoped>
.nav-link {
    font-size: 0.875rem;
    color: #fff;
    padding: .5rem 1.75rem !important;
}
.content{
  float: left;
    width: 100%;
    padding: 15px;
    min-height: 864px;
}
.no-padding-all{
  padding-top: 0 !important;
  padding-bottom: 0  !important;
}
.card{
    min-height: 300px;
    background-color: #2b2c3e;
    border-radius: 10px;
    padding: 0;
    margin-bottom: 15px;
}
.card-header{
    border-bottom: solid #393e77 2px;
    padding-bottom: 30px;
    padding: 30px
}
.card-body{
    padding: 30px;
}

.card-header h2{
    color: #fff;
    font-family: Rubik;
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
}
p{
  margin-top: 0;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #fff;
    margin: 0;
    padding-bottom: 10px;
}
h4{
    font-size: 2rem;
    color: #fff;
    margin: 0;
    font-weight: 600;
}
.block{
      padding-bottom: 30px;
      float: left;
      width: 100%;
}
.block:last-child{
  padding-bottom: 0;
}
.list-group-item {
    background-color: transparent;
    color: #fff;
    border: solid 1px #393e77;
    border-left: none;
    border-right: none;
    font-size: 0.875rem;
    padding: 15px 30px;
    line-height: 20px;
}
.list-group-item:first-child{
  border: none !important;
}
.list-group-item::before{
    font-family: 'remixicon' !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    content: "\ea6e";
    right: 23px;
    position: absolute;
    top: 23px;
}
.card table{
  margin-bottom: 0;
}
.card table tr th{
color: #a2a4bf;
    font-size: 0.875rem;
    font-weight: 400;
    padding: 15px 30px;
    border-bottom-color: #393e77 !important;
}
.card table tr td{
color: #fff;
    font-size: 0.875rem;
    padding: 15px 30px;
    font-weight: 400;
    border-bottom-color: #393e77;
}
.table-card .card-header{
    border-bottom: none;
    padding-bottom: 15px;
}

</style>
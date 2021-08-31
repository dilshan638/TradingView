<template>
  <default-layout>
    <div class="card table-card">
      <div class="card-header">
        <h2>Login History</h2>
      </div>
      <div class="card-body no-padding no-padding-all">
        <div class="row">
          <div class="col-md-12">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Date & Time</th>
                  <th scope="col">IP Address</th>
                  <th scope="col">Browser</th>
                  <th scope="col">Location</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="lghistory in loginHistory"
                  :key="lghistory.created_at"
                >
                  <td>{{ lghistory.No }}</td>
                  <td>{{ lghistory.created_at }}</td>
                  <td>{{ lghistory.ip_address }}</td>
                  <td>{{ lghistory.browser_name }}</td>
                  <td>{{ lghistory.city }},{{ lghistory.country }}</td>
                  <td>
                    <span class="success-text">{{ lghistory.activity }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-md-11">
            <a class="view-more">View More</a>
          </div>
        </div>
      </div>
    </div>
  <div style="text-align: left;">
    <h3>Static mode sample</h3>
    <label>SearchBy:</label><input v-model="searchTerm" />
  </div>    
<table-lite
    :is-static-mode="true"
    :has-checkbox="true"
    :columns="table2.columns"
    :rows="table2.rows"
    :total="table2.totalRecordCount"
    :sortable="table2.sortable"
    @return-checked-rows="updateCheckedRows"
  ></table-lite>
  </default-layout>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import TableLite from "vue3-table-lite";
import DefaultLayout from '../../layout/DefaultLayout.vue';

export default defineComponent({
  name: "App",
  components: {
    TableLite,
    DefaultLayout
  },
  data() {
    // loginhistory: [];
  },
  setup() {
    const updateCheckedRows = (rowsKey) => {
      console.log(rowsKey);
    };
    const searchTerm = ref("");
    const data = reactive([]); 
    for (let i = 0; i < 126; i++) {
      data.push({
        id: i,
        name: "TEST" + i,
        email: "test" + i + "@example.com",
      });
    }
    const table2 = reactive({
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
          display: function (row) {
            return (
              '<a href="#" data-id="' +
              row.user_id +
              '" class="is-rows-el name-btn">' +
              row.name +
              "</a>"
            );
          },
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
        {
          label: "",
          field: "quick",
          width: "10%",
          display: function (row) {
            return (
              '<button type="button" data-id="' +
              row.user_id +
              '" class="is-rows-el quick-btn">Button</button>'
            );
          },
        },
      ],
      rows: computed(() => {
        return data.filter(
          (x) =>
            x.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      }),
      totalRecordCount: computed(() => {
        return table2.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
      messages: {
        pagingInfo: "Showing {0}-{1} of {2}",
        pageSizeChangeLabel: "Row count:",
        gotoPageLabel: "Go to page:",
        noDataAvailable: "No data",
      },
    });
    return {
      searchTerm,
      table2,
      updateCheckedRows,
    };
  },
  methods: {
    // async getHistory() {

    // }  
  }
});
</script>

<style>
</style>
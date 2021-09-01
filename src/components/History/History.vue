<template>
    <div class="card table-card">
      <div class="card-body no-padding no-padding-all">
        <div class="row">
          <div class="col-md-12">
    <!-- <div style="text-align: left;">
      <label>SearchBy:</label><input v-model="searchTerm" />
    </div>     -->
      <table-lite class="data-table"
          :is-static-mode="true"
          :has-checkbox="true"
          :columns="table2.columns"
          :rows="table2.rows"
          :total="table2.totalRecordCount"
          :sortable="table2.sortable"
          @return-checked-rows="updateCheckedRows"
      ></table-lite>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import TableLite from "vue3-table-lite";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: {
    TableLite
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
          label: "No",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Date & Time",
          field: "name",
          width: "10%",
          sortable: true
        },
        {
          label: "IP Address",
          field: "email",
          width: "15%",
          sortable: true,
        },
        {
          label: "Browser",
          field: "email",
          width: "10%"
        },
        {
          label: "Location",
          field: "email",
          width: "10%"
        },
        {
          label: "Address",
          field: "email",
          width: "10%"
        }           
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
    getCount() {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        "Content-Type": "application/json",
      };
      axios
        .get("https://dapi.exus.live/api/mobile/v1/history/login/count", {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },    
    async getHistory() {
      var data = {
        limit: 55,
        offset: 1,
        search: ""
      };
      let hed = {
        Headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          "Content-Type": "application/json",
        }
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/mobile/v1/history/login", data, hed);
      this.loginHistory = response.data;
      for (let i = 0; i < this.loginHistory.length; i++) {
        this.loginHistory[i]["No"] = i + 1;
      }
      console.log(this.loginHistory);
    }  
  },
    mounted() {
    this.getCount();
    this.getHistory();
  }
});
</script>

<style>
</style>
// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export const useThemeStore = defineStore("theme", {
  state: () => {
    return {
      mode: "light",
      color: "green",
    };
  },
  actions: {
    changeTheme() {
      this.mode = this.mode === "light" ? "dark" : "light";
      this.color = this.color === "green" ? "#02601e" : "green";
    },
  },
  persist: true,
});

export const useUserAuthStore = defineStore("user", {
  state: () => {
    return {
      user: ref({}),
    };
  },
  actions: {
    userLogin(username, email, bearer, userid) {
      this.user.username = username;
      this.user.email = email;
      this.user.bearer = bearer;
      this.user.userid = userid;
    },
    userLogout() {
      localStorage.removeItem("user");
    },
  },
  persist: true,
});

export const useRemedyStore = defineStore("remedy", {
  state: () => {
    return {
      remedies: [],
      pageCount: null,
      currentPage: 1,

      showAllRemedies: true,
      queriedremedies: [],
      querystring: "",
    };
  },
  actions: {
    getRemedies() {
      axios
        .get(
          "/remedies?pagination[page]=" +
            this.currentPage +
            "&pagination[pageSize]=10&populate=carousel"
        )
        .then((response) => {
          this.remedies = response.data.data;
          this.pageCount = response.data.meta.pagination.pageCount
        });
    },
    getQueriedRemedies() {
      axios.get("/fuzzy-search/search?query=" + this.querystring).then((response) => {
        this.queriedremedies = response.data.remedies;
        console.log(response.data.remedies);
        if (this.queriedremedies.length) {
          this.showAllRemedies = false
          console.log("Success?")
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Results Found!',
            text: 'Sorry, no results found.',
          })
          this.showAllRemedies = true
        }
      });
    }
  },
  persist: false,
});

// const remedies = ref([]);
// const pageCount = ref(0);
// const currentPage = ref(1);
// function getRemedies() {
//   axios.get("/remedies?pagination[page]=" + currentPage.value + "&pagination[pageSize]=5&populate=carousel").then((response) => {
//     remedies.value = response.data.data;
//     pageCount.value = response.data.meta.pagination.pageCount
//   });
// }
// getRemedies()

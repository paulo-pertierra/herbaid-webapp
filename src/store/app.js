// Utilities
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
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
      user: reactive({}),
      error: "",
    };
  },
  actions: {
    userLogin(username, bearer, userid) {
      this.user.username = username;
      this.user.bearer = bearer;
      this.user.userid = userid;
    },
    submitLogin(id, pass) {
      axios
        .post("/auth/local", {
          identifier: id,
          password: pass,
        })
        .then((response) => {
          this.user.username = response.data.user.username;
          this.user.bearer = response.data.jwt;
          this.user.id = response.data.user.id;
          location.reload();
        })
        .catch((error) => {
          let errormsg;
          console.log();
          try {
            errormsg = error.response.data.error.details.errors[0].message;
          } catch {
            errormsg = error.response.data.error.message;
          }
          this.error = errormsg
        });
    },
    userLogout() {
      localStorage.removeItem("user");
      location.reload()
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
      loading: true,
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
          this.pageCount = response.data.meta.pagination.pageCount;
        });
    },
    getQueriedRemedies() {
      axios
        .get("/fuzzy-search/search?query=" + this.querystring)
        .then((response) => {
          this.queriedremedies = response.data.remedies;
          console.log(response.data.remedies);
          if (this.queriedremedies.length) {
            this.showAllRemedies = false;
            console.log("Success?");
          } else {
            Swal.fire({
              icon: "error",
              title: "No Results Found!",
              text: "Sorry, no results found.",
            });
            this.showAllRemedies = true;
            this.querystring = "";
          }
        });
    },
  },
  persist: false,
});

export const useArticleStore = defineStore("article", {
  state: () => {
    return {
      articles: [],
      currentPage: 1,
      pageCount: null,
      loading: true,
    };
  },
  actions: {
    getArticles() {
      axios
        .get(
          "/articles?pagination[page]=" +
            this.currentPage +
            "&pagination[pageSize]=5&sort=createdAt:desc"
        )
        .then((response) => {
          this.articles = response.data.data;
          this.pageCount = response.data.meta.pagination.pageCount;
        });
    },
  },
});

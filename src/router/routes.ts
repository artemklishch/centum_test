import { CURRENCIES_PER_PAGE } from "@/utils/constants";
import HomeView from "../views/HomeView.vue";
import { useCurrenciesStore } from "@/stores/currencies";

export default [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: ":name",
        component: () => import("../views/CurrencyView.vue"),
      },
    ],
    beforeEnter() {
      const store = useCurrenciesStore();
      store.$patch({ page: 0 });
    },
  },
  {
    path: "/changed-courses",
    name: "changed-courses",
    component: () => import("../views/ChangedCoursesView.vue"),
    children: [
      {
        path: ":name",
        component: () => import("../views/CurrencyView.vue"),
      },
    ],
    beforeEnter() {
      const store = useCurrenciesStore();
      store.$patch({
        page: 0,
        pages:
          Math.ceil(store.changedCurrencies.length / CURRENCIES_PER_PAGE) - 1,
      });
    },
  },
  {
    path: "/courses-by-date",
    name: "courses-by-date",
    component: () => import("../views/CoursesByDateView.vue"),
    children: [
      {
        path: ":name",
        component: () => import("../views/CurrencyView.vue"),
      },
    ],
    beforeEnter() {
      const store = useCurrenciesStore();
      store.$patch({ page: 0 });
    },
  },
];

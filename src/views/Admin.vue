<template>
  <div>
    <h1>Página: Admin</h1>
    <AdminPrizes />
    <AdminQuizzes />
    <AdminTitles />
    <AdminUsers />
  </div>
</template>

<script>
import AdminPrizes from "@/components/AdminPrizes.vue";
import AdminQuizzes from "@/components/AdminQuizzes.vue";
import AdminTitles from "@/components/AdminTitles.vue";
import AdminUsers from "@/components/AdminUsers.vue";

export default {
  name: "Admin",
  components: {
    AdminPrizes,
    AdminQuizzes,
    AdminTitles,
    AdminUsers,
  }
};
</script>

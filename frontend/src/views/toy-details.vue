<template>
  <section v-if="toy">
    <article class="toy-deatails flex">
      <p><span>Id:</span> {{ toy._id }}</p>
      <p><span>Name:</span> {{ toy.name }}</p>
      <p><span>Price:</span> {{ toy.price }}</p>
      <p><span>Instock:</span> {{ toy.inStock }}</p>
      <p><span>Created:</span> {{ formattedDate }}</p>
      <p><span>Type:</span> {{ toy.labels }}</p>
      <p><span>owner:</span> {{ toy.owner.username }}</p>
      
        <button @click="goChat">go chat</button>
      <ul v-if="reviews?.length">
        reviews:
        <li  v-for="review in reviews" :key="review">
          {{ review.user?.username }} : {{ review.content }}
          <p>Rate: {{ review.rate }}⭐</p>
      <button class="btn btn-info" @click="removeReview(review._id)">delete Review</button>
        </li>
      </ul>
      <form v-if="reviewToAdd && user" @submit.prevent="addReview" class="form">
      <div>
        <label for="txt">Your review</label>
        <input name="txt" placeholder="add a review" class="el-input" v-model="reviewToAdd.content"/>
          <label for="rate" class="el-label">Rate</label>
          <input  type="number"  class="el-input"  min="0" max="5" v-model.number="reviewToAdd.rate" />
      <button class="btn btn-info">Add Review</button>
      </div>
    </form>
      <div class="button-act flex">
        <button @click="goBack">go back</button>
      </div>
    </article>
  </section>
</template>

<script>
import { toyService } from "../services/toy-service.js";
import { reviewService } from "../services/review-service";

export default {
  name: "toy-details",
  data() {
    return {
      toy: null,
      reviewToAdd: null,
    };
  },
  async created() {
    const  id  = this.$route.params.toyId;
    this.toy = await toyService.getById(id);
    const user = this.$store.getters.loggedinUser;
    await this.$store.dispatch({ type: "getReviews", filterBy: { toyId: this.toy._id },});
    if (user) {
      this.reviewToAdd = await reviewService.getEmptyReview();
      this.reviewToAdd.userId = user._id;
      this.reviewToAdd.toyId = this.toy._id;
    }
  },
  methods: {
    goBack() {
      this.$router.push("/toy");
    },
    goChat() {
      this.$router.push(`/toy/chat/${this.toy._id}`);
    },
    async addReview() {
      if (!this.reviewToAdd.content) return;
       await this.$store.dispatch({type: "addReview", review: this.reviewToAdd,});
      await this.$store.dispatch({type: "getReviews", filterBy: { toyId: this.toy._id }, });
    },
    async removeReview(reviewId) {
      console.log(reviewId);
      await this.$store.dispatch({ type: "removeReview", reviewId });
      await this.$store.dispatch({
        type: "getReviews",
        filterBy: { toyId: this.toy._id },
      });
    },
  },
  computed: {
    formattedDate() {
      return new Date(this.toy.createdAt).toDateString();
    },
    user() {
      return this.$store.getters.loggedinUser;
    },
    reviews() {
      return this.$store.getters.reviews;
    },
  },
};
</script>

<style>
.button-act {
  gap: 6rem;
}
</style>

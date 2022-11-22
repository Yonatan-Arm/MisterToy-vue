<template>
  <section class="chat">
    <ul v-if="msg">
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }} :</span>{{ msg.txt }}
      </li>
    </ul>
    <span v-if="msg.txt">{{typingName}}typing...</span>
    <hr />
    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" @input="setTyping" placeholder="Your msg" />
      <button>Send</button>
    </form>
    <router-link to="/toy/">Back</router-link>
  </section>
</template>

<script>
import { socketService } from "../services/socket.service.js";

export default {
  data() {
    return {
      msg: { from: "", txt: "" },
      msgs: [],
      topic: "",
      user: null,
      typingName:'',
    };
  },
  async created() {
    this.topic = this.$route.params.toyId;
    this.user = await this.$store.getters.loggedinUser;
    this.msg.from = this.user.username;
    socketService.setup();
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("typing", this.typing);
  },
  computed: {
    toyId() {
      return this.$route.params.toyId;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },


  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg);
    },
    sendMsg() {
      console.log("Sending", this.msg);
      socketService.emit("chat newMsg", this.msg);
      this.msg.txt = "";
    },
    setTyping() {
      socketService.emit("typing", this.user.username );
    },
     typing(user){
        this.typingName = user
    }

  },
  watch:{

  },
  components: {},
  unmounted() {
    socketService.off("chat addMsg", this.addMsg);
  },
};
</script>

<style></style>

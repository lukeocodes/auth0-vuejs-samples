<script>
import auth from "../authService";

export default {
  created() {
    auth.popupCallBack();
  }
};
</script>

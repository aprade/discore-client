<script lang="ts">
    export let message = "Something went wrong.";
</script>
  
<style>
    .error {
        color: white;
        background-color: #623237;

        vertical-align: middle;
        align-items: center;

        margin: 1rem;
        padding: 1rem;
        border-radius: 4px;

        position: absolute;
    }
</style>
  
<div class="error">
    <p>{message}</p>
</div>
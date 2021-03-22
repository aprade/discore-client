<script lang="ts">
    export let message = "Done.";
</script>
  
<style>
    .success {
        color: white;
        background-color: rgba(87, 170, 88, .7);

        vertical-align: middle;
        align-items: center;

        margin: 1rem;
        padding: 1rem;
        border-radius: 4px;

        position: absolute;
    }
</style>
  
<div class="success">
    <p>{message}</p>
</div>
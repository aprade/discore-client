<script>
	import PrimaryButton from '../../DesignSystem/Component/Button/Primary.svelte'; 
</script>

<style>
	.modal {
		/* Compensate the header size */
		height: calc(100% - 30px);
		margin-top: auto;

		display: flex;
		flex-direction: column;
		justify-content: center;

		margin-left: auto;
		margin-right: auto;

		align-items: center;
	}

	.modal .presenting-logo {
		display: flex;
	}

	.modal .presenting-logo h1 {
		font-family: "Inter Bold";
		font-size: 3.5em;
		color: #FFFFFF;
	}
	
	.modal .presenting-logo img {
		width: 44px;
		height: 44px;

		margin-left: 25px;
	}

	.modal p {
		font-family: "Inter Regular";
		font-size: 1.2em;
		color: #DDDDDD;

		margin-top: 40px;
	}
</style>

<div class="modal">
	<div class="presenting-logo">
		<h1>Discore</h1>
		<img src="../resources/icons/icon.png" alt="Discore logo">
	</div>

	<p>A easy way to share your files in your guild.</p>

	<PrimaryButton
		style="flex-shrink: 0; margin-top: 80px;"
		dataCy="get-started-button">
		Get started
	</PrimaryButton>
</div>
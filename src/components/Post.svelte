<script>
  export let preview = true;
  export let imageSrc = "";
  export let clickHandler = () => {};
  export let date;
  export let author;
  export let title = "";
  export let text = "";
</script>

<div class="post" on:click={clickHandler}>
    <div class="header">
      <div class="banner">
        <p>{author}</p>
        <p>{date}</p>
      </div>
      <h2 class="title">{title}</h2>
    </div>
  <div class={preview ? "content" : "content content-full"}>
    {#if imageSrc != ""}
      <img src={imageSrc} alt="test pic" class="pic" />
    {/if}
      <p class="text">{text}</p>
  </div>
</div>

<style>
  @media only screen and (min-width: 800px) {
    .post {
      max-width: 50vw;
      margin: 0 auto;
    }

    .content {
      padding: 3rem;
    }

    .content-full {
      padding: 5rem;
    }
  }

  .post {
    border: 1px solid #000;
    max-height: 33.3%;
    width: calc(100% - 2px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #424242;
    color: var(--text);
    border-radius: 13px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .pic {
    max-width: 50%;
    max-height: 20vh;
    object-fit: scale-down;
  }

  .banner {
    border-bottom: 1px solid gray;
    padding: 1.2rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    background-color: #6d6d6d;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .title { font-size: 1.5rem;
    margin: 1.4rem 1.4rem 0;
  }

  .content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 60%;
    gap: 1.5rem;
    padding: 1rem;
  }

  .content-full {
    flex-direction: column;
  }

  .text {
    max-width: 90%;
    max-height: 26vh;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.4rem;
  }




  .content-full > img,
  .content-full > p {
    max-height: none;
    max-width: 95%;
  }

</style>
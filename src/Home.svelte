<script>
  import Post from "./components/Post.svelte";
  import AppBar from "./components/AppBar.svelte";
  import LoginStore from "./stores/LoginStore";
  import { onMount, text } from "svelte/internal";
  import { clickOutside } from "./clickOutside";
  import { posts, getPosts, comments, getPostComments } from "./getData";
  import NewPost from "./components/NewPost.svelte";
  import { get } from "svelte/store";

  let preview = true;
  let newPost = false;
  let previewPost = posts[0];

  onMount(() => {
    getPosts();
  });

  const createNewPost = function () {
    newPost = true;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  };

  const viewPost = function (post) {
    preview = false;
    previewPost = post;

    getPostComments(post);

    window.scrollTo(0, 0);
  };
</script>

<AppBar title="Test">
  <span
    class="material-icons md-24 md-light"
    slot="leading"
    on:click={() => (preview = true)}
  >
    {preview ? "menu" : "arrow_back"}
  </span>
  <ul slot="trailing" class="trailing">
    <li><p>{$LoginStore}</p></li>
  </ul>
</AppBar>

<main
  on:click|self={() => {
    preview = true;
  }}
  use:clickOutside
  on:click_outside={() => {
    preview = true;
  }}
>
  {#each $posts as post}
    {#if preview || post.creationDate === previewPost.creationDate}
      {#if post != null}
        <Post
          {preview}
          text={post.text}
          title={post.title}
          author={post.author}
          date={new Date(post.creationDate).toLocaleString()}
          imageSrc={post.image}
          clickHandler={() => viewPost(post)}
        />
        {#if !preview}
          {#each $comments as comment}
            <Post
              text={comment.text}
              author={comment.title}
              date={new Date(comment.creationDate).toLocaleString()}
              imageSrc={comment.image}
            />
          {/each}
          <NewPost comment="true" parentPost={previewPost} />
        {/if}
      {/if}
    {/if}
  {/each}
  {#if newPost}
    <NewPost discardHandler={() => (newPost = false)} />
  {:else if preview}
    <div class="icon" on:click={createNewPost}>
      <span class="material-icons md-light new">add</span>
    </div>
  {/if}
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    background-color: #121212;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.3rem 0;
  }

  .trailing {
    list-style: none;
    color: var(--text);
    font-size: 1.9rem;
  }

  .new {
    background-color: var(--primary);
    height: 54px;
    width: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    font-size: 3rem;
  }

  .icon {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
  }
</style>

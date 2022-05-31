<script>
  export let title;
</script>

<nav class="appbar">
  <div class="starting">
    <slot name="leading"  />
    <p class="title">{title}</p>
  </div>
  <slot name="trailing" class="trailing" />
</nav>

<style>


  .appbar {
    background-color: var(--primary);
    padding: 1.7rem 3rem 1.8rem 0rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    display: flex;
    justify-content: space-between;
    position: sticky;
    top:0;
  }


  .starting{
    display: flex;
    justify-content: start;
    gap: 2rem;
    margin-left: 1rem;
  }


  .title {
    color: var(--text);
    font-size: 1.9rem;
    font-weight: 600;
  }
</style>

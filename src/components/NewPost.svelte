<script>
    import {pinImage} from "../uploadImage";
    import LoginStore from "../stores/LoginStore";
    import {gun} from "../stores/LoginStore";
    import Button from "./Button.svelte";
    import {posts} from "../getData";

    export let comment = false;
    export let postTitle = "";
    export let discardHandler = () => {
    };
    export let parentPost = {};

    let postImage = "";
    let postText = "";
    let imageMetaData;

    const uploadImage = function () {
        let image = document.getElementById("fileInput");
        image.click();
        image.onchange = async function (event) {
            image = image.files[0];
            imageMetaData = {
                name: image.name,
                size: image.size / 1000, //convert to kb
            };
            postImage = await pinImage(image);
        };
    };


    //extract these to seperate functions later
    const submitPost = function () {
        let post = {
            title: postTitle,
            image: postImage,
            text: postText,
            author: $LoginStore == null ? "" : $LoginStore, //remove once done testing
            creationDate: Date.now(),
        };
        gun.get("posts").set(post);

        discardHandler();
    };

    const submitComment = function () {
        let comment = {
            image: postImage,
            text: postText,
            author: $LoginStore,
            creationDate: Date.now(),
        };

        gun.get(parentPost._["#"]).get("comments").set(comment);
    };
</script>

<div class="post">
    {#if !comment}
        <input type="text" bind:value={postTitle} class="title-input"/>
    {/if}
    <div
            class="newText"
            contenteditable="true"
            on:input={(v) => (postText = v.target.firstChild.wholeText)}></div>
    <div class="bottom">
        <div class="buttons-start">
            <Button text="Upload Image" upload="true" on:click={uploadImage}/>
            {#if imageMetaData}
                <p>{imageMetaData.name} {Math.floor(imageMetaData.size)}kb</p>
            {/if}
        </div>
        <div class="buttons-end">
            <Button text="Discard" on:click={discardHandler}/>
            <Button
                    text="Submit"
                    on:click={() => (comment ? submitComment() : submitPost())}
            />
        </div>
    </div>
</div>

<style>
    @media only screen and (min-width: 800px) {
        .post {
            max-width: 50vw;
            margin: 0 auto;
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

    .newText {
        font-size: 1.4rem;
        border: 1px solid #fff;
        width: 93%;
        height: 17rem;
        color: #fff;
        margin: 1rem auto 0.5rem;
    }

    .bottom {
        display: flex;
        padding: 1rem 2.8rem 1rem 2.5rem;
        justify-content: space-between;
    }

    .buttons-start {
        font-size: 1.2rem;
        justify-content: start;
    }

    .buttons-end,
    .buttons-start {
        display: flex;
        gap: 1rem;
    }

    .title-input {
        width: 93%;
        height: 2.5rem;
        color: #fff;
        background-color: #424242;
        margin: 1.5rem auto 0.5rem;
        font-size: 1.4rem;
    }

</style>

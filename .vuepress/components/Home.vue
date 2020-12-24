<template>
    <b-row class="p-0 pt-4">
        <b-col lg="8" offset-lg="2">
            <b-jumbotron bg-variant="light" header-level="4">
                <template slot="header">
                    WatchToken
                </template>
                <template slot="lead">
                    {{ $site.title }}
                </template>
                <hr class="my-4">
                <p>Create a link to your ERC20 Token or an embeddable Widget for your Website</p>
                <b-button size="lg" variant="success" class="mt-2 text-uppercase p-3" :to="$withBase('create.html')">
                    Create ERC20 Widget
                </b-button>
                <b-button size="lg"
                          variant="outline-info"
                          class="mt-2 text-uppercase p-3"
                          :to="$withBase('detail.html?address=0xB5c64c7d6b374aD738e314eAa7bCC07AEc194B7b&network=mainnet&logo=https%3A%2F%2Fvittominacori.github.io%2Fwatch-token%2Fassets%2Fimages%2Fbase-token.png')">
                    Example
                </b-button>
            </b-jumbotron>
        </b-col>
        <b-col lg="8" offset-lg="2">
            <b-jumbotron bg-variant="dark" text-variant="light">
                <h4>Want to create your ERC20 or BEP20 Token?</h4>
                <p>Use ERC20 or BEP20 Token Generator to create your own Token in less than a minute.</p>
                <b-button size="lg"
                          variant="outline-info"
                          class="mt-2 text-uppercase p-3"
                          href="https://vittominacori.github.io/erc20-generator/"
                          target="_blank">
                    Create ERC20 Token
                </b-button>
                <b-button size="lg"
                          variant="outline-warning"
                          class="mt-2 text-uppercase p-3"
                          href="https://vittominacori.github.io/bep20-generator/"
                          target="_blank">
                    Create BEP20 Token
                </b-button>
            </b-jumbotron>
        </b-col>
    </b-row>
</template>

<script>
  export default {
    name: 'Home',
  };
</script>

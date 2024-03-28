<template>
  <div>
    <ClientOnly>
      <component
        v-if="CookieLaw"
        :is="CookieLaw"
        theme="dark-lime"
        v-on:accept="updateConsent(true)"
        v-on:decline="updateConsent(false)">
        <template v-slot="props">
          <b-container fluid>
            <b-row>
              <b-col lg="8" offset-lg="2">
                <b-row>
                  <b-col lg="9" class="text-left text-light">
                    We and selected third parties use cookies or similar
                    technologies for technical purposes and, with your consent,
                    for other purposes as specified in the
                    <b-link
                      href="https://www.iubenda.com/privacy-policy/59372271"
                      class="text-success"
                      target="_blank"
                      >Privacy and Cookie Policy</b-link
                    >.
                  </b-col>
                  <b-col md="3">
                    <b-button
                      block
                      variant="success"
                      class="my-2"
                      v-on:click="props.decline"
                      ><span>Reject All</span></b-button
                    >
                    <b-button
                      block
                      variant="success"
                      class="my-2"
                      v-on:click="props.accept"
                      ><span>Accept All</span></b-button
                    >
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </template>
      </component>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      CookieLaw: null,
    };
  },
  mounted() {
    import('vue-cookie-law')
      .then((module) => {
        this.CookieLaw = module.default;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    updateConsent(granted) {
      const consent = {
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
        ad_storage: granted ? 'granted' : 'denied',
        analytics_storage: granted ? 'granted' : 'denied',
      };

      try {
        if (typeof window !== 'undefined') {
          gtag('consent', 'update', consent);

          const now = new Date();

          const item = {
            ...consent,
            expiry: now.getTime() + 24 * 60 * 60 * 1000,
          };

          localStorage.setItem('consent', JSON.stringify(item));
        }
      } catch (e) {
        console.log(e.message);
        console.log(consent);
      }
    },
  },
};
</script>

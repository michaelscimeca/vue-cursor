export default {
  head() {
    const root = 'https://www.example.com';
    const meta = [{
      property: 'og:url',
      content: root + this.$route.path
    }];

    if (this.seo_title) {
      meta.push({
        hid: 'ogTitle',
        property: 'og:title',
        content: this.seo_title
      });
      meta.push({
        hid: 'twitterTitle',
        property: 'twitter:title',
        content: this.seo_title
      });
    }

    if (this.seo_description) {
      meta.push({
        hid: 'description',
        name: 'description',
        content: this.seo_description
      });
      meta.push({
        hid: 'ogDescription',
        property: 'og:description',
        content: this.seo_description
      });
      meta.push({
        hid: 'twitterDescription',
        property: 'twitter:description',
        content: this.seo_description
      });
    }

    return {
      title: this.seo_title,
      meta,
      link: [{
        rel: 'canonical',
        href: root + this.$route.path
      }]
    };
  }
};

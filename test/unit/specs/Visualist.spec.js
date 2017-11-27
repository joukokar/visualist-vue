import Visualist from '@/components/Visualist';
import Vue from 'vue';

describe('Visualist.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Visualist);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.visualist h1').textContent)
    .toEqual('Visualist');
  });
});

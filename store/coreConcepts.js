export default {
  namespaced: true,
  state: () => ({
    a: 123,
    b: []
  }),
  getters: {
    // getters 내부의 메소드를 구성할때 기본적인 파라미터는 두가지로 구성되며 추가적으로 getters내부의 메소드를 호출하여 원하는 값을 도출할 수 있다.
    someGetter1 (state, getters) {
      return state.a + 1
    },
    someGetter2 (state, getters) {
      return state.a + getters.someGetter1
    }
  },
  // 비동기에 대한 제어는 불가능하지만 state의 값을 제어할 수 있다.
  mutations: {
    someMutation (state, payload) {
      state.a = 789
      state.b.push(payload)
    }
  },
  // 비동기에 대한 제어가 가능하며 axios 통신을 할 수 있는 영역이다.
  // 하지만 state에 대한 제어는 불가능 하므로 mutation을 이용하여 데이터를 제어하고 서버로 부터 받아온 데이터를 반환한다.
  actions: {
    // someActions 의 첫번째 파라미터와 someAction2의 첫번째 파라미터의 인자는 동일하다.
    // context의 구성은 state, getters, commit, dispatch 이렇게 4가지로 구성되어 있고 필요한 내용만 사용하기 위해서는 부분 할당을 통해 데이터를 추출한다.
    someActions ({ state, getters, commit, dispatch }, payload) {
      commit('someMutation', payload)
    },
    someAction2 (context, payload) {
      context.commit('someMutation')
      context.dispatch('someActions', payload)
    }
  }
}

import IndexPage from "pages/IndexPage.vue"
import SuperOperatorLayout from "layouts/SuperOperatorLayout.vue"
import SuperOperatorPage from "src/pages/superOperatorPages/SuperOperatorPage.vue"
import OperatorLayout from "layouts/OperatorLayout.vue"
import OperatorPage from "src/pages/operatorPages/OperatorPage.vue"
import OperatorsList from "src/pages/superOperatorPages/OperatorsList.vue"
import OperatorCamera from "src/pages/operatorPages/OperatorCamera.vue"
import OperatorMap from "src/pages/operatorPages/OperatorMap.vue"
import OperatorWarnings from "src/pages/operatorPages/OperatorWarnings.vue"

const routes = [
  // Login Page
  {
    path: '/',
    component: IndexPage
  },
  //Super Operator Pages
  {
    path: '/SuperOperatorPage/:username',
    component: SuperOperatorLayout,
    children: [
      { path: '', component: SuperOperatorPage, name:"profil"},
      { path: 'OperatorList', component: OperatorsList, name:"operators"},

    ]
  },

  //Operator Pages
  {
    path: '/OperatorPage/:username',
    component: OperatorLayout,
    children: [
      { path: '', component: OperatorPage, name:"Operatorprofil"},
      { path: 'OperatorCamera', component: OperatorCamera, name:"OperatorCamera"},
      { path: 'OperatorMap', component: OperatorMap, name:"OperatorMap"},
      { path: 'OperatorWarnings', component: OperatorWarnings, name:"OperatorWarnings"},

    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

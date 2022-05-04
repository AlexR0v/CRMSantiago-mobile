import Dossiers  from '../screens/Dossiers'
import Home      from '../screens/Home'
import Invoices  from '../screens/Invoices'
import Locations from '../screens/Locations'
import Providers from '../screens/Providers'
import Tasks     from '../screens/Tasks'
import Transfers from '../screens/Transfers'
import Trips     from '../screens/Trips'

export const routeMainList = [
  { id: 1, name: 'Home', component: Home, icon_type: 'feather', icon_name: 'home' },
  { id: 2, name: 'Tasks', component: Tasks, icon_type: 'font-awesome-5', icon_name: 'tasks' },
  { id: 3, name: 'Trips', component: Trips, icon_type: 'material-icons', icon_name: 'card-travel' },
  { id: 4, name: 'Providers', component: Providers, icon_type: 'font-awesome', icon_name: 'handshake-o' },
  { id: 5, name: 'Locations', component: Locations, icon_type: 'font-awesome-5', icon_name: 'city' },
  { id: 6, name: 'Transfers', component: Transfers, icon_type: 'material-icons', icon_name: 'transform' },
  { id: 7, name: 'Dossiers', component: Dossiers, icon_type: 'entypo', icon_name: 'text-document' },
  { id: 8, name: 'Invoices', component: Invoices, icon_type: 'font-awesome-5', icon_name: 'file-invoice-dollar' }
]

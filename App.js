import { NavigationContainer } from '@react-navigation/native';
import { StackHome } from './Componentes/Navegacion';
import { Navigation } from './Componentes/Navegacion';


export default function App() {
  return (
   <NavigationContainer>
    <StackHome/>
   </NavigationContainer>

  );
}
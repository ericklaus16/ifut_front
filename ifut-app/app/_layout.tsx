import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { UserProvider } from '@/context/UserProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const navigator = useNavigation()
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    /*
    navigator.addListener('beforeRemove', (e) => {
      console.log(e.data.action)
      e.preventDefault()
      // Do your stuff here
      // navigator.dispatch(e.data.action);
    });
    */
  }, [])

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

export function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const navigator = useNavigation();

  return (
    <UserProvider>
      <Stack initialRouteName='login'>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="register" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        <Stack.Screen name="modal" options={{title: 'Detalhes do Campo'}}/>
      </Stack>
    </UserProvider>
  );
}

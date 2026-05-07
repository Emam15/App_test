// // mapp/app/_layout.jsx
// import { Stack } from 'expo-router';
// import { AuthProvider } from '../context/AuthContext';
// import { ThemeProvider } from '../context/ThemeContext';

// export default function RootLayout() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <Stack>
//           {/* الصفحات الرئيسية */}
//           <Stack.Screen name="index" options={{ headerShown: false }} />

//           {/* Auth group - تسجيل الدخول */}
//           <Stack.Screen name="(auth)/login" options={{ title: 'تسجيل الدخول' }} />
//           <Stack.Screen name="(auth)/signup" options={{ title: 'إنشاء حساب' }} />

//           {/* Student group */}
//           <Stack.Screen name="(student)/home" options={{ title: 'الرئيسية' }} />
//           <Stack.Screen name="(student)/classes" options={{ title: 'المحاضرات' }} />
//           <Stack.Screen name="(student)/announcements" options={{ title: 'الإعلانات' }} />

//           {/* Doctor group */}
//           <Stack.Screen name="(doctor)/home" options={{ title: 'الرئيسية' }} />
//           <Stack.Screen name="(doctor)/classes" options={{ title: 'المحاضرات' }} />

//           {/* Admin group - اختياري */}
//           <Stack.Screen name="(admin)" options={{ headerShown: false }} />
//         </Stack>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }


// mapp/app/_layout.jsx
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack>
          {/* الصفحات الرئيسية */}
          <Stack.Screen name="index" options={{ headerShown: false }} />

          {/* Auth group - تسجيل الدخول */}
          <Stack.Screen name="(auth)/login" options={{ title: 'تسجيل الدخول' }} />
          <Stack.Screen name="(auth)/signup" options={{ title: 'إنشاء حساب' }} />

          {/* Student group */}
          <Stack.Screen name="(student)/home" options={{ title: 'الرئيسية' }} />
          <Stack.Screen name="(student)/classes" options={{ title: 'المحاضرات' }} />
          <Stack.Screen name="(student)/announcements" options={{ title: 'الإعلانات' }} />
          <Stack.Screen name="(student)/class-details" options={{ title: 'تفاصيل المحاضرة' }} />

          {/* Doctor group */}
          <Stack.Screen name="(doctor)/home" options={{ title: 'الرئيسية' }} />
          <Stack.Screen name="(doctor)/classes" options={{ title: 'المحاضرات' }} />
          <Stack.Screen name="(doctor)/announcements" options={{ title: 'الإعلانات' }} />
          <Stack.Screen name="(doctor)/class-details" options={{ title: 'تفاصيل المحاضرة' }} />

          {/* Admin group */}
          <Stack.Screen name="(admin)/home" options={{ title: 'لوحة التحكم' }} />
          <Stack.Screen name="(admin)/announcements" options={{ title: 'الإعلانات' }} />
          <Stack.Screen name="(admin)/classes" options={{ title: 'الكلاسات' }} />
          <Stack.Screen name="(admin)/users" options={{ title: 'المستخدمين' }} />


          {/* hammad screens - اختياري */}
          <Stack.Screen name="hammad/NotIDOC" options={{ title: 'إشعارات' }} />
          <Stack.Screen name="hammad/NotSTD" options={{ title: 'إشعارات' }} />
          <Stack.Screen name="hammad/NotofAdmin" options={{ title: 'إشعارات' }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
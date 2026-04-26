import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Bus, GraduationCap, Building2 } from 'lucide-react';

export default function Onboarding() {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (userData?.role) {
    return <Navigate to={`/${userData.role}`} />;
  }

  const selectRole = async (role: 'student' | 'driver') => {
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), { role });
      // Since context listens to onAuthStateChanged, this won't trigger user update directly.
      // But we can reload the page or let the user click "continue"
      window.location.href = '/';
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Welcome to Rebat</h1>
        <p className="text-lg text-gray-500">How will you be using the app today?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        <Card className="hover:border-blue-600 transition-colors cursor-pointer group" onClick={() => selectRole('student')}>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto bg-blue-100 text-blue-600 p-4 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <GraduationCap className="h-8 w-8" />
            </div>
            <CardTitle>I am a Student</CardTitle>
            <CardDescription className="text-base mt-2">
              I want to subscribe to a fixed weekly or monthly schedule for university transportation.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-8">
            <Button disabled={loading} variant="outline" className="w-full">Continue as Student</Button>
          </CardContent>
        </Card>

        <Card className="hover:border-blue-600 transition-colors cursor-pointer group" onClick={() => selectRole('driver')}>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto bg-green-100 text-green-600 p-4 rounded-full mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Bus className="h-8 w-8" />
            </div>
            <CardTitle>I am a Driver</CardTitle>
            <CardDescription className="text-base mt-2">
              I want to drive students to university and get paid automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-8">
            <Button disabled={loading} variant="outline" className="w-full">Continue as Driver</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

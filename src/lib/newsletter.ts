import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase'; // Assuming it's there
import { Subscriber } from '../types';

export async function subscribeToNewsletter(email: string, firstName?: string) {
  const subscribersRef = collection(db, 'subscribers');
  
  // Basic normalization
  const normalizedEmail = email.toLowerCase().trim();
  
  // Check if already exists
  const q = query(subscribersRef, where('email', '==', normalizedEmail));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const existingDoc = querySnapshot.docs[0];
    await updateDoc(existingDoc.ref, {
      marketing_consent: true,
      email_status: 'active',
      updated_at: serverTimestamp()
    });
    return existingDoc.id;
  }
  
  const newSubRef = doc(subscribersRef);
  const subscriberData = {
    email: normalizedEmail,
    first_name: firstName || '',
    marketing_consent: true,
    email_status: 'active',
    consent_source: 'footer_form',
    consent_timestamp: serverTimestamp(),
    consent_version: '1.0',
    locale: 'fr-FR',
    preferences: {
      family_rhythm: false,
      school_calendar_zone: 'non_precise',
      content_context: ['routine_personnelle']
    },
    created_at: serverTimestamp(),
    updated_at: serverTimestamp()
  };
  
  await setDoc(newSubRef, subscriberData);
  return newSubRef.id;
}

export async function updatePreferences(subscriberId: string, preferences: any) {
  const subRef = doc(db, 'subscribers', subscriberId);
  await updateDoc(subRef, {
    preferences,
    updated_at: serverTimestamp()
  });
}

export async function unsubscribe(subscriberId: string) {
  const subRef = doc(db, 'subscribers', subscriberId);
  await updateDoc(subRef, {
    marketing_consent: false,
    email_status: 'unsubscribed',
    updated_at: serverTimestamp()
  });
}

export async function generateNewsletter(season: string, contextData: any) {
  const response = await fetch('/api/admin/newsletter/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ season, context_data: contextData })
  });
  return response.json();
}

export async function approveCampaign(campaignId: string) {
  const response = await fetch(`/api/admin/newsletter/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ campaignId })
  });
  return response.json();
}

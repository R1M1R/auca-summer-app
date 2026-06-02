import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'

const COLL = 'users'
const DOC  = 'student_profile'

export async function reportStudentPresence(online: boolean): Promise<void> {
  if (!isConfigured) return
  const ref = doc(db, COLL, DOC)
  if (online) {
    await setDoc(ref, { isOnline: true, lastSeen: serverTimestamp() }, { merge: true })
  } else {
    await setDoc(ref, { isOnline: false }, { merge: true })
  }
}

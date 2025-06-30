import { db } from "../firebase"
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore"

export const salvarPerfume = async (uid, tipo, perfume) => {
    const ref = collection(db, "users", uid, tipo)
    await addDoc(ref, perfume)
}

export const buscarPerfumes = async (uid, tipo) => {
    const ref = collection(db, "users", uid, tipo)
    const snapshot = await getDocs(ref)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const excluirPerfume = async (uid, tipo, id) => {
    const ref = doc(db, "users", uid, tipo, id)
    await deleteDoc(ref)
}